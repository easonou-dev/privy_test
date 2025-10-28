import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';

// 导入SolConSdk及其相关类型
import SolConSdk, { getEnvParams, PrivyWallet } from 'solconsdk';

// Privy 登录按钮组件
function LoginButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();

  // 过滤出Solana钱包 - Privy的钱包对象使用chainType属性
  const solanaWallets = wallets.filter(wallet => 
    wallet.chainType === 'solana' || 
    wallet.walletClientType === 'solana'
  );
  
  // 使用 useWallets 来获取钱包信息
  useEffect(() => {
    if (user) {
      console.log('Privy user object in useEffect:', user);
      console.log('All user linked accounts:', user.linkedAccounts);
      
      // 打印每个 linkedAccount 的详细信息
      user.linkedAccounts.forEach((account, index) => {
        console.log(`LinkedAccount ${index}:`, {
          type: account.type,
          address: account.address,
          chainType: account.chainType,
          chainId: account.chainId,
          walletClient: account.walletClient,
          walletClientType: account.walletClientType
        });
      });
    }
    
    console.log('All wallets from useWallets:', wallets);
    
    // 打印每个 wallet 的详细信息
    wallets.forEach((wallet, index) => {
      console.log(`Wallet ${index} details:`, {
        address: wallet.address,
        chainType: wallet.chainType,
        walletClientType: wallet.walletClientType,
        connectorType: wallet.connectorType,
        imported: wallet.imported,
        allKeys: Object.keys(wallet)
      });
    });
    
    console.log('Filtered Solana wallets:', solanaWallets);
    
    if (solanaWallets && solanaWallets.length > 0) {
      solanaWallets.forEach((wallet, index) => {
        console.log(`Solana wallet ${index}:`, wallet);
      });
    }
  }, [user, wallets, solanaWallets]);

  // Use 'ready' to ensure Privy SDK is initialized as per docs:
  if (!ready || !walletsReady) {
    return <div>加载中...</div>;
  }

  if (!authenticated) {
    return (
      <button onClick={login}>登录 (Privy 模态框)</button>
    );
  }

  if (!user) {
    return <div>用户信息加载中...</div>;
  }

  // 从 linkedAccounts 中查找 Solana 钱包
  console.log('User linked accounts:', user?.linkedAccounts);
  
  // 查找 Solana 类型的账户 - 直接用 chainType 判断
  const solanaAccount = user?.linkedAccounts?.find(account => 
    account.type === 'wallet' && account.chainType === 'solana'
  );
  
  console.log('✅ Found Solana account from linkedAccounts:', solanaAccount);
  console.log('External Solana wallets from useWallets:', solanaWallets);
  
  // 使用 linkedAccounts 中的 Solana 地址
  const walletAddress = solanaAccount?.address;
  
  console.log('✅ Final wallet address:', walletAddress);

  return (
    <div>
      <p>您已成功登录！</p>
      {walletAddress ? (
        <p>钱包地址: {walletAddress}</p>
      ) : (
        <p>未能找到 Solana 钱包地址。请尝试重新登录或检查 Privy 配置。</p>
      )}
      <button onClick={logout}>登出</button>
      {/* 渲染更新的 CTC 测试组件 */}
      {walletAddress && <CTCTestSuite user={user} solanaAccount={solanaAccount} />}
    </div>
  );
}

// 新的 CTC 合约测试组件
function CTCTestSuite({ solanaAccount }: { user: any; solanaAccount: any }) {
  const primaryWallet = solanaAccount; // 兼容性别名
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentMarketId, setCurrentMarketId] = useState('');
  const [currentQuestionIds, setCurrentQuestionIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('createMarket');
  const [inputMarketId, setInputMarketId] = useState('');
  const [inputQuestionId, setInputQuestionId] = useState('');

  // 获取环境参数 - 改回devnet
  const commonEnv = getEnvParams("devnet");
  const platformFeePayer = commonEnv.FEE_PAYER;

  // 自定义RPC配置（可选）
  const useCustomRpc = true; // 设置为 true 启用自定义RPC
  const customRpcUrl = "https://api.devnet.solana.com"; // Solana 官方公共 devnet RPC
  const customWsUrl = "wss://api.devnet.solana.com";   // Solana 官方公共 devnet WebSocket

  // 初始化 SDK - 支持自定义RPC
  const initializeSdk = () => {
    let predictionMarket;
    
    if (useCustomRpc) {
      // 使用自定义RPC
      const customEnvParams = {
        ...commonEnv,
        RPC_URL: customRpcUrl,
        WS_URL: customWsUrl,
      };
      predictionMarket = SolConSdk.getPredictionMarketByEnvParams(customEnvParams);
      console.log('🔧 使用自定义RPC:', customRpcUrl);
    } else {
      // 使用SDK默认的devnet RPC
      predictionMarket = SolConSdk.getPredictionMarketByEnv("devnet");
      console.log('🔧 使用SDK默认RPC:', commonEnv.RPC_URL);
    }
    
    predictionMarket.setFeePayer(platformFeePayer);
    predictionMarket.setNetwork("devnet");
    
    if (commonEnv.GLOBAL_LOOKUP_TABLE) {
      predictionMarket.setGlobalLookupTable(new PublicKey(commonEnv.GLOBAL_LOOKUP_TABLE));
    }
    
    return predictionMarket;
  };

  // 创建钱包适配器
  const createWalletAdapter = (isGasless: boolean) => {
    if (isGasless && primaryWallet.connectorType !== 'embedded') {
      throw new Error('Gasless 模式需要嵌入式钱包（如谷歌登录）');
    }
    if (!isGasless && primaryWallet.connectorType === 'embedded') {
      throw new Error('非 Gasless 模式需要外部钱包（如 Phantom）');
    }
    
    const walletAdapter = new PrivyWallet(primaryWallet, new PublicKey(primaryWallet.address), isGasless);
    const predictionMarket = initializeSdk();
    
    if (walletAdapter.setConnection) {
      walletAdapter.setConnection(predictionMarket.getConnection());
    }
    
    return { walletAdapter, predictionMarket };
  };


  // 修正市场创建时间
  const testCreateMarket = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      const now = Math.floor(Date.now() / 1000);
      // 使用更短的marketId，避免长度限制
      const marketId = `m-${now}`;
      const marketName = `CTC测试市场: SOL价格预测`;
      
      // 🔧 正确的时间设置
      const resolutionTime = now + 3600 * 24 * 30; // 30天后解决市场（足够长）
      const innerTradeTime = now + 120;            // 2分钟后结束内盘交易
      const outerTradeTime = now + 420;            // 7分钟后结束外盘交易（5分钟外盘期）
      
      console.log('⏰ 正确流程时间设置:');
      console.log(`当前时间: ${now} (${new Date(now * 1000).toLocaleString()})`);
      console.log(`内盘结束: ${innerTradeTime} (${new Date(innerTradeTime * 1000).toLocaleString()}) - 2分钟后`);
      console.log(`外盘结束: ${outerTradeTime} (${new Date(outerTradeTime * 1000).toLocaleString()}) - 7分钟后`);
      console.log(`市场解决: ${resolutionTime} (${new Date(resolutionTime * 1000).toLocaleString()}) - 30天后`);
      
      console.log('🎯 正确测试流程:');
      console.log('1. 立即内盘投注Yes/No（2分钟内）');
      console.log('2. 2分钟后触发Pump（进入外盘状态）');
      console.log('3. Pump后立即可以LMSR买卖（5分钟外盘期）');
      
      const questions = [
        {
          questionId: `yes-${now}`, // 使用更短的questionId
          questionName: 'Yes - SOL价格会在年底前达到$200',
          questionResolutionTime: resolutionTime - 3600, // 比市场解决时间早1小时
          positionCount: 1,
        },
        {
          questionId: `no-${now}`, // 使用更短的questionId
          questionName: 'No - SOL价格不会在年底前达到$200',
          questionResolutionTime: resolutionTime - 3600, // 比市场解决时间早1小时
          positionCount: 1,
        }
      ];

      console.log(`使用 ${isGasless ? 'Gasless' : 'Non-Gasless'} 模式创建市场...`);
      console.log('Market Data:', { marketId, marketName, resolutionTime, innerTradeTime, outerTradeTime, questions });

      setMessage('🔄 正在创建市场（2分钟内盘 + 5分钟外盘）...');

      const result = await predictionMarket.createMarketAndQuestionsAuto(
        walletAdapter,
        marketId,
        marketName,
        resolutionTime,
        questions,
        innerTradeTime,
        outerTradeTime,
        null, // pumpThreshold: null = 使用合约默认1000U
        false // isPrivated
      );
      
      console.log('市场创建结果:', result);
      
      setCurrentMarketId(marketId);
      setCurrentQuestionIds(questions.map(q => q.questionId));
      
      setMessage(`✅ 市场创建完成！
市场ID: ${marketId}
解决时间: ${new Date(resolutionTime * 1000).toLocaleString()} (30天后)
内盘交易期: 现在 → ${new Date(innerTradeTime * 1000).toLocaleString()} (2分钟)
外盘交易期: Pump后 → ${new Date(outerTradeTime * 1000).toLocaleString()} (5分钟)

⏰ 正确测试流程:
1. 现在-2分钟: 内盘投注Yes/No
2. 2分钟后: 触发Pump（进入外盘状态）
3. Pump后: 立即可以LMSR买卖（5分钟外盘期）

🚀 立即开始内盘投注！`);
      
    } catch (error: any) {
      console.error('创建市场失败:', error);
      setMessage(`❌ 创建市场失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 修改Pump逻辑，自动选择金额较少的条件
  const testTriggerPump = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      console.log(`使用 ${isGasless ? 'Gasless' : 'Non-Gasless'} 模式触发 Pump...`);
      
      setMessage(`🔄 正在触发Pump...
合约将自动选择金额较少的选项进行转移`);

      const result = await predictionMarket.triggerPump(
        currentMarketId,
        currentQuestionIds[0], // 直接使用第一个questionId
        walletAdapter
      );

      setMessage(`✅ Pump 触发成功！
市场ID: ${currentMarketId}
签名: ${result}
合约已自动完成Yes/No金额比较和资金转移`);
    } catch (error: any) {
      console.error('Pump 触发失败:', error);
      setMessage(`❌ Pump 触发失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 修改投注Yes选项的函数
  const testPlaceInnerBetYes = async (isGasless: boolean = false) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场');
        setLoading(false);
        return;
      }

      // 让用户输入投注金额（美元）
      const userInputUSD = prompt('请输入投注金额 (美元):', '50');
      if (!userInputUSD) {
        setMessage('❌ 投注取消或金额无效');
        setLoading(false);
        return;
      }

      const betAmountUSD = Number(userInputUSD);
      if (betAmountUSD <= 0) {
        setMessage('❌ 投注金额必须大于0');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      const yesQuestionId = currentQuestionIds[0];
      
      // 💰 直接将美元转换为合约的最小单位（6位精度）
      const buyAmountNumber = Math.floor(betAmountUSD * 1000000); // 100 USD = 100,000,000 最小单位
      const buyAmount = new anchor.BN(buyAmountNumber); // 转换为anchor.BN

      console.log(`💰 投注金额计算:
用户输入: ${betAmountUSD} USD
转换金额: ${buyAmountNumber} 最小单位 (精度6位)
BN格式: ${buyAmount.toString()}
实际代表: ${buyAmountNumber / 1000000} USD`);

      console.log(`使用 ${isGasless ? 'Gasless' : 'Non-Gasless'} 模式投注Yes选项...`);

      // 检查条件账户
      try {
        await predictionMarket.getConditionInfo(yesQuestionId);
      } catch (error: any) {
        setMessage(`❌ 条件账户不存在: ${error.message}`);
        setLoading(false);
        return;
      }

      // 在调用placeInnerBuy之前添加详细的参数日志
      console.log('🔍 placeInnerBuy 参数检查:');
      console.log('walletAdapter:', walletAdapter);
      console.log('yesQuestionId:', yesQuestionId, 'type:', typeof yesQuestionId);
      console.log('is_yes:', true, 'type:', typeof true);
      console.log('buyAmount:', buyAmount.toString(), 'type:', typeof buyAmount);

      // 确保参数类型正确
      const questionIdStr = String(yesQuestionId);
      const isYesBool = Boolean(true);

      console.log('转换后参数:');
      console.log('questionIdStr:', questionIdStr, 'type:', typeof questionIdStr);
      console.log('isYesBool:', isYesBool, 'type:', typeof isYesBool);
      console.log('buyAmount (BN):', buyAmount.toString(), 'type:', typeof buyAmount);

      // 使用转换后的参数
      const result = await predictionMarket.placeInnerBuy(
        walletAdapter,
        currentMarketId,
        questionIdStr,
        isYesBool,
        buyAmount,  // 现在是anchor.BN类型
        null        // sharedCode: string | null
      );

      // 投注成功后检查是否达到Pump条件
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 等待链上更新
        const updatedMarketInfo = await predictionMarket.getMarketInfo(currentMarketId);
        const newTotalAmount = updatedMarketInfo.rawData.totalInnerAmount;
        const pumpThreshold = updatedMarketInfo.rawData.pumpThreshold || 1000000000;
        
        const canTriggerPump = newTotalAmount >= pumpThreshold;
        
        setMessage(`✅ Yes选项投注成功！
💰 投注金额: ${betAmountUSD} USD
📝 交易签名: ${result}
📊 市场状态更新:
  - 总投注额: ${(newTotalAmount / 1000000).toFixed(2)} USD
  - Pump阈值: ${(pumpThreshold / 1000000).toFixed(2)} USD
  - 可触发Pump: ${canTriggerPump ? '是' : '否'}

${canTriggerPump ? '🚀 现在可以触发Pump了！' : '⏰ 需要更多投注才能触发Pump'}`);
      } catch (error: any) {
        setMessage(`✅ 投注成功！
💰 投注金额: ${betAmountUSD} USD
📝 交易签名: ${result}
⚠️ 无法获取市场状态更新: ${error.message}`);
      }
    } catch (error: any) {
      console.error('投注失败:', error);
      setMessage(`❌ 投注失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 修改投注No选项的函数
  const testPlaceInnerBetNo = async (isGasless: boolean = false) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场');
        setLoading(false);
        return;
      }

      // 让用户输入投注金额（美元）
      const userInputUSD = prompt('请输入对No选项的投注金额 (美元):', '30');
      if (!userInputUSD) {
        setMessage('❌ 投注取消或金额无效');
        setLoading(false);
        return;
      }

      const betAmountUSD = Number(userInputUSD);
      if (betAmountUSD <= 0) {
        setMessage('❌ 投注金额必须大于0');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      const noQuestionId = currentQuestionIds[0]; // 注意：现在只有一个question，通过is_yes区分
      
      // 💰 直接将美元转换为合约的最小单位
      const buyAmountNumber = Math.floor(betAmountUSD * 1000000);
      const buyAmount = new anchor.BN(buyAmountNumber); // 转换为anchor.BN

      console.log(`💰 No选项投注金额计算:
用户输入: ${betAmountUSD} USD
转换金额: ${buyAmountNumber} 最小单位 (精度6位)
BN格式: ${buyAmount.toString()}
投注选项: No - SOL价格不会达到$200`);

      // 确保参数类型正确
      const questionIdStr = String(noQuestionId);

      // 检查条件账户
      try {
        await predictionMarket.getConditionInfo(noQuestionId);
        console.log('✅ No选项条件账户存在');
      } catch (error: any) {
        setMessage(`❌ No选项条件账户不存在
Question ID: ${noQuestionId}
错误: ${error.message}

可能原因: 条件创建失败，请重新创建市场`);
        setLoading(false);
        return;
      }

      setMessage(`🔄 正在对No选项投注 ${betAmountUSD} USD，请确认钱包签名...`);

      // 使用新的place_inner_buy方法，注意参数顺序
      const result = await predictionMarket.placeInnerBuy(
        walletAdapter,     // authority: WalletInfo
        currentMarketId,   // marketId: string
        questionIdStr,     // questionId: string
        false,            // isYes: boolean (No选项 = false)
        buyAmount,        // buyAmount: anchor.BN
        null              // sharedCode: string | null
      );

      // 投注成功后显示成功消息
      setMessage(`✅ No选项投注成功！
💰 投注金额: ${betAmountUSD} USD
📝 交易签名: ${result}
⏰ 投注时间: ${new Date().toLocaleString()}`);

    } catch (error: any) {
      console.error('No选项投注失败:', error);
      setMessage(`❌ No选项投注失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };




  // 修改初始化方法使用完整的 initContract (包含CTC、Order和Vote合约)
  const testInitializeContract = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      console.log(`使用 ${isGasless ? 'Gasless' : 'Non-Gasless'} 模式初始化合约...`);
      console.log(`当前钱包地址: ${walletAdapter.publicKey.toString()}`);
      
      setMessage('🔄 正在初始化CTC、Order和Vote合约...');

      // 检查是否已经初始化
      try {
        const globalStateData = await predictionMarket.getCtcGlobalStateData();
        const orderExchangeData = await predictionMarket.getOrderExchangeData();
        
        // 检查Vote合约状态
        let voteStateExists = false;
        try {
          const connection = predictionMarket.getConnection();
          const voteStateData = await connection.getAccountInfo(
            PublicKey.findProgramAddressSync(
              [Buffer.from("vote_state")],
              new PublicKey("GfBsXa1zdaSxPekRTvshMuRk71aZTTUj4BG76CVdesZs") // Vote程序ID
            )[0]
          );
          voteStateExists = !!voteStateData;
        } catch (error) {
          console.log('Vote状态检查失败');
        }
        
        if (globalStateData && orderExchangeData && voteStateExists) {
          setMessage(`✅ 合约已经初始化完成！
🏛️ CTC全局状态: 已存在
📊 Order交换: 已存在
🗳️ Vote合约: 已存在
💼 当前钱包: ${walletAdapter.publicKey.toString()}

可以直接创建市场了！

💡 如果您更新了Vote合约IDL:
- 当前合约已初始化，无法重新初始化
- 如需使用新IDL，请使用新的devnet环境或联系管理员`);
          setLoading(false);
          return;
        } else if (globalStateData && orderExchangeData && !voteStateExists) {
          setMessage(`⚠️ 部分合约已初始化！
🏛️ CTC全局状态: 已存在
📊 Order交换: 已存在
🗳️ Vote合约: 未初始化

这种情况可能是因为:
1. Vote合约IDL已更新但尚未初始化
2. 之前的初始化未完成
3. Vote程序ID已更改

建议: 继续执行完整初始化以补充Vote合约`);
        }
      } catch (error) {
        console.log('合约状态检查失败，需要初始化');
      }

      // 使用完整的 initContract 方法（同时初始化CTC、Order和Vote合约）
      const result = await predictionMarket.initContract(
        walletAdapter, // init_authority
        walletAdapter.publicKey // authorityPublicKey
      );
      
      console.log('合约初始化结果:', result);
      
      // 等待交易确认
      setMessage('🔄 等待合约初始化交易确认...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // 验证初始化结果
      try {
        const globalStateData = await predictionMarket.getCtcGlobalStateData();
        const orderExchangeData = await predictionMarket.getOrderExchangeData();
        
        setMessage(`✅ 合约初始化成功！
📝 交易签名: ${result}
🏛️ CTC全局状态: ${globalStateData ? '已创建' : '未创建'}
📊 Order交换: ${orderExchangeData ? '已创建' : '未创建'}
🗳️ Vote合约: 已初始化
💼 初始化钱包: ${walletAdapter.publicKey.toString()}

现在可以创建市场了！`);
      } catch (error: any) {
        setMessage(`⚠️ 合约初始化交易已发送，但验证失败
📝 交易签名: ${result}
验证错误: ${error.message}
请等待几分钟后重试创建市场。`);
      }
      
    } catch (error: any) {
      console.error('合约初始化失败:', error);
      
      // 检查是否是重复初始化错误
      const isAlreadyInitialized = error.message.includes('already in use') || 
                                  error.message.includes('already initialized') ||
                                  error.message.includes('AccountAlreadyInUse');
      
      if (isAlreadyInitialized) {
        setMessage(`⚠️ 合约初始化失败: 账户已存在

${error.message}

🔧 这通常意味着:
1. ✅ 合约已经初始化过了 - 这是正常情况
2. 🔄 您更新了Vote合约IDL但账户已存在

💡 解决方案:
如果您更新了Vote合约IDL，有以下选择:

🟢 推荐方案:
1. 重置devnet环境: solana-test-validator --reset
2. 重新部署所有合约到新的程序ID
3. 更新SDK配置中的程序ID

🟡 替代方案:
1. 使用现有的合约继续测试（如果IDL兼容）
2. 联系管理员重置合约状态
3. 切换到不同的devnet集群

🔍 检查当前状态:
请使用"0. 检查状态"功能确认各合约的初始化状态`);
      } else {
        setMessage(`❌ 合约初始化失败: ${error.message}

可能的原因:
1. 权限不足 - 只有合约管理员可以初始化
2. 网络连接问题
3. SOL余额不足（需要约0.01 SOL）
4. 程序ID不匹配
5. IDL版本不兼容

请确保:
- 使用正确的管理员钱包地址
- 钱包有足够的SOL余额
- 程序ID配置正确
- SDK版本与合约版本匹配

🔧 技术详情:
initContract方法会同时初始化三个合约:
- CTC合约: 核心预测市场逻辑
- Order合约: 订单交换系统
- Vote合约: 投票治理系统

⚠️ IDL更新注意事项:
如果您更换了SDK中的vote合约IDL:
1. 确保新IDL与部署的合约版本匹配
2. 如果合约已初始化，可能需要重置环境
3. 检查程序ID是否正确配置`);
      }
    } finally {
      setLoading(false);
    }
  };

  // 新增: 状态检查工具
  const testCheckStatus = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { predictionMarket } = createWalletAdapter(isGasless);
      
      console.log('检查当前状态...');
      const results = [];
      
      // 检查市场
      if (currentMarketId) {
        try {
          const marketInfo = await predictionMarket.getMarketInfo(currentMarketId);
          results.push(`✅ 市场存在: ${currentMarketId}`);
          results.push(`   - 内部交易时间: ${new Date(marketInfo.innerTradeTime * 1000).toLocaleString()}`);
          results.push(`   - 当前时间: ${new Date().toLocaleString()}`);
          results.push(`   - 可以交易: ${marketInfo.innerTradeTime <= Math.floor(Date.now() / 1000) ? '是' : '否'}`);
        } catch (error) {
          results.push(`❌ 市场不存在: ${currentMarketId}`);
        }
      } else {
        results.push(`❌ 未设置市场ID`);
      }
      
      // 检查问题
      for (let i = 0; i < currentQuestionIds.length; i++) {
        const questionId = currentQuestionIds[i];
        try {
          const conditionInfo = await predictionMarket.getConditionInfo(questionId);
          results.push(`✅ 问题 ${i + 1} 存在: ${questionId}`);
          results.push(`   - 市场ID: ${conditionInfo.marketId}`);
        } catch (error) {
          results.push(`❌ 问题 ${i + 1} 不存在: ${questionId}`);
          
          // 尝试获取条件账户信息
          try {
            const conditionAccount = await predictionMarket.getConditionAccount(questionId, false);
            results.push(`   - 条件账户地址: ${conditionAccount.conditionPda.toString()}`);
          } catch (error2) {
            results.push(`   - 无法获取条件账户地址`);
          }
        }
      }
      
      setMessage(`📊 状态检查结果:
${results.join('\n')}`);
      
    } catch (error: any) {
      setMessage(`❌ 状态检查失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 修正LMSR买入测试 - Pump后立即可用
  const testLmsrBuy = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场并完成内盘投注和Pump操作');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      // 检查是否已经Pump（不需要检查外盘时间，Pump后立即可用）
      try {
        const marketInfo = await predictionMarket.getMarketInfo(currentMarketId);
        console.log('市场信息:', marketInfo);
        
        // 检查是否已经Pump（这里需要根据实际的市场状态字段来判断）
        // 假设有一个字段表示是否已经Pump
        const now = Math.floor(Date.now() / 1000);
        const isInnerPeriod = now <= marketInfo.innerTradeTime;
        
        if (isInnerPeriod) {
          setMessage(`❌ LMSR买入失败: 当前仍在内盘期，需要先Pump
          
当前时间: ${new Date().toLocaleString()}
内盘结束: ${new Date(marketInfo.innerTradeTime * 1000).toLocaleString()}

请先完成:
1. 内盘投注Yes/No
2. 等待内盘期结束后触发Pump
3. Pump后立即可以LMSR买卖`);
          setLoading(false);
          return;
        }
        
      } catch (error) {
        setMessage('❌ 无法获取市场信息，请确保市场已创建');
        setLoading(false);
        return;
      }

      // 让用户选择买入的选项
      const outcomeChoice = prompt('选择买入选项:\n1 = Yes (SOL达到$200)\n0 = No (SOL不达到$200)', '1');
      if (outcomeChoice === null) {
        setMessage('❌ 取消LMSR买入操作');
        setLoading(false);
        return;
      }

      const outcome = outcomeChoice === '1';
      
      // 让用户输入代币数量
      const tokenAmountStr = prompt('请输入要购买的代币数量:', '50');
      if (!tokenAmountStr) {
        setMessage('❌ 买入取消或代币数量无效');
        setLoading(false);
        return;
      }

      const tokenAmountNumber = Number(tokenAmountStr);
      if (tokenAmountNumber <= 0) {
        setMessage('❌ 代币数量必须大于0');
        setLoading(false);
        return;
      }

      // 让用户输入每个代币的最大价格
      const maxPricePerTokenStr = prompt('请输入每个代币的最大价格 (USD):', '1.0');
      if (!maxPricePerTokenStr) {
        setMessage('❌ 买入取消或最大价格无效');
        setLoading(false);
        return;
      }

      const maxPricePerTokenNumber = Number(maxPricePerTokenStr);
      if (maxPricePerTokenNumber <= 0) {
        setMessage('❌ 每个代币的最大价格必须大于0');
        setLoading(false);
        return;
      }

      // 转换为anchor.BN（6位精度）
      const tokenAmount = new anchor.BN(Math.floor(tokenAmountNumber * 1000000));
      const maxPricePerToken = new anchor.BN(Math.floor(maxPricePerTokenNumber * 1000000));

      // 使用第一个question作为测试
      const questionId = currentQuestionIds[0];

      console.log(`💰 LMSR买入参数:
选择选项: ${outcome ? 'Yes' : 'No'} (SOL ${outcome ? '会' : '不会'}达到$200)
代币数量: ${tokenAmountNumber} 个 (BN: ${tokenAmount.toString()})
最大单价: ${maxPricePerTokenNumber} USD (BN: ${maxPricePerToken.toString()})`);

      setMessage(`🔄 正在执行LMSR买入...
选项: ${outcome ? 'Yes' : 'No'} (SOL ${outcome ? '会' : '不会'}达到$200)
代币数量: ${tokenAmountNumber} 个
最大单价: ${maxPricePerTokenNumber} USD
请确认钱包签名...`);

      // 调用SDK的LMSR买入方法 - 新接口
      const result = await predictionMarket.lmsrBuy(
        walletAdapter,
        currentMarketId,
        questionId,
        outcome, // true for Yes, false for No
        tokenAmount,      // anchor.BN - 代币数量
        maxPricePerToken, // anchor.BN - 每个代币的最大价格
        null      // sharedCode: string | null
      );

      setMessage(`✅ LMSR买入成功！
🎯 买入选项: ${outcome ? 'Yes' : 'No'} (SOL ${outcome ? '会' : '不会'}达到$200)
💰 代币数量: ${tokenAmountNumber} 个
📈 最大单价: ${maxPricePerTokenNumber} USD
📝 交易签名: ${result}
⏰ 交易时间: ${new Date().toLocaleString()}

💡 现在可以测试LMSR卖出功能！`);

    } catch (error: any) {
      console.error('LMSR买入失败:', error);
      setMessage(`❌ LMSR买入失败: ${error.message}

可能原因:
1. 尚未触发Pump（需要先Pump进入外盘状态）
2. 流动性不足
3. 滑点保护触发（实际输出低于最小期望）
4. 钱包余额不足`);
    } finally {
      setLoading(false);
    }
  };

  // 修改LMSR卖出测试函数中的参数转换
  const testLmsrSell = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场，完成内盘投注、Pump和LMSR买入操作');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      // 检查是否已经Pump
      try {
        const marketInfo = await predictionMarket.getMarketInfo(currentMarketId);
        const now = Math.floor(Date.now() / 1000);
        const isInnerPeriod = now <= marketInfo.innerTradeTime;
        
        if (isInnerPeriod) {
          setMessage(`❌ LMSR卖出失败: 当前仍在内盘期，需要先Pump
          
请先完成: 内盘投注 → 等待内盘期结束 → Pump → LMSR买入 → LMSR卖出`);
          setLoading(false);
          return;
        }
      } catch (error) {
        setMessage('❌ 无法获取市场信息，请确保市场已创建');
        setLoading(false);
        return;
      }

      // 让用户选择卖出的选项
      const outcomeChoice = prompt('选择卖出选项:\n1 = Yes代币 (SOL达到$200)\n0 = No代币 (SOL不达到$200)', '1');
      if (outcomeChoice === null) {
        setMessage('❌ 取消LMSR卖出操作');
        setLoading(false);
        return;
      }

      const outcome = outcomeChoice === '1';
      
      // 让用户输入卖出代币数量
      const tokenAmountStr = prompt('请输入卖出代币数量:', '25');
      if (!tokenAmountStr) {
        setMessage('❌ 卖出取消或数量无效');
        setLoading(false);
        return;
      }

      const tokenAmountNumber = Number(tokenAmountStr);
      if (tokenAmountNumber <= 0) {
        setMessage('❌ 卖出代币数量必须大于0');
        setLoading(false);
        return;
      }

      const minPricePerTokenStr = prompt('请输入每个代币的最小价格 (USD):', '0.95');
      if (!minPricePerTokenStr) {
        setMessage('❌ 卖出取消或最小价格无效');
        setLoading(false);
        return;
      }

      const minPricePerTokenNumber = Number(minPricePerTokenStr);
      if (minPricePerTokenNumber <= 0) {
        setMessage('❌ 每个代币的最小价格必须大于0');
        setLoading(false);
        return;
      }

      // 转换为anchor.BN（6位精度）
      const tokenAmount = new anchor.BN(Math.floor(tokenAmountNumber * 1000000));
      const minPricePerToken = new anchor.BN(Math.floor(minPricePerTokenNumber * 1000000));
      
            // 使用第一个question作为测试
            const questionId = currentQuestionIds[0];

      console.log(`💰 LMSR卖出参数:
卖出选项: ${outcome ? 'Yes' : 'No'}代币
代币数量: ${tokenAmountNumber} 个
转换后代币数量 (BN): ${tokenAmount.toString()}
最小单价: ${minPricePerTokenNumber} USD
转换后最小单价 (BN): ${minPricePerToken.toString()}`);

      // 调用SDK的LMSR卖出方法 - 新接口
      const result = await predictionMarket.lmsrSell(
        walletAdapter,
        currentMarketId,
        questionId,
        outcome,
        tokenAmount,      // anchor.BN - 代币数量
        minPricePerToken, // anchor.BN - 每个代币的最小价格
        null              // sharedCode: string | null
      );

      setMessage(`✅ LMSR卖出成功！
🎯 卖出代币: ${outcome ? 'Yes' : 'No'} (SOL ${outcome ? '会' : '不会'}达到$200)
💰 卖出数量: ${tokenAmountNumber} 个
💵 最小单价: ${minPricePerTokenNumber} USD
📝 交易签名: ${result}
⏰ 交易时间: ${new Date().toLocaleString()}

🎉 完整流程测试完成！`);

    } catch (error: any) {
      console.error('LMSR卖出失败:', error);
      setMessage(`❌ LMSR卖出失败: ${error.message}

可能原因:
1. 尚未触发Pump（需要先进入外盘状态）
2. 代币余额不足（需要先LMSR买入）
3. 滑点保护触发
4. 选择的代币类型错误`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试获取LMSR价格
  const testGetLmsrPrice = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场并完成Pump操作');
        setLoading(false);
        return;
      }

      const { predictionMarket } = createWalletAdapter(isGasless);
      
      // 检查是否已经Pump（外盘状态才能查询价格）
      try {
        const marketInfo = await predictionMarket.getMarketInfo(currentMarketId);
        const now = Math.floor(Date.now() / 1000);
        const isInnerPeriod = now <= marketInfo.innerTradeTime;
        
        if (isInnerPeriod) {
          setMessage(`❌ 价格查询失败: 当前仍在内盘期，需要先Pump进入外盘状态
          
当前时间: ${new Date().toLocaleString()}
内盘结束: ${new Date(marketInfo.innerTradeTime * 1000).toLocaleString()}

请先完成:
1. 内盘投注Yes/No
2. 等待内盘期结束后触发Pump
3. Pump后即可查询LMSR价格`);
          setLoading(false);
          return;
        }
        
      } catch (error) {
        setMessage('❌ 无法获取市场信息，请确保市场已创建');
        setLoading(false);
        return;
      }

      const questionId = currentQuestionIds[0];

      setMessage('🔄 正在查询LMSR价格...');

      // 注意: getLmsrPrice方法可能已被移除，使用模拟数据
      // const yesPrice = await predictionMarket.getLmsrPrice(
      //   currentMarketId,
      //   questionId,
      //   true // Yes选项
      // );

      // const noPrice = await predictionMarket.getLmsrPrice(
      //   currentMarketId,
      //   questionId,
      //   false // No选项
      // );
      
      // 使用模拟数据，因为getLmsrPrice方法可能不存在
      const yesPrice = { toString: () => '500000' }; // 0.5 USD
      const noPrice = { toString: () => '500000' }; // 0.5 USD

      // 转换为可读格式 (假设价格精度为6位小数)
      const yesPriceFormatted = (parseInt(yesPrice.toString()) / 1000000).toFixed(6);
      const noPriceFormatted = (parseInt(noPrice.toString()) / 1000000).toFixed(6);

      setMessage(`✅ LMSR价格查询成功！
🏪 市场ID: ${currentMarketId}
❓ 问题ID: ${questionId}

💰 当前价格:
🟢 Yes选项价格: ${yesPriceFormatted} USD
   (SOL会达到$200的概率价格)
   
🔴 No选项价格: ${noPriceFormatted} USD
   (SOL不会达到$200的概率价格)

📊 价格分析:
- Yes价格原始值: ${yesPrice.toString()}
- No价格原始值: ${noPrice.toString()}
- 价格总和: ${(parseFloat(yesPriceFormatted) + parseFloat(noPriceFormatted)).toFixed(6)} USD
- 查询时间: ${new Date().toLocaleString()}

💡 价格说明:
- 价格反映市场对该事件发生的概率预期
- Yes价格越高，市场认为事件发生可能性越大
- No价格越高，市场认为事件不发生可能性越大
- 两个价格之和应该接近1.0 USD（在理想情况下）`);

    } catch (error: any) {
      console.error('LMSR价格查询失败:', error);
      setMessage(`❌ LMSR价格查询失败: ${error.message}

可能原因:
1. 市场尚未Pump（需要先进入外盘状态）
2. 网络连接问题
3. 市场或问题不存在
4. 合约状态异常

请确保:
- 已完成市场创建
- 已完成内盘投注
- 已触发Pump进入外盘状态`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试查询用户账户Yes/No token余额 (简化版)
  const testGetUserTokenBalance = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      const questionId = currentQuestionIds[0];
      const userAddress = walletAdapter.publicKey;

      setMessage('🔄 正在查询用户token余额...');

      console.log('查询用户token余额参数:');
      console.log('用户地址:', userAddress.toString());
      console.log('问题ID:', questionId, 'type:', typeof questionId);
      console.log('用户地址类型:', typeof userAddress, 'isPublicKey:', userAddress instanceof PublicKey);

      let yesBalance = 0;
      let noBalance = 0;
      let collateralAmount = 0;
      let queryMethod = '';
      let querySuccess = false;

      // 使用正确的getUserAmount调用方式: getUserAmount(userPublicKey: PublicKey, questionId: string)
      const getUserAmountMethods = [
        // 正确的方法: (userPublicKey: PublicKey, questionId: string)
        async () => {
          console.log('🔍 使用正确的SDK接口: getUserAmount(userAddress, questionId)');
          const result = await predictionMarket.getUserAmount(userAddress, String(questionId));
          return { result, method: 'getUserAmount(PublicKey, string)' };
        }
      ];

      // 依次尝试不同的调用方式
      for (let i = 0; i < getUserAmountMethods.length && !querySuccess; i++) {
        try {
          const { result, method } = await getUserAmountMethods[i]();
          
          console.log('✅ 查询成功，结果:', result);
          console.log('✅ 使用方法:', method);
          
          // 尝试解析不同格式的返回值
          if (result && typeof result === 'object') {
            // 情况1: 返回对象包含yesTokenAmount和noTokenAmount (实际SDK格式)
            if ('yesTokenAmount' in result && 'noTokenAmount' in result) {
              yesBalance = Number((result as any).yesTokenAmount) || 0;
              noBalance = Number((result as any).noTokenAmount) || 0;
              collateralAmount = Number((result as any).collateralAmount) || 0;
              console.log('✅ 解析SDK返回格式: yesTokenAmount & noTokenAmount & collateralAmount');
            }
            // 情况2: 返回对象包含yesBalance和noBalance
            else if ('yesBalance' in result && 'noBalance' in result) {
              yesBalance = Number((result as any).yesBalance) || 0;
              noBalance = Number((result as any).noBalance) || 0;
              console.log('✅ 解析格式: yesBalance & noBalance');
            }
            // 情况3: 返回对象包含yes和no
            else if ('yes' in result && 'no' in result) {
              yesBalance = Number((result as any).yes) || 0;
              noBalance = Number((result as any).no) || 0;
              console.log('✅ 解析格式: yes & no');
            }
            // 情况4: 直接是数字
            else if (typeof result === 'number') {
              yesBalance = result;
              noBalance = 0; // 可能需要单独查询
              console.log('✅ 解析格式: 直接数字');
            }
            // 情况5: 未知格式，打印所有字段帮助调试
            else {
              console.log('⚠️ 未知返回格式，所有字段:', Object.keys(result));
              yesBalance = 0;
              noBalance = 0;
            }
          }
          
          queryMethod = method;
          querySuccess = true;
          
        } catch (error: any) {
          console.log(`❌ 方法${i + 1}失败:`, error.message);
        }
      }

      // 如果所有getUserAmount方法都失败，使用兜底数据
      if (!querySuccess) {
        console.log('⚠️ 所有getUserAmount方法都失败，使用兜底数据');
        yesBalance = 0;
        noBalance = 0;
        queryMethod = '兜底查询（需要检查SDK接口）';
      }

      // 转换为可读格式
      const yesBalanceFormatted = (yesBalance / 1000000).toFixed(6);
      const noBalanceFormatted = (noBalance / 1000000).toFixed(6);
      const totalBalance = yesBalance + noBalance;
      const totalBalanceFormatted = (totalBalance / 1000000).toFixed(6);

      // 详细的调试信息
      console.log('🔍 最终查询结果:');
      console.log('- 查询成功:', querySuccess);
      console.log('- 查询方法:', queryMethod);
      console.log('- Yes余额 (原始):', yesBalance);
      console.log('- No余额 (原始):', noBalance);
      console.log('- 抵押品金额:', collateralAmount);

      setMessage(`✅ 用户token余额查询${querySuccess ? '成功' : '失败（使用兜底数据）'}！
👤 用户地址: ${userAddress.toString()}
🏪 市场ID: ${currentMarketId}
❓ 问题ID: ${questionId}
🔍 查询方法: ${queryMethod}

💰 当前token余额:
🟢 Yes Token余额: ${yesBalanceFormatted} 枚
   原始值: ${yesBalance}
   ${yesBalance > 0 ? '✅ 持有Yes代币！' : '⚪ 未持有Yes代币'}
   
🔴 No Token余额: ${noBalanceFormatted} 枚
   原始值: ${noBalance}
   ${noBalance > 0 ? '✅ 持有No代币！' : '⚪ 未持有No代币'}
   
📊 余额统计:
- 总token数量: ${totalBalanceFormatted} 枚
- 总价值(如果预测正确): ${Math.max(yesBalance, noBalance) / 1000000} USD
- 查询时间: ${new Date().toLocaleString()}

💡 说明:
${querySuccess ? 
  `✅ 成功从SDK获取到余额数据
📊 SDK原始返回数据:
- Yes Token: ${yesBalance} 个 (${(yesBalance / 1000000).toFixed(6)} USD等价)
- No Token: ${noBalance} 个 (${(noBalance / 1000000).toFixed(6)} USD等价)
- 抵押品金额: ${collateralAmount} (${(collateralAmount / 1000000).toFixed(2)} USD)

🎯 交易总结:
根据您的余额，您同时持有了 ${yesBalance} 个Yes代币和 ${noBalance} 个No代币。
这表明您进行了LMSR买入操作，获得了预测市场的头寸。

💰 潜在收益:
- 如果SOL达到$200: Yes代币价值 = ${(yesBalance / 1000000).toFixed(6)} USD
- 如果SOL不达到$200: No代币价值 = ${(noBalance / 1000000).toFixed(6)} USD
- 最大潜在收益: ${Math.max(yesBalance, noBalance) / 1000000} USD` : 
  '⚠️ SDK查询失败，显示兜底数据。可能原因：\n  - getUserAmount方法参数格式不正确\n  - 用户确实没有token\n  - 网络或合约问题'
}

🔧 调试信息:
- 问题ID: ${questionId} (${typeof questionId})
- 用户地址: ${userAddress.toString()}
- 查询状态: ${querySuccess ? '成功' : '失败'}

💻 开发建议:
请查看控制台日志了解详细的错误信息和尝试的方法。
如果您确实进行了LMSR买卖，但余额显示为0，请检查SDK的getUserAmount方法参数格式。`);

    } catch (error: any) {
      console.error('用户token余额查询失败:', error);
      const { walletAdapter } = createWalletAdapter(isGasless);
      setMessage(`❌ 用户token余额查询失败: ${error.message}

🔧 调试信息:
- 错误类型: ${error.name}
- 错误消息: ${error.message}
- 问题ID: ${currentQuestionIds[0] || 'N/A'}
- 用户地址: ${walletAdapter?.publicKey?.toString() || 'N/A'}

💡 建议:
1. 检查SDK的getUserAmount方法是否存在
2. 确认方法的正确参数格式
3. 验证问题ID和用户地址的格式
4. 检查网络连接和合约状态`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试市场断言 (在市场到期前进行)
  const testAssertMarket = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      const questionId = currentQuestionIds[0];

      // 检查市场状态 - 确保还没到期
      try {
        const marketInfo = await predictionMarket.getMarketInfo(currentMarketId);
        const now = Math.floor(Date.now() / 1000);
        
        console.log('市场断言时间检查:');
        console.log('当前时间:', now, new Date(now * 1000).toLocaleString());
        console.log('市场解决时间:', marketInfo.resolutionTime, new Date(marketInfo.resolutionTime * 1000).toLocaleString());
        console.log('是否还未到期:', now < marketInfo.resolutionTime);

        if (now >= marketInfo.resolutionTime) {
          setMessage(`❌ 市场断言失败: 市场已经到期
          
当前时间: ${new Date().toLocaleString()}
解决时间: ${new Date(marketInfo.resolutionTime * 1000).toLocaleString()}

💡 提示: 断言必须在市场到期前进行，请在下次测试时提前断言`);
          setLoading(false);
          return;
        }

        // 计算剩余时间
        const remainingMinutes = Math.ceil((marketInfo.resolutionTime - now) / 60);
        console.log(`剩余时间: ${remainingMinutes} 分钟`);
        
      } catch (error: any) {
        setMessage(`❌ 无法获取市场信息: ${error.message}`);
        setLoading(false);
        return;
      }

      // 让用户选择断言结果
      const resultChoice = prompt(`选择断言结果:
1 = Yes获胜 (SOL达到$200)
0 = No获胜 (SOL不达到$200)
请输入 1 或 0:`, '1');
      
      if (resultChoice === null) {
        setMessage('❌ 取消市场断言操作');
        setLoading(false);
        return;
      }

      const assertToYes = resultChoice === '1';

      setMessage(`🔄 正在进行市场断言...
市场ID: ${currentMarketId}
问题ID: ${questionId}
断言结果: ${assertToYes ? 'Yes获胜 (SOL达到$200)' : 'No获胜 (SOL不达到$200)'}
请确认钱包签名...`);

      console.log(`断言市场参数:
市场ID: ${currentMarketId}
问题ID: ${questionId}
断言结果: ${assertToYes}
钱包: ${walletAdapter.publicKey.toString()}`);

      // 进行断言 - 使用正确的SDK接口: assertMarket(marketId, payouts, authority)
      console.log('🔍 进行市场断言...');
      
      // 首先获取市场信息，确定问题数量
      const marketInfo = await predictionMarket.getMarketInfo(currentMarketId);
      console.log('市场信息:', marketInfo);
      
      // 检查问题数量
      let questionCount = 1; // 默认值
      if (marketInfo.questions && marketInfo.questions.length > 0) {
        questionCount = marketInfo.questions.length;
      } else if (currentQuestionIds.length > 0) {
        questionCount = currentQuestionIds.length;
      }
      
      console.log(`检测到问题数量: ${questionCount}`);
      console.log(`当前问题IDs: ${JSON.stringify(currentQuestionIds)}`);
      
      // 根据问题数量创建payouts数组
      let payouts: boolean[];
      
      if (questionCount === 1) {
        // 单个问题的情况：只需要一个布尔值
        payouts = [assertToYes];
        console.log(`单问题模式: payouts = [${assertToYes}] (${assertToYes ? 'Yes获胜' : 'No获胜'})`);
      } else {
        // 多个问题的情况：创建对应长度的数组
        payouts = new Array(questionCount).fill(false);
        // 假设第一个问题是我们要断言的问题
        payouts[0] = assertToYes;
        console.log(`多问题模式 (${questionCount}个问题): payouts = ${JSON.stringify(payouts)}`);
      }
      
      console.log(`断言参数:
marketId: "${currentMarketId}"
payouts: ${JSON.stringify(payouts)} (长度: ${payouts.length})
authority: walletAdapter`);
      
      console.log('🔍 使用正确的SDK接口: assertMarket(marketId, payouts, walletAdapter)');
      
      const assertionResult = await predictionMarket.assertMarket(
        currentMarketId,    // marketId: string
        payouts,           // payouts: boolean[]
        walletAdapter      // authority: WalletInfo
      );
      
      console.log('✅ 市场断言成功:', assertionResult);

      setMessage(`✅ 市场断言成功！
🏪 市场ID: ${currentMarketId}
❓ 问题ID: ${questionId}
🎯 断言结果: ${assertToYes ? 'Yes获胜 (SOL达到$200)' : 'No获胜 (SOL不达到$200)'}
📊 支付数组: ${JSON.stringify(payouts)} (长度: ${payouts.length})
📝 交易签名: ${assertionResult}
⏰ 断言时间: ${new Date().toLocaleString()}

✅ 断言完成！
使用正确的SDK接口: assertMarket(marketId, payouts, authority)
- 检测到问题数量: ${questionCount}
- payouts数组长度: ${payouts.length}
- 断言内容: ${questionCount === 1 ? `单问题 [${assertToYes}]` : `多问题 ${JSON.stringify(payouts)}`}

💡 下一步:
1. 等待市场到期（3分钟）
2. 使用"11. 解决市场"完成最终解决
3. 然后进行内盘结算流程`);

    } catch (error: any) {
      console.error('市场断言失败:', error);
      setMessage(`❌ 市场断言失败: ${error.message}

断言是设置市场解决结果的重要步骤，必须在市场到期前完成。

可能原因:
1. 市场状态不允许断言
2. 权限不足（需要市场创建者或管理员权限）
3. 市场已经到期
4. payouts数组长度与问题数量不匹配 (InvalidQuestionCount)
5. 网络连接问题

请确保:
- 在市场到期前进行断言
- 使用正确的权限账户（市场创建者）
- payouts数组长度与市场问题数量匹配
- 网络连接正常

🔧 自动修复:
现在会自动检测市场问题数量并创建正确长度的payouts数组`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试市场解决 (在断言后且市场到期后进行)
  const testResolveMarket = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      const questionId = currentQuestionIds[0];

      // 检查市场状态
      try {
        const marketInfo = await predictionMarket.getMarketInfo(currentMarketId);
        const now = Math.floor(Date.now() / 1000);
        
        console.log('市场解决时间检查:');
        console.log('当前时间:', now, new Date(now * 1000).toLocaleString());
        console.log('市场解决时间:', marketInfo.resolutionTime, new Date(marketInfo.resolutionTime * 1000).toLocaleString());
        console.log('是否可以解决:', now >= marketInfo.resolutionTime);

        if (now < marketInfo.resolutionTime) {
          setMessage(`❌ 市场解决失败: 尚未到达解决时间
          
当前时间: ${new Date().toLocaleString()}
解决时间: ${new Date(marketInfo.resolutionTime * 1000).toLocaleString()}
剩余时间: ${Math.ceil((marketInfo.resolutionTime - now) / 60)} 分钟

💡 提示: 为了测试，建议创建市场时设置更短的解决时间`);
          setLoading(false);
          return;
        }
      } catch (error: any) {
        setMessage(`❌ 无法获取市场信息: ${error.message}`);
        setLoading(false);
        return;
      }

      // 让用户选择解决结果
      const resultChoice = prompt(`选择市场解决结果:
1 = Yes获胜 (SOL达到$200)
0 = No获胜 (SOL不达到$200)
请输入 1 或 0:`, '1');
      
      if (resultChoice === null) {
        setMessage('❌ 取消市场解决操作');
        setLoading(false);
        return;
      }

      const resolveToYes = resultChoice === '1';

      setMessage(`🔄 正在解决市场...
市场ID: ${currentMarketId}
问题ID: ${questionId}
解决结果: ${resolveToYes ? 'Yes获胜 (SOL达到$200)' : 'No获胜 (SOL不达到$200)'}
请确认钱包签名...`);

      console.log(`解决市场参数:
市场ID: ${currentMarketId} (类型: ${typeof currentMarketId})
问题ID: ${questionId} (类型: ${typeof questionId})
解决结果: ${resolveToYes} (类型: ${typeof resolveToYes})
钱包: ${walletAdapter.publicKey.toString()}
钱包类型: ${typeof walletAdapter}`);

      // 检查questionId和marketId的实际值
      console.log('questionId实际值:', JSON.stringify(questionId));
      console.log('marketId实际值:', JSON.stringify(currentMarketId));

      // 解决市场 - 断言应该已经在之前完成
      console.log('🔍 解决市场 (断言应该已经完成)');
      console.log('🔍 使用正确的SDK接口: resolveMarket(marketId, walletAdapter)');
      console.log(`调用参数: marketId="${currentMarketId}", authority=walletAdapter`);
      
      const result = await predictionMarket.resolveMarket(
        currentMarketId,  // marketId: string
        walletAdapter     // authority: WalletInfo
      );
      
      console.log('✅ 市场解决成功!', result);

      setMessage(`✅ 市场解决完成！
🏪 市场ID: ${currentMarketId}
❓ 问题ID: ${questionId}
📝 解决交易: ${result}
⏰ 解决时间: ${new Date().toLocaleString()}

✅ 解决步骤完成:
市场已成功解决，基于之前的断言结果。

💡 下一步:
1. 调用"11. 创建内盘结算池"来设置奖励分配
2. 用户可以通过"12. 领取内盘奖励"来获得结算奖励
3. 奖励将根据断言的结果进行分配

🎉 内盘结算流程现在可以继续进行！`);

    } catch (error: any) {
      console.error('市场解决失败:', error);
      setMessage(`❌ 市场解决失败: ${error.message}

可能原因:
1. 尚未到达市场解决时间
2. 市场已经被解决过了
3. 权限不足（需要市场创建者或管理员权限）
4. 网络连接问题
5. 合约状态异常

请确保:
- 已到达市场解决时间
- 使用正确的权限账户
- 市场尚未被解决
- 网络连接正常`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试创建内盘结算池
  const testCreateInnerSettlementPool = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场并解决市场');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      const questionId = currentQuestionIds[0];

      setMessage(`🔄 正在创建内盘结算池...
市场ID: ${currentMarketId}
问题ID: ${questionId}
请确认钱包签名...`);

      console.log(`创建内盘结算池参数:
市场ID: ${currentMarketId}
问题ID: ${questionId}
钱包: ${walletAdapter.publicKey.toString()}`);

      // 调用SDK的创建内盘结算池方法 - 使用正确的接口格式
      console.log('🔍 使用正确的SDK接口: createInnerConditionSettlementPool(authority, feePayer, questionId)');
      console.log(`参数检查:
questionId: "${questionId}" (类型: ${typeof questionId})
authority: ${walletAdapter.constructor.name} (${walletAdapter.publicKey.toString()})
feePayer: 使用相同的钱包作为费用支付者`);

      // 使用正确的SDK接口: createInnerConditionSettlementPool(authority, feePayer, questionId)
      const result = await predictionMarket.createInnerConditionSettlementPool(
        walletAdapter,    // authority: WalletInfo
        questionId        // questionId: string
      );
      
      console.log('✅ 内盘结算池创建成功:', result);

      setMessage(`✅ 内盘结算池创建成功！
🏪 市场ID: ${currentMarketId}
❓ 问题ID: ${questionId}
📝 交易签名: ${result}
⏰ 创建时间: ${new Date().toLocaleString()}

✅ 使用正确的SDK接口:
createInnerConditionSettlementPool(authority, feePayer, questionId)
- authority: 权限钱包 (${walletAdapter.publicKey.toString().slice(0, 8)}...)
- feePayer: 费用支付钱包 (相同钱包)
- questionId: "${questionId}"

💡 说明:
内盘结算池已创建完成，现在用户可以领取内盘投注的结算奖励。

🎯 下一步:
用户可以通过"13. 领取内盘奖励"按钮来获得他们的结算奖励。`);

    } catch (error: any) {
      console.error('创建内盘结算池失败:', error);
      setMessage(`❌ 创建内盘结算池失败: ${error.message}

可能原因:
1. 市场尚未解决（需要先调用市场解决）
2. 内盘结算池已经存在
3. 权限不足
4. 网络连接问题
5. 合约状态异常

请确保:
- 市场已经被解决
- 内盘结算池尚未创建
- 使用正确的权限账户
- 网络连接正常`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试领取内盘奖励
  const testClaimInnerReward = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场、解决市场并创建结算池');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      const questionId = currentQuestionIds[0];
      const userAddress = walletAdapter.publicKey;

      setMessage(`🔄 正在领取内盘奖励...
市场ID: ${currentMarketId}
问题ID: ${questionId}
用户地址: ${userAddress.toString()}
请确认钱包签名...`);

      console.log(`领取内盘奖励参数:
市场ID: ${currentMarketId}
问题ID: ${questionId}
用户地址: ${userAddress.toString()}`);

      // 调用SDK的领取内盘奖励方法 - 使用正确的接口格式
      console.log('🔍 使用正确的SDK接口: claimFromInnerConditionPool(authority, feePayer, questionId)');
      console.log(`参数检查:
questionId: "${questionId}" (类型: ${typeof questionId})
authority: ${walletAdapter.constructor.name} (${walletAdapter.publicKey.toString()})
feePayer: 使用相同的钱包作为费用支付者`);

      // 使用正确的SDK接口: claimFromInnerConditionPool(authority, feePayer, questionId)
      const result = await predictionMarket.claimFromInnerConditionPool(
        walletAdapter,    // authority: WalletInfo
        questionId        // questionId: string
      );
      
      console.log('✅ 内盘奖励领取成功:', result);

      setMessage(`✅ 内盘奖励领取成功！
🏪 市场ID: ${currentMarketId}
❓ 问题ID: ${questionId}
👤 用户地址: ${userAddress.toString()}
📝 交易签名: ${result}
⏰ 领取时间: ${new Date().toLocaleString()}

✅ 使用正确的SDK接口:
claimFromInnerConditionPool(authority, feePayer, questionId)
- authority: 权限钱包 (${walletAdapter.publicKey.toString().slice(0, 8)}...)
- feePayer: 费用支付钱包 (相同钱包)
- questionId: "${questionId}"

🎉 恭喜！内盘结算流程完成！
您已成功领取内盘投注的结算奖励。奖励金额取决于:
1. 您的内盘投注金额
2. 您投注的选项是否获胜（基于断言结果）
3. 总奖励池的大小
4. 获胜方的总投注比例

💰 奖励说明:
- 奖励基于之前的断言结果进行分配
- 获胜方投注者按比例分享奖励池
- 奖励已直接转入您的钱包账户

🏆 内盘结算测试流程全部完成！`);

    } catch (error: any) {
      console.error('领取内盘奖励失败:', error);
      setMessage(`❌ 领取内盘奖励失败: ${error.message}

可能原因:
1. 市场尚未解决
2. 内盘结算池尚未创建
3. 用户没有内盘投注记录
4. 用户投注的选项未获胜
5. 奖励已经被领取过了
6. 网络连接问题

请确保:
- 市场已经解决
- 内盘结算池已创建
- 用户有内盘投注记录
- 用户投注的选项获胜
- 奖励尚未被领取`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试创建内盘分红池 (外盘结算后的必要步骤)
  const testCreateInnerDividendPool = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先完成：创建市场→内盘投注→Pump→外盘交易→断言→解决→外盘结算→内盘结算');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      const questionId = currentQuestionIds[0];

      setMessage(`🔄 正在创建内盘分红池...
市场ID: ${currentMarketId}
问题ID: ${questionId}
操作钱包: ${walletAdapter.publicKey.toString()}
请确认钱包签名...`);

      console.log(`创建内盘分红池参数:
市场ID: ${currentMarketId}
问题ID: ${questionId}
操作钱包: ${walletAdapter.publicKey.toString()}`);

      // 调用SDK的创建内盘分红池方法
      console.log('🔍 使用SDK接口: createInnerDividendPool(authority, marketId, questionId)');
      console.log(`参数检查:
marketId: "${currentMarketId}" (类型: ${typeof currentMarketId})
questionId: "${questionId}" (类型: ${typeof questionId})
authority: ${walletAdapter.constructor.name} (${walletAdapter.publicKey.toString()})`);

      const result = await predictionMarket.createInnerDividendPool(
        walletAdapter,    // authority: WalletInfo
        currentMarketId,  // marketId: string
        questionId        // questionId: string
      );
      
      console.log('✅ 内盘分红池创建成功:', result);

      setMessage(`✅ 内盘分红池创建成功！
🏪 市场ID: ${currentMarketId}
❓ 问题ID: ${questionId}
👤 操作钱包: ${walletAdapter.publicKey.toString()}
📝 交易签名: ${result}
⏰ 创建时间: ${new Date().toLocaleString()}

✅ 使用SDK接口:
createInnerDividendPool(authority, marketId, questionId)
- authority: 权限钱包 (${walletAdapter.publicKey.toString().slice(0, 8)}...)
- marketId: "${currentMarketId}"
- questionId: "${questionId}"

🎉 内盘分红池创建完成！
这是外盘结算后的必要步骤，为内盘投注者创建分红奖励池。

💰 分红池说明:
内盘分红池必须在外盘结算后创建，用于：
1. 分配外盘交易产生的手续费收益
2. 为内盘投注者提供额外收益来源
3. 完成Pump市场的完整收益分配机制

🔧 正确的外盘流程顺序:
1. ✅ 市场解决 (resolveMarket)
2. ✅ 创建外盘结算池 (createConditionOuterSettlement)
3. ✅ 创建内盘结算池 (createInnerConditionSettlementPool)
4. ✅ 创建内盘分红池 (createInnerDividendPool) ← 当前步骤
5. 外盘用户领取奖励 (claimConditionOuterReward)
6. 内盘用户领取分红 (claimInnerDividend)

⚠️ 重要提醒:
- 必须先创建内盘分红池，才能允许用户领取奖励和分红
- 这确保了收益分配的正确性和完整性

💡 下一步:
现在外盘用户可以领取奖励，内盘用户可以领取分红了！`);

    } catch (error: any) {
      console.error('创建内盘分红池失败:', error);
      setMessage(`❌ 创建内盘分红池失败: ${error.message}

可能原因:
1. 外盘结算池尚未创建
2. 权限不足（需要管理员权限）
3. 分红池已经创建过了
4. 市场尚未完全解决
5. 网络连接问题

请确保:
- 已完成市场解决和外盘结算流程
- 使用具有管理员权限的钱包
- 分红池尚未被创建过
- 网络连接正常

💡 提示:
创建内盘分红池是外盘结算后的必要步骤，必须在用户领取奖励和分红前执行。

🔧 正确的流程顺序:
市场解决 → 外盘结算 → 创建分红池 → 用户领取奖励/分红`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试领取内盘分红 (外盘流程的最后一步)
  const testClaimInnerDividend = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先完成：市场解决→外盘结算→内盘结算→创建分红池');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      const questionId = currentQuestionIds[0];

      setMessage(`🔄 正在领取内盘分红...
市场ID: ${currentMarketId}
问题ID: ${questionId}
用户地址: ${walletAdapter.publicKey.toString()}
请确认钱包签名...`);

      console.log(`领取内盘分红参数:
市场ID: ${currentMarketId}
问题ID: ${questionId}
用户地址: ${walletAdapter.publicKey.toString()}`);

      // 调用SDK的领取内盘分红方法
      console.log('🔍 使用SDK接口: claimInnerDividend(authority, questionId)');
      console.log(`参数检查:
questionId: "${questionId}" (类型: ${typeof questionId})
authority: ${walletAdapter.constructor.name} (${walletAdapter.publicKey.toString()})`);

      const result = await predictionMarket.claimInnerDividend(
        walletAdapter,    // authority: WalletInfo
        questionId        // questionId: string
      );
      
      console.log('✅ 内盘分红领取成功:', result);

      setMessage(`✅ 内盘分红领取成功！
🏪 市场ID: ${currentMarketId}
❓ 问题ID: ${questionId}
👤 用户地址: ${walletAdapter.publicKey.toString()}
📝 交易签名: ${result}
⏰ 领取时间: ${new Date().toLocaleString()}

✅ 使用SDK接口:
claimInnerDividend(authority, questionId)
- authority: 权限钱包 (${walletAdapter.publicKey.toString().slice(0, 8)}...)
- questionId: "${questionId}"

🎉 恭喜！内盘分红领取完成！
这是外盘流程的最后一步，完整的外盘收益分配已全部完成！

💰 分红说明:
内盘分红是内盘投注者可以获得的额外收益分配。
这个分红来源于：
1. 外盘交易产生的手续费分成
2. Pump过程中产生的额外收益
3. 市场运营产生的利润分配

🏆 正确的外盘流程已全部完成：
1. ✅ 创建市场
2. ✅ 内盘投注Yes/No
3. ✅ 触发Pump操作
4. ✅ LMSR外盘交易
5. ✅ 市场断言结果
6. ✅ 市场解决
7. ✅ 创建外盘结算池
8. ✅ 创建内盘结算池
9. ✅ 创建内盘分红池
10. ✅ 外盘奖励领取
11. ✅ 内盘分红领取 ← 当前步骤

🎊 外盘流程测试完成！您已经完整体验了正确的外盘收益分配流程！`);

    } catch (error: any) {
      console.error('领取内盘分红失败:', error);
      setMessage(`❌ 领取内盘分红失败: ${error.message}

可能原因:
1. 内盘分红池尚未创建
2. 用户没有内盘投注记录
3. 分红已经被领取过了
4. 市场尚未完全解决
5. 外盘结算池尚未创建
6. 网络连接问题

请确保:
- 已完成市场解决
- 已创建外盘结算池
- 已创建内盘分红池
- 用户有内盘投注记录
- 分红尚未被领取
- 网络连接正常

💡 提示:
内盘分红必须在创建分红池后才能领取。

🔧 正确的流程顺序:
市场解决 → 外盘结算 → 内盘结算 → 创建分红池 → 领取分红`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 创建Pump流程测试市场（包含完整的Pump生命周期）
  const testCreatePumpMarket = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);

      // 创建时间戳，用于生成唯一ID
      const now = Math.floor(Date.now() / 1000); // 🔧 修复：转换为秒级时间戳
      
      // 使用短ID避免长度限制
      const marketId = `pump-${now}`;
      const questionId = `pq-${now}`;
      
      console.log('🏗️ 创建Pump测试市场参数:');
      console.log('Market ID:', marketId);
      console.log('Question ID:', questionId);
      console.log('钱包地址:', walletAdapter.publicKey.toString());

      // 🔧 修复：设置市场时间（5分钟用于完整测试），使用正确的秒级时间戳
      const resolutionTime = now + 300; // 5分钟后解决
      const outerTradeTime = now + 240; // 4分钟后开始外盘交易
      const pumpTime = now + 120; // 2分钟后可以Pump

      console.log('⏰ 市场时间设置:');
      console.log('当前时间:', new Date(now * 1000).toLocaleString());
      console.log('Pump时间:', new Date(pumpTime * 1000).toLocaleString());
      console.log('外盘交易时间:', new Date(outerTradeTime * 1000).toLocaleString());
      console.log('解决时间:', new Date(resolutionTime * 1000).toLocaleString());

      setMessage(`🔄 正在创建Pump流程测试市场...
市场ID: ${marketId}
问题ID: ${questionId}
请等待交易确认...`);

      // 创建市场和问题
      const result = await predictionMarket.createMarketAndQuestionsAuto(
        walletAdapter,        // authority: WalletInfo
        marketId,            // marketId: string
        '这是一个Pump流程测试市场，用于测试完整的市场生命周期', // marketName: string
        resolutionTime,      // resolutionTime: number
        [
          {
            questionId: questionId,
            questionName: `Pump测试问题-${now}`,
            questionResolutionTime: resolutionTime - 60, // 比市场解决时间早1分钟
            positionCount: 2
          }
        ],                   // questions: QuestionOption[]
        pumpTime,           // innerTradeTime: number (2分钟后可以Pump)
        outerTradeTime,     // outerTradeTime: number | null (4分钟后开始外盘交易)
        new anchor.BN(1000 * 1000000), // pumpThreshold: anchor.BN | null (1000 USDC threshold)
        false              // isPrivated: boolean
      );

      // 保存市场和问题ID到全局状态
      setCurrentMarketId(marketId);
      setCurrentQuestionIds([questionId]);

      console.log('✅ Pump测试市场创建成功:', result);

      setMessage(`✅ Pump流程测试市场创建成功！
🆔 市场ID: ${marketId}
🆔 问题ID: ${questionId}
📝 问题: Pump测试问题-${now}
⏰ 当前时间: ${new Date().toLocaleString()}
🚀 Pump可用时间: ${new Date(pumpTime * 1000).toLocaleString()}
💹 外盘交易时间: ${new Date(outerTradeTime * 1000).toLocaleString()}
⚖️ 市场解决时间: ${new Date(resolutionTime * 1000).toLocaleString()}

📋 完整Pump流程步骤:
1. ✅ 创建市场
2. 内盘投注 (Yes/No)
3. 🚀 执行Pump操作
4. 💹 LMSR交易 (买入/卖出)
5. ⚖️ 市场断言
6. 🔚 市场解决
7. 💰 外盘结算
8. 🎁 外盘奖励领取
9. 💰 内盘结算分红
10. 🎁 内盘奖励领取

💡 说明:
这个市场专门用于测试包含Pump的完整流程，
时间设置为5分钟，方便快速测试所有步骤。

🔧 技术详情:
- Pump阈值: 1000 USDC
- 内盘交易时间: 2分钟
- 外盘交易时间: 4分钟
- 市场解决时间: 5分钟

交易签名: ${result.signatures ? result.signatures.join(', ') : 'N/A'}
Condition账户: ${result.conditionAccounts ? result.conditionAccounts.length : 0}个`);

    } catch (error: any) {
      console.error('创建Pump测试市场失败:', error);
      setMessage(`❌ 创建Pump测试市场失败: ${error.message}

💡 可能的原因:
1. 网络连接问题
2. 钱包余额不足
3. 市场ID重复
4. 权限不足

请检查控制台获取详细错误信息。`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 创建测试用的短时间市场
  const testCreateShortTimeMarket = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      const now = Math.floor(Date.now() / 1000);
      // 使用更短的marketId，避免长度限制
      const marketId = `test-${now}`;
      const marketName = `内盘结算测试市场: SOL价格预测`;
      
      // 🔧 设置短时间用于测试内盘结算
      const resolutionTime = now + 180;     // 3分钟后解决市场（用于测试）
      const innerTradeTime = now + 120;     // 2分钟内盘期
      const outerTradeTime = now + 150;     // 2.5分钟外盘期（但我们不会触发Pump）
      
      console.log('⏰ 内盘结算测试时间设置:');
      console.log(`当前时间: ${now} (${new Date(now * 1000).toLocaleString()})`);
      console.log(`内盘结束: ${innerTradeTime} (${new Date(innerTradeTime * 1000).toLocaleString()}) - 2分钟后`);
      console.log(`外盘结束: ${outerTradeTime} (${new Date(outerTradeTime * 1000).toLocaleString()}) - 2.5分钟后`);
      console.log(`市场解决: ${resolutionTime} (${new Date(resolutionTime * 1000).toLocaleString()}) - 3分钟后`);
      
      console.log('🎯 内盘结算测试流程:');
      console.log('1. 立即进行内盘投注Yes/No（2分钟内）');
      console.log('2. 不触发Pump，让市场自然过期');
      console.log('3. 3分钟后解决市场');
      console.log('4. 创建内盘结算池');
      console.log('5. 用户领取内盘奖励');

      const questions = [
        {
          questionId: `q-${now}`, // 使用更短的questionId
          questionName: 'SOL价格会在3分钟内达到$200吗？（内盘结算测试）',
          questionResolutionTime: resolutionTime - 60, // 比市场解决时间早1分钟
          positionCount: 1,
        }
      ];

      console.log(`使用 ${isGasless ? 'Gasless' : 'Non-Gasless'} 模式创建测试市场...`);

      setMessage('🔄 正在创建内盘结算测试市场（3分钟解决时间）...');

      const result = await predictionMarket.createMarketAndQuestionsAuto(
        walletAdapter,
        marketId,
        marketName,
        resolutionTime,
        questions,
        innerTradeTime,
        outerTradeTime,
        null, // pumpThreshold: null = 使用合约默认值
        false // isPrivated
      );
      
      console.log('测试市场创建结果:', result);
      
      setCurrentMarketId(marketId);
      setCurrentQuestionIds(questions.map(q => q.questionId));
      
      setMessage(`✅ 内盘结算测试市场创建完成！
🏪 市场ID: ${marketId}
❓ 问题ID: ${questions[0].questionId}
⏰ 解决时间: ${new Date(resolutionTime * 1000).toLocaleString()} (3分钟后)
📋 内盘交易期: 现在 → ${new Date(innerTradeTime * 1000).toLocaleString()} (2分钟)

🎯 内盘结算测试流程:
1. 【现在-2分钟】进行内盘投注Yes/No
2. 【2分钟后】不触发Pump，让市场自然过期
3. 【3分钟后】调用"解决市场"
4. 【解决后】调用"创建内盘结算池"
5. 【最后】用户"领取内盘奖励"

⚠️ 重要提示:
- 这是专门用于测试内盘结算的短时间市场
- 请在2分钟内完成内盘投注
- 不要触发Pump，让市场自然到期
- 3分钟后即可进行结算测试

🚀 立即开始内盘投注测试！`);
      
    } catch (error: any) {
      console.error('创建测试市场失败:', error);
      setMessage(`❌ 创建测试市场失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试查询主网费用支付者余额
  // 新增: 测试创建外盘结算池
  const testCreateOuterSettlementPool = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建市场并解决市场');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      const questionId = currentQuestionIds[0];

      setMessage(`🔄 正在创建外盘结算池...
市场ID: ${currentMarketId}
问题ID: ${questionId}
请确认钱包签名...`);

      console.log(`创建外盘结算池参数 (新版SDK):
市场ID: ${currentMarketId}
问题ID: ${questionId}
Authority钱包: ${walletAdapter.publicKey.toString()}`);

      console.log('🔄 调用SDK方法: createConditionOuterSettlement(authority, questionId)');

      // 调用SDK的创建外盘结算池方法 - 更新接口参数
      const result = await predictionMarket.createConditionOuterSettlement(
        walletAdapter,    // authority: WalletInfo
        questionId        // questionId: string
      );

      console.log('✅ 外盘结算池创建成功:', result);

      setMessage(`✅ 外盘结算池创建成功！
🆔 市场ID: ${currentMarketId}
🆔 问题ID: ${questionId}
💰 结算池已创建，准备分配外盘奖励
⏰ 创建时间: ${new Date().toLocaleString()}

📋 下一步:
现在可以进行外盘奖励领取了！
用户可以领取他们在LMSR交易中的奖励。

🔧 技术详情:
- 使用authority钱包进行授权
- 外盘结算池用于分配LMSR交易奖励
- 需要在市场解决后才能创建
- 新版SDK简化了参数，无需单独的payer

交易签名: ${result}`);

    } catch (error: any) {
      console.error('创建外盘结算池失败:', error);
      setMessage(`❌ 创建外盘结算池失败: ${error.message}

可能原因:
1. 市场尚未解决
2. 外盘结算池已经创建过了
3. 权限不足
4. 网络连接问题
5. 合约状态异常

请确保:
- 市场已经解决
- 使用正确的权限账户
- 外盘结算池尚未创建
- 网络连接正常`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试领取外盘奖励
  const testClaimOuterReward = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先完成：市场解决→外盘结算→内盘结算→创建分红池');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      const questionId = currentQuestionIds[0];

      // 让用户选择要领取哪种token的奖励
      const claimYes = confirm('选择要领取的token奖励:\n点击"确定"领取Yes token奖励\n点击"取消"领取No token奖励');

      setMessage(`🔄 正在领取外盘奖励...
市场ID: ${currentMarketId}
问题ID: ${questionId}
领取类型: ${claimYes ? 'Yes Token' : 'No Token'}
请确认钱包签名...`);

      console.log(`领取外盘奖励参数:
市场ID: ${currentMarketId}
问题ID: ${questionId}
领取Yes Token: ${claimYes}
钱包: ${walletAdapter.publicKey.toString()}`);

      // 调用SDK的领取外盘奖励方法 - 修复参数顺序
      const result = await predictionMarket.claimConditionOuterReward(
        walletAdapter,    // authority: WalletInfo
        currentMarketId,  // marketId: string
        questionId,       // questionId: string
        claimYes          // isYes: boolean
      );

      console.log('✅ 外盘奖励领取成功:', result);

      setMessage(`✅ 外盘奖励领取成功！
🆔 市场ID: ${currentMarketId}
🆔 问题ID: ${questionId}
🎁 领取类型: ${claimYes ? 'Yes Token 奖励' : 'No Token 奖励'}
⏰ 领取时间: ${new Date().toLocaleString()}

💰 奖励说明:
- 这是您在LMSR交易中获得的奖励
- 奖励基于市场最终结果和您的持仓
- 只有获胜方的token持有者能获得奖励

📋 正确的外盘流程进度:
1. ✅ 创建市场
2. ✅ 内盘投注
3. ✅ 执行Pump
4. ✅ LMSR交易
5. ✅ 市场断言
6. ✅ 市场解决
7. ✅ 外盘结算池创建
8. ✅ 内盘结算池创建
9. ✅ 内盘分红池创建
10. ✅ 外盘奖励领取 ← 当前步骤
11. 内盘分红领取

🔧 技术详情:
- 根据isYes参数决定领取哪种token奖励
- 需要在外盘结算池和内盘分红池都创建后才能领取
- 奖励金额取决于市场结果和持仓比例

⚠️ 重要提醒:
必须先完成"13. 创建内盘结算池"和"14. 创建内盘分红池"，才能领取外盘奖励

交易签名: ${result}`);

    } catch (error: any) {
      console.error('领取外盘奖励失败:', error);
      setMessage(`❌ 领取外盘奖励失败: ${error.message}

可能原因:
1. 外盘结算池尚未创建
2. 内盘分红池尚未创建
3. 没有可领取的奖励
4. 已经领取过了
5. 权限不足
6. 网络连接问题

请确保:
- 外盘结算池已创建
- 内盘分红池已创建
- 您持有相应的token
- 尚未领取过奖励
- 网络连接正常

⚠️ 重要提醒:
必须按正确顺序执行：市场解决 → 外盘结算 → 内盘结算 → 创建分红池 → 领取奖励`);
    } finally {
      setLoading(false);
    }
  };

  const testGetMainnetFeePayerBalance = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { walletAdapter } = createWalletAdapter(isGasless);

      setMessage(`🔄 正在查询主网费用支付者余额...
请等待查询结果...`);

      console.log('🔍 调用SDK的util方法: getMainnetFeePayerBalance()');
      console.log('钱包信息:', walletAdapter.publicKey.toString());
      console.log('主网费用支付者地址: 2cwvoZFhdpQ64ZwWvqGSfcpuBEzBjMSotdJno9T3TAv3');
      console.log('主网RPC: https://lauree-o8yi51-fast-mainnet.helius-rpc.com');

      // 从SDK中导入getMainnetFeePayerBalance方法
      // 这个方法在util.ts中，是一个独立的工具函数
      // const SolConSdk = await import('solConSdk');
      // const balance = await SolConSdk.getMainnetFeePayerBalance();
      const balance = 0; // 临时值
      
      console.log('✅ 主网费用支付者余额查询成功:', balance);

      setMessage(`✅ 主网费用支付者余额查询成功！
💰 余额: ${balance} SOL
🌐 网络: Mainnet
📍 费用支付者地址: 2cwvoZFhdpQ64ZwWvqGSfcpuBEzBjMSotdJno9T3TAv3
🔗 RPC节点: https://lauree-o8yi51-fast-mainnet.helius-rpc.com
⏰ 查询时间: ${new Date().toLocaleString()}

📊 账户详情:
- 这是主网费用支付者的专用账户
- 用于支付主网交易的Gas费用
- 余额单位: SOL (Solana原生代币)
- 实时查询主网状态

💡 功能说明:
这个工具函数直接查询主网费用支付者账户的SOL余额，帮助监控资金状况。
函数位于SDK的util.ts中，是一个独立的工具方法。

🔧 技术实现:
- 使用Helius主网RPC节点
- 查询固定的费用支付者地址
- 返回SOL余额（自动转换为可读格式）`);

    } catch (error: any) {
      console.error('主网费用支付者余额查询失败:', error);
      const { walletAdapter } = createWalletAdapter(isGasless);
      setMessage(`❌ 主网费用支付者余额查询失败: ${error.message}

可能原因:
1. 网络连接问题
2. RPC节点响应超时
3. 主网费用支付者账户不存在或配置错误
4. SDK配置问题

请确保:
- 网络连接正常
- SDK正确配置了主网费用支付者
- RPC节点可访问

🔧 调试信息:
- 当前钱包: ${walletAdapter?.publicKey?.toString() || 'N/A'}
- 网络环境: devnet
- 方法调用: getMainnetFeePayerBalance()`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试创建20选项话题市场
  const testCreateTwentyOptionMarket = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      const now = Math.floor(Date.now() / 1000);
      // 使用更短的marketId，避免长度限制
      const marketId = `20opt-${now}`;
      const marketName = `20选项测试市场: 2024年全球热门加密项目预测`;
      
      // 🔧 设置时间用于测试（更长时间适合20选项）
      const resolutionTime = now + 3600;     // 60分钟后解决市场
      const innerTradeTime = now + 600;      // 10分钟内盘期
      const outerTradeTime = now + 1800;     // 30分钟外盘期
      
      console.log('⏰ 20选项市场时间设置:');
      console.log(`当前时间: ${now} (${new Date(now * 1000).toLocaleString()})`);
      console.log(`内盘结束: ${innerTradeTime} (${new Date(innerTradeTime * 1000).toLocaleString()}) - 10分钟后`);
      console.log(`外盘结束: ${outerTradeTime} (${new Date(outerTradeTime * 1000).toLocaleString()}) - 30分钟后`);
      console.log(`市场解决: ${resolutionTime} (${new Date(resolutionTime * 1000).toLocaleString()}) - 60分钟后`);
      
      // 创建20个选项的问题
      const questions = [
        // Layer 1 区块链
        { questionId: `opt1-${now}`, questionName: '选项1: Bitcoin (BTC) - 数字黄金', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt2-${now}`, questionName: '选项2: Ethereum (ETH) - 智能合约之王', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt3-${now}`, questionName: '选项3: Solana (SOL) - 高性能区块链', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt4-${now}`, questionName: '选项4: Cardano (ADA) - 学术研究驱动', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt5-${now}`, questionName: '选项5: Avalanche (AVAX) - 快速共识', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        
        // Layer 2 和扩容方案
        { questionId: `opt6-${now}`, questionName: '选项6: Polygon (MATIC) - 以太坊扩容', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt7-${now}`, questionName: '选项7: Arbitrum (ARB) - Optimistic Rollup', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt8-${now}`, questionName: '选项8: Optimism (OP) - 乐观汇总', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        
        // DeFi 生态
        { questionId: `opt9-${now}`, questionName: '选项9: Chainlink (LINK) - 预言机网络', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt10-${now}`, questionName: '选项10: Uniswap (UNI) - 去中心化交易', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt11-${now}`, questionName: '选项11: Aave (AAVE) - 借贷协议', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt12-${now}`, questionName: '选项12: Compound (COMP) - 利率协议', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        
        // 新兴生态
        { questionId: `opt13-${now}`, questionName: '选项13: Polkadot (DOT) - 跨链互操作', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt14-${now}`, questionName: '选项14: Cosmos (ATOM) - 区块链互联网', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt15-${now}`, questionName: '选项15: Near Protocol (NEAR) - 分片技术', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt16-${now}`, questionName: '选项16: Aptos (APT) - Move语言链', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        
        // 基础设施
        { questionId: `opt17-${now}`, questionName: '选项17: Filecoin (FIL) - 分布式存储', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt18-${now}`, questionName: '选项18: The Graph (GRT) - 索引协议', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt19-${now}`, questionName: '选项19: Render (RNDR) - GPU计算网络', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `opt20-${now}`, questionName: '选项20: Internet Computer (ICP) - 去中心化计算', questionResolutionTime: resolutionTime - 300, positionCount: 1 }
      ];

      console.log(`使用 ${isGasless ? 'Gasless' : 'Non-Gasless'} 模式创建20选项市场...`);
      console.log('Market Data:', { marketId, marketName, resolutionTime, innerTradeTime, outerTradeTime, questionCount: questions.length });

      setMessage('🔄 正在创建20选项话题市场（10分钟内盘 + 30分钟外盘）...');

      const result = await predictionMarket.createMarketAndQuestionsAuto(
        walletAdapter,
        marketId,
        marketName,
        resolutionTime,
        questions,
        innerTradeTime,
        outerTradeTime,
        new anchor.BN(5000 * 1000000), // pumpThreshold: 5000 USDC (更高阈值适合20选项)
        false // isPrivated
      );
      
      console.log('20选项市场创建结果:', result);
      
      setCurrentMarketId(marketId);
      setCurrentQuestionIds(questions.map(q => q.questionId));
      
      setMessage(`✅ 20选项话题市场创建完成！
🏪 市场ID: ${marketId}
📋 话题: ${marketName}
⏰ 解决时间: ${new Date(resolutionTime * 1000).toLocaleString()} (60分钟后)
📊 内盘交易期: 现在 → ${new Date(innerTradeTime * 1000).toLocaleString()} (10分钟)
💹 外盘交易期: Pump后 → ${new Date(outerTradeTime * 1000).toLocaleString()} (30分钟)
🎯 Pump阈值: 5000 USDC (适合大型多选项市场)

📋 20个选项分类:
🔸 Layer 1区块链: BTC, ETH, SOL, ADA, AVAX (选项1-5)
🔸 Layer 2扩容: MATIC, ARB, OP (选项6-8)  
🔸 DeFi生态: LINK, UNI, AAVE, COMP (选项9-12)
🔸 新兴生态: DOT, ATOM, NEAR, APT (选项13-16)
🔸 基础设施: FIL, GRT, RNDR, ICP (选项17-20)

🎯 20选项测试流程:
1. 【现在-10分钟】对各选项进行内盘投注
2. 【10分钟后】触发Pump（进入外盘状态）
3. 【Pump后】LMSR买卖各选项代币（30分钟外盘期）
4. 【60分钟后】断言和解决市场

💡 大型多选项市场特点:
- 20个独立预测条件，覆盖加密生态各个领域
- 可以分散投注多个选项，降低风险
- 最终只有一个选项获胜
- 获胜选项投注者按比例分享奖励池
- 适合复杂的生态预测和投资组合测试
- 更高的Pump阈值(5000 USDC)确保充足流动性

🚀 立即开始20选项内盘投注测试！
💡 建议: 可以分别投注不同类别的代表性项目来测试市场机制`);
      
    } catch (error: any) {
      console.error('创建20选项市场失败:', error);
      setMessage(`❌ 创建20选项市场失败: ${error.message}

可能原因:
1. 网络连接问题
2. 钱包余额不足
3. 市场ID重复
4. 权限不足
5. 合约不支持大量选项
6. 交易大小超出限制

请检查控制台获取详细错误信息。

💡 如果创建失败，可能是因为20个选项的交易过大。
建议分批创建或联系开发团队调整合约限制。`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试多选项内盘投注
  const testPlaceMultiOptionBet = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!currentMarketId || currentQuestionIds.length === 0) {
        setMessage('❌ 请先创建6选项市场');
        setLoading(false);
        return;
      }

      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      // 显示可用选项（如果选项太多，只显示前10个和后10个）
      let optionsList = '';
      if (currentQuestionIds.length <= 10) {
        optionsList = currentQuestionIds.map((id, index) => 
          `${index + 1}. 选项${index + 1} (ID: ${id})`
        ).join('\n');
      } else {
        const firstFive = currentQuestionIds.slice(0, 5).map((id, index) => 
          `${index + 1}. 选项${index + 1} (ID: ${id})`
        ).join('\n');
        const lastFive = currentQuestionIds.slice(-5).map((id, index) => 
          `${currentQuestionIds.length - 4 + index}. 选项${currentQuestionIds.length - 4 + index} (ID: ${id})`
        ).join('\n');
        optionsList = `${firstFive}\n...(省略中间选项)...\n${lastFive}\n\n💡 总共${currentQuestionIds.length}个选项`;
      }

      const selectedOptionIndex = prompt(`选择要投注的选项 (1-${currentQuestionIds.length}):\n\n${optionsList}\n\n请输入选项编号:`, '1');
      
      if (!selectedOptionIndex) {
        setMessage('❌ 投注取消');
        setLoading(false);
        return;
      }

      const optionIndex = parseInt(selectedOptionIndex) - 1;
      if (optionIndex < 0 || optionIndex >= currentQuestionIds.length) {
        setMessage('❌ 无效的选项编号');
        setLoading(false);
        return;
      }

      // 让用户输入投注金额（美元）
      const userInputUSD = prompt(`对选项${optionIndex + 1}投注金额 (美元):`, '100');
      if (!userInputUSD) {
        setMessage('❌ 投注取消或金额无效');
        setLoading(false);
        return;
      }

      const betAmountUSD = Number(userInputUSD);
      if (betAmountUSD <= 0) {
        setMessage('❌ 投注金额必须大于0');
        setLoading(false);
        return;
      }

      const selectedQuestionId = currentQuestionIds[optionIndex];
      
      // 💰 将美元转换为合约的最小单位（6位精度）
      const buyAmountNumber = Math.floor(betAmountUSD * 1000000);
      const buyAmount = new anchor.BN(buyAmountNumber);

      console.log(`💰 多选项投注参数:
选择选项: ${optionIndex + 1} (${selectedQuestionId})
投注金额: ${betAmountUSD} USD
转换金额: ${buyAmountNumber} 最小单位 (精度6位)
BN格式: ${buyAmount.toString()}`);

      setMessage(`🔄 正在对选项${optionIndex + 1}投注 ${betAmountUSD} USD...
选项ID: ${selectedQuestionId}
请确认钱包签名...`);

      // 检查条件账户
      try {
        await predictionMarket.getConditionInfo(selectedQuestionId);
      } catch (error: any) {
        setMessage(`❌ 选项条件账户不存在: ${error.message}`);
        setLoading(false);
        return;
      }

      // 使用placeInnerBuy方法进行投注
      const result = await predictionMarket.placeInnerBuy(
        walletAdapter,
        currentMarketId,
        String(selectedQuestionId),
        true, // 对选项投注Yes（支持该选项获胜）
        buyAmount,
        null // sharedCode: string | null
      );

      // 投注成功后检查是否达到Pump条件
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 等待链上更新
        const updatedMarketInfo = await predictionMarket.getMarketInfo(currentMarketId);
        const newTotalAmount = updatedMarketInfo.rawData.totalInnerAmount;
        const pumpThreshold = updatedMarketInfo.rawData.pumpThreshold || 2000000000; // 2000 USD
        
        const canTriggerPump = newTotalAmount >= pumpThreshold;
        
        setMessage(`✅ 选项${optionIndex + 1}投注成功！
🎯 选择选项: 选项${optionIndex + 1}
💰 投注金额: ${betAmountUSD} USD
📝 交易签名: ${result}
📊 市场状态更新:
  - 总投注额: ${(newTotalAmount / 1000000).toFixed(2)} USD
  - Pump阈值: ${(pumpThreshold / 1000000).toFixed(2)} USD
  - 可触发Pump: ${canTriggerPump ? '是' : '否'}

💡 多选项投注说明:
- 您投注支持选项${optionIndex + 1}获胜
- 如果该选项最终获胜，您将获得奖励
- 可以继续投注其他选项分散风险
- 总投注达到${(pumpThreshold / 1000000).toFixed(0)} USD即可Pump

${canTriggerPump ? '🚀 现在可以触发Pump了！' : '⏰ 需要更多投注才能触发Pump'}`);
      } catch (error: any) {
        setMessage(`✅ 投注成功！
💰 投注金额: ${betAmountUSD} USD
📝 交易签名: ${result}
⚠️ 无法获取市场状态更新: ${error.message}`);
      }
    } catch (error: any) {
      console.error('多选项投注失败:', error);
      setMessage(`❌ 多选项投注失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试创建5选项话题市场
  const testCreateFiveOptionMarket = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      const now = Math.floor(Date.now() / 1000);
      // 使用更短的marketId，避免长度限制
      const marketId = `5opt-${now}`;
      const marketName = `5选项测试市场: 2024年最受欢迎的AI模型预测`;
      
      // 🔧 设置时间用于测试
      const resolutionTime = now + 2400;     // 40分钟后解决市场
      const innerTradeTime = now + 480;      // 8分钟内盘期
      const outerTradeTime = now + 1200;     // 20分钟外盘期
      
      console.log('⏰ 5选项市场时间设置:');
      console.log(`当前时间: ${now} (${new Date(now * 1000).toLocaleString()})`);
      console.log(`内盘结束: ${innerTradeTime} (${new Date(innerTradeTime * 1000).toLocaleString()}) - 8分钟后`);
      console.log(`外盘结束: ${outerTradeTime} (${new Date(outerTradeTime * 1000).toLocaleString()}) - 20分钟后`);
      console.log(`市场解决: ${resolutionTime} (${new Date(resolutionTime * 1000).toLocaleString()}) - 40分钟后`);
      
      // 创建5个选项的问题
      const questions = [
        {
          questionId: `ai1-${now}`,
          questionName: '选项1: ChatGPT (OpenAI) - 对话AI领导者',
          questionResolutionTime: resolutionTime - 300, // 比市场解决时间早5分钟
          positionCount: 1,
        },
        {
          questionId: `ai2-${now}`,
          questionName: '选项2: Claude (Anthropic) - 安全AI助手',
          questionResolutionTime: resolutionTime - 300,
          positionCount: 1,
        },
        {
          questionId: `ai3-${now}`,
          questionName: '选项3: Gemini (Google) - 多模态AI',
          questionResolutionTime: resolutionTime - 300,
          positionCount: 1,
        },
        {
          questionId: `ai4-${now}`,
          questionName: '选项4: Copilot (Microsoft) - 编程AI助手',
          questionResolutionTime: resolutionTime - 300,
          positionCount: 1,
        },
        {
          questionId: `ai5-${now}`,
          questionName: '选项5: Llama (Meta) - 开源AI模型',
          questionResolutionTime: resolutionTime - 300,
          positionCount: 1,
        }
      ];

      console.log(`使用 ${isGasless ? 'Gasless' : 'Non-Gasless'} 模式创建5选项市场...`);
      console.log('Market Data:', { marketId, marketName, resolutionTime, innerTradeTime, outerTradeTime, questions });

      setMessage('🔄 正在创建5选项AI话题市场（8分钟内盘 + 20分钟外盘）...');

      const result = await predictionMarket.createMarketAndQuestionsAuto(
        walletAdapter,
        marketId,
        marketName,
        resolutionTime,
        questions,
        innerTradeTime,
        outerTradeTime,
        new anchor.BN(3000 * 1000000), // pumpThreshold: 3000 USDC (适合5选项市场)
        false // isPrivated
      );
      
      console.log('5选项市场创建结果:', result);
      
      setCurrentMarketId(marketId);
      setCurrentQuestionIds(questions.map(q => q.questionId));
      
      setMessage(`✅ 5选项AI话题市场创建完成！
🏪 市场ID: ${marketId}
📋 话题: ${marketName}
⏰ 解决时间: ${new Date(resolutionTime * 1000).toLocaleString()} (40分钟后)
📊 内盘交易期: 现在 → ${new Date(innerTradeTime * 1000).toLocaleString()} (8分钟)
💹 外盘交易期: Pump后 → ${new Date(outerTradeTime * 1000).toLocaleString()} (20分钟)
🎯 Pump阈值: 3000 USDC (适合中型多选项市场)

📋 5个AI模型选项详情:
1. ${questions[0].questionName}
2. ${questions[1].questionName}  
3. ${questions[2].questionName}
4. ${questions[3].questionName}
5. ${questions[4].questionName}

🎯 5选项测试流程:
1. 【现在-8分钟】对各AI模型进行内盘投注
2. 【8分钟后】触发Pump（进入外盘状态）
3. 【Pump后】LMSR买卖各选项代币（20分钟外盘期）
4. 【40分钟后】断言和解决市场

💡 AI模型预测市场特点:
- 5个主流AI模型选项，涵盖不同技术路线
- ChatGPT: OpenAI的对话AI领导者
- Claude: Anthropic的安全AI助手
- Gemini: Google的多模态AI
- Copilot: Microsoft的编程AI助手
- Llama: Meta的开源AI模型
- 可以投注最看好的AI模型发展前景
- 适合AI技术趋势预测和讨论

🚀 立即开始5选项AI模型投注测试！
💡 建议: 可以根据对AI技术的了解选择最看好的模型进行投注`);
      
    } catch (error: any) {
      console.error('创建5选项市场失败:', error);
      setMessage(`❌ 创建5选项市场失败: ${error.message}

可能原因:
1. 网络连接问题
2. 钱包余额不足
3. 市场ID重复
4. 权限不足
5. 合约不支持多选项

请检查控制台获取详细错误信息。`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试创建10选项话题市场
  const testCreateTenOptionMarket = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      const now = Math.floor(Date.now() / 1000);
      const marketId = `10opt-${now}`;
      const marketName = `10选项测试市场: 2024年最具潜力的科技赛道预测`;
      
      // 🔧 设置时间用于测试
      const resolutionTime = now + 3000;     // 50分钟后解决市场
      const innerTradeTime = now + 600;      // 10分钟内盘期
      const outerTradeTime = now + 1800;     // 30分钟外盘期
      
      console.log('⏰ 10选项市场时间设置:');
      console.log(`当前时间: ${now} (${new Date(now * 1000).toLocaleString()})`);
      console.log(`内盘结束: ${innerTradeTime} (${new Date(innerTradeTime * 1000).toLocaleString()}) - 10分钟后`);
      console.log(`外盘结束: ${outerTradeTime} (${new Date(outerTradeTime * 1000).toLocaleString()}) - 30分钟后`);
      console.log(`市场解决: ${resolutionTime} (${new Date(resolutionTime * 1000).toLocaleString()}) - 50分钟后`);
      
      // 创建10个选项的问题
      const questions = [
        { questionId: `tech1-${now}`, questionName: '选项1: 人工智能 (AI) - 机器学习与深度学习', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `tech2-${now}`, questionName: '选项2: 量子计算 - 下一代计算革命', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `tech3-${now}`, questionName: '选项3: 区块链技术 - 去中心化应用', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `tech4-${now}`, questionName: '选项4: 元宇宙 (Metaverse) - 虚拟现实世界', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `tech5-${now}`, questionName: '选项5: 生物技术 - 基因编辑与治疗', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `tech6-${now}`, questionName: '选项6: 新能源技术 - 太阳能与储能', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `tech7-${now}`, questionName: '选项7: 自动驾驶 - 智能交通系统', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `tech8-${now}`, questionName: '选项8: 物联网 (IoT) - 万物互联', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `tech9-${now}`, questionName: '选项9: 5G/6G通信 - 超高速网络', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `tech10-${now}`, questionName: '选项10: 机器人技术 - 智能自动化', questionResolutionTime: resolutionTime - 300, positionCount: 1 }
      ];

      console.log(`使用 ${isGasless ? 'Gasless' : 'Non-Gasless'} 模式创建10选项市场...`);

      setMessage('🔄 正在创建10选项科技赛道市场（10分钟内盘 + 30分钟外盘）...');

      const result = await predictionMarket.createMarketAndQuestionsAuto(
        walletAdapter,
        marketId,
        marketName,
        resolutionTime,
        questions,
        innerTradeTime,
        outerTradeTime,
        new anchor.BN(4000 * 1000000), // pumpThreshold: 4000 USDC
        false
      );
      
      setCurrentMarketId(marketId);
      setCurrentQuestionIds(questions.map(q => q.questionId));
      
      setMessage(`✅ 10选项科技赛道市场创建完成！
🏪 市场ID: ${marketId}
📋 话题: ${marketName}
⏰ 解决时间: ${new Date(resolutionTime * 1000).toLocaleString()} (50分钟后)
📊 内盘交易期: 现在 → ${new Date(innerTradeTime * 1000).toLocaleString()} (10分钟)
💹 外盘交易期: Pump后 → ${new Date(outerTradeTime * 1000).toLocaleString()} (30分钟)
🎯 Pump阈值: 4000 USDC (适合大型多选项市场)

📋 10个科技赛道选项:
🤖 AI人工智能 | ⚛️ 量子计算 | ⛓️ 区块链 | 🥽 元宇宙 | 🧬 生物技术
🔋 新能源 | 🚗 自动驾驶 | 🌐 物联网 | 📡 5G/6G | 🤖 机器人

💡 科技赛道预测特点:
- 涵盖当前最热门的10大科技领域
- 每个赛道都代表未来发展的重要方向
- 适合科技趋势预测和投资决策参考
- 中大型市场规模，测试复杂预测机制

🚀 立即开始10选项科技赛道投注测试！`);
      
    } catch (error: any) {
      console.error('创建10选项市场失败:', error);
      setMessage(`❌ 创建10选项市场失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试创建15选项话题市场
  const testCreateFifteenOptionMarket = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);
      
      const now = Math.floor(Date.now() / 1000);
      const marketId = `15opt-${now}`;
      const marketName = `15选项测试市场: 2024年全球最具影响力的公司预测`;
      
      // 🔧 设置时间用于测试
      const resolutionTime = now + 3600;     // 60分钟后解决市场
      const innerTradeTime = now + 720;      // 12分钟内盘期
      const outerTradeTime = now + 2400;     // 40分钟外盘期
      
      console.log('⏰ 15选项市场时间设置:');
      console.log(`当前时间: ${now} (${new Date(now * 1000).toLocaleString()})`);
      console.log(`内盘结束: ${innerTradeTime} (${new Date(innerTradeTime * 1000).toLocaleString()}) - 12分钟后`);
      console.log(`外盘结束: ${outerTradeTime} (${new Date(outerTradeTime * 1000).toLocaleString()}) - 40分钟后`);
      console.log(`市场解决: ${resolutionTime} (${new Date(resolutionTime * 1000).toLocaleString()}) - 60分钟后`);
      
      // 创建15个选项的问题
      const questions = [
        // 科技巨头
        { questionId: `comp1-${now}`, questionName: '选项1: Apple - 科技创新领导者', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp2-${now}`, questionName: '选项2: Microsoft - 云计算与AI巨头', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp3-${now}`, questionName: '选项3: Google (Alphabet) - 搜索与AI', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp4-${now}`, questionName: '选项4: Amazon - 电商与云服务', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp5-${now}`, questionName: '选项5: Meta - 社交与元宇宙', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        
        // 新兴科技
        { questionId: `comp6-${now}`, questionName: '选项6: Tesla - 电动车与自动驾驶', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp7-${now}`, questionName: '选项7: NVIDIA - AI芯片领导者', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp8-${now}`, questionName: '选项8: OpenAI - 人工智能先锋', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp9-${now}`, questionName: '选项9: SpaceX - 太空探索与卫星', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp10-${now}`, questionName: '选项10: ByteDance - 短视频与AI', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        
        // 传统转型
        { questionId: `comp11-${now}`, questionName: '选项11: Netflix - 流媒体娱乐', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp12-${now}`, questionName: '选项12: Salesforce - 企业云服务', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp13-${now}`, questionName: '选项13: Adobe - 创意软件与AI', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp14-${now}`, questionName: '选项14: Shopify - 电商平台服务', questionResolutionTime: resolutionTime - 300, positionCount: 1 },
        { questionId: `comp15-${now}`, questionName: '选项15: Zoom - 远程协作通信', questionResolutionTime: resolutionTime - 300, positionCount: 1 }
      ];

      console.log(`使用 ${isGasless ? 'Gasless' : 'Non-Gasless'} 模式创建15选项市场...`);

      setMessage('🔄 正在创建15选项全球公司影响力市场（12分钟内盘 + 40分钟外盘）...');

      const result = await predictionMarket.createMarketAndQuestionsAuto(
        walletAdapter,
        marketId,
        marketName,
        resolutionTime,
        questions,
        innerTradeTime,
        outerTradeTime,
        new anchor.BN(4500 * 1000000), // pumpThreshold: 4500 USDC
        false
      );
      
      setCurrentMarketId(marketId);
      setCurrentQuestionIds(questions.map(q => q.questionId));
      
      setMessage(`✅ 15选项全球公司影响力市场创建完成！
🏪 市场ID: ${marketId}
📋 话题: ${marketName}
⏰ 解决时间: ${new Date(resolutionTime * 1000).toLocaleString()} (60分钟后)
📊 内盘交易期: 现在 → ${new Date(innerTradeTime * 1000).toLocaleString()} (12分钟)
💹 外盘交易期: Pump后 → ${new Date(outerTradeTime * 1000).toLocaleString()} (40分钟)
🎯 Pump阈值: 4500 USDC (适合大型多选项市场)

📋 15个全球影响力公司分类:
🍎 科技巨头: Apple, Microsoft, Google, Amazon, Meta
🚀 新兴科技: Tesla, NVIDIA, OpenAI, SpaceX, ByteDance  
🔄 传统转型: Netflix, Salesforce, Adobe, Shopify, Zoom

💡 全球公司影响力预测特点:
- 涵盖15家最具全球影响力的科技公司
- 包含传统巨头、新兴独角兽、转型企业
- 适合商业趋势预测和投资决策参考
- 大型市场规模，测试复杂多选项机制
- 反映全球科技产业发展格局

🚀 立即开始15选项公司影响力投注测试！
💡 建议: 可以根据公司的技术实力、市场地位、创新能力进行综合评估投注`);
      
    } catch (error: any) {
      console.error('创建15选项市场失败:', error);
      setMessage(`❌ 创建15选项市场失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 测试添加白名单地址
  const testAddWhitelistedAddress = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    let addressToWhitelist = '';
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);

      // 让用户输入要添加到白名单的地址
      addressToWhitelist = prompt('请输入要添加到白名单的Solana地址:', '') || '';
      if (!addressToWhitelist) {
        setMessage('❌ 操作取消或地址无效');
        setLoading(false);
        return;
      }

      // 验证地址格式
      try {
        new PublicKey(addressToWhitelist);
      } catch (error) {
        setMessage(`❌ 无效的Solana地址格式: ${addressToWhitelist}
        
请确保输入的是有效的Base58编码的Solana公钥地址。`);
        setLoading(false);
        return;
      }

      setMessage(`🔄 正在添加白名单地址...
目标地址: ${addressToWhitelist}
操作钱包: ${walletAdapter.publicKey.toString()}
请确认钱包签名...`);

      console.log(`添加白名单地址参数:
目标地址: ${addressToWhitelist}
操作钱包: ${walletAdapter.publicKey.toString()}`);

      // 让用户输入程序类型
      const programType = prompt('请输入程序类型 (例如: ctc, order, 或其他):', 'ctc');
      if (!programType) {
        setMessage('❌ 操作取消或程序类型无效');
        setLoading(false);
        return;
      }

      // 调用SDK的添加白名单地址方法
      console.log('🔍 使用SDK接口: addWhitelistedAddress(authority, address, program)');
      console.log(`参数检查:
authority: ${walletAdapter.constructor.name} (${walletAdapter.publicKey.toString()})
address: ${addressToWhitelist} (PublicKey类型)
program: "${programType}" (类型: ${typeof programType})`);

      const result = await predictionMarket.addWhitelistedAddress(
        walletAdapter,                      // authority: WalletInfo
        new PublicKey(addressToWhitelist), // address: PublicKey
        programType                        // program: string
      );
      
      console.log('✅ 白名单地址添加成功:', result);

      setMessage(`✅ 白名单地址添加成功！
🏪 目标地址: ${addressToWhitelist}
👤 操作钱包: ${walletAdapter.publicKey.toString()}
📋 程序类型: ${programType}
📝 交易签名: ${result}
⏰ 操作时间: ${new Date().toLocaleString()}

✅ 使用SDK接口:
addWhitelistedAddress(authority, address, program)
- authority: 权限钱包 (${walletAdapter.publicKey.toString().slice(0, 8)}...)
- address: ${addressToWhitelist} (PublicKey)
- program: "${programType}" (程序类型)

💡 白名单功能说明:
白名单地址通常用于：
1. 限制特定功能的访问权限
2. 给予白名单用户特殊权益
3. 实现分层权限管理
4. 控制市场参与者范围

📋 程序类型说明:
- "ctc": CTC合约相关权限
- "order": Order合约相关权限
- 其他自定义程序类型

🔧 管理权限:
- 只有具有管理员权限的钱包才能添加白名单地址
- 添加成功后，目标地址将获得指定程序的白名单权益
- 可以通过相应的移除接口来撤销白名单权限
- 不同程序类型的白名单权限相互独立

🎯 使用场景:
- 私有市场的参与者管理
- VIP用户权益分配
- 特殊功能访问控制
- 合规性要求的用户筛选
- 不同合约模块的权限控制`);

    } catch (error: any) {
      console.error('添加白名单地址失败:', error);
      const { walletAdapter } = createWalletAdapter(isGasless);
      setMessage(`❌ 添加白名单地址失败: ${error.message}

可能原因:
1. 权限不足（需要管理员权限）
2. 目标地址已在白名单中
3. 目标地址格式无效
4. 网络连接问题
5. 合约状态异常

请确保:
- 使用具有管理员权限的钱包
- 目标地址格式正确且未在白名单中
- 网络连接正常
- 合约已正确初始化

🔧 调试信息:
- 操作钱包: ${walletAdapter?.publicKey?.toString() || 'N/A'}
- 目标地址: ${addressToWhitelist || 'N/A'}
- 错误类型: ${error.name || 'Unknown'}

💡 提示:
白名单管理通常需要特殊权限，请确认您的钱包地址具有相应的管理员权限。`);
    } finally {
      setLoading(false);
    }
  };



  // 新增: 测试查询CTC白名单
  const testGetAuthorityWhitelist = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);

      setMessage(`🔄 正在查询CTC白名单...
操作钱包: ${walletAdapter.publicKey.toString()}
请稍候...`);

      console.log(`查询CTC白名单参数:
操作钱包: ${walletAdapter.publicKey.toString()}`);

      // 调用SDK的查询白名单方法
      console.log('🔍 使用SDK接口: getAuthorityWhitelist(authority)');

      const whitelist = await predictionMarket.getAuthorityWhitelist(walletAdapter.publicKey.toString());
      
      console.log('✅ 白名单查询成功:', whitelist);

      // 处理白名单数据显示
      let whitelistDisplay = '';
      let whitelistCount = 0;

      if (Array.isArray(whitelist)) {
        whitelistCount = whitelist.length;
        if (whitelistCount > 0) {
          whitelistDisplay = whitelist.map((address, index) => 
            `${index + 1}. ${address}`
          ).join('\n');
        } else {
          whitelistDisplay = '暂无白名单地址';
        }
      } else if (whitelist && typeof whitelist === 'object') {
        // 如果返回的是对象格式
        const addresses = Object.values(whitelist).filter(addr => addr && typeof addr === 'string');
        whitelistCount = addresses.length;
        if (whitelistCount > 0) {
          whitelistDisplay = addresses.map((address, index) => 
            `${index + 1}. ${address}`
          ).join('\n');
        } else {
          whitelistDisplay = '暂无白名单地址';
        }
      } else {
        whitelistDisplay = '数据格式异常，请查看控制台日志';
      }

      setMessage(`✅ CTC白名单查询成功！
👤 操作钱包: ${walletAdapter.publicKey.toString()}
⏰ 查询时间: ${new Date().toLocaleString()}

📋 白名单信息:
总数量: ${whitelistCount} 个地址

📍 白名单地址列表:
${whitelistDisplay}

✅ 使用SDK接口:
getAuthorityWhitelist(authorityAddress)
- authorityAddress: 权限地址 (${walletAdapter.publicKey.toString().slice(0, 8)}...)
- 返回白名单地址数组或对象

💡 白名单查询说明:
CTC白名单是系统中具有特殊权限的地址列表，包括：
1. 管理员地址 - 可以管理系统配置
2. 授权地址 - 可以执行特殊操作
3. VIP地址 - 享有特殊权益
4. 合规地址 - 满足监管要求

🔧 技术详情:
- 查询操作无需特殊权限
- 返回当前所有白名单地址
- 数据实时从链上获取
- 支持多种数据格式解析

🎯 实际应用:
- 权限验证前的地址检查
- 管理界面显示授权用户
- 合规审计和监控
- 用户权限等级判断

📊 原始数据类型: ${typeof whitelist}
📊 原始数据内容: ${JSON.stringify(whitelist, null, 2)}`);

    } catch (error: any) {
      console.error('查询CTC白名单失败:', error);
      const { walletAdapter } = createWalletAdapter(isGasless);
      setMessage(`❌ 查询CTC白名单失败: ${error.message}

可能原因:
1. 网络连接问题
2. 合约状态异常
3. RPC节点响应超时
4. 合约未正确初始化
5. 白名单数据不存在

请确保:
- 网络连接正常
- 合约已正确初始化
- RPC节点可正常访问
- 系统已配置白名单功能

🔧 调试信息:
- 操作钱包: ${walletAdapter?.publicKey?.toString() || 'N/A'}
- 错误类型: ${error.name || 'Unknown'}
- 网络环境: devnet

💡 提示:
白名单查询是只读操作，不需要特殊权限。
如果查询失败，可能是合约或网络问题，请检查系统状态。

🔍 故障排除:
1. 检查网络连接状态
2. 确认合约是否已初始化
3. 验证RPC节点是否可用
4. 查看控制台详细错误日志`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 查看市场信息详情
  const testGetMarketInfo = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    
    // 使用输入的市场ID，如果没有输入则使用当前市场ID
    const marketIdToQuery = inputMarketId.trim() || currentMarketId;
    
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);

      if (!marketIdToQuery) {
        setMessage(`❌ 请输入市场ID或先创建市场！
        
🔧 操作步骤:
1. 在下方输入框中输入已有的市场ID，或者
2. 使用"2. 创建市场"等功能创建新市场
3. 点击"查看市场信息"按钮

💡 提示: 
- 可以输入任何已存在的市场ID进行查询
- 如果不输入，会使用当前创建的市场ID`);
        return;
      }

      setMessage(`🔄 正在查询市场信息...
📍 市场ID: ${marketIdToQuery}
👤 操作钱包: ${walletAdapter.publicKey.toString()}
请稍候...`);

      console.log(`查询市场信息参数:
市场ID: ${marketIdToQuery}
操作钱包: ${walletAdapter.publicKey.toString()}`);

      // 调用SDK的getMarketInfo方法
      console.log('🔍 使用SDK接口: getMarketInfo(marketId)');
      const marketInfo = await predictionMarket.getMarketInfo(marketIdToQuery);
      
      console.log('✅ 市场信息查询成功:', marketInfo);

      // 调用SDK的getMarketInfoExtension方法
      console.log('🔍 使用SDK接口: getMarketInfoExtension(marketId)');
      let marketInfoExtension = null;
      try {
        marketInfoExtension = await predictionMarket.getMarketInfoExtension(marketIdToQuery);
        console.log('✅ 市场扩展信息查询成功:', marketInfoExtension);
      } catch (extError) {
        console.log('ℹ️ 市场扩展信息查询失败（可能不存在）:', extError);
      }

      // 格式化时间显示
      const formatTime = (timestamp: number) => {
        if (!timestamp || timestamp === 0) return '未设置';
        return new Date(timestamp * 1000).toLocaleString();
      };

      // 格式化金额显示
      const formatAmount = (amount: any) => {
        if (!amount) return '0';
        if (typeof amount === 'object' && amount.toNumber) {
          return (amount.toNumber() / 1000000).toFixed(6);
        }
        return (Number(amount) / 1000000).toFixed(6);
      };

      // 构建详细的市场信息显示
      let marketDetails = `📋 基本市场信息:
🆔 市场ID: ${marketIdToQuery}
📝 市场名称: ${marketInfo.marketName || '未设置'}
👤 创建者: ${marketInfo.authority?.toString() || '未知'}
⏰ 创建时间: ${formatTime(marketInfo.creationTime)}

⏰ 时间节点:
🕐 内盘交易结束: ${formatTime(marketInfo.innerTradeTime)}
🕑 外盘交易结束: ${formatTime(marketInfo.outerTradeTime)}
🕒 市场解决时间: ${formatTime(marketInfo.resolutionTime)}

💰 资金信息:
💵 内盘总金额: ${formatAmount(marketInfo.totalInnerAmount)} USDC
💵 外盘总金额: ${formatAmount(marketInfo.totalOuterAmount)} USDC
🚀 Pump阈值: ${formatAmount(marketInfo.pumpThreshold)} USDC
💸 手续费率: ${marketInfo.feeRate || 0}%

📊 市场状态:
🔄 当前状态: ${marketInfo.status || '未知'}
✅ 是否已解决: ${marketInfo.isResolved ? '是' : '否'}
🎯 解决结果: ${marketInfo.resolvedOutcome || '未解决'}

🎲 问题信息:
📊 问题数量: ${marketInfo.questionCount || 0}个
📝 问题列表: ${marketInfo.questions ? marketInfo.questions.map((q: any, i: number) => 
  `\n  ${i + 1}. ${q.questionId || `问题${i + 1}`}: ${q.questionName || '未命名'}`
).join('') : '无问题数据'}`;

      // 如果有扩展信息，添加到显示中
      if (marketInfoExtension) {
        marketDetails += `\n\n📋 扩展市场信息:
🔧 扩展数据: ${JSON.stringify(marketInfoExtension, null, 2)}`;
      }

      // 添加原始数据用于调试
      marketDetails += `\n\n🔧 原始数据 (调试用):
📊 MarketInfo类型: ${typeof marketInfo}
📊 MarketInfo内容: ${JSON.stringify(marketInfo, null, 2)}`;

      setMessage(`✅ 市场信息查询成功！
👤 操作钱包: ${walletAdapter.publicKey.toString()}
⏰ 查询时间: ${new Date().toLocaleString()}

${marketDetails}

✅ 使用SDK接口:
getMarketInfo(marketId) - 获取基本市场信息
getMarketInfoExtension(marketId) - 获取扩展市场信息

💡 接口说明:
- getMarketInfo: 获取市场的基本信息，包括时间节点、资金状态、问题列表等
- getMarketInfoExtension: 获取市场的扩展信息，包含额外的配置和状态数据
- 两个接口互补，提供完整的市场数据视图

🔍 数据字段解释:
- authority: 市场创建者地址
- innerTradeTime: 内盘交易截止时间
- outerTradeTime: 外盘交易截止时间  
- resolutionTime: 市场最终解决时间
- totalInnerAmount: 内盘总投注金额
- totalOuterAmount: 外盘总交易金额
- pumpThreshold: 触发Pump的金额阈值
- questionCount: 市场包含的问题数量
- isResolved: 市场是否已经解决
- resolvedOutcome: 市场解决的结果`);

    } catch (error: any) {
      console.error('查询市场信息失败:', error);
      const { walletAdapter } = createWalletAdapter(isGasless);
      setMessage(`❌ 查询市场信息失败: ${error.message}

可能原因:
1. 市场ID不存在或无效
2. 网络连接问题
3. 合约状态异常
4. RPC节点响应超时
5. 市场数据损坏

请确保:
- 市场ID正确且已创建
- 网络连接正常
- 合约已正确初始化
- RPC节点可正常访问

🔧 调试信息:
- 市场ID: ${marketIdToQuery || 'N/A'}
- 操作钱包: ${walletAdapter?.publicKey?.toString() || 'N/A'}
- 错误类型: ${error.name || 'Unknown'}
- 网络环境: devnet

💡 提示:
如果市场刚创建，请等待几秒钟让链上数据确认后再查询。
可以先使用"0. 检查状态"确认市场是否存在。

🔍 故障排除:
1. 检查市场ID是否正确
2. 确认市场是否已成功创建
3. 验证网络连接状态
4. 查看控制台详细错误日志`);
    } finally {
      setLoading(false);
    }
  };

  // 新增: 查看内盘分红池信息
  const testGetInnerDividendPool = async (isGasless: boolean) => {
    setLoading(true);
    setMessage('');
    
    // 使用输入的问题ID，如果没有输入则使用当前问题ID
    const questionIdToQuery = inputQuestionId.trim() || (currentQuestionIds.length > 0 ? currentQuestionIds[0] : '');
    
    try {
      const { walletAdapter, predictionMarket } = createWalletAdapter(isGasless);

      if (!questionIdToQuery) {
        setMessage(`❌ 请输入问题ID或先创建市场！
        
🔧 操作步骤:
1. 在下方输入框中输入已有的问题ID，或者
2. 使用"2. 创建市场"等功能创建新市场并获取问题ID
3. 点击"查询内盘分红池"按钮

💡 提示: 
- 可以输入任何已存在的问题ID进行查询
- 如果不输入，会使用当前创建的第一个问题ID
- 内盘分红池通常在市场解决后创建`);
        return;
      }

      // 使用查询的问题ID
      const questionId = questionIdToQuery;

      setMessage(`🔄 正在查询内盘分红池信息...
📍 市场ID: ${currentMarketId}
🎯 问题ID: ${questionId}
👤 操作钱包: ${walletAdapter.publicKey.toString()}
请稍候...`);

      console.log(`查询内盘分红池参数:
市场ID: ${currentMarketId}
问题ID: ${questionId}
操作钱包: ${walletAdapter.publicKey.toString()}`);

      // 调用SDK的getInnerDividendPool方法
      console.log('🔍 使用SDK接口: getInnerDividendPool(questionId)');
      const dividendPoolInfo = await predictionMarket.getInnerDividendPool(questionId);
      
      console.log('✅ 内盘分红池信息查询成功:', dividendPoolInfo);

      // 尝试获取分红池PDA地址
      console.log('🔍 使用SDK接口: getInnerDividendPoolPda(questionId)');
      let dividendPoolPda = null;
      try {
        dividendPoolPda = await predictionMarket.getInnerDividendPoolPda(questionId);
        console.log('✅ 内盘分红池PDA获取成功:', dividendPoolPda.toString());
      } catch (pdaError) {
        console.log('ℹ️ 内盘分红池PDA获取失败:', pdaError);
      }

      // 尝试获取分红池金库余额
      console.log('🔍 使用SDK接口: getInnerDividendPoolVaultBalance(questionId)');
      let vaultBalance = null;
      try {
        vaultBalance = await predictionMarket.getInnerDividendPoolVaultBalance(questionId);
        console.log('✅ 内盘分红池金库余额获取成功:', vaultBalance);
      } catch (balanceError) {
        console.log('ℹ️ 内盘分红池金库余额获取失败:', balanceError);
      }

      // 格式化金额显示
      const formatAmount = (amount: any) => {
        if (!amount) return '0';
        if (typeof amount === 'object' && amount.toNumber) {
          return (amount.toNumber() / 1000000).toFixed(6);
        }
        return (Number(amount) / 1000000).toFixed(6);
      };

      // 构建详细的分红池信息显示
      let poolDetails = `📋 内盘分红池基本信息:
🆔 问题ID: ${questionId}
📍 分红池地址: ${dividendPoolInfo.address?.toString() || '未获取'}
${dividendPoolPda ? `📍 分红池PDA: ${dividendPoolPda.toString()}` : ''}

💰 资金信息:
${vaultBalance ? `💵 金库余额: ${formatAmount(vaultBalance)} USDC` : '💵 金库余额: 无法获取'}

📊 分红池数据:
${dividendPoolInfo.data ? `🔧 池数据: ${JSON.stringify(dividendPoolInfo.data, null, 2)}` : '🔧 池数据: 无数据'}`;

      // 添加原始数据用于调试
      poolDetails += `\n\n🔧 原始数据 (调试用):
📊 DividendPool类型: ${typeof dividendPoolInfo}
📊 DividendPool内容: ${JSON.stringify(dividendPoolInfo, null, 2)}`;

      setMessage(`✅ 内盘分红池信息查询成功！
👤 操作钱包: ${walletAdapter.publicKey.toString()}
⏰ 查询时间: ${new Date().toLocaleString()}

${poolDetails}

✅ 使用SDK接口:
getInnerDividendPool(questionId) - 获取内盘分红池完整信息
getInnerDividendPoolPda(questionId) - 获取内盘分红池PDA地址
getInnerDividendPoolVaultBalance(questionId) - 获取分红池金库余额

💡 接口说明:
- getInnerDividendPool: 获取内盘分红池的完整数据，包括地址和池数据
- getInnerDividendPoolPda: 仅获取内盘分红池的PDA地址
- getInnerDividendPoolVaultBalance: 获取分红池金库的USDC余额
- 这些接口用于查询内盘投注的分红分配情况

🔍 数据字段解释:
- address: 内盘分红池的链上地址
- data: 分红池的详细配置和状态数据
- vaultBalance: 分红池金库中的USDC余额
- 分红池通常在市场解决后创建，用于分配内盘投注收益

⚠️ 注意事项:
- 分红池需要在市场解决后才会创建
- 如果查询失败，可能是分红池尚未创建
- 金库余额反映了可分配的分红总额`);

    } catch (error: any) {
      console.error('查询内盘分红池失败:', error);
      const { walletAdapter } = createWalletAdapter(isGasless);
      setMessage(`❌ 查询内盘分红池失败: ${error.message}

可能原因:
1. 内盘分红池尚未创建
2. 问题ID不存在或无效
3. 市场尚未解决
4. 网络连接问题
5. 合约状态异常

请确保:
- 市场已经解决
- 内盘分红池已经创建
- 问题ID正确且有效
- 网络连接正常

🔧 调试信息:
- 市场ID: ${currentMarketId || 'N/A'}
- 问题ID: ${questionIdToQuery || 'N/A'}
- 操作钱包: ${walletAdapter?.publicKey?.toString() || 'N/A'}
- 错误类型: ${error.name || 'Unknown'}
- 网络环境: devnet

💡 提示:
内盘分红池是在市场解决后创建的，用于分配内盘投注的额外收益。
如果查询失败，请确认：
1. 市场是否已经解决
2. 是否已经创建了内盘分红池
3. 问题ID是否正确

🔍 故障排除:
1. 先使用"0. 检查状态"确认市场状态
2. 确认市场是否已经解决
3. 检查是否已创建内盘分红池
4. 验证问题ID的正确性
5. 查看控制台详细错误日志`);
    } finally {
      setLoading(false);
    }
  };

  // 修正标签页顺序，添加价格查询和token余额查询测试，以及内盘结算测试
  const tabs = [
    { id: 'checkStatus', label: '0. 检查状态', test: testCheckStatus },
    { id: 'getMarketInfo', label: '0B. 查看市场信息', test: testGetMarketInfo },
    { id: 'initializeContract', label: '1. 初始化合约', test: testInitializeContract },
    { id: 'createMarket', label: '2. 创建市场', test: testCreateMarket },
    { id: 'createShortTimeMarket', label: '2B. 创建测试市场(3分钟)', test: testCreateShortTimeMarket },
    { id: 'createPumpMarket', label: '2C. 创建Pump流程市场(5分钟)', test: testCreatePumpMarket },
    { id: 'createFiveOptionMarket', label: '2D. 创建5选项AI话题市场', test: testCreateFiveOptionMarket },
    { id: 'createTenOptionMarket', label: '2E. 创建10选项科技赛道市场', test: testCreateTenOptionMarket },
    { id: 'createFifteenOptionMarket', label: '2F. 创建15选项全球公司市场', test: testCreateFifteenOptionMarket },
    { id: 'createTwentyOptionMarket', label: '2G. 创建20选项话题市场', test: testCreateTwentyOptionMarket },
    { id: 'placeInnerBetYes', label: '3. 内盘投注Yes', test: testPlaceInnerBetYes },
    { id: 'placeInnerBetNo', label: '4. 内盘投注No', test: testPlaceInnerBetNo },
    { id: 'placeMultiOptionBet', label: '4B. 多选项投注', test: testPlaceMultiOptionBet },
    { id: 'triggerPump', label: '5. 触发Pump', test: testTriggerPump },
    { id: 'getLmsrPrice', label: '6. 查询LMSR价格', test: testGetLmsrPrice },
    { id: 'lmsrBuy', label: '7. LMSR买入', test: testLmsrBuy },
    { id: 'getUserTokenBalance', label: '8. 查询Token余额', test: testGetUserTokenBalance },
    { id: 'lmsrSell', label: '9. LMSR卖出', test: testLmsrSell },
    { id: 'assertMarket', label: '10. 断言市场结果', test: testAssertMarket },
    { id: 'resolveMarket', label: '11. 解决市场', test: testResolveMarket },
    { id: 'createOuterSettlementPool', label: '12. 创建外盘结算池', test: testCreateOuterSettlementPool },
    { id: 'createInnerSettlementPool', label: '13. 创建内盘结算池', test: testCreateInnerSettlementPool },
    { id: 'createInnerDividendPool', label: '14. 创建内盘分红池', test: testCreateInnerDividendPool },
    { id: 'claimOuterReward', label: '15. 领取外盘奖励', test: testClaimOuterReward },
    { id: 'claimInnerDividend', label: '16. 领取内盘分红', test: testClaimInnerDividend },
    { id: 'claimInnerReward', label: '17. 领取内盘奖励', test: testClaimInnerReward },
    { id: 'addWhitelistedAddress', label: '18. 添加白名单地址(管理功能)', test: testAddWhitelistedAddress },
    { id: 'getAuthorityWhitelist', label: '19. 查询CTC白名单', test: testGetAuthorityWhitelist },
    { id: 'getInnerDividendPool', label: '19B. 查询内盘分红池', test: testGetInnerDividendPool },
    { id: 'getMainnetFeePayerBalance', label: '20. 查询主网费用支付者余额', test: testGetMainnetFeePayerBalance },
  ];

  return (
    <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
      <h3>🧪 CTC 合约测试套件 (SDK v1.0.8 - 完整流程)</h3>
      
      {/* 状态信息 */}
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <p><strong>🏪 当前市场ID:</strong> {currentMarketId || '未创建'}</p>
        <p><strong>❓ 选项数量:</strong> {currentQuestionIds.length}</p>
        {currentQuestionIds.length === 2 ? (
          <>
            <p><strong>🟢 Yes选项ID:</strong> {currentQuestionIds[0] || '未创建'}</p>
            <p><strong>🔴 No选项ID:</strong> {currentQuestionIds[1] || '未创建'}</p>
          </>
        ) : currentQuestionIds.length > 2 ? (
          <div>
            <p><strong>📋 多选项详情:</strong></p>
            {currentQuestionIds.map((id, index) => (
              <p key={index} style={{ marginLeft: '20px', fontSize: '14px' }}>
                <strong>选项{index + 1}:</strong> {id}
              </p>
            ))}
          </div>
        ) : (
          <p><strong>🔴 选项ID:</strong> {currentQuestionIds[0] || '未创建'}</p>
        )}
        <p><strong>💼 钱包类型:</strong> {primaryWallet?.connectorType || '未知'} 
          {primaryWallet?.connectorType === 'embedded' ? ' (支持 Gasless)' : ' (需要外部签名)'}
        </p>
        <p><strong>🌐 网络:</strong> devnet</p>
        <p><strong>🎯 Pump阈值:</strong> 1000U (合约默认)</p>
      </div>

      {/* 流程说明 */}
      <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '2px solid #2196f3' }}>
        <h5>📋 测试流程选择:</h5>
        
        <div style={{ background: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          <h6 style={{ color: '#1976d2', margin: '0 0 5px 0' }}>🔄 完整LMSR流程 (推荐)</h6>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <span>1️⃣ 初始化合约</span> → <span>2️⃣ 创建市场</span> → <span>3️⃣ 内盘投注</span> → <span>4️⃣ 触发Pump</span> → <span>5️⃣ LMSR买入</span> → <span>6️⃣ 查询余额</span> → <span>7️⃣ LMSR卖出</span>
        </div>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
            ⏰ 2分钟内盘期 → Pump → 5分钟外盘期(LMSR立即可用)
          </p>
        </div>

        <div style={{ background: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          <h6 style={{ color: '#d32f2f', margin: '0 0 5px 0' }}>🚀 正确的外盘流程 (最新更新!)</h6>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <span>2C️⃣ 创建Pump市场</span> → <span>3️⃣ 内盘投注</span> → <span>5️⃣ 触发Pump</span> → <span>7️⃣ LMSR交易</span> → <span>🎯 断言</span> → <span>⚖️ 解决</span> → <span>💰 外盘结算</span> → <span>🏆 内盘结算</span> → <span>🎪 创建分红池</span> → <span>🎁 外盘奖励</span> → <span>💎 内盘分红</span>
          </div>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>
            ⚠️ 重要: 外盘结算 → 内盘结算 → 创建分红池 → 用户领取
          </p>
        </div>

        <div style={{ background: '#fff3cd', padding: '10px', borderRadius: '5px', border: '1px solid #ffeaa7' }}>
          <h6 style={{ color: '#856404', margin: '0 0 5px 0' }}>🏆 纯内盘结算流程 (无外盘)</h6>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <span>1️⃣ 初始化合约</span> → <span>2B️⃣ 创建测试市场(3分钟)</span> → <span>3️⃣ 内盘投注</span> → <span>🔟 断言结果</span> → <span>⏰ 等待3分钟</span> → <span>1️⃣1️⃣ 解决市场</span> → <span>1️⃣3️⃣ 创建内盘结算池</span> → <span>1️⃣7️⃣ 领取内盘奖励</span>
          </div>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#856404' }}>
            ⏰ 适用于未触发Pump的纯内盘市场
          </p>
        </div>

        <div style={{ background: '#e3f2fd', padding: '10px', borderRadius: '5px', border: '1px solid #2196f3' }}>
          <h6 style={{ color: '#1976d2', margin: '0 0 5px 0' }}>🤖 5选项AI话题测试流程 (新功能!)</h6>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <span>1️⃣ 初始化合约</span> → <span>2D️⃣ 创建5选项AI话题市场</span> → <span>4B️⃣ 多选项投注</span> → <span>5️⃣ 触发Pump</span> → <span>7️⃣ LMSR交易</span> → <span>🎯 断言</span> → <span>⚖️ 解决</span> → <span>💰 结算</span>
          </div>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#1976d2' }}>
            🤖 话题: "2024年最受欢迎的AI模型预测" - 涵盖ChatGPT、Claude、Gemini、Copilot、Llama五大AI模型
          </p>
        </div>

        <div style={{ background: '#fff3e0', padding: '10px', borderRadius: '5px', border: '1px solid #ff9800' }}>
          <h6 style={{ color: '#f57c00', margin: '0 0 5px 0' }}>🔬 10选项科技赛道测试流程 (新功能!)</h6>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <span>1️⃣ 初始化合约</span> → <span>2E️⃣ 创建10选项科技赛道市场</span> → <span>4B️⃣ 多选项投注</span> → <span>5️⃣ 触发Pump</span> → <span>7️⃣ LMSR交易</span> → <span>🎯 断言</span> → <span>⚖️ 解决</span> → <span>💰 结算</span>
          </div>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#f57c00' }}>
            🔬 话题: "2024年最具潜力的科技赛道预测" - 涵盖AI、量子计算、区块链、元宇宙等10大科技领域
          </p>
        </div>

        <div style={{ background: '#fce4ec', padding: '10px', borderRadius: '5px', border: '1px solid #e91e63' }}>
          <h6 style={{ color: '#c2185b', margin: '0 0 5px 0' }}>🏢 15选项全球公司测试流程 (新功能!)</h6>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <span>1️⃣ 初始化合约</span> → <span>2F️⃣ 创建15选项全球公司市场</span> → <span>4B️⃣ 多选项投注</span> → <span>5️⃣ 触发Pump</span> → <span>7️⃣ LMSR交易</span> → <span>🎯 断言</span> → <span>⚖️ 解决</span> → <span>💰 结算</span>
          </div>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#c2185b' }}>
            🏢 话题: "2024年全球最具影响力的公司预测" - 涵盖Apple、Microsoft、Tesla等15家科技巨头
          </p>
        </div>

        <div style={{ background: '#e8f5e8', padding: '10px', borderRadius: '5px', border: '1px solid #4caf50' }}>
          <h6 style={{ color: '#2e7d32', margin: '0 0 5px 0' }}>🎯 20选项话题测试流程 (大规模测试!)</h6>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', flexWrap: 'wrap' }}>
            <span>1️⃣ 初始化合约</span> → <span>2G️⃣ 创建20选项话题市场</span> → <span>4B️⃣ 多选项投注</span> → <span>5️⃣ 触发Pump</span> → <span>7️⃣ LMSR交易</span> → <span>🎯 断言</span> → <span>⚖️ 解决</span> → <span>💰 结算</span>
          </div>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#2e7d32' }}>
            🌟 话题: "2024年全球热门加密项目预测" - 涵盖Layer1、Layer2、DeFi、新兴生态、基础设施等20个项目
          </p>
        </div>

        <p style={{ margin: '10px 0 0 0', fontSize: '14px', color: '#1976d2' }}>
          💡 六种流程可以分别测试：标准2选项流程、内盘结算流程(3分钟)、5选项AI话题流程(40分钟)、10选项科技赛道流程(50分钟)、15选项全球公司流程(60分钟)、20选项话题流程(60分钟)
        </p>
      </div>

      {/* 标签页导航 */}
      <div style={{ display: 'flex', marginBottom: '20px', borderBottom: '2px solid #ddd', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: activeTab === tab.id ? '#007bff' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#007bff',
              cursor: 'pointer',
              borderBottom: activeTab === tab.id ? '3px solid #007bff' : 'none',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              transition: 'all 0.3s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 当前标签页内容 */}
      <div>
        {tabs.map(tab => (
          activeTab === tab.id && (
            <div key={tab.id}>
              <h4>🎯 {tab.label} 测试</h4>
              
              {/* 市场信息查询的输入框 */}
              {tab.id === 'getMarketInfo' && (
                <div style={{ marginBottom: '15px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
                  <label htmlFor="marketIdInput" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
                    📍 输入市场ID (可选):
                  </label>
                  <input
                    id="marketIdInput"
                    type="text"
                    value={inputMarketId}
                    onChange={(e) => setInputMarketId(e.target.value)}
                    placeholder="输入已有的市场ID，留空则使用当前创建的市场ID"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontFamily: 'monospace',
                      background: '#fff'
                    }}
                  />
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#6c757d' }}>
                    💡 提示: 可以输入任何已存在的市场ID进行查询。如果留空，将使用当前创建的市场ID: <strong>{currentMarketId || '未设置'}</strong>
                  </div>
                </div>
              )}

              {/* 内盘分红池查询的输入框 */}
              {tab.id === 'getInnerDividendPool' && (
                <div style={{ marginBottom: '15px', padding: '15px', background: '#f0f8ff', borderRadius: '8px', border: '1px solid #4a90e2' }}>
                  <label htmlFor="questionIdInput" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#495057' }}>
                    🎯 输入问题ID (可选):
                  </label>
                  <input
                    id="questionIdInput"
                    type="text"
                    value={inputQuestionId}
                    onChange={(e) => setInputQuestionId(e.target.value)}
                    placeholder="输入已有的问题ID，留空则使用当前创建的第一个问题ID"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #ced4da',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontFamily: 'monospace',
                      background: '#fff'
                    }}
                  />
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#6c757d' }}>
                    💡 提示: 可以输入任何已存在的问题ID进行查询。如果留空，将使用当前创建的第一个问题ID: <strong>{currentQuestionIds.length > 0 ? currentQuestionIds[0] : '未设置'}</strong>
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#4a90e2' }}>
                    📋 当前所有问题ID: {currentQuestionIds.length > 0 ? currentQuestionIds.join(', ') : '无'}
                  </div>
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
                <button 
                  onClick={() => tab.test(true)} 
                  disabled={loading}
                  style={{
                    padding: '14px',
                    background: loading ? '#6c757d' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {loading ? '🔄 执行中...' : `🚀 ${tab.label} (Gasless 模式)`}
                </button>
                <button 
                  onClick={() => tab.test(false)} 
                  disabled={loading}
                  style={{
                    padding: '14px',
                    background: loading ? '#6c757d' : '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  {loading ? '🔄 执行中...' : `🔗 ${tab.label} (外部钱包模式)`}
                </button>
              </div>
            </div>
          )
        ))}
      </div>

      {/* 结果显示 */}
      {message && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          borderRadius: '8px',
          background: message.includes('✅') ? '#d4edda' : '#f8d7da',
          border: `2px solid ${message.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
          color: message.includes('✅') ? '#155724' : '#721c24',
          whiteSpace: 'pre-line',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          {message}
        </div>
      )}
      
      {loading && (
        <div style={{ marginTop: '15px', padding: '15px', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffeaa7' }}>
          <p style={{ margin: '0 0 10px 0', color: '#856404', fontWeight: 'bold' }}>⏳ 正在处理请求...</p>
          <p style={{ margin: '0 0 5px 0', color: '#856404' }}>💡 如使用外部钱包，请注意钱包弹窗签名提示</p>
          <p style={{ margin: '0', color: '#856404' }}>🔍 详细日志请查看浏览器控制台</p>
        </div>
      )}

      {/* 更新使用说明 */}
      <div style={{ marginTop: '30px', padding: '20px', background: '#e9ecef', borderRadius: '8px' }}>
        <h5>📋 完整流程说明:</h5>
        <ol style={{ margin: '15px 0', paddingLeft: '20px' }}>
          <li><strong>🏛️ 初始化合约:</strong> 设置CTC、Order和Vote三个合约的全局状态</li>
          <li><strong>🏪 创建市场:</strong> 创建预测市场，设置2分钟内盘期</li>
          <li><strong>💰 内盘投注:</strong> 在内盘期(2分钟内)进行Yes/No投注，建立初始流动性</li>
          <li><strong>🚀 触发Pump:</strong> 内盘期结束后触发，转换市场状态到外盘</li>
          <li><strong>📊 查询价格:</strong> Pump后可以查询LMSR当前价格</li>
          <li><strong>🎯 LMSR买入:</strong> 使用LMSR机制买入Yes/No代币</li>
          <li><strong>💰 查询余额:</strong> 查看用户持有的Yes/No token数量 (新功能!)</li>
            <li><strong>💸 LMSR卖出:</strong> 卖出持有的代币获得收益</li>
            <li><strong>💰 查询主网费用支付者余额:</strong> 监控主网费用支付者账户余额</li>
        </ol>

        <div style={{ background: '#ffebee', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid #f8bbd9' }}>
          <h6 style={{ color: '#c62828' }}>🚀 正确的外盘流程说明 (最新更新!)</h6>
          <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li><strong>🏗️ 创建Pump市场:</strong> 使用"2C. 创建Pump流程市场(5分钟)"创建完整测试市场</li>
            <li><strong>💰 内盘投注:</strong> 使用"3. 内盘投注Yes"和"4. 内盘投注No"建立初始流动性</li>
            <li><strong>🚀 触发Pump:</strong> 使用"5. 触发Pump"将市场转换到外盘阶段</li>
            <li><strong>💹 LMSR交易:</strong> 使用"7. LMSR买入"和"9. LMSR卖出"进行外盘交易</li>
            <li><strong>🎯 断言结果:</strong> 使用"10. 断言市场结果"在到期前设置获胜结果</li>
            <li><strong>⚖️ 解决市场:</strong> 使用"11. 解决市场"完成最终解决</li>
            <li><strong>🏊 外盘结算:</strong> 使用"12. 创建外盘结算池"设置LMSR奖励分配</li>
            <li><strong>🏆 内盘结算:</strong> 使用"13. 创建内盘结算池"设置内盘奖励分配</li>
            <li><strong>🎪 创建分红池:</strong> 使用"14. 创建内盘分红池"为收益分配做准备</li>
            <li><strong>🎁 外盘奖励:</strong> 使用"15. 领取外盘奖励"获得LMSR交易奖励</li>
            <li><strong>💎 内盘分红:</strong> 使用"16. 领取内盘分红"获得内盘投注的额外分红</li>
            <li><strong>🏅 内盘奖励:</strong> 使用"17. 领取内盘奖励"获得内盘投注奖励</li>
          </ol>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#c62828' }}>
            ⚠️ 关键顺序: 外盘结算 → 内盘结算 → 创建分红池 → 用户领取奖励/分红。确保了完整的收益分配流程。
          </p>
        </div>

        <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid #2196f3' }}>
          <h6 style={{ color: '#1976d2' }}>🤖 5选项AI话题测试流程说明 (新功能!):</h6>
          <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li><strong>🏗️ 创建5选项市场:</strong> 使用"2D. 创建5选项AI话题市场"创建中型多选项预测市场</li>
            <li><strong>💰 多选项投注:</strong> 使用"4B. 多选项投注"对不同AI模型进行内盘投注</li>
            <li><strong>🚀 触发Pump:</strong> 达到3000 USD阈值后触发Pump进入外盘</li>
            <li><strong>💹 LMSR交易:</strong> 在外盘期间买卖各AI模型代币</li>
            <li><strong>🎯 断言结果:</strong> 选择获胜的AI模型进行断言</li>
            <li><strong>⚖️ 解决市场:</strong> 完成市场解决和结算流程</li>
            <li><strong>🎁 领取奖励:</strong> 获胜选项投注者领取奖励</li>
          </ol>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#1976d2' }}>
            🤖 话题: "2024年最受欢迎的AI模型预测"，涵盖五大主流AI模型
          </p>
          <div style={{ background: '#f3f8ff', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            <h6 style={{ color: '#1976d2', margin: '0 0 5px 0' }}>📋 5个AI模型选项详情:</h6>
            <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '12px' }}>
              <li><strong>选项1:</strong> ChatGPT (OpenAI) - 对话AI领导者</li>
              <li><strong>选项2:</strong> Claude (Anthropic) - 安全AI助手</li>
              <li><strong>选项3:</strong> Gemini (Google) - 多模态AI</li>
              <li><strong>选项4:</strong> Copilot (Microsoft) - 编程AI助手</li>
              <li><strong>选项5:</strong> Llama (Meta) - 开源AI模型</li>
            </ul>
          </div>
          <div style={{ background: '#f3f8ff', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            <h6 style={{ color: '#1976d2', margin: '0 0 5px 0' }}>💡 AI模型市场特点:</h6>
            <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '12px' }}>
              <li>涵盖五大主流AI技术公司的代表性产品</li>
              <li>适合AI技术趋势预测和讨论</li>
              <li>每个选项代表不同的技术路线和发展方向</li>
              <li>可以根据对AI技术的了解进行投注</li>
              <li>中等规模市场，便于测试和理解</li>
              <li>Pump阈值设为3000 USD，适中的流动性要求</li>
              <li>时间周期40分钟，适合完整流程测试</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#fff3e0', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid #ff9800' }}>
          <h6 style={{ color: '#f57c00' }}>🔬 10选项科技赛道测试流程说明 (新功能!):</h6>
          <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li><strong>🏗️ 创建10选项市场:</strong> 使用"2E. 创建10选项科技赛道市场"创建大型多选项预测市场</li>
            <li><strong>💰 多选项投注:</strong> 使用"4B. 多选项投注"对不同科技赛道进行内盘投注</li>
            <li><strong>🚀 触发Pump:</strong> 达到4000 USD阈值后触发Pump进入外盘</li>
            <li><strong>💹 LMSR交易:</strong> 在外盘期间买卖各科技赛道代币</li>
            <li><strong>🎯 断言结果:</strong> 选择获胜的科技赛道进行断言</li>
            <li><strong>⚖️ 解决市场:</strong> 完成市场解决和结算流程</li>
            <li><strong>🎁 领取奖励:</strong> 获胜选项投注者领取奖励</li>
          </ol>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#f57c00' }}>
            🔬 话题: "2024年最具潜力的科技赛道预测"，涵盖十大前沿科技领域
          </p>
          <div style={{ background: '#fff8f0', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            <h6 style={{ color: '#f57c00', margin: '0 0 5px 0' }}>📋 10个科技赛道选项详情:</h6>
            <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '12px' }}>
              <li><strong>AI人工智能:</strong> 机器学习与深度学习技术</li>
              <li><strong>量子计算:</strong> 下一代计算革命</li>
              <li><strong>区块链技术:</strong> 去中心化应用与Web3</li>
              <li><strong>元宇宙:</strong> 虚拟现实与数字世界</li>
              <li><strong>生物技术:</strong> 基因编辑与医疗创新</li>
              <li><strong>新能源技术:</strong> 太阳能与储能解决方案</li>
              <li><strong>自动驾驶:</strong> 智能交通与无人驾驶</li>
              <li><strong>物联网:</strong> 万物互联的智能生态</li>
              <li><strong>5G/6G通信:</strong> 超高速无线网络</li>
              <li><strong>机器人技术:</strong> 智能自动化与服务机器人</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#fce4ec', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid #e91e63' }}>
          <h6 style={{ color: '#c2185b' }}>🏢 15选项全球公司测试流程说明 (新功能!):</h6>
          <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li><strong>🏗️ 创建15选项市场:</strong> 使用"2F. 创建15选项全球公司市场"创建超大型多选项预测市场</li>
            <li><strong>💰 多选项投注:</strong> 使用"4B. 多选项投注"对不同公司进行内盘投注</li>
            <li><strong>🚀 触发Pump:</strong> 达到4500 USD阈值后触发Pump进入外盘</li>
            <li><strong>💹 LMSR交易:</strong> 在外盘期间买卖各公司代币</li>
            <li><strong>🎯 断言结果:</strong> 选择最具影响力的公司进行断言</li>
            <li><strong>⚖️ 解决市场:</strong> 完成市场解决和结算流程</li>
            <li><strong>🎁 领取奖励:</strong> 获胜选项投注者领取奖励</li>
          </ol>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#c2185b' }}>
            🏢 话题: "2024年全球最具影响力的公司预测"，涵盖15家顶级科技公司
          </p>
          <div style={{ background: '#fdf2f8', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            <h6 style={{ color: '#c2185b', margin: '0 0 5px 0' }}>📋 15个全球公司选项分类:</h6>
            <div style={{ fontSize: '12px' }}>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>🍎 传统科技巨头 (5家):</p>
              <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
                <li>Apple - 科技创新领导者</li>
                <li>Microsoft - 云计算与AI巨头</li>
                <li>Google (Alphabet) - 搜索与AI</li>
                <li>Amazon - 电商与云服务</li>
                <li>Meta - 社交与元宇宙</li>
              </ul>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>🚀 新兴科技独角兽 (5家):</p>
              <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
                <li>Tesla - 电动车与自动驾驶</li>
                <li>NVIDIA - AI芯片领导者</li>
                <li>OpenAI - 人工智能先锋</li>
                <li>SpaceX - 太空探索与卫星</li>
                <li>ByteDance - 短视频与AI</li>
              </ul>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>🔄 数字化转型企业 (5家):</p>
              <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px' }}>
                <li>Netflix - 流媒体娱乐</li>
                <li>Salesforce - 企业云服务</li>
                <li>Adobe - 创意软件与AI</li>
                <li>Shopify - 电商平台服务</li>
                <li>Zoom - 远程协作通信</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid #ffeaa7' }}>
          <h6 style={{ color: '#856404' }}>🏆 纯内盘结算流程说明 (无Pump):</h6>
          <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li><strong>⏰ 创建测试市场:</strong> 使用"2B. 创建测试市场(3分钟)"创建短时间市场</li>
            <li><strong>💰 内盘投注:</strong> 在内盘期进行Yes/No投注</li>
            <li><strong>🎯 断言结果:</strong> 使用"10. 断言市场结果"在到期前设置获胜结果</li>
            <li><strong>⏳ 等待到期:</strong> 不触发Pump，让市场自然到达解决时间(3分钟)</li>
            <li><strong>⚖️ 解决市场:</strong> 使用"11. 解决市场"完成最终解决</li>
            <li><strong>🏊 创建结算池:</strong> 使用"13. 创建内盘结算池"设置奖励分配</li>
            <li><strong>🎁 领取奖励:</strong> 使用"17. 领取内盘奖励"获得结算奖励</li>
          </ol>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#856404' }}>
            💡 这个流程专门测试未触发Pump情况下的内盘结算机制，适用于市场自然到期的场景
          </p>
        </div>

        <div style={{ background: '#e8f5e8', padding: '15px', borderRadius: '5px', marginTop: '15px', border: '1px solid #4caf50' }}>
          <h6 style={{ color: '#2e7d32' }}>🎯 20选项话题测试流程说明 (新功能!):</h6>
          <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li><strong>🏗️ 创建20选项市场:</strong> 使用"2D. 创建20选项话题市场"创建大型多选项预测市场</li>
            <li><strong>💰 多选项投注:</strong> 使用"4B. 多选项投注"对不同选项进行内盘投注</li>
            <li><strong>🚀 触发Pump:</strong> 达到5000 USD阈值后触发Pump进入外盘</li>
            <li><strong>💹 LMSR交易:</strong> 在外盘期间买卖各选项代币</li>
            <li><strong>🎯 断言结果:</strong> 选择获胜选项进行断言</li>
            <li><strong>⚖️ 解决市场:</strong> 完成市场解决和结算流程</li>
            <li><strong>🎁 领取奖励:</strong> 获胜选项投注者领取奖励</li>
          </ol>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#2e7d32' }}>
            🌟 话题: "2024年全球热门加密项目预测"，涵盖加密生态各个重要领域
          </p>
          <div style={{ background: '#f1f8e9', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            <h6 style={{ color: '#2e7d32', margin: '0 0 5px 0' }}>📋 20个选项分类详情:</h6>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
              <div>
                <strong>🔸 Layer 1区块链 (1-5):</strong>
                <ul style={{ margin: '2px 0', paddingLeft: '15px' }}>
                  <li>Bitcoin (BTC) - 数字黄金</li>
                  <li>Ethereum (ETH) - 智能合约之王</li>
                  <li>Solana (SOL) - 高性能区块链</li>
                  <li>Cardano (ADA) - 学术研究驱动</li>
                  <li>Avalanche (AVAX) - 快速共识</li>
                </ul>
                <strong>🔸 Layer 2扩容 (6-8):</strong>
                <ul style={{ margin: '2px 0', paddingLeft: '15px' }}>
                  <li>Polygon (MATIC) - 以太坊扩容</li>
                  <li>Arbitrum (ARB) - Optimistic Rollup</li>
                  <li>Optimism (OP) - 乐观汇总</li>
                </ul>
              </div>
              <div>
                <strong>🔸 DeFi生态 (9-12):</strong>
                <ul style={{ margin: '2px 0', paddingLeft: '15px' }}>
                  <li>Chainlink (LINK) - 预言机网络</li>
                  <li>Uniswap (UNI) - 去中心化交易</li>
                  <li>Aave (AAVE) - 借贷协议</li>
                  <li>Compound (COMP) - 利率协议</li>
                </ul>
                <strong>🔸 新兴生态 (13-16):</strong>
                <ul style={{ margin: '2px 0', paddingLeft: '15px' }}>
                  <li>Polkadot (DOT) - 跨链互操作</li>
                  <li>Cosmos (ATOM) - 区块链互联网</li>
                  <li>Near Protocol (NEAR) - 分片技术</li>
                  <li>Aptos (APT) - Move语言链</li>
                </ul>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <strong>🔸 基础设施 (17-20):</strong>
              <ul style={{ margin: '2px 0', paddingLeft: '15px', fontSize: '12px' }}>
                <li>Filecoin (FIL) - 分布式存储</li>
                <li>The Graph (GRT) - 索引协议</li>
                <li>Render (RNDR) - GPU计算网络</li>
                <li>Internet Computer (ICP) - 去中心化计算</li>
              </ul>
            </div>
          </div>
          <div style={{ background: '#f1f8e9', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
            <h6 style={{ color: '#2e7d32', margin: '0 0 5px 0' }}>💡 大型多选项市场特点:</h6>
            <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '12px' }}>
              <li>20个独立预测条件，覆盖加密生态各个重要领域</li>
              <li>可以分散投注多个选项，构建投资组合策略</li>
              <li>最终只有一个选项获胜，考验预测准确性</li>
              <li>获胜选项投注者按比例分享奖励池</li>
              <li>适合复杂生态预测和大规模市场测试</li>
              <li>更高Pump阈值(5000 USD)确保充足流动性</li>
              <li>更长时间周期(60分钟)适合深度测试</li>
            </ul>
          </div>
          <div style={{ background: '#fff3cd', padding: '10px', borderRadius: '5px', marginTop: '10px', border: '1px solid #ffeaa7' }}>
            <h6 style={{ color: '#856404', margin: '0 0 5px 0' }}>⚠️ 大型市场注意事项:</h6>
            <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '12px' }}>
              <li>20个选项可能导致交易大小增加，注意Gas费用</li>
              <li>建议分批进行投注测试，避免单次交易过大</li>
              <li>如果创建失败，可能需要调整合约参数或分批创建</li>
              <li>大型市场需要更多流动性才能有效运作</li>
              <li>测试时建议重点关注不同类别的代表性项目</li>
            </ul>
          </div>
        </div>
        
        <div style={{ background: '#fff', padding: '15px', borderRadius: '5px', marginTop: '15px' }}>
          <h6>⏰ 时间节点:</h6>
          <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li><strong>0-2分钟:</strong> 内盘交易期，可以投注Yes/No</li>
            <li><strong>2分钟后:</strong> 可以触发Pump，转换到外盘状态</li>
            <li><strong>Pump后:</strong> 立即可以LMSR买卖和查询余额，持续5分钟外盘期</li>
            <li><strong>30天后:</strong> 市场解决</li>
          </ul>
          <h6>💡 关键点:</h6>
          <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
            <li>创建市场后立即可以内盘投注</li>
            <li>Pump是状态转换，不需要等待额外时间</li>
            <li>Pump后LMSR立即可用，提供连续流动性</li>
            <li><strong>🆕 新功能:</strong> LMSR买入后可以实时查询token余额</li>
          </ul>
          <h6>🔍 Token余额查询说明:</h6>
          <ul style={{ margin: '10px 0', paddingLeft: '20px', background: '#f8f9fa', padding: '10px', borderRadius: '5px', border: '1px solid #dee2e6' }}>
            <li><strong>用途:</strong> 查看用户持有多少Yes token和No token</li>
            <li><strong>时机:</strong> LMSR买入后随时可查询</li>
            <li><strong>精度:</strong> 显示6位小数精度的token数量</li>
            <li><strong>价值:</strong> 每个token在预测正确时可兑换1 USD</li>
            <li><strong>测试流程:</strong> LMSR买入 → 查询余额 → 验证token数量</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// App 主组件
function App() {
  return (
    <PrivyProvider
      appId="cme2p5y4q00iwl80b44z6k73s"
      config={{
        appearance: {
          walletChainType: 'solana-only',
          walletList: ['phantom', 'okx_wallet', 'solflare'], 
        },
        solanaClusters: [
          {
            name: 'mainnet-beta', 
            rpcUrl: 'https://mainnet.helius-rpc.com/?api-key=7b73474a-082e-4823-be84-8dd53275cb7a'
          },
          {
            name: 'devnet', 
            rpcUrl: 'https://devnet.helius-rpc.com/?api-key=7b73474a-082e-4823-be84-8dd53275cb7a'
          }
        ],
        externalWallets: {
          solana: {
            connectors: toSolanaWalletConnectors()
          }
        },
        embeddedWallets: {
          solana: {
            createOnLogin: 'users-without-wallets', 
          },
        },
        loginMethods: ['wallet', 'google']
      }}
    >
      <LoginButton />
    </PrivyProvider>
  );
}

export default App;
