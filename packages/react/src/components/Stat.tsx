import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  value: ReactNode;
  /** hero: 랜딩 Stats 처럼 큰 코랄 숫자 + 아래 라벨, 가운데 정렬 */
  variant?: "default" | "hero";
  children?: ReactNode;
}

/** 라벨 + 수치. children 은 수치 아래(예: ProgressBar)에 붙는다. */
export function Stat({ label, value, variant = "default", className, children, ...rest }: StatProps) {
  return (
    <div className={cx("crl-stat", variant === "hero" && "crl-stat--hero", className)} {...rest}>
      <div className="crl-stat__label">{label}</div>
      <div className="crl-stat__value">{value}</div>
      {children}
    </div>
  );
}

export function StatGrid({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("crl-stat-grid", className)} {...rest} />;
}
