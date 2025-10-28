// 首先导入polyfill
try {
  await import('./polyfill');
  console.log('✅ Polyfill loaded');
} catch (error) {
  console.error('❌ Polyfill error:', error);
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';

console.log('🚀 main.tsx is loading...');

const root = document.getElementById('root');
console.log('📍 Root element:', root);

if (root) {
  console.log('✅ Creating React root...');
  
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log('✅ React render called!');
} else {
  console.error('❌ Root element not found!');
  document.body.innerHTML = `
    <div style="padding: 20px; background: #f44336; color: white;">
      <h1>❌ 致命错误</h1>
      <p>找不到 root 元素！</p>
    </div>
  `;
}
