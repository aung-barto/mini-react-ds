import React from "react";
import "./AppWizard.css";
import { StepIndicator, Step } from "../components/StepIndicator/StepIndicator";
import { TextField } from "../components/TextField/TextField";
import { TextArea } from "../components/TextArea/TextArea";
import { Autocomplete, Option } from "../components/Autocomplete/Autocomplete";
import { Tag } from "../components/Tag/Tag";
import { Button } from "../components/Button/Button";

const steps: Step[] = [
  { id: "basic", label: "Basic info" },
  { id: "experience", label: "Experience" },
  { id: "review", label: "Review & submit" },
];

const roles: Option[] = [
  { value: "frontend", label: "Frontend Engineer" },
  { value: "eng-design", label: "Engineer Who Can Design" },
  { value: "product-design", label: "Product Designer" },
  { value: "fullstack", label: "Full Stack Engineer" },
];

export const AppWizard: React.FC = () => {
  const [activeStepId, setActiveStepId] = React.useState<string>("basic");

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<Option | null>(null);

  const [yearsExperience, setYearsExperience] = React.useState("");
  const [skills, setSkills] = React.useState<string>("React, TypeScript");
  const [motivation, setMotivation] = React.useState("");
  const [errors, setErrors] = React.useState<{
    fullName?: string;
    email?: string;
    yearsExperience?: string;
    motivation?: string;
  }>({});

  const currentStepIndex = steps.findIndex((s) => s.id === activeStepId);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const validateBasicStep = () => {
    const nextErrors: { fullName?: string; email?: string } = {};

    if (!fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateExperienceStep = () => {
    const nextErrors: {
      yearsExperience?: string;
      motivation?: string;
    } = {};

    // Validate years of experience
    if (!yearsExperience.trim()) {
      nextErrors.yearsExperience = "Years of experience is required.";
    } else if (isNaN(Number(yearsExperience))) {
      nextErrors.yearsExperience = "Please enter a number.";
    } else if (Number(yearsExperience) < 0) {
      nextErrors.yearsExperience = "Years of experience cannot be negative.";
    }

    // Validate motivation (textarea)
    if (!motivation.trim()) {
      nextErrors.motivation =
        "Please tell us why you're interested in this role.";
    } else if (motivation.trim().length < 20) {
      nextErrors.motivation = "Please write at least 20 characters.";
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (isLastStep) return;

    if (activeStepId === "basic") {
      const ok = validateBasicStep();
      if (!ok) return;
    }

    if (activeStepId === "experience") {
      const ok = validateExperienceStep();
      if (!ok) return;
    }
    setActiveStepId(steps[currentStepIndex + 1].id);
  };

  const goBack = () => {
    if (!isFirstStep) {
      setActiveStepId(steps[currentStepIndex - 1].id);
    }
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    // For demo purposes just log. In real app you'd send data to an API.
    console.log({
      fullName,
      email,
      role: role?.label,
      yearsExperience,
      skills,
      motivation,
    });
    alert("Application submitted (demo). Check console for payload.");
  };

  const renderStep = () => {
    if (activeStepId === "basic") {
      return (
        <div className="aw-step aw-step-basic">
          <div className="aw-columns">
            <TextField
              label="Full name"
              placeholder="Your name"
              required
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) {
                  setErrors((prev) => ({ ...prev, fullName: undefined }));
                }
              }}
              showRequiredIndicator
              error={errors.fullName}
            />
            <TextField
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
              showRequiredIndicator
              error={errors.email}
            />
          </div>

          <div className="aw-field">
            <Autocomplete
              label="Role you're applying for"
              placeholder="Search roles…"
              options={roles}
              onChange={(value) => setRole(value)}
            />
          </div>
        </div>
      );
    }

    if (activeStepId === "experience") {
      return (
        <div className="aw-step aw-step-experience">
          <div className="aw-columns">
            <TextField
              label="Years of professional experience"
              placeholder="e.g. 5"
              value={yearsExperience}
              onChange={(e) => {
                setYearsExperience(e.target.value);
                if (errors.yearsExperience) {
                  setErrors((prev) => ({
                    ...prev,
                    yearsExperience: undefined,
                  }));
                }
              }}
              required
              showRequiredIndicator
              error={errors.yearsExperience}
            />
            <TextField
              label="Key skills"
              placeholder="React, TypeScript, design systems…"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              helperText="Separate skills with commas."
            />
          </div>

          <TextArea
            label="Why are you interested in this role?"
            placeholder="Share how your experience and interests align with the work."
            value={motivation}
            onChange={(e) => {
              setMotivation(e.target.value);
              if (errors.motivation) {
                setErrors((prev) => ({
                  ...prev,
                  motivation: undefined,
                }));
              }
            }}
            required
            showRequiredIndicator
            error={errors.motivation}
          />

          <div className="aw-skill-tags">
            <span className="aw-skill-tags-label">Examples:</span>
            <Tag tone="accent">Design systems</Tag>
            <Tag>Accessibility</Tag>
            <Tag>Data-heavy UI</Tag>
          </div>
        </div>
      );
    }

    // review step
    return (
      <div className="aw-step aw-step-review">
        <div className="aw-review-card">
          <h3>Application summary</h3>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{fullName || "—"}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{email || "—"}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{role?.label || "—"}</dd>
            </div>
            <div>
              <dt>Years of experience</dt>
              <dd>{yearsExperience || "—"}</dd>
            </div>
            <div>
              <dt>Key skills</dt>
              <dd>{skills || "—"}</dd>
            </div>
            <div>
              <dt>Motivation</dt>
              <dd>{motivation || "—"}</dd>
            </div>
          </dl>
        </div>
      </div>
    );
  };

  return (
    <div className="aw-root">
      <header className="aw-header">
        <h1>Multi-step job application</h1>
      </header>

      <section className="aw-card">
        <StepIndicator steps={steps} activeStepId={activeStepId} />

        <form className="aw-form" onSubmit={handleSubmit}>
          {renderStep()}

          <div className="aw-footer">
            <div className="aw-footer-left">
              {!isFirstStep && (
                <Button variant="secondary" type="button" onClick={goBack}>
                  Back
                </Button>
              )}
            </div>
            <div className="aw-footer-right">
              {!isLastStep && (
                <Button type="button" onClick={goNext}>
                  Next
                </Button>
              )}
              {isLastStep && (
                <Button type="submit" variant="primary">
                  Submit application
                </Button>
              )}
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
