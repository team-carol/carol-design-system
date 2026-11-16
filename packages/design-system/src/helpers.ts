// 클래스 이름 헬퍼. "use client" 가 없는 진입점(@team-carol/design-system)에 두어
// 서버에서 HTML 을 만드는 곳이나 Next.js 서버 컴포넌트에서도 호출할 수 있다.

/** className 조합. falsy 값은 버린다. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

/** 버튼 클래스. Next.js <Link>, 서버에서 만드는 HTML 등에 쓴다. */
export function buttonClassName(
  opts: { variant?: ButtonVariant; size?: ButtonSize } = {},
  extra?: string,
): string {
  const { variant = "primary", size = "md" } = opts;
  return cx("crl-btn", `crl-btn--${variant}`, size !== "md" && `crl-btn--${size}`, extra);
}
