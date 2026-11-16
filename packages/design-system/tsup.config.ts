import { defineConfig } from "tsup";

// dist 는 build 스크립트가 먼저 비운다 (두 설정이 동시에 돌아서 clean 을 쓰지 않는다).
export default defineConfig([
  {
    entry: { index: "src/index.ts", game: "src/tokens/game.ts" },
    format: ["esm", "cjs"],
    dts: true,
  },
  {
    entry: { react: "src/react/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    external: ["react", "react-dom"],
    // Next.js App Router 에서 클라이언트 컴포넌트로 인식되게 한다 (Tabs 는 상태·이벤트를 쓴다).
    banner: { js: '"use client";' },
  },
]);
