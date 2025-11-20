import React from "react";
import { Nav, PageKey } from "./components/Nav/Nav";
import { Gallery } from "./pages/Gallery";
import { AppWizard } from "./pages/AppWizard";
import { Dashboard } from "./pages/Dashboard";

const App: React.FC = () => {
  const [page, setPage] = React.useState<PageKey>("gallery");

  return (
    <div>
      <Nav current={page} onNavigate={setPage} />
      {page === "gallery" && <Gallery />}
      {page === "wizard" && <AppWizard />}
      {page === "dashboard" && <Dashboard />}
    </div>
  );
};

export default App;
