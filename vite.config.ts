import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyfills from "rollup-plugin-node-polyfills";
import path from "node:path";
import os from "node:os";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
  },
  cacheDir: path.join(os.tmpdir(), "vite_cache_privy_demo"),
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
      solconsdk: path.resolve(__dirname, "../solConSdk/dist/esm"), // 更新为正确的SDK路径
      // This is required for NodeGlobalsPolyfillPlugin to work
      stream: path.resolve(
        __dirname,
        "node_modules/rollup-plugin-node-polyfills/polyfills/stream"
      ),
      buffer: path.resolve(
        __dirname,
        "node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6"
      ),
      // 注意：更具体的路径要放在前面，这样才能正确匹配
      "valtio/vanilla/utils": path.resolve(
        __dirname,
        "node_modules/valtio/esm/vanilla/utils.mjs"
      ),
      "valtio/vanilla": path.resolve(
        __dirname,
        "node_modules/valtio/esm/vanilla.mjs"
      ),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Polyfill Node.js modules for Rollup
        rollupNodePolyfills() as any,
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    exclude: ["solconsdk"], // 只排除SDK
    include: ["valtio"],
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
    global: "globalThis",
    "process.env": {},
    "process.version": '""',
  },
});
