// polyfill.ts - 为浏览器环境提供Node.js模块的polyfill

// 导入buffer模块并将其添加到全局范围
import { Buffer } from "buffer";

// 将Buffer添加到window对象
(window as any).Buffer = Buffer;
(globalThis as any).Buffer = Buffer;

// 添加process polyfill
(window as any).process = {
  env: {},
  version: "",
  nextTick: (fn: Function) => setTimeout(fn, 0),
};

// 添加global polyfill
(window as any).global = globalThis;

// 如果需要，可以在这里添加其他Node.js模块的polyfill

// 处理浏览器扩展冲突 - 防止重复定义ethereum属性
try {
  // 检查ethereum是否已存在且不可配置
  const descriptor = Object.getOwnPropertyDescriptor(window, "ethereum");
  if (descriptor && !descriptor.configurable) {
    console.warn("ethereum property already exists and is not configurable");
  }
} catch (error) {
  console.warn("Error checking ethereum property:", error);
}

// 处理evmAsk相关的属性冲突
try {
  const evmDescriptor = Object.getOwnPropertyDescriptor(window, "evmAsk");
  if (evmDescriptor && !evmDescriptor.configurable) {
    console.warn("evmAsk property already exists and is not configurable");
  }
} catch (error) {
  console.warn("Error checking evmAsk property:", error);
}
