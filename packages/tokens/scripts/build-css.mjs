// dist/index.js(토큰)에서 CSS 산출물 두 개를 만든다.
//   dist/tokens.css   — :root { --crl-* }  어떤 프레임워크에서도 쓰는 CSS 변수
//   dist/tailwind.css — Tailwind v4 @theme. Tailwind 를 쓰는 프로젝트용
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const t = await import(new URL("../dist/index.js", import.meta.url).href);

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-z])([0-9])/g, "$1-$2").toLowerCase();
const banner = "/* @team-carol/tokens — 자동 생성 파일. packages/tokens/src 를 고친다. */\n";

writeFileSync(join(dist, "tokens.css"), banner + t.toCssVars(":root", true) + "\n");

const lines = [];
for (const [k, v] of Object.entries(t.color)) lines.push(`  --color-${kebab(k)}: ${v};`);
lines.push("");
lines.push(`  --font-sans: ${t.fontFamily.sans};`, `  --font-mono: ${t.fontFamily.mono};`);
lines.push("");
for (const [k, v] of Object.entries(t.typeScale)) {
  lines.push(`  --text-${kebab(k)}: ${v.fontSize};`, `  --text-${kebab(k)}--line-height: ${v.lineHeight};`);
}
lines.push("");
for (const [k, v] of Object.entries(t.radius)) lines.push(`  --radius-${k}: ${v};`);
lines.push("");
lines.push(`  --container-page: ${t.layout.container};`, `  --container-narrow: ${t.layout.containerNarrow};`);

const tailwind = `${banner}/* 사용: @import "tailwindcss"; @import "@team-carol/tokens/tailwind.css"; */

@theme {
${lines.join("\n")}
}

/* 페이지 좌우 여백, 섹션 위아래 여백 */
@utility px-gutter {
  padding-inline: ${t.layout.gutter};
}
@utility py-section {
  padding-block: ${t.layout.sectionY};
}
`;
writeFileSync(join(dist, "tailwind.css"), tailwind);

console.log("tokens: wrote dist/tokens.css, dist/tailwind.css");
