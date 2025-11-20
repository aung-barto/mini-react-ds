import React from "react";
// @ts-ignore - CSS module type declarations are not present in this project
import styles from "./Autocomplete.module.css";
import { TextField } from "../TextField/TextField";

export interface Option {
  value: string;
  label: string;
}

interface AutocompleteProps {
  label: string;
  placeholder?: string;
  helperText?: string;
  options: Option[];
  onChange?: (value: Option | null) => void;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  placeholder,
  helperText,
  options,
  onChange,
}) => {
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(
    null
  );

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const listId = React.useId();

  const handleSelect = (option: Option) => {
    setQuery(option.label);
    setIsOpen(false);
    setHighlightedIndex(null);
    onChange?.(option);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      setHighlightedIndex(0);
      return;
    }

    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        if (prev === null) return 0;
        return Math.min(prev + 1, filtered.length - 1);
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => {
        if (prev === null) return filtered.length - 1;
        return Math.max(prev - 1, 0);
      });
    } else if (e.key === "Enter" && highlightedIndex !== null) {
      e.preventDefault();
      handleSelect(filtered[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(null);
    }
  };

  return (
    <div className={styles.wrapper}>
      <TextField
        label={label}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={listId}
        placeholder={placeholder}
        helperText={helperText}
      />
      {isOpen && filtered.length > 0 && (
        <ul className={styles.list} id={listId} role="listbox">
          {filtered.map((opt, index) => {
            const isHighlighted = index === highlightedIndex;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isHighlighted}
                className={
                  isHighlighted ? styles.optionHighlighted : styles.option
                }
                onMouseDown={(e) => {
                  // prevent TextField blur
                  e.preventDefault();
                  handleSelect(opt);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span className={styles.optionLabel}>{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
      {isOpen && filtered.length === 0 && (
        <div className={styles.emptyState}>No matches found</div>
      )}
    </div>
  );
};
