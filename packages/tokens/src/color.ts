// 캐롤봇 브랜드 색. 기준은 carol-web(app/globals.css @theme) 이고,
// carol(src/brand.ts · src/web/theme.ts)과 carol-ops(web/src/index.css)가 복제해 쓰던 값을 여기로 모았다.
// 앱은 색을 직접 박지 말고 이 토큰(또는 생성된 CSS 변수 --crl-*)만 쓴다.

/** 배경·면. 숫자가 클수록 위로 떠 있는 층이다. */
export const background = {
  /** 페이지 바탕 */
  canvas: "#1a1a1c",
  /** 바탕 위 띠 섹션, 입력창 바탕, ops 헤더 */
  canvasAlt: "#211f24",
  /** 카드·패널 */
  surface: "#242427",
  /** 카드 안 칩·코드·보조 버튼 */
  surface2: "#2e2e33",
  /** surface2 위 hover */
  surfaceHover: "#332e36",
} as const;

export const border = {
  /** 카드·구분선 기본 1px */
  border: "#33333a",
  /** 버튼 링·입력창·모달처럼 조금 더 또렷해야 하는 선 */
  borderStrong: "#3a353d",
} as const;

/** 글자. ink 가 가장 밝고 faint 가 가장 흐리다. */
export const text = {
  /** 제목·핵심 수치 */
  ink: "#f2edef",
  /** 강조 본문, 보조 버튼 글자 */
  ink2: "#e8dfe3",
  /** 기본 본문 */
  inkSoft: "#cfc6ca",
  /** 설명문·부제 */
  muted: "#b3a8ad",
  /** 라벨·메타·eyebrow */
  dim: "#8a8087",
  /** 면책 문구·푸터 */
  faint: "#6f676c",
} as const;

/** 코랄 강조색. accentInk 는 accent 위에 얹는 글자색이다. */
export const accent = {
  accent: "#ff9294",
  accentHover: "#f2787b",
  accentInk: "#3a1e1e",
  accentSoft: "#f2b3bf",
} as const;

/**
 * 상태색. carol(--ok/--err/--warn)과 carol-ops(--success/--danger)가 각자 쓰던 것을 하나로 합쳤다.
 * carol-web 에는 상태색이 없어서, 배경·테두리 세트까지 갖춘 carol-ops 값을 기준으로 삼았다.
 * fg 는 글자·아이콘, bg/border 는 배지·상자.
 */
export const status = {
  success: "#80d8a3",
  successBg: "#263d32",
  successBorder: "#3e6852",
  danger: "#ff9a9a",
  dangerBg: "#432b2e",
  dangerBorder: "#734548",
  warning: "#f5c97a",
  warningBg: "#41382a",
  warningBorder: "#6e5c3a",
} as const;

export const focus = {
  /** 키보드 포커스 링 (2px, offset 2px) */
  focus: "#3898ec",
} as const;

/** 시맨틱 색 전체. 키는 camelCase, CSS 변수는 --crl-kebab-case 로 나간다. */
export const color = {
  ...background,
  ...border,
  ...text,
  ...accent,
  ...status,
  ...focus,
} as const;

export type ColorToken = keyof typeof color;

/** "#ff9294" → 0xff9294. Discord 임베드 accentColor 등 숫자 색이 필요한 곳에 쓴다. */
export function toInt(hex: string): number {
  const h = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`toInt: 6자리 hex 가 아닙니다: ${hex}`);
  return parseInt(h, 16);
}

/** "#1a1a1c", 0.9 → "rgba(26, 26, 28, 0.9)". 반투명 상단바처럼 알파가 필요한 곳에 쓴다. */
export function withAlpha(hex: string, alpha: number): string {
  const n = toInt(hex);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
