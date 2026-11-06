import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  // Next.js App Router 에서 클라이언트 컴포넌트로 인식되게 한다 (Tabs 는 상태·이벤트를 쓴다).
  banner: { js: '"use client";' },
});
