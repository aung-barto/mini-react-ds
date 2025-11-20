import React from "react";
import styles from "./Nav.module.css";

export type PageKey = "dashboard" | "gallery" | "wizard";

interface NavProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
}

export const Nav: React.FC<NavProps> = ({ current, onNavigate }) => {
  return (
    <nav className={styles.nav}>
      <button
        className={current === "gallery" ? styles.active : styles.link}
        onClick={() => onNavigate("gallery")}
      >
        Component Gallery
      </button>

      <button
        className={current === "wizard" ? styles.active : styles.link}
        onClick={() => onNavigate("wizard")}
      >
        Job Application Wizard
      </button>
      <button
        className={current === "dashboard" ? styles.active : styles.link}
        onClick={() => onNavigate("dashboard")}
      >
        Dashboard
      </button>
    </nav>
  );
};
