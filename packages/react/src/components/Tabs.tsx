import { useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cx } from "../cx";

export interface TabItem<T extends string> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabsProps<T extends string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  /** underline: 밑줄형(기본) · contained: 묶음형 */
  variant?: "underline" | "contained";
  "aria-label"?: string;
  className?: string;
}

/**
 * 제어형 탭 목록. 패널은 호출하는 쪽이 value 에 따라 그린다.
 * ←/→ 로 이동, Home/End 로 처음/끝.
 * 페이지 이동용 탭(링크)은 <nav className="crl-tabs"> 안에 <a className="crl-tab is-active"> 로 직접 만든다.
 */
export function Tabs<T extends string>({ items, value, onChange, variant = "underline", className, ...aria }: TabsProps<T>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);
    const cur = enabled.indexOf(items.findIndex((it) => it.value === value));
    let next: number | undefined;
    if (e.key === "ArrowRight") next = enabled[(cur + 1) % enabled.length];
    else if (e.key === "ArrowLeft") next = enabled[(cur - 1 + enabled.length) % enabled.length];
    else if (e.key === "Home") next = enabled[0];
    else if (e.key === "End") next = enabled[enabled.length - 1];
    if (next === undefined) return;
    e.preventDefault();
    onChange(items[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" className={cx("crl-tabs", variant === "contained" && "crl-tabs--contained", className)} onKeyDown={onKeyDown} {...aria}>
      {items.map((it, i) => {
        const selected = it.value === value;
        return (
          <button
            key={it.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            className="crl-tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            disabled={it.disabled}
            onClick={() => onChange(it.value)}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
