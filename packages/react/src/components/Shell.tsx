import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";

export interface TopBarProps extends HTMLAttributes<HTMLElement> {
  /** 왼쪽 브랜드 영역 (보통 <Brand />) */
  brand: ReactNode;
  /** sticky: 반투명 고정 바(기본) · static: 흐르는 헤더(ops) */
  variant?: "sticky" | "static";
  children?: ReactNode;
}

/** 상단바. children 은 오른쪽 정렬된다. */
export function TopBar({ brand, variant = "sticky", className, children, ...rest }: TopBarProps) {
  return (
    <header className={cx("crl-topbar", variant === "static" && "crl-topbar--static", className)} {...rest}>
      <div className="crl-topbar__inner">
        {brand}
        <span className="crl-topbar__spacer" />
        {children}
      </div>
    </header>
  );
}

export interface TopBarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

export function TopBarLink({ active, className, ...rest }: TopBarLinkProps) {
  return <a className={cx("crl-topbar__link", className)} aria-current={active ? "page" : undefined} {...rest} />;
}

export interface BrandProps extends HTMLAttributes<HTMLElement> {
  /** 브랜드 이름 (예: "캐롤봇", "캐롤봇 운영") */
  name: ReactNode;
  /** 아바타 이미지 경로. 앱의 public 경로를 넘긴다. */
  markSrc?: string;
  href?: string;
}

export function Brand({ name, markSrc, href, className, ...rest }: BrandProps) {
  const inner = (
    <>
      {markSrc ? <img className="crl-brand__mark" src={markSrc} alt="" width={30} height={30} /> : null}
      <span>{name}</span>
    </>
  );
  return href ? (
    <a href={href} className={cx("crl-brand", className)} {...rest}>
      {inner}
    </a>
  ) : (
    <span className={cx("crl-brand", className)} {...rest}>
      {inner}
    </span>
  );
}

export function Footer({ className, children, ...rest }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cx("crl-footer", className)} {...rest}>
      <div className="crl-footer__inner">{children}</div>
    </footer>
  );
}
