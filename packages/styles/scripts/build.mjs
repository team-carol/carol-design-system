// CSS 소스를 합쳐 배포 산출물을 만든다.
//   dist/carol.css      — 토큰 변수 + 리셋(base) + 컴포넌트. 일반 앱(carol-ops, carol 웹 페이지)용
//   dist/components.css — 토큰 변수 + 컴포넌트(리셋 없음). Tailwind 처럼 자체 리셋이 있는 앱용
//   dist/index.{js,cjs,d.ts} — 위 CSS 를 문자열로 export. 서버에서 HTML 을 직접 만드는 곳(carol)용
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const dist = join(root, "dist");
const require = createRequire(import.meta.url);

// 순서가 곧 cascade 순서다. 새 컴포넌트 파일은 여기 추가한다.
const COMPONENTS = ["layout", "button", "card", "tag", "form", "tabs", "stat", "shell"];

const read = (p) => readFileSync(p, "utf8").trim();
const tokensCss = read(require.resolve("@team-carol/tokens/tokens.css"));
const baseCss = read(join(src, "base.css"));
const componentsCss = COMPONENTS.map((n) => read(join(src, "components", `${n}.css`))).join("\n\n");

const banner = "/* @team-carol/styles — 자동 생성 파일. packages/styles/src 를 고친다. */";
const full = [banner, tokensCss, baseCss, componentsCss].join("\n\n") + "\n";
const noReset = [banner, tokensCss, componentsCss].join("\n\n") + "\n";

// 문자열 export 용은 주석·공백을 줄인다 (HTML 에 인라인으로 박히므로).
const minify = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
writeFileSync(join(dist, "carol.css"), full);
writeFileSync(join(dist, "components.css"), noReset);

const min = JSON.stringify(minify(full));
const minNoReset = JSON.stringify(minify(noReset));

// 클래스 이름 헬퍼. React 가 없는 곳(carol 서버 HTML, Next.js 서버 컴포넌트)에서도 쓰도록
// "use client" 가 붙는 @team-carol/react 가 아니라 여기 둔다. @team-carol/react 가 다시 내보낸다.
const helpers = `function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
function buttonClassName(opts, extra) {
  const { variant = "primary", size = "md" } = opts || {};
  return cx("crl-btn", "crl-btn--" + variant, size !== "md" && "crl-btn--" + size, extra);
}
`;
writeFileSync(
  join(dist, "index.js"),
  `export const carolCss = ${min};\nexport const componentsCss = ${minNoReset};\n${helpers}export { cx, buttonClassName };\n`,
);
writeFileSync(
  join(dist, "index.cjs"),
  `"use strict";\nexports.carolCss = ${min};\nexports.componentsCss = ${minNoReset};\n${helpers}exports.cx = cx;\nexports.buttonClassName = buttonClassName;\n`,
);
const dts = `/** 토큰 + 리셋 + 컴포넌트 CSS (minified). <style> 에 그대로 넣는다. */
export declare const carolCss: string;
/** 토큰 + 컴포넌트 CSS (리셋 없음, minified). */
export declare const componentsCss: string;
/** className 조합. falsy 값은 버린다. */
export declare function cx(...parts: Array<string | false | null | undefined>): string;
export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";
/** 버튼 클래스. Next.js <Link>, 서버에서 만드는 HTML 등에 쓴다. */
export declare function buttonClassName(opts?: { variant?: ButtonVariant; size?: ButtonSize }, extra?: string): string;
`;
writeFileSync(join(dist, "index.d.ts"), dts);
writeFileSync(join(dist, "index.d.cts"), dts);

console.log(`styles: wrote dist/carol.css (${full.length} B), dist/components.css, dist/index.{js,cjs}`);
