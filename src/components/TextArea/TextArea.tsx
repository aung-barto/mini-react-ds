import React from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  label: string;
  helperText?: string;
  error?: string;
  showRequiredIndicator?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  helperText,
  error,
  showRequiredIndicator,
  required,
  className = "",
  rows = 4,
  ...rest
}) => {
  const textareaId = id ?? React.useId();
  const helperId = helperText ? `${textareaId}-helper` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;
  const describedBy =
    [helperId, errorId].filter(Boolean).join(" ") || undefined;

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(" ");
  const textareaClasses = [styles.textarea, error ? styles.error : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      <label className={styles.label} htmlFor={textareaId}>
        {label}
        {(showRequiredIndicator || required) && (
          <span className={styles.requiredMark}>*</span>
        )}
      </label>
      <textarea
        id={textareaId}
        className={textareaClasses}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        required={required}
        rows={rows}
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
