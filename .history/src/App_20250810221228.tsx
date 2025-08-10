import { PrivyProvider, usePrivy, useLoginWithOAuth } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { useEffect } from 'react';


// Privy 登录按钮组件
function LoginButton() {
  const { ready, authenticated, user, login, logout, createWallet } = usePrivy();
  const { initOAuth } = useLoginWithOAuth();

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
          // 对于直接 OAuth 登录，createOnLogin 无效，钱包需要手动创建
          // 如果用户已认证但没有钱包，可以考虑在这里显示一个“创建钱包”的提示或按钮
      }
    }
  }, [user]);

  // Use 'ready' to ensure Privy SDK is initialized as per docs:
  // https://docs.privy.io/basics/react-native/setup#waiting-for-privy-to-be-ready
  if (!ready) {
    return <div>加载中...</div>;
  }

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
        // {{ edit_2 }}
        <div>
          <p>未能找到 Solana 钱包地址。请尝试重新登录或检查 Privy 配置。</p>
          <p>对于通过 Google 直接登录，Privy 不会自动创建嵌入式钱包。</p>
          <button onClick={createWallet}>点击这里创建您的嵌入式钱包</button> {/* {{ edit_3 }} */}
        </div>
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
        embeddedWallets: {
          solana: {
            // createOnLogin: 'users-without-wallets', // 对于直接 OAuth 登录无效，因此注释掉
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
