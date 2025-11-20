import React from "react";
import styles from "./Nav.module.css";

interface NavProps {
  current: "gallery" | "wizard";
  onNavigate: (page: "gallery" | "wizard") => void;
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
    </nav>
  );
};
