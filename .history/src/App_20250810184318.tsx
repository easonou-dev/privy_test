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

  // 确保 user 对象存在，避免运行时错误
  if (!user) {
    return <div>用户信息加载中...</div>;
  }

  // 尝试从 user.wallet 获取 Solana 钱包地址
  // user.wallet 是 ConnectedWallet | null 类型，ConnectedWallet 具有 address 和 chain 属性
  let walletAddress: string | undefined;
  if (user.wallet && user.wallet.chain?.namespace === 'solana') {
    walletAddress = user.wallet.address;
  } else {
    // 备用方案：遍历 linkedAccounts 查找 Solana 类型的钱包账户
    // Privy 嵌入式钱包会以 `type: 'wallet'` 的形式存在于 linkedAccounts 中。
    // 使用类型谓词确保 TypeScript 知道 account 是 WalletWithMetadata
    const solanaLinkedWallet = user.linkedAccounts.find(
      (account): account is typeof account & { type: 'wallet'; chainType: 'solana'; address: string } =>
        account.type === 'wallet' && account.chain?.namespace === 'solana'
    );
    if (solanaLinkedWallet) {
      walletAddress = solanaLinkedWallet.address;
    }
  }

  // 打印完整的 user 对象，使用 JSON.stringify 确保能复制到控制台
  // 这对调试 `user` 对象的实际结构非常有用
  console.log('Full Privy user object (stringified, render):', JSON.stringify(user, null, 2));

  return (
    <div>
      <p>您已成功登录！</p>
      {walletAddress ? (
        <p>钱包地址: {walletAddress}</p>
      ) : (
        // 如果没有找到地址，给用户更明确的提示
        <p>未能找到 Solana 钱包地址。请检查 Privy 集成和浏览器控制台的日志。</p>
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
