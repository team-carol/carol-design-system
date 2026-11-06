import type { HTMLAttributes } from "react";
import { cx } from "../cx";

export type TagTone = "neutral" | "accent" | "success" | "danger";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: TagTone;
}

/** 작은 상태 배지 (running / stopped, NEW 등) */
export function Tag({ tone = "neutral", className, ...rest }: TagProps) {
  return <span className={cx("crl-tag", tone !== "neutral" && `crl-tag--${tone}`, className)} {...rest} />;
}

/** 큰 둥근 표시용 라벨 (명령어 칩 등) */
export function Chip({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx("crl-chip", className)} {...rest} />;
}
