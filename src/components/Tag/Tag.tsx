import React from "react";
import styles from "./Tag.module.css";

interface TagProps {
  children: React.ReactNode;
  tone?: "default" | "accent" | "danger";
}

export const Tag: React.FC<TagProps> = ({ children, tone = "default" }) => {
  const classes = [styles.tag, styles[`tone-${tone}`]]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
};
