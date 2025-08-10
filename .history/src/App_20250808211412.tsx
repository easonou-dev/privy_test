import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import React from 'react';

function LoginButton() {
  const { ready, authenticated, login, logout } = usePrivy();

  if (!ready) return <div>加载中...</div>;
  if (!authenticated) return <button onClick={login}>登录</button>;

  return (
    <div>
      <p>您已成功登录！</p>
      <button onClick={logout}>登出</button>
    </div>
  );
}

function App() {
  return (
    <PrivyProvider appId="cme2p5y4q00iwl80b44z6k73s">
      <LoginButton />
    </PrivyProvider>
  );
}

export default App;
