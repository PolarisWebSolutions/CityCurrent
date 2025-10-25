import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE_PATH?.trim() || "./";

  return {
    base,
    plugins: [react(), svgr()],
    server: {
      host: true,
      port: 5173
    }
  };
});
