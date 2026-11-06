export const fontFamily = {
  sans: `"Pretendard", "Pretendard Variable", "Noto Sans JP", -apple-system, BlinkMacSystemFont, system-ui, sans-serif`,
  mono: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`,
} as const;

/** 웹 폰트 로드용 URL. <link rel="stylesheet"> 로 넣는다. */
export const fontUrls = {
  pretendard: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css",
  googleFonts:
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap",
} as const;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  heavy: 800,
} as const;

/**
 * 타입 스케일. 역할별 글자 크기.
 * 제목은 font-weight 500(medium)이 기본이다. 굵게 하지 않는 것이 이 시스템의 톤이다.
 */
export const typeScale = {
  /** 히어로 헤드라인 */
  display: { fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.15, fontWeight: 500, letterSpacing: "-0.01em" },
  /** 섹션 제목 */
  heading1: { fontSize: "clamp(30px, 3.6vw, 46px)", lineHeight: 1.2, fontWeight: 500, letterSpacing: "-0.01em" },
  /** 페이지 제목(앱 화면) */
  heading2: { fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.2, fontWeight: 500, letterSpacing: "-0.02em" },
  /** 그룹 제목 */
  heading3: { fontSize: "25px", lineHeight: 1.2, fontWeight: 500, letterSpacing: "0" },
  /** 카드 제목 */
  heading4: { fontSize: "22px", lineHeight: 1.2, fontWeight: 500, letterSpacing: "0" },
  /** 히어로 부제 */
  bodyLg: { fontSize: "clamp(17px, 1.6vw, 20px)", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0" },
  body: { fontSize: "16px", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0" },
  /** 카드 설명문 */
  bodySm: { fontSize: "15px", lineHeight: 1.6, fontWeight: 400, letterSpacing: "0" },
  /** 라벨·탭 */
  label: { fontSize: "14px", lineHeight: 1.4, fontWeight: 500, letterSpacing: "0" },
  /** 메타·날짜·eyebrow */
  caption: { fontSize: "13px", lineHeight: 1.5, fontWeight: 400, letterSpacing: "0" },
  /** 면책·각주 */
  legal: { fontSize: "12.5px", lineHeight: 1.7, fontWeight: 400, letterSpacing: "0" },
} as const;

export type TypeScaleToken = keyof typeof typeScale;
