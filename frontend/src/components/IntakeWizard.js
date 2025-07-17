import React, { useState } from 'react';
import StepOne from './StepOne';
import ReportCard from './ReportCard';

function IntakeWizard({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [businessMeta, setBusinessMeta] = useState(null);
  const [questionSet, setQuestionSet] = useState([]);

  const handleStepOneComplete = ({ businessType, state }) => {
    setBusinessMeta({ businessType, state });

    // This will later be replaced by dynamic logic
    const placeholderQuestions = [
      {
        id: 'q1',
        section: 'Data Collection',
        description: `Does your ${businessType} collect patient data online in ${state}?`,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
      {
        id: 'q2',
        section: '3rd-Party Tracking',
        description: 'Do you use tools like Meta Pixel or Google Analytics on booking or lead forms?',
        options: [
          { value: 'yes', label: 'Yes, actively using them' },
          { value: 'no', label: 'No, none at all' },
          { value: 'unsure', label: 'I’m not sure' },
        ],
      },
    ];

    setQuestionSet(placeholderQuestions);
  };

  const currentQuestion = questionSet[stepIndex];

  const handleAnswer = (answer) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(updatedAnswers);

    const nextStep = stepIndex + 1;
    if (nextStep >= questionSet.length) {
      const reportData = generateReportCard(updatedAnswers);
      onComplete(reportData);
    } else {
      setStepIndex(nextStep);
    }
  };

  const generateReportCard = (answers) => {
    let score = 100;

    if (answers.q1 === 'yes') score -= 15;
    if (answers.q2 === 'yes') score -= 20;
    if (answers.q2 === 'unsure') score -= 10;

    return {
      overallScore: score,
      businessType: businessMeta?.businessType,
      state: businessMeta?.state,
      breakdown: [
        { area: 'HIPAA / Data Collection', score: answers.q1 === 'yes' ? 85 : 100 },
        { area: 'Pixels / 3rd-Party Tracking', score: answers.q2 === 'yes' ? 80 : answers.q2 === 'unsure' ? 90 : 100 },
      ],
    };
  };

  if (!businessMeta) return <StepOne onNext={handleStepOneComplete} />;
  if (!currentQuestion) return <ReportCard answers={answers} />;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{stepIndex + 1}. {currentQuestion.section}</h2>
        <p className="text-sm text-gray-600">{currentQuestion.description}</p>
      </div>
      <div className="space-y-3">
  {currentQuestion.options.map((opt) => (
    <label
      key={opt.value}
      className="block w-full border rounded px-4 py-2 hover:bg-blue-50 cursor-pointer"
    >
      <input
        type="radio"
        name={`question-${currentQuestion.id}`}
        value={opt.value}
        onChange={() => handleAnswer(opt.value)}
        className="mr-2"
      />
      {opt.label}
    </label>
  ))}
      </div>
    </div>
  );
}

export default IntakeWizard;
