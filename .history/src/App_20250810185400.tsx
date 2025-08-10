import { PrivyProvider, usePrivy, useLoginWithOAuth } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import React, { useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';


// Privy 登录按钮组件
function LoginButton() {
  const { ready, authenticated, user, login, logout, getAccessToken } = usePrivy();
  const { initOAuth } = useLoginWithOAuth();

  // 使用 useEffect 监听 user 对象的变化，并在变化时打印 user.wallet 的详细信息
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
  }, [user]); // 依赖 user 对象，当 user 变化时触发

  if (!ready) return <div>加载中...</div>;

  const handleGoogleLogin = async () => {
    try {
      await initOAuth({ provider: 'google' });
    } catch (err) {
      console.error(err);
    }
  };

  if (!authenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={login}>登录 (Privy 模态框)</button>
        <button onClick={handleGoogleLogin}>使用 Google 登录 (直接)</button>
      </div>
    );
  }

  // 用户已认证，但 user 对象可能还在加载中
  if (!user) {
    return <div>用户信息加载中...</div>;
  }

  // ==== 核心修复：确保 user.wallet 存在且已准备好再尝试获取地址 ====
  let walletAddress: string | undefined;

  // 1. 检查 user.wallet 是否存在且已连接（即 not null/undefined）
  if (user.wallet) {
    // 2. 检查 user.wallet 的链类型是否是 Solana
    if (user.wallet.chainType==='solana') {
      walletAddress = user.wallet.address;
    } else {
      // 3. 如果 user.wallet 不是 Solana 类型，或者其链信息不完整，
      // 则遍历 linkedAccounts 查找类型为 'wallet' 且链命名空间为 'solana' 的账户
      const solanaLinkedWallet = user.linkedAccounts.find(
        (account): account is typeof account & { type: 'wallet'; chainType: 'solana'; address: string } =>
          account.type === 'wallet' && account.chainType=== 'solana'
      );
      if (solanaLinkedWallet) {
        walletAddress = solanaLinkedWallet.address;
      }
    }
  }

  // 打印完整的 user 对象，使用 JSON.stringify 确保能复制到控制台
  console.log('Full Privy user object (stringified, render):', JSON.stringify(user, null, 2));

  return (
    <div>
      <p>您已成功登录！</p>
      {walletAddress ? (
        <p>钱包地址: {walletAddress}</p>
      ) : (
        // 如果仍然没有找到地址，给用户明确提示
        <p>未能找到 Solana 钱包地址。请尝试重新登录或检查 Privy 配置。如果此问题持续存在，可能是 Privy 嵌入式钱包初始化失败。</p>
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
        // ==== 修正 embeddedWallets 配置：移除 createOnLogin 和 requireEoaOnLink ==== {{ edit_1 }}
        embeddedWallets: {
          noPromptOnSignature: false, // 如果需要用户确认签名，设置为 false
        },
        // ======================================
        loginMethods: ['google', 'email', 'sms', 'wallet'],
      }}
    >
      <LoginButton />
    </PrivyProvider>
  );
}

export default App;
