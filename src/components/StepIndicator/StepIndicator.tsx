import React from "react";
import styles from "./StepIndicator.module.css";

export interface Step {
  id: string;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  activeStepId: string;
  onStepChange?: (stepId: string) => void; // 👈 new
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  activeStepId,
  onStepChange,
}) => {
  const activeIndex = steps.findIndex((s) => s.id === activeStepId);

  return (
    <ol className={styles.root}>
      {steps.map((step, index) => {
        const isActive = step.id === activeStepId;
        const isCompleted = activeIndex > index;

        const classes = [styles.step];
        if (isActive) classes.push(styles.active);
        if (isCompleted) classes.push(styles.completed);
        if (onStepChange) classes.push(styles.clickable);

        const handleClick = () => {
          if (onStepChange) onStepChange(step.id);
        };

        const handleKeyDown: React.KeyboardEventHandler<HTMLLIElement> = (
          e
        ) => {
          if (!onStepChange) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onStepChange(step.id);
          }
        };

        return (
          <li
            key={step.id}
            className={classes.join(" ")}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={onStepChange ? 0 : -1}
            role={onStepChange ? "button" : undefined}
          >
            <div className={styles.icon}>
              <span className={styles.index}>{index + 1}</span>
            </div>
            <div className={styles.label}>{step.label}</div>
          </li>
        );
      })}
    </ol>
  );
};
