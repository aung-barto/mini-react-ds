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
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [query, setQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(
    null
  );

  const listId = React.useId();

  const handleSelect = (option: Option) => {
    setQuery(option.label);
    setIsOpen(false);
    setHighlightedIndex(null);
    onChange?.(option);
  };

  const filtered =
    query.trim() === ""
      ? options
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim() === "") {
      setHighlightedIndex(-1);
      onChange?.(null);
    }
    setIsOpen(true);
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
      setHighlightedIndex(-1);
      return;
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // if (!rootRef.current) return;
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapper} ref={rootRef}>
      <TextField
        label={label}
        value={query}
        onChange={handleChange}
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
