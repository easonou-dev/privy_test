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

  if (!authenticated) return <button onClick={handleLogin}>使用 Google 登录</button>;

  // 获取钱包地址的逻辑
  let walletAddress: string | undefined;
  if (user?.wallet?.address) { // 如果 Privy 的 user.wallet 直接提供了地址 (通常用于外部钱包)
    walletAddress = user.wallet.address;
  } else if (user?.linkedAccounts) { // 如果是嵌入式钱包，从 linkedAccounts 查找
    // 查找类型为 'wallet' 且链类型为 'solana' 的 linkedAccount
    const embeddedWallet = user.linkedAccounts.find(
      (account) => account.type === 'wallet' && account.chainType === 'solana'
    );
    if (embeddedWallet) {
      walletAddress = embeddedWallet.address;
    } else {
      // 如果没有找到 'wallet' 类型的 Solana 账户，尝试查找 'oauth' 类型的账户
      // 注意：OAuth 账户本身可能没有直接的地址属性，它会关联一个 embedded wallet
      // Privy 的 embedded wallet 地址通常在 user.wallets[0].address (对于嵌入式)
      // 但为了兼容性，我们直接从 user.wallet 获取，如果 user.wallet 存在。
      // 对于 Privy 嵌入式钱包，其地址通常位于 user.wallet.address
      // 如果 user.wallet.address 不存在，那么可能是 linkedAccounts 中的某个具有 address 属性
      // 检查 user.linkedAccounts 中是否有 type 为 'wallet' 的账户
      const privyEmbeddedSolanaWallet = user.linkedAccounts.find(
        (account) => account.type === 'wallet' && account.chain?.namespace === 'solana'
      );
      if (privyEmbeddedSolanaWallet) {
        walletAddress = privyEmbeddedSolanaWallet.address;
      }
    }
  }

  console.log('Privy user object:', user); // 保持此行用于调试

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
