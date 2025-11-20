import { useState } from "react";
import { Nav } from "./components/Nav/Nav";
import { Gallery } from "./pages/Gallery";
import { AppWizard } from "./pages/AppWizard";

const App: React.FC = () => {
  const [page, setPage] = useState<"gallery" | "wizard">("gallery");

  return (
    <div>
      <Nav current={page} onNavigate={setPage} />
      {page === "gallery" && <Gallery />}
      {page === "wizard" && <AppWizard />}
    </div>
  );
};

export default App;
