// tsup 이 만든 dist/index.js(토큰)와 src/css 를 합쳐 CSS 산출물을 만든다.
//   dist/tokens.css     — :root { --crl-* }  어떤 프레임워크에서도 쓰는 CSS 변수
//   dist/tailwind.css   — Tailwind v4 @theme + 유틸리티
//   dist/carol.css      — 토큰 변수 + 리셋(base) + 컴포넌트. 일반 CSS·React 프로젝트용
//   dist/components.css — 토큰 변수 + 컴포넌트(리셋 없음). Tailwind 처럼 자체 리셋이 있는 곳용
//   dist/css.{js,cjs,d.ts,d.cts} — 위 CSS 를 문자열로 export. 서버에서 HTML 을 직접 만드는 곳용
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src", "css");
const dist = join(root, "dist");
const t = await import(new URL("../dist/index.js", import.meta.url).href);

// 순서가 곧 cascade 순서다. 새 컴포넌트 파일은 여기 추가한다.
const COMPONENTS = ["layout", "button", "card", "tag", "form", "tabs", "stat", "shell"];

const banner = "/* @team-carol/design-system — 자동 생성 파일. packages/design-system/src 를 고친다. */";
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-z])([0-9])/g, "$1-$2").toLowerCase();
const read = (p) => readFileSync(p, "utf8").trim();
const write = (name, body) => writeFileSync(join(dist, name), body);

// tokens.css
const tokensCss = t.toCssVars(":root", true);
write("tokens.css", `${banner}\n${tokensCss}\n`);

// tailwind.css
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

write(
  "tailwind.css",
  `${banner}
/* 사용: @import "tailwindcss"; @import "@team-carol/design-system/tailwind.css"; */

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
`,
);

// carol.css · components.css
const baseCss = read(join(src, "base.css"));
const componentsCss = COMPONENTS.map((n) => read(join(src, "components", `${n}.css`))).join("\n\n");
const full = [banner, tokensCss, baseCss, componentsCss].join("\n\n") + "\n";
const noReset = [banner, tokensCss, componentsCss].join("\n\n") + "\n";
write("carol.css", full);
write("components.css", noReset);

// css.js — 문자열 export 용은 주석·공백을 줄인다 (HTML 에 인라인으로 박히므로).
const minify = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
const min = JSON.stringify(minify(full));
const minNoReset = JSON.stringify(minify(noReset));

write("css.js", `export const carolCss = ${min};\nexport const componentsCss = ${minNoReset};\n`);
write("css.cjs", `"use strict";\nexports.carolCss = ${min};\nexports.componentsCss = ${minNoReset};\n`);
const dts = `/** 토큰 + 리셋 + 컴포넌트 CSS (minified). <style> 에 그대로 넣는다. */
export declare const carolCss: string;
/** 토큰 + 컴포넌트 CSS (리셋 없음, minified). */
export declare const componentsCss: string;
`;
write("css.d.ts", dts);
write("css.d.cts", dts);

console.log(`css: wrote tokens.css, tailwind.css, carol.css (${full.length} B), components.css, css.{js,cjs}`);
