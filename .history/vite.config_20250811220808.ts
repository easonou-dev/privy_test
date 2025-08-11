import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyfills from "rollup-plugin-node-polyfills";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Polyfill Node.js global variables and modules
    NodeGlobalsPolyfillPlugin({
      process: true,
      buffer: true,
    }),
    NodeModulesPolyfillPlugin(),
  ],
  resolve: {
    alias: {
      solconsdk: path.resolve(__dirname, "../solConSdk/dist/esm"),
      // This is required for NodeGlobalsPolyfillPlugin to work
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      buffer: "buffer",
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Polyfill Node.js modules for Rollup
        rollupNodePolyfills() as any,
      ],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        // Node.js global to browser globalThis
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  define: {
    // 确保buffer在全局范围内可用
    global: 'globalThis',
    'process.env': {},
    'process.version': '""'
  },
});
