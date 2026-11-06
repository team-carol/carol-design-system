// 빌드 산출물(dist)을 검사한다. `npm run build` 뒤에 돈다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const t = await import("../dist/index.js");
const g = await import("../dist/game.js");
const require = createRequire(import.meta.url);

test("브랜드 색 기준 값", () => {
  // 브랜드 팔레트를 바꾸면 이 표를 함께 고친다 (실수로 값이 바뀌는 것을 막는다).
  const brand = {
    canvas: "#1a1a1c", canvasAlt: "#211f24", surface: "#242427", surface2: "#2e2e33",
    border: "#33333a", borderStrong: "#3a353d",
    ink: "#f2edef", ink2: "#e8dfe3", inkSoft: "#cfc6ca", muted: "#b3a8ad", dim: "#8a8087", faint: "#6f676c",
    accent: "#ff9294", accentHover: "#f2787b", accentInk: "#3a1e1e", accentSoft: "#f2b3bf",
  };
  for (const [k, v] of Object.entries(brand)) assert.equal(t.color[k], v, k);
});

test("CSS 변수 이름 규칙", () => {
  assert.equal(t.cssVarName("surface2"), "--crl-surface-2");
  assert.equal(t.cssVarName("accentInk"), "--crl-accent-ink");
  assert.equal(t.cssVarName("heading1-size", "type"), "--crl-type-heading-1-size");
  const css = t.toCssVars();
  assert.match(css, /^:root\{color-scheme:dark;/);
  assert.match(css, /--crl-accent:#ff9294;/);
});

test("toInt / withAlpha", () => {
  assert.equal(t.toInt("#ff9294"), 0xff9294);
  assert.equal(t.withAlpha("#1a1a1c", 0.9), "rgba(26, 26, 28, 0.9)");
  assert.throws(() => t.toInt("#fff"));
});

test("CJS 로도 불러진다", () => {
  const cjs = require("../dist/index.cjs");
  assert.equal(cjs.color.accent, "#ff9294");
  assert.equal(require("../dist/game.cjs").maimaiDifficulty.MASTER, "#9333ea");
});

test("게임 색 기준 값", () => {
  assert.equal(g.difficultyColor.maimai["Re:MASTER"], "#c084fc");
  assert.equal(g.clearColor.chunithm.AJC, "#ca8a04");
  assert.equal(g.clearColor.chunithm["SSS+"], "#d97706");
});

test("tailwind.css 에 색·모서리·유틸리티가 나온다", () => {
  const tw = readFileSync(new URL("../dist/tailwind.css", import.meta.url), "utf8");
  for (const name of ["canvas", "canvas-alt", "surface-2", "ink-soft", "accent-ink", "accent-soft"]) {
    assert.match(tw, new RegExp(`--color-${name}:`), name);
  }
  assert.match(tw, /--radius-card: 16px;/);
  assert.match(tw, /@utility px-gutter/);
});
