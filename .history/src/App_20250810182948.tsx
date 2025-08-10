import { PrivyProvider, usePrivy, useLoginWithOAuth } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import React from 'react';
import { PublicKey } from '@solana/web3.js'; // 这里需要 PublicKey，因为 CreateTopicButtons 会用到


// Privy 登录按钮组件
function LoginButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { initOAuth } = useLoginWithOAuth();

  if (!ready) return <div>加载中...</div>;

  const handleLogin = async () => {
    try {
      await initOAuth({ provider: 'google' }); // 触发谷歌 OAuth 登录流程
    } catch (err) {
      console.error(err);
    }
  };

  if (!authenticated) {
    return <button onClick={handleLogin}>使用 Google 登录</button>;
  }

  // 用户已认证，尝试获取 Solana 钱包地址
  let walletAddress: string | undefined;

  // 优先从 user.wallet 获取地址，这对于外部钱包通常是直接的
  // 对于 Privy 嵌入式钱包，user.wallet 结构也应该包含其地址
  if (user.wallet && user.wallet.chain?.namespace === 'solana') {
    walletAddress = user.wallet.address;
  } else if (user.linkedAccounts) {
    // 如果 user.wallet 不直接提供 Solana 地址，遍历 linkedAccounts 查找
    // 查找 type 为 'wallet' 且链命名空间为 'solana' 的账户，这通常是嵌入式钱包
    const embeddedSolanaWallet = user.linkedAccounts.find(
      (account) => account.type === 'wallet' && account.chain?.namespace === 'solana'
    );
    if (embeddedSolanaWallet) {
      walletAddress = embeddedSolanaWallet.address;
    }
  }

  // 打印完整的 user 对象，使用 JSON.stringify 确保能复制
  // 这将帮助我们看到完整的结构，即使浏览器控制台默认不展开
  console.log('Full Privy user object (stringified):', JSON.stringify(user, null, 2));

  return (
    <div>
      <p>您已成功登录！</p>
      {walletAddress ? (
        <p>钱包地址: {walletAddress}</p>
      ) : (
        <p>未能找到 Solana 钱包地址。请尝试重新登录或检查 Privy 配置。</p>
      )}
      <button onClick={logout}>登出</button>
    </div>
  );
}

// 这个组件用于触发不同类型钱包的创建话题功能
// 请确保 `solConSdk` 的导入路径正确
// `../solConSdk/src` 应该是你的 SDK 的根目录
import SolConSdk, { ENV_PARAMS, getEnvParams, QuestionOption } from '../solConSdk/src';
import { PhantomWallet, PrivyWallet, MatrixOptions, ServerWallet } from '../solConSdk/src/common/walletInfo';


function CreateTopicButtons() {
  const { ready, authenticated, user } = usePrivy();

  // Privy 谷歌托管式钱包（代付 Gas） - 需要后端支持
  const handleCreateTopicWithGasless = async () => {
    if (!ready || !authenticated || !user || !user.wallet) {
        alert("请先登录 Privy 账户。");
        return;
    }

    const connectedSolanaWallet = user.wallet.solana; // 对于 Privy 外部钱包，这是首选
    let privyEmbeddedWalletAddress: PublicKey | undefined;

    // 如果 connectedSolanaWallet 不存在或不是 privy 类型，尝试从 linkedAccounts 查找嵌入式钱包
    if (!connectedSolanaWallet || connectedSolanaWallet.walletClientType !== "privy") {
        const embeddedSolanaAccount = user.linkedAccounts.find(
            (account) => account.type === 'wallet' && account.chain?.namespace === 'solana'
        );
        if (embeddedSolanaAccount) {
            privyEmbeddedWalletAddress = new PublicKey(embeddedSolanaAccount.address);
        }
    } else {
        // 如果 connectedSolanaWallet 存在且是 privy 类型（外部钱包），我们也可以使用它的地址
        privyEmbeddedWalletAddress = new PublicKey(connectedSolanaWallet.address);
    }


    if (!privyEmbeddedWalletAddress) {
        alert("未能找到 Privy 嵌入式 Solana 钱包地址。请确保您已通过谷歌登录。");
        return;
    }

    // 再次确认是 Privy 嵌入式钱包
    // 这里我们假设如果拿到了 privyEmbeddedWalletAddress，就是 Privy 嵌入式钱包
    // 如果你要严格区分，需要结合 user.wallet.walletClientType 来判断
    if (user.wallet && user.wallet.walletClientType === 'privy') {
        console.log("检测到 Privy 嵌入式钱包 (谷歌登录)。将使用后端代付 Gas。");
    } else {
        alert("当前未连接 Privy 嵌入式钱包（谷歌登录）。此功能需要 Gas 代付后端支持。");
        return;
    }

    try {
      const marketId = "my-gasless-market-" + Date.now().toString().slice(-6);
      const marketName = "我的免 Gas 预测市场";
      const resolutionTime = Math.floor(Date.now() / 1000) + 3600 * 24 * 7; // 一周后

      const questions: QuestionOption[] = [
        {
          questionId: "glq1-" + Date.now().toString().slice(-4),
          questionName: "免 Gas 问题一：今天会下雨吗？",
          questionResolutionTime: resolutionTime + 3600,
          positionCount: 2,
        },
      ];

      console.log("准备通过后端创建市场和问题 (Privy 谷歌托管式，Gas 代付)，数据：", { marketId, marketName, resolutionTime, questions });

      const response = await fetch('http://localhost:3001/api/create-topic-gasless', { // 确保这里的 URL 与你后端服务器匹配
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getAccessToken()}`, // 传递认证 token 给后端
        },
        body: JSON.stringify({
          marketId,
          marketName,
          resolutionTime,
          questions,
          authorityPublicKey: privyEmbeddedWalletAddress.toBase58(), // 发送用户 PublicKey 到后端
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`后端创建话题失败: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const result = await response.json();
      console.log('市场和话题已成功创建 (Gas 代付)。交易签名：', result.signatures);
      alert('市场和话题已成功创建 (Gas 代付)！请检查控制台。');

    } catch (error) {
      console.error('创建话题失败:', error);
      alert('创建话题失败：' + (error as Error).message);
    }
  };

  // Privy Phantom 钱包（用户支付 Gas） - 纯前端
  const handleCreateTopicWithPhantom = async () => {
    if (!ready || !authenticated || !user || !user.wallet) {
        alert("请先登录 Privy 账户。");
        return;
    }

    const connectedSolanaWallet = user.wallet.solana;
    if (!connectedSolanaWallet || connectedSolanaWallet.walletClientType === "privy") {
      alert("当前连接的是 Privy 嵌入式钱包，请连接 Phantom 钱包进行测试。");
      console.warn("当前连接的是 Privy 嵌入式钱包，无法测试 Phantom 钱包。");
      return;
    }

    try {
      // 1. 创建 PhantomWallet 实例作为 authority 和 feePayer
      const phantomWallet = new PhantomWallet(new PublicKey(connectedSolanaWallet.address));

      // 2. 获取环境参数 (选择你的环境，例如 "devnet")
      const env = "devnet";
      const envParams: ENV_PARAMS = getEnvParams(env);

      // 3. 初始化 PredictionMarket 实例
      const predictionMarket = new SolConSdk(
        phantomWallet, // 👈 传入 PhantomWallet 作为 feePayer
        envParams.RPC_URL,
        envParams.WS_URL,
        envParams.COLLATERAL_MINT,
        envParams.BROADCAST_URL,
        envParams.MIN_PRIORITY_FEE,
        envParams.MAX_PRIORITY_FEE
      );

      // 4. 设置全局查找表 (如果需要)
      predictionMarket.setGlobalLookupTable(envParams.GLOBAL_LOOKUP_TABLE);

      const marketId = "my-phantom-market-" + Date.now().toString().slice(-6);
      const marketName = "我的 Phantom 预测市场";
      const resolutionTime = Math.floor(Date.now() / 1000) + 3600 * 24 * 7;

      const questions: QuestionOption[] = [
        {
          questionId: "pq1-" + Date.now().toString().slice(-4),
          questionName: "Phantom 问题一：这是一个测试问题吗？",
          questionResolutionTime: resolutionTime + 3600,
          positionCount: 2,
        },
      ];

      console.log("准备创建市场和问题 (Phantom 钱包，用户支付 Gas)，数据：", { marketId, marketName, resolutionTime, questions });

      // 5. 调用 createMarketAndQuestionsPhantom
      const result = await predictionMarket.createMarketAndQuestionsPhantom(
        phantomWallet, // 传入 PhantomWallet 作为 authority
        marketId,
        marketName,
        resolutionTime,
        questions
      );

      console.log('市场和话题已成功创建 (用户支付 Gas)。交易签名：', result.signatures);
      alert('市场和话题已成功创建！请检查 Phantom 钱包确认交易。');

    } catch (error) {
      console.error('创建话题失败:', error);
      alert('创建话题失败：' + (error as Error).message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
      <button onClick={handleCreateTopicWithGasless} disabled={!ready || !authenticated}>
        创建话题 (Privy 谷歌代付 Gas)
      </button>
      <button onClick={handleCreateTopicWithPhantom} disabled={!ready || !authenticated}>
        创建话题 (Privy Phantom 用户支付 Gas)
      </button>
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
          walletChainType: 'ethereum-and-solana',
          walletList: ['phantom', 'metamask', 'wallet_connect', 'okx_wallet', 'coinbase_wallet'],
        },
        externalWallets: {
          solana: {
            connectors: toSolanaWalletConnectors(),
          },
        },
        loginMethods: ['google', 'email', 'phone', 'wallet'], // 确保包含 'google' 和 'wallet'
      }}
    >
      <LoginButton />
      <CreateTopicButtons /> {/* 重新添加按钮组件 */}
    </PrivyProvider>
  );
}

export default App;
