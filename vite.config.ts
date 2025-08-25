import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import config from "./config/index.json";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 设置 @ 指向 src 目录
    },
  },
  server: {
    host: "0.0.0.0",
    port: config.port,
    proxy: {
      // 将 /api 开头的请求代理到 http://localhost:3000
      "/api": {
        target: "http://localhost:" + config.proxyPort,
        changeOrigin: true, // 支持虚拟托管站点
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/uploads": {
        target: "http://localhost:" + config.proxyPort,
        changeOrigin: true,
      },
    },
  },
});
