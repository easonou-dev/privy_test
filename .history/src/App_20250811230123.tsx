import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import { toSolanaWalletConnectors, useSolanaWallets } from '@privy-io/react-auth/solana';
import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';



// 导入SolConSdk及其相关类型
import SolConSdk, { getEnvParams, PrivyWallet } from 'solconsdk';


// Privy 登录按钮组件
function LoginButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets: solanaWallets, ready: solanaReady } = useSolanaWallets();

  // 使用 useSolanaWallets 来获取钱包信息
  useEffect(() => {
    if (user) {
      console.log('Privy user object in useEffect:', user);
    }
    if (solanaWallets && solanaWallets.length > 0) {
      console.log('Solana wallets:', solanaWallets);
      solanaWallets.forEach((wallet, index) => {
        console.log(`Solana wallet ${index}:`, {
          address: wallet.address,
          connectorType: wallet.connectorType,
          imported: wallet.imported
        });
      });
    }
  }, [user, solanaWallets]);

  // Use 'ready' to ensure Privy SDK is initialized as per docs:
  // https://docs.privy.io/basics/react-native/setup#waiting-for-privy-to-be-ready
  if (!ready || !solanaReady) {
    return <div>加载中...</div>;
  }

  if (!authenticated) {
    return (
      // 只保留 Privy 模态框登录按钮
      <button onClick={login}>登录 (Privy 模态框)</button>
    );
  }

  // User is authenticated, but 'user' object might still be null/undefined immediately after authentication
  if (!user) {
    return <div>用户信息加载中...</div>;
  }

  // 优先选择嵌入式钱包，如果没有则选择第一个钱包
  const embeddedWallet = solanaWallets?.find(wallet => wallet.connectorType === 'embedded');
  const primaryWallet = embeddedWallet || (solanaWallets && solanaWallets.length > 0 ? solanaWallets[0] : null);
  const walletAddress = primaryWallet?.address;
  
  console.log('Selected primary wallet:', primaryWallet);
  console.log('Available wallets:', solanaWallets);

  console.log('Full Privy user object (stringified, render):', JSON.stringify(user, null, 2));

  return (
    <div>
      <p>您已成功登录！</p>
      {walletAddress ? (
        <p>钱包地址: {walletAddress}</p>
      ) : (
        // 移除手动创建钱包的提示和按钮，因为现在应该会自动创建
        <p>未能找到 Solana 钱包地址。请尝试重新登录或检查 Privy 配置。</p>
      )}
      <button onClick={logout}>登出</button>
      {/* 渲染 CreateMarketTest 组件 */}
      {walletAddress && <CreateMarketTest user={user} solanaWallets={solanaWallets} />}
    </div>
  );
}

// 新的 CreateMarketTest 组件
function CreateMarketTest({ solanaWallets }: { user: any; solanaWallets: any[] }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createMarketData = {
    marketId: `market-${Date.now()}`,
    marketName: `Test Market ${Date.now()}`,
    resolutionTime: Math.floor(Date.now() / 1000) + 3600 * 24 * 7, // 7天后
    questions: [
      {
        questionId: `q1-${Date.now()}`,
        questionName: 'Question 1: Will SOL hit $200 by end of year?',
        questionResolutionTime: Math.floor(Date.now() / 1000) + 3600 * 24 * 3, // 3天后
        positionCount: 2,
      },
      {
        questionId: `q2-${Date.now()}`,
        questionName: 'Question 2: Will BTC hit $100k by end of year?',
        questionResolutionTime: Math.floor(Date.now() / 1000) + 3600 * 24 * 5, // 5天后
        positionCount: 2,
      },
    ],
  };

  const commonEnv = getEnvParams("devnet"); // 获取环境参数

  // 修正: commonEnv.FEE_PAYER 已经是 ServerWallet 实例
  const platformFeePayer = commonEnv.FEE_PAYER; // 使用any类型避免类型检查问题

  const handleCreateMarket = async (isGaslessTest: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!solanaWallets || solanaWallets.length === 0) {
        setMessage('错误: 未找到 Solana 钱包.');
        setLoading(false);
        return;
      }

      // 根据操作模式智能选择钱包
      let selectedWallet: any;
      let authorityWalletInfo: any; // 使用any类型避免类型检查问题
      
      if (isGaslessTest) {
        // Gasless 模式：优先选择嵌入式钱包
        selectedWallet = solanaWallets.find(wallet => wallet.connectorType === 'embedded');
        if (!selectedWallet) {
            setMessage('错误: 未找到 Privy 嵌入式钱包。请使用谷歌登录创建嵌入式钱包。');
            setLoading(false);
            return;
        }
        
        // 使用SDK提供的PrivyWallet
        authorityWalletInfo = new PrivyWallet(selectedWallet, new PublicKey(selectedWallet.address), true);
        console.log('创建的钱包适配器 (Gasless):', authorityWalletInfo);
      } else {
        // Non-Gasless 模式：优先选择外部钱包
        selectedWallet = solanaWallets.find(wallet => wallet.connectorType !== 'embedded');
        if (!selectedWallet) {
            setMessage('错误: 未找到外部钱包。请连接 Phantom 或其他外部钱包。');
            setLoading(false);
            return;
        }
        
        // 对于外部钱包，检查钱包类型
        console.log('外部钱包对象:', selectedWallet);
        console.log('钱包连接器类型:', selectedWallet.connectorType);
        
        // 使用SDK提供的PrivyWallet处理外部钱包
        authorityWalletInfo = new PrivyWallet(selectedWallet, new PublicKey(selectedWallet.address), false);
        console.log('创建的钱包适配器 (Non-Gasless):', authorityWalletInfo);
      }
      
      console.log('Selected wallet for operation:', selectedWallet);
      console.log('Operation mode:', isGaslessTest ? 'Gasless' : 'Non-Gasless');

      
      const predictionMarket = SolConSdk.getPredictionMarketByEnv("devnet"); // {{ edit_6 }}

      // 设置 PredictionMarket 的 feePayer 和 network
      predictionMarket.setFeePayer(platformFeePayer);
      predictionMarket.setNetwork("devnet"); // {{ edit_1 }}

      // 如果有全局查找表，设置它
      if (commonEnv.GLOBAL_LOOKUP_TABLE) {
          predictionMarket.setGlobalLookupTable(new PublicKey(commonEnv.GLOBAL_LOOKUP_TABLE)); // {{ edit_9 }}
      }

      // 为钱包设置Connection
      if (authorityWalletInfo && authorityWalletInfo.setConnection) {
        authorityWalletInfo.setConnection(predictionMarket.getConnection());
        console.log('已为钱包设置Connection');
      }


      console.log(`正在使用 ${isGaslessTest ? 'Gasless' : 'Non-Gasless'} 模式创建市场...`);
      console.log('Authority WalletInfo type:', authorityWalletInfo.type);
      console.log('Market Data:', createMarketData);

      // 修正 2: 在 PredictionMarket 实例上调用方法
      const result = await predictionMarket.createMarketAndQuestionsAuto( // {{ edit_10 }}
        authorityWalletInfo,
        createMarketData.marketId,
        createMarketData.marketName,
        createMarketData.resolutionTime,
        createMarketData.questions
      );

      setMessage(`市场创建成功！签名: ${result.signatures.join(', ')}`);
      console.log('市场创建结果:', result);
    } catch (error: any) {
      console.error('创建市场失败:', error);
      setMessage(`创建市场失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
      <h3>Solana 市场创建测试</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={() => handleCreateMarket(true)} disabled={loading}>
          {loading ? '创建中...' : '创建市场 (Gasless)'}
        </button>
        <button onClick={() => handleCreateMarket(false)} disabled={loading}>
          {loading ? '创建中...' : '创建市场 (Non-Gasless / Phantom)'}
        </button>
      </div>
      {message && <p style={{ marginTop: '10px', color: loading ? 'orange' : 'green' }}>{message}</p>}
      {loading && <p>请检查控制台获取更多详情和钱包签名提示...</p>}
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
            connectors: toSolanaWalletConnectors() // 用于检测外部钱包
          }
        },
        embeddedWallets: {
          solana: {
            createOnLogin: 'users-without-wallets', 
          },
        },
        loginMethods: ['wallet', 'email', 'google', 'sms']
      }}
    >
      <LoginButton />
    </PrivyProvider>
  );
}

export default App;
