// polyfill.ts - 为浏览器环境提供Node.js模块的polyfill

// 导入buffer模块并将其添加到全局范围
import { Buffer } from 'buffer';

// 将Buffer添加到window对象
(window as any).Buffer = Buffer;
(globalThis as any).Buffer = Buffer;

// 添加process polyfill
(window as any).process = {
  env: {},
  version: '',
  nextTick: (fn: Function) => setTimeout(fn, 0)
};

// 添加global polyfill
(window as any).global = globalThis;

// 如果需要，可以在这里添加其他Node.js模块的polyfill