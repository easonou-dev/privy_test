import React from 'react';

// 简化的测试组件
function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎉 React 应用正常工作！</h1>
      <p>如果你看到这个页面，说明基本的React渲染没有问题。</p>
      <div style={{ 
        background: '#f0f8ff', 
        padding: '15px', 
        borderRadius: '8px',
        margin: '20px 0' 
      }}>
        <h3>测试信息：</h3>
        <ul>
          <li>✅ React 组件渲染正常</li>
          <li>✅ Vite 开发服务器运行正常</li>
          <li>✅ TypeScript 编译正常</li>
        </ul>
      </div>
      <button 
        onClick={() => alert('按钮点击正常！')}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        测试按钮
      </button>
    </div>
  );
}

export default TestApp;
