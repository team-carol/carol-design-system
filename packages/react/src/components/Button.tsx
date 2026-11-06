import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { buttonClassName } from "@team-carol/styles";
import type { ButtonSize, ButtonVariant } from "@team-carol/styles";

export type { ButtonSize, ButtonVariant };

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}

export type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
export type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** 버튼. href 를 주면 <a> 로 렌더된다. 클래스만 필요하면 buttonClassName() 을 쓴다. */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | LinkButtonProps>(
  function Button({ variant, size, className, ...rest }, ref) {
    const cls = buttonClassName({ variant, size }, className);
    if (typeof rest.href === "string") {
      return <a ref={ref as React.Ref<HTMLAnchorElement>} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
    }
    const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return <button ref={ref as React.Ref<HTMLButtonElement>} type={type} className={cls} {...buttonRest} />;
  },
);
