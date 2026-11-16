/** 4px 기반 간격. spacing[5] = 16px. */
export const spacing = {
  0: "0px",
  1: "2px",
  2: "4px",
  3: "8px",
  4: "12px",
  5: "16px",
  6: "20px",
  7: "24px",
  8: "28px",
  9: "32px",
  10: "40px",
  11: "48px",
  12: "64px",
  13: "80px",
} as const;

/**
 * 모서리. Tailwind 기본 스케일(rounded-xl 등)과 겹치지 않게 용도 이름을 쓴다.
 * Tailwind 에서는 rounded-card, rounded-button … 으로 나간다.
 */
export const radius = {
  /** 인라인 code, 작은 배지 */
  inline: "6px",
  /** 알림, 작은 버튼, 명령어 칩 */
  small: "8px",
  /** 입력창, 재킷 타일, 링크 필 */
  control: "10px",
  /** 버튼 */
  button: "12px",
  /** 카드·패널 */
  card: "16px",
  /** 히어로 패널 */
  hero: "32px",
  pill: "999px",
} as const;

export const layout = {
  /** 기본 콘텐츠 폭 */
  container: "1200px",
  /** 글 위주 섹션 폭 */
  containerNarrow: "880px",
  /** 좌우 여백 */
  gutter: "clamp(20px, 4vw, 40px)",
  /** 섹션 위아래 여백 */
  sectionY: "clamp(64px, 8vw, 104px)",
} as const;

export const motion = {
  fast: "150ms",
  base: "200ms",
  easing: "cubic-bezier(0.2, 0, 0.38, 0.9)",
} as const;

export const zIndex = {
  header: 10,
} as const;
