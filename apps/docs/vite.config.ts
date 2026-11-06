import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages 등 하위 경로에 올릴 때는 DOCS_BASE=/carol-design-system/ 처럼 준다.
export default defineConfig({
  base: process.env.DOCS_BASE ?? "/",
  plugins: [react()],
});
