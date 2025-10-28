// 最简单的React组件测试
function SimpleTest() {
  console.log('✅ SimpleTest component is rendering!');
  
  return (
    <div style={{
      padding: '20px',
      background: '#4CAF50',
      color: 'white',
      fontSize: '24px',
      textAlign: 'center'
    }}>
      <h1>✅ 测试成功！</h1>
      <p>如果你看到这个，React正在工作！</p>
    </div>
  );
}

export default SimpleTest;
