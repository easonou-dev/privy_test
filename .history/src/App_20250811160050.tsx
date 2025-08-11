import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';

// 修正 solconsdk 模块的导入路径，直接从包名导入所有公共 API 和类型
import SolConSdk, { // {{ edit_1 }}
  getEnvParams,
  QuestionOption,
  WalletInfo,
  PrivyWallet,
  PhantomWallet,
  ServerWallet,
  SupportedWalletType,
} from 'solconsdk';


// Privy 登录按钮组件
function LoginButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // 移除 useEffect 中关于 user.wallet 为 null 的处理，现在应该会自动创建
  useEffect(() => {
    if (user) {
      console.log('Privy user object in useEffect:', user);
      if (user.wallet) {
          console.log('Privy user.wallet in useEffect:', user.wallet);
          console.log('Privy user.wallet.address in useEffect:', user.wallet.address);
          console.log('Privy user.wallet.chainType in useEffect:', user.wallet.chainType);
          console.log('Privy user.wallet.walletClientType in useEffect:', user.wallet.walletClientType);
      } else {
          console.log('Privy user.wallet in useEffect is null or undefined.');
      }
    }
  }, [user]);

  // Use 'ready' to ensure Privy SDK is initialized as per docs:
  // https://docs.privy.io/basics/react-native/setup#waiting-for-privy-to-be-ready
  if (!ready) {
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

  let walletAddress: string | undefined;

  // 优先从 user.wallet 获取地址。user.wallet 是当前活跃连接的钱包。
  if (user.wallet && user.wallet.chainType === 'solana') {
    walletAddress = user.wallet.address;
  } else {
    // 备用方案：遍历 linkedAccounts 查找 Solana 类型的钱包账户
    const solanaLinkedWallet = user.linkedAccounts.find(
      (account): account is typeof account & { type: 'wallet'; chainType: 'solana'; address: string } =>
        account.type === 'wallet' && account.chainType === 'solana'
    );
    if (solanaLinkedWallet) {
      walletAddress = solanaLinkedWallet.address;
    }
  }

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
      {walletAddress && <CreateMarketTest user={user} />}
    </div>
  );
}

// 新的 CreateMarketTest 组件
function CreateMarketTest({ user }: { user: any }) {
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

  // 修正 1: commonEnv.FEE_PAYER 已经是 ServerWallet 实例
  const platformFeePayer = commonEnv.FEE_PAYER as ServerWallet; // {{ edit_1 }}

  const handleCreateMarket = async (isGaslessTest: boolean) => {
    setLoading(true);
    setMessage('');
    try {
      if (!user || !user.wallet) {
        setMessage('错误: 用户未连接钱包.');
        setLoading(false);
        return;
      }

      let authorityWalletInfo: WalletInfo;
      // 修正 3 & 4: 修正 PrivyWallet 和 PhantomWallet 构造函数参数
      if (isGaslessTest) {
        // Gasless 模式 (Privy 嵌入式钱包)
        if (user.wallet.walletClientType !== SupportedWalletType.PRIVY || !user.wallet.walletClientType.includes('embedded')) {
            setMessage('错误: 请使用 Privy 嵌入式钱包 (如谷歌登录) 测试 Gasless 模式。');
            setLoading(false);
            return;
        }
        authorityWalletInfo = new PrivyWallet(user.wallet, new PublicKey(user.wallet.address), true); // {{ edit_2 }}
      } else {
        // Non-Gasless 模式 (Phantom 或 Privy 连接的外部钱包)
        if (user.wallet.walletClientType === SupportedWalletType.PRIVY && user.wallet.walletClientType.includes('embedded')) {
            setMessage('错误: 请使用外部钱包 (如 Phantom) 测试 Non-Gasless 模式。');
            setLoading(false);
            return;
        }
        // 对于 Phantom 或 Privy 连接的外部钱包 (非 Gasless)
        if (user.wallet.walletClientType === SupportedWalletType.PHANTOM_ADAPTER) {
            authorityWalletInfo = new PhantomWallet(new PublicKey(user.wallet.address)); // {{ edit_3 }}
        } else {
            // 假设其他 Privy 连接的外部钱包也是 non-gasless
            authorityWalletInfo = new PrivyWallet(user.wallet, new PublicKey(user.wallet.address), false); // {{ edit_4 }}
        }
      }

      
      const predictionMarket = SolConSdk.getPredictionMarketByEnv("devnet"); // {{ edit_6 }}

      // 设置 PredictionMarket 的 feePayer 和 network
      predictionMarket.setFeePayer(platformFeePayer);
      predictionMarket.setNetwork("devnet"); // {{ edit_1 }}

      // 如果有全局查找表，设置它
      if (commonEnv.GLOBAL_LOOKUP_TABLE) {
          predictionMarket.setGlobalLookupTable(new PublicKey(commonEnv.GLOBAL_LOOKUP_TABLE)); // {{ edit_9 }}
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
          walletList: ['phantom', 'okx_wallet', 'solflare'], // 移除了 wallet_connect
        },
        externalWallets: {
          solana: {
            connectors: toSolanaWalletConnectors(),
          },
        },
        embeddedWallets: {
          solana: {
            createOnLogin: 'users-without-wallets', // 保留此配置，因为它对 Privy 模态框登录有效
          },
        },
        loginMethods: ['google', 'email', 'sms', 'wallet'],
      }}
    >
      <LoginButton />
    </PrivyProvider>
  );
}

export default App;
