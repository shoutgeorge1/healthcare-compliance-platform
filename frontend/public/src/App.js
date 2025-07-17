// src/App.js
import React, { useState } from "react";
import IntakeWizard from "./components/IntakeWizard";
import ReportCard from "./components/ReportCard";

function App() {
  const [scores, setScores] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {!scores ? (
        <IntakeWizard onComplete={(s) => setScores(s)} />
      ) : (
        <ReportCard scores={scores} />
      )}
    </div>
  );
}

export default App;
