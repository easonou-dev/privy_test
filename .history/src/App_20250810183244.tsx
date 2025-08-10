import { PrivyProvider, usePrivy, useLoginWithOAuth } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import React from 'react';
// import { PublicKey } from '@solana/web3.js'; // 暂时不需要，因为不涉及 SDK 调用

// Privy 登录按钮组件
function LoginButton() {
  // 修复: getAccessToken 应直接从 usePrivy 解构
  const { ready, authenticated, user, login, logout, getAccessToken } = usePrivy();
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

  // ==== 修复 “user”可能为 “null” 的错误 ====
  if (!user) {
    return <div>用户信息加载中...</div>;
  }

  // 用户已认证且 user 对象存在，现在尝试获取 Solana 钱包地址
  let walletAddress: string | undefined;

  // 修复: 直接检查 user.wallet 是否是 Solana 类型，并获取其地址
  // user.wallet 是 ConnectedWallet | null 类型，ConnectedWallet 有 address 和 chain 属性
  if (user.wallet && user.wallet.chain?.namespace === 'solana') {
    walletAddress = user.wallet.address;
  } else {
    // 备用方案：遍历 linkedAccounts 查找 Solana 类型的钱包账户
    // Privy 嵌入式钱包会以 `type: 'wallet'` 的形式存在于 linkedAccounts 中
    const solanaLinkedWallet = user.linkedAccounts.find(
      (account) => account.type === 'wallet' && account.chain?.namespace === 'solana'
    );
    if (solanaLinkedWallet) {
      walletAddress = solanaLinkedWallet.address;
    }
  }

  // 打印完整的 user 对象，使用 JSON.stringify 确保能复制到控制台
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
        // 修复：'phone' 不是一个有效的 loginMethod，改为 'sms'
        loginMethods: ['google', 'email', 'sms', 'wallet'],
      }}
    >
      <LoginButton />
      {/* 暂时不显示创建话题的按钮 */}
    </PrivyProvider>
  );
}

export default App;
