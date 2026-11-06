import type { HTMLAttributes } from "react";
import { cx } from "../cx";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "article" | "section";
}

export function Card({ as: Tag = "div", className, ...rest }: CardProps) {
  return <Tag className={cx("crl-card", className)} {...rest} />;
}

export function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx("crl-card__title", className)} {...rest} />;
}

export function CardBody({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("crl-card__body", className)} {...rest} />;
}
