import React from "react";
import { Button } from "../components/Button/Button";
import { TextField } from "../components/TextField/TextField";
import { Tag } from "../components/Tag/Tag";
import { Autocomplete } from "../components/Autocomplete/Autocomplete";
import { TextArea } from "../components/TextArea/TextArea";
import "./Gallery.css";
import { Step, StepIndicator } from "../components/StepIndicator/StepIndicator";

const roles = [
  { value: "frontend", label: "Frontend Engineer" },
  { value: "product-designer", label: "Product Designer" },
  { value: "eng-design", label: "Engineer Who Can Design" },
  { value: "recruiter", label: "Recruiter" },
];

const steps: Step[] = [
  { id: "basic", label: "Step 1" },
  { id: "experience", label: "Step 2" },
  { id: "review", label: "Step 3" },
];

export const Gallery: React.FC = () => {
  const [activeStepId, setActiveStepId] = React.useState<string>("basic");

  return (
    <div className="gallery-root">
      <header className="gallery-header">
        <h1>UI Component Gallery</h1>
        <p>
          A small, React UI kit showing my approach to visual design, component
          structure, and interaction states.
        </p>
      </header>

      <section className="gallery-section">
        <h2>Buttons</h2>
        <div className="gallery-row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section className="gallery-section">
        <h2>Tags</h2>
        <div className="gallery-row">
          <Tag>Default</Tag>
          <Tag tone="accent">Active Filter</Tag>
          <Tag tone="danger">Error</Tag>
        </div>
      </section>

      <section className="gallery-section">
        <h2>Form Inputs</h2>
        <div className="gallery-formGrid">
          <TextField label="Email" placeholder="you@example.com" />
          <TextField
            label="Password"
            type="password"
            placeholder="••••••••"
            helperText="Use 12+ characters."
          />
          <TextField
            label="Name"
            placeholder="Your name"
            error="Name is required."
          />
        </div>
      </section>

      <section className="gallery-section">
        <h2>Text Area</h2>
        <div className="gallery-narrow">
          <TextArea
            label="Long Input"
            placeholder="Description..."
            helperText="Try adding a short paragraph."
          />
        </div>
      </section>

      <section className="gallery-section">
        <h2>Autocomplete</h2>
        <div className="gallery-narrow">
          <Autocomplete
            label="Role"
            placeholder="Search roles..."
            helperText="Try typing “engineer”"
            options={roles}
          />
        </div>
      </section>
      <section className="gallery-section">
        <h2>Step Indicator</h2>
        <div className="gallery-column">
          <StepIndicator
            steps={steps}
            activeStepId={activeStepId}
            onStepChange={setActiveStepId}
          />
        </div>
      </section>
    </div>
  );
};
