import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  className = "",
  children,
  ...rest
}) => {
  const classes = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      <span className={styles.label}>{children}</span>
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </button>
  );
};
