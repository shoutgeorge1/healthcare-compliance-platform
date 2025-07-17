import React, { useState } from 'react';
import IntakeWizard from './components/IntakeWizard';

function App() {
  const [completedAssessment, setCompletedAssessment] = useState(null);

  const handleAssessmentComplete = (assessmentData) => {
    setCompletedAssessment(assessmentData);
    alert('Assessment Complete! Risk Score: ' + assessmentData.overallScore + '/100');
  };

  return (
    <div className="App">
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">Healthcare Compliance Platform</h1>
        </div>
      </nav>
      
      <main>
        <IntakeWizard onComplete={handleAssessmentComplete} />
      </main>
    </div>
  );
}

export default App;
