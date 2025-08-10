import { PrivyProvider, usePrivy, useLoginWithOAuth } from '@privy-io/react-auth';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import React from 'react';

function LoginButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { initOAuth } = useLoginWithOAuth();

  if (!ready) return <div>加载中...</div>;

  const handleLogin = async () => {
    try {
      await initOAuth({ provider: 'google' });
    } catch (err) {
      console.error(err);
    }
  };

  if (!authenticated) return <button onClick={login}>登录</button>;

  const walletAddress = user?.wallet?.solana?.address;

  return (
    <div>
      <p>您已成功登录！</p>
      {walletAddress && <p>钱包地址: {walletAddress}</p>}
      <button onClick={logout}>登出</button>
    </div>
  );
}

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
      }}
    >
      <LoginButton />
    </PrivyProvider>
  );
}

export default App;
