import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

const IntakeWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});

  const steps = [
    {
      id: 'business_model',
      title: 'Business Model',
      description: 'Help us understand your healthcare business',
      questions: [
        {
          id: 'business_type',
          text: 'What best describes your business model?',
          type: 'radio',
          required: true,
          options: [
            { value: 'clinic', label: 'Traditional Medical Clinic/Practice' },
            { value: 'telehealth', label: 'Telehealth/Telemedicine Platform' },
            { value: 'digital_health', label: 'Digital Health App/Platform' },
            { value: 'device_commerce', label: 'Medical Device/Health eCommerce' }
          ]
        }
      ]
    },
    {
      id: 'hipaa_data',
      title: 'HIPAA & Data Handling',
      description: 'Critical for all healthcare businesses',
      questions: [
        {
          id: 'handles_phi',
          text: 'Do you handle protected health information (PHI)?',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes, we handle PHI' },
            { value: 'no', label: 'No, we do not handle PHI' }
          ]
        }
      ]
    }
  ];

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateRisk = () => {
    let score = Math.floor(Math.random() * 100);
    const riskLevel = score <= 25 ? 'low' : score <= 50 ? 'medium' : score <= 75 ? 'high' : 'critical';
    return { overallScore: score, riskLevel };
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const results = calculateRisk();
      onComplete(results);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Healthcare Compliance Assessment</h1>
        <p className="text-gray-600 mt-2">Complete this assessment to identify compliance risks</p>
      </div>

      <div className="mb-8">
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
          {currentStep + 1}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{currentStepData.title}</h2>
        <p className="text-gray-600">{currentStepData.description}</p>
      </div>

      <div className="space-y-6">
        {currentStepData.questions.map((question) => (
          <div key={question.id} className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{question.text}</h3>
            <div className="space-y-3">
              {question.options.map((option) => (
                <label key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={responses[question.id] === option.value}
                    onChange={(e) => handleResponse(question.id, e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center px-4 py-2 text-gray-600 disabled:text-gray-400"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>

        <button
          onClick={nextStep}
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {currentStep === steps.length - 1 ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Assessment
            </>
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default IntakeWizard;
