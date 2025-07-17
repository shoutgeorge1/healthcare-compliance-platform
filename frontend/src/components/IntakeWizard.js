import React, { useState } from 'react';
import { getQuestionsForBusiness } from '../questionSets';
import StepOne from './StepOne';
import ReportCard from './ReportCard';

function IntakeWizard({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [businessMeta, setBusinessMeta] = useState(null);
  const [questionSet, setQuestionSet] = useState([]);

  const handleStepOneComplete = ({ businessType, state }) => {
    setBusinessMeta({ businessType, state });

    // Use the imported function to get questions
    const selectedQuestionSet = getQuestionsForBusiness(businessType, state);

    if (selectedQuestionSet && selectedQuestionSet.length > 0) {
      setQuestionSet(selectedQuestionSet);
    } else {
      alert(`No questions found for the selected business type: "${businessType}"`);
    }
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

    if (answers.hipaa1 === 'yes') score -= 15;
    if (answers.tracking1 === 'yes') score -= 20;
    if (answers.tracking1 === 'unsure') score -= 10;
    if (answers.sms1 === 'yes') score -= 15;

    return {
      overallScore: score,
      businessType: businessMeta?.businessType,
      state: businessMeta?.state,
      breakdown: [
        { area: 'HIPAA / Data Collection', score: answers.hipaa1 === 'yes' ? 85 : 100 },
        { area: 'Pixels / 3rd-Party Tracking', score: answers.tracking1 === 'yes' ? 80 : answers.tracking1 === 'unsure' ? 90 : 100 },
        { area: 'TCPA / SMS Risk', score: answers.sms1 === 'yes' ? 85 : 100 },
      ],
    };
  };

  if (!businessMeta) return <StepOne onNext={handleStepOneComplete} />;
  if (!currentQuestion) return <ReportCard answers={answers} />;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-700 mb-1">
          Step {stepIndex + 1} of {questionSet.length}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / questionSet.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">{currentQuestion.section}</h3>
        <p className="text-gray-700 mb-4">{currentQuestion.description}</p>
        
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
    </div>
  );
}

export default IntakeWizard;