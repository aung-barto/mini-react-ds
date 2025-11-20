import React from "react";
import styles from "./TextField.module.css";

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  helperText?: string;
  error?: string;
  showRequiredIndicator?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  helperText,
  error,
  showRequiredIndicator,
  required,
  className = "",
  ...rest
}) => {
  const inputId = id ?? React.useId();
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy =
    [helperId, errorId].filter(Boolean).join(" ") || undefined;

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(" ");
  const inputClasses = [styles.input, error ? styles.error : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
        {(showRequiredIndicator || required) && (
          <span className={styles.requiredMark}>*</span>
        )}
      </label>
      <input
        id={inputId}
        className={inputClasses}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        required={required}
        {...rest}
      />
      {helperText && !error && (
        <p id={helperId} className={styles.helper}>
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.errorText}>
          {error}
        </p>
      )}
    </div>
  );
};
