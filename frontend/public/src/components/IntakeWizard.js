import React, { useState } from 'react';
import ReportCard from './ReportCard';

const questions = [
  {
    category: "HIPAA",
    text: "Do you store or transmit Protected Health Information (PHI)?",
    followUp: "Do you have a current BAA (Business Associate Agreement) with all vendors?",
  },
  {
    category: "TCPA/CAN-SPAM",
    text: "Do you use SMS or email marketing?",
    followUp: "Do you log consent and provide clear opt-out mechanisms?",
  },
  {
    category: "Scope of Practice",
    text: "Are any non-licensed individuals involved in patient care or medical advice?",
    followUp: "Do you have clear written protocols reviewed by a supervising physician?",
  },
  {
    category: "FDA/FTC",
    text: "Do you advertise any treatments or supplements?",
    followUp: "Are those claims backed by published studies or cleared labeling?",
  },
  {
    category: "AI & Automation",
    text: "Are you using AI tools for anything customer-facing (chatbots, email, etc.)?",
    followUp: "Do you have human oversight and disclaimers in place for those AI tools?",
  },
  {
    category: "Training & SOPs",
    text: "Does every team member get formal training on compliance, annually?",
    followUp: "Are SOPs documented and accessible to staff at all times?",
  },
  {
    category: "Medical Board Exposure",
    text: "Are you under active investigation or complaint by a state medical board?",
    followUp: "Do you have legal counsel or documentation to mitigate this exposure?",
  }
];

export default function IntakeWizard() {
  const [answers, setAnswers] = useState({});
  const [showReport, setShowReport] = useState(false);

  const handleAnswer = (question, value) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmit = () => {
    setShowReport(true);
  };

  if (showReport) {
    return <ReportCard answers={answers} />;
  }

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>
      <h2>Healthcare Risk Assessment</h2>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <strong>{q.category}:</strong> <br />
          {q.text}
          <br />
          <button onClick={() => handleAnswer(q.category, 1)}>Yes</button>
          <button onClick={() => handleAnswer(q.category, 0)}>No</button>
          {answers[q.category] === 1 && (
            <div style={{ marginTop: 5 }}>
              <small>{q.followUp}</small><br />
              <button onClick={() => handleAnswer(`${q.category}_followUp`, 1)}>Yes</button>
              <button onClick={() => handleAnswer(`${q.category}_followUp`, 0)}>No</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={handleSubmit} style={{ marginTop: 30 }}>Generate My Report</button>
    </div>
  );
}
