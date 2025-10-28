#!/bin/bash

# 临时启动脚本，绕过权限问题

echo "🚀 启动开发服务器..."

# 设置环境变量
export NODE_ENV=development
export VITE_PORT=5173

# 清理可能的权限问题
rm -rf node_modules/.vite-temp 2>/dev/null || true

# 启动vite
./node_modules/.bin/vite --port 5173 --host 0.0.0.0
