import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const explicitBase = env.VITE_BASE_PATH?.trim();
  // When the build runs on Vercel we want assets to resolve from the site root so
  // they can be served by the platform's static hosting. Outside of that
  // environment (for example when someone downloads the build output and opens
  // it directly from the file system) we fall back to a relative base path.
  const runningOnVercel = [env.VERCEL, env.VERCEL_ENV]
    .filter(Boolean)
    .map((value) => value.toLowerCase())
    .some((value) =>
      value === "1" ||
      value === "true" ||
      value === "preview" ||
      value === "production" ||
      value === "development"
    );

  let base = "./";
  if (explicitBase && explicitBase.length > 0) {
    base = explicitBase;
  } else if (runningOnVercel) {
    base = "/";
  }

  return {
    base,
    plugins: [react(), svgr()],
    server: {
      host: true,
      port: 5173
    }
  };
});
