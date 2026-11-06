import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "../cx";

interface FieldChrome {
  label: ReactNode;
  /** 입력 아래 도움말 */
  helperText?: ReactNode;
  /** 오류 문구. 있으면 aria-invalid 가 켜지고 helperText 대신 보인다. */
  error?: ReactNode;
  /** 바깥 .crl-field 래퍼에 붙일 클래스 */
  fieldClassName?: string;
}

function useFieldIds(id: string | undefined) {
  const auto = useId();
  const inputId = id ?? auto;
  return { inputId, helperId: `${inputId}-helper` };
}

function Chrome({ label, helperText, error, fieldClassName, inputId, helperId, children }: FieldChrome & { inputId: string; helperId: string; children: ReactNode }) {
  const note = error ?? helperText;
  return (
    <div className={cx("crl-field", fieldClassName)}>
      <label className="crl-label" htmlFor={inputId}>
        {label}
      </label>
      {children}
      {note ? (
        <span id={helperId} className={cx("crl-helper", error ? "crl-helper--error" : undefined)}>
          {note}
        </span>
      ) : null}
    </div>
  );
}

export type TextInputProps = FieldChrome & InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, helperText, error, fieldClassName, id, className, ...rest },
  ref,
) {
  const { inputId, helperId } = useFieldIds(id);
  return (
    <Chrome {...{ label, helperText, error, fieldClassName, inputId, helperId }}>
      <input
        ref={ref}
        id={inputId}
        className={cx("crl-input", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || helperText ? helperId : undefined}
        {...rest}
      />
    </Chrome>
  );
});

export type TextAreaProps = FieldChrome & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, helperText, error, fieldClassName, id, className, ...rest },
  ref,
) {
  const { inputId, helperId } = useFieldIds(id);
  return (
    <Chrome {...{ label, helperText, error, fieldClassName, inputId, helperId }}>
      <textarea
        ref={ref}
        id={inputId}
        className={cx("crl-input", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || helperText ? helperId : undefined}
        {...rest}
      />
    </Chrome>
  );
});

export type SelectProps = FieldChrome & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, helperText, error, fieldClassName, id, className, ...rest },
  ref,
) {
  const { inputId, helperId } = useFieldIds(id);
  return (
    <Chrome {...{ label, helperText, error, fieldClassName, inputId, helperId }}>
      <select
        ref={ref}
        id={inputId}
        className={cx("crl-input", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || helperText ? helperId : undefined}
        {...rest}
      />
    </Chrome>
  );
});
