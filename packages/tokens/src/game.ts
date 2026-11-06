// 게임 고유 색(난이도·랭크·클리어 마크·칭호·서클). 브랜드 팔레트와 섞지 않는다.
// 엔트리 포인트를 분리(@team-carol/tokens/game)해 브랜드 토큰만 쓰는 프로젝트는 이 값을 번들하지 않는다.

export type GameId = "maimai" | "chunithm" | "sdvx" | "arcaea";

/** 게임별 대표 강조색. maimai 는 브랜드 accent 와 같다. */
export const gameAccent: Record<GameId, string> = {
  maimai: "#ff9294",
  chunithm: "#f97316",
  sdvx: "#38bdf8",
  arcaea: "#a855f7",
};

export const maimaiDifficulty = {
  BASIC: "#16a34a",
  ADVANCED: "#ea580c",
  EXPERT: "#dc2626",
  MASTER: "#9333ea",
  "Re:MASTER": "#c084fc",
} as const;

/** 랭크 + FC/AP/FS/SYNC 마크 색 (maimai 기준). */
export const maimaiClear = {
  "SSS+": "#d97706",
  SSS: "#f59e0b",
  "SS+": "#fbbf24",
  SS: "#fbbf24",
  "S+": "#fb923c",
  S: "#fb923c",
  AAA: "#60a5fa",
  AA: "#60a5fa",
  A: "#93c5fd",
  BBB: "#7dd3fc",
  BB: "#bae6fd",
  B: "#e0f2fe",
  C: "#d1d5db",
  D: "#9ca3af",
  "AP+": "#d946ef",
  AP: "#d946ef",
  "FC+": "#3b82f6",
  FC: "#60a5fa",
  "FS+": "#22c55e",
  FS: "#4ade80",
  "FSD+": "#10b981",
  FSD: "#34d399",
  SYNC: "#94a3b8",
} as const;

export const difficultyColor: Record<GameId, Record<string, string>> = {
  maimai: maimaiDifficulty,
  chunithm: {
    BASIC: "#16a34a",
    ADVANCED: "#d97706",
    EXPERT: "#dc2626",
    MASTER: "#9333ea",
    ULTIMA: "#555555",
  },
  sdvx: {
    NOVICE: "#16a34a",
    ADVANCED: "#2563eb",
    EXHAUST: "#dc2626",
    MAXIMUM: "#7c3aed",
    INFINITE: "#c026d3",
    GRAVITY: "#ea580c",
    HEAVENLY: "#0ea5e9",
    VIVID: "#ec4899",
    EXCEED: "#d97706",
    NABLA: "#0d9488",
  },
  arcaea: {
    Past: "#64748b",
    Present: "#059669",
    Future: "#7c3aed",
    Beyond: "#dc2626",
    Eternal: "#dc2626",
  },
};

export const clearColor: Record<GameId, Record<string, string>> = {
  maimai: maimaiClear,
  chunithm: { ...maimaiClear, AJC: "#ca8a04", AJ: "#f59e0b" },
  sdvx: {
    PUC: "#ca8a04",
    UC: "#f59e0b",
    COMP: "#3b82f6",
    PLAYED: "#6b7280",
    S: "#d97706",
    "AAA+": "#f59e0b",
    AAA: "#fbbf24",
    "AA+": "#fb923c",
    AA: "#fb923c",
    "A+": "#60a5fa",
    A: "#93c5fd",
    B: "#4ade80",
    C: "#9ca3af",
    D: "#6b7280",
  },
  arcaea: {
    "EX+": "#d97706",
    EX: "#a855f7",
    AA: "#c084fc",
    A: "#d8b4fe",
    B: "#60a5fa",
    D: "#6b7280",
    P: "#ca8a04",
    F: "#f59e0b",
    C: "#3b82f6",
    L: "#6b7280",
  },
};

/** 레이팅 대상곡(RS) 수치 색. double 은 가중치 2배 곡. */
export const ratingValue = {
  default: "#ffffff",
  double: "#fbbf24",
} as const;

/** DX NET 칭호 등급. rainbow 는 그라디언트다. */
export const trophy = {
  normal: { background: "#2e2e33", color: "#cfc6ca" },
  bronze: { background: "#c77d43", color: "#1a1a1c" },
  silver: { background: "#c3ccd4", color: "#1a1a1c" },
  gold: { background: "#f2c94c", color: "#1a1a1c" },
  rainbow: {
    background: "linear-gradient(90deg, #ff9294, #fbbf24, #4ade80, #60a5fa, #c084fc)",
    color: "#1a1a1c",
  },
} as const;

export type CircleColor = "rainbow" | "gold" | "silver" | "bronze" | "purple" | "red" | "yellow" | "green" | "white";

/** DX NET 서클 프로필 색. gradient: 이름표·띠, main: 임베드 테두리, ink: 이름표 위 글자. */
export const circle: Record<CircleColor, { gradient: string; main: string; ink: string }> = {
  rainbow: { gradient: "linear-gradient(90deg, #ff8fb1, #ffd36e, #8be8a8, #7ec8ff, #c59bff)", main: "#c59bff", ink: "#1a1a1c" },
  gold: { gradient: "linear-gradient(90deg, #e8b93a, #fff3b0, #e8b93a)", main: "#f2c94c", ink: "#1a1a1c" },
  silver: { gradient: "linear-gradient(90deg, #6cb8e6, #e8f7ff, #6cb8e6)", main: "#8fd3f4", ink: "#1a1a1c" },
  bronze: { gradient: "linear-gradient(90deg, #7a3e22, #d99a6c, #7a3e22)", main: "#b06a43", ink: "#fff7f0" },
  purple: { gradient: "linear-gradient(90deg, #b06ee8, #ead5ff, #b06ee8)", main: "#c48af5", ink: "#1a1a1c" },
  red: { gradient: "linear-gradient(90deg, #e9546f, #ffd6de, #e9546f)", main: "#ef6f86", ink: "#1a1a1c" },
  yellow: { gradient: "linear-gradient(90deg, #f2c94c, #fff4c2, #f2c94c)", main: "#f7d66b", ink: "#1a1a1c" },
  green: { gradient: "linear-gradient(90deg, #5fcfa9, #d6fff0, #5fcfa9)", main: "#7fe0bf", ink: "#1a1a1c" },
  white: { gradient: "linear-gradient(90deg, #cfd9e2, #ffffff, #cfd9e2)", main: "#dfe7ee", ink: "#1a1a1c" },
};
