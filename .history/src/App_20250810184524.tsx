import { PrivyProvider, usePrivy, useLoginWithOAuth } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import React, { useEffect } from 'react'; // 导入 useEffect


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

  // 修复：将 handleLogin 改为触发 Google OAuth 的单独按钮
  const handleGoogleLogin = async () => {
    try {
      await initOAuth({ provider: 'google' });
    } catch (err) {
      console.error(err);
    }
  };

  if (!authenticated) {
    return (
      // {{ edit_1 }}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={login}>登录 (Privy 模态框)</button> {/* 恢复通用登录按钮 */}
        <button onClick={handleGoogleLogin}>使用 Google 登录 (直接)</button> {/* 独立的 Google 登录按钮 */}
      </div>
    );
  }

  if (!user) {
    return <div>用户信息加载中...</div>;
  }

  let walletAddress: string | undefined;

  if (user.wallet && user.wallet.chainType === 'solana') { // 修复：使用 chainType
    walletAddress = user.wallet.address;
  } else {
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
        // 确保包含 'google' 和 'wallet'，且 'phone' 已更正为 'sms'
        loginMethods: ['google', 'email', 'sms', 'wallet'],
      }}
    >
      <LoginButton />
      {/* 暂时不显示创建话题的按钮 */}
    </PrivyProvider>
  );
}

export default App;
