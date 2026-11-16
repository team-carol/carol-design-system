import { color } from "./color";
import { fontFamily, fontWeight, typeScale } from "./typography";
import { layout, motion, radius, spacing } from "./layout";

const PREFIX = "crl";

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-z])([0-9])/g, "$1-$2").toLowerCase();

/** 토큰 키 → CSS 변수 이름. cssVarName("surface2") === "--crl-surface-2" */
export function cssVarName(key: string, group?: string): string {
  return `--${PREFIX}-${group ? `${group}-` : ""}${kebab(key)}`;
}

/** 전체 토큰을 [변수명, 값] 목록으로. tokens.css 와 서버 렌더 HTML 이 같은 목록을 쓴다. */
export function cssVarEntries(): [string, string][] {
  const out: [string, string][] = [];
  for (const [k, v] of Object.entries(color)) out.push([cssVarName(k), v]);
  out.push([cssVarName("sans", "font"), fontFamily.sans], [cssVarName("mono", "font"), fontFamily.mono]);
  for (const [k, v] of Object.entries(fontWeight)) out.push([cssVarName(k, "weight"), String(v)]);
  for (const [k, v] of Object.entries(typeScale)) {
    out.push([cssVarName(`${k}-size`, "type"), v.fontSize], [cssVarName(`${k}-line-height`, "type"), String(v.lineHeight)]);
  }
  for (const [k, v] of Object.entries(spacing)) out.push([cssVarName(String(k), "space"), v]);
  for (const [k, v] of Object.entries(radius)) out.push([cssVarName(k, "radius"), v]);
  for (const [k, v] of Object.entries(layout)) out.push([cssVarName(k), v]);
  for (const [k, v] of Object.entries(motion)) out.push([cssVarName(k, "motion"), v]);
  return out;
}

/** ":root{...}" 블록 문자열. 빌드 도구 없이 HTML 을 직접 만드는 곳에서 <style> 에 넣는다. */
export function toCssVars(selector = ":root", pretty = false): string {
  const nl = pretty ? "\n" : "";
  const ind = pretty ? "  " : "";
  const body = cssVarEntries()
    .map(([k, v]) => `${ind}${k}:${pretty ? " " : ""}${v};`)
    .join(nl);
  return `${selector}{${nl}${ind}color-scheme:${pretty ? " " : ""}dark;${nl}${body}${nl}}`;
}
