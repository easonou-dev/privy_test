import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import { useEffect } from 'react';


// Privy 登录按钮组件
function LoginButton() {
  // 移除 createWallet，因为现在依赖模态框的自动创建
  const { ready, authenticated, user, login, logout } = usePrivy();
  // 移除 initOAuth 的声明，因为它不再被使用
  // const { initOAuth } = useLoginWithOAuth();

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

  // 移除 handleGoogleLogin 函数，因为不再需要直接的谷歌登录按钮

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
          walletChainType: 'solana',
          walletList: ['phantom',  'okx_wallet', 'solflare',],
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
