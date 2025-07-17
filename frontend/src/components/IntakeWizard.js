import React, { useState } from 'react';
import ReportCard from './ReportCard';

function IntakeWizard({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

import questions from './questions';
const currentQuestion = questions[stepIndex];

  const handleAnswer = (answer) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(updatedAnswers);

    const nextStep = currentQuestion.next?.[answer] ?? stepIndex + 1;

    if (nextStep >= questions.length || !questions[nextStep]) {
      const reportData = generateReportCard(updatedAnswers);
      onComplete(reportData);
    } else {
      setStepIndex(nextStep);
    }
  };

  const generateReportCard = (answers) => {
    let score = 100;

    if (answers.q2 === 'yes') score -= 20;
    if (answers.q3 === 'no') score -= 15;
    if (answers.q4 === 'no') score -= 10;

    return {
      overallScore: score,
      breakdown: [
        { area: 'HIPAA', score: answers.q2 === 'yes' ? 80 : 100 },
        { area: 'TCPA', score: answers.q3 === 'no' ? 85 : 100 },
        { area: 'FDA/FTC', score: answers.q4 === 'no' ? 90 : 100 },
      ],
    };
  };

  if (!currentQuestion) return <ReportCard answers={answers} />;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{stepIndex + 1}. {currentQuestion.section}</h2>
        <p className="text-sm text-gray-600">{currentQuestion.description}</p>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(opt.value)}
            className="block w-full text-left px-4 py-2 border rounded hover:bg-blue-50"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default IntakeWizard;
