import React, { useState } from 'react';
import ReportCard from './ReportCard';
import { getQuestionsForBusiness } from '../questionSets';

const businessTypes = [
  "Clinical care (in-person or virtual)",
  "Wellness or cosmetic services", 
  "Health-related products (e.g., supplements, devices)",
  "Software, apps, or digital tools for patients or providers"
];

const IntakeWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [businessType, setBusinessType] = useState('');
  const [state, setState] = useState('');
  const [showReportCard, setShowReportCard] = useState(false);
  const [questions, setQuestions] = useState([]);

  // Handle business type selection and load dynamic questions
  const handleBusinessTypeSelection = (selectedType, selectedState) => {
    setBusinessType(selectedType);
    setState(selectedState);
    
    // Get filtered questions for this business type
    const filteredQuestions = getQuestionsForBusiness(selectedType, selectedState);
    setQuestions(filteredQuestions);
    setCurrentStep(2);
  };

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    setShowReportCard(true);
  };

  const handleRestartAssessment = () => {
    setShowReportCard(false);
    setCurrentStep(1);
    setAnswers({});
    setBusinessType('');
    setState('');
    setQuestions([]);
  };

  // Show ReportCard if assessment is complete
  if (showReportCard) {
    return (
      <div>
        <ReportCard 
          answers={answers} 
          businessType={businessType} 
        />
        <div className="text-center mt-8 p-6">
          <button
            onClick={handleRestartAssessment}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Take New Assessment
          </button>
        </div>
      </div>
    );
  }

  // Step 1: Business Type and State Selection
  if (currentStep === 1) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Healthcare Compliance Risk Assessment
          </h1>
          <p className="text-gray-600">
            Get personalized compliance insights for your healthcare business
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          {/* Business Type Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What type of business do you operate?
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {businessTypes.map((type) => (
                <label key={type} className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all">
                  <input
                    type="radio"
                    name="businessType"
                    value={type}
                    checked={businessType === type}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="mr-4 w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700 font-medium">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* State Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Which U.S. state(s) do you operate in?
            </h2>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Select a state --</option>
              <option value="California">California</option>
              <option value="New York">New York</option>
              <option value="Texas">Texas</option>
              <option value="Florida">Florida</option>
              <option value="Illinois">Illinois</option>
              <option value="Pennsylvania">Pennsylvania</option>
              <option value="Ohio">Ohio</option>
              <option value="Georgia">Georgia</option>
              <option value="North Carolina">North Carolina</option>
              <option value="Michigan">Michigan</option>
              <option value="Other">Other</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">
              Some states like California have stricter compliance rules
            </p>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <button 
              onClick={() => handleBusinessTypeSelection(businessType, state)}
              disabled={!businessType || !state}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-medium w-full"
            >
              Start Risk Assessment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Dynamic Questions Based on Business Type
  if (currentStep === 2) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {businessType} Compliance Assessment
          </h1>
          <p className="text-gray-600">
            Answer these questions specific to your business type
          </p>
          <div className="bg-blue-50 rounded-lg p-3 mt-4 inline-block">
            <span className="text-blue-800 font-medium">
              {Object.keys(answers).length} of {questions.length} questions answered
            </span>
          </div>
        </div>

        {/* Dynamic Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => {
            // Check if this question depends on another answer
            if (question.dependsOn) {
              const dependentAnswer = answers[question.dependsOn.questionId];
              const requiredValues = Array.isArray(question.dependsOn.values) 
                ? question.dependsOn.values 
                : [question.dependsOn.value];
              
              if (!requiredValues.includes(dependentAnswer)) {
                return null; // Don't show this question
              }
            }

            return (
              <div key={question.id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                    {question.section}
                  </span>
                  {question.riskLevel && (
                    <span className={`inline-block ml-2 text-xs font-medium px-2 py-1 rounded ${
                      question.riskLevel === 'critical' ? 'bg-red-100 text-red-700' :
                      question.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                      question.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {question.riskLevel.toUpperCase()} RISK
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {question.description}
                </h3>
                
                <div className={`${question.multiSelect ? 'space-y-2' : 'flex flex-wrap gap-4'}`}>
                  {question.options.map((option) => (
                    <label key={option.value} className={`${
                      question.multiSelect 
                        ? 'flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50' 
                        : 'flex items-center cursor-pointer'
                    }`}>
                      <input
                        type={question.multiSelect ? "checkbox" : "radio"}
                        name={question.id}
                        value={option.value}
                        checked={
                          question.multiSelect 
                            ? (answers[question.id] || []).includes(option.value)
                            : answers[question.id] === option.value
                        }
                        onChange={(e) => {
                          if (question.multiSelect) {
                            const currentValues = answers[question.id] || [];
                            const newValues = e.target.checked
                              ? [...currentValues, option.value]
                              : currentValues.filter(v => v !== option.value);
                            handleAnswer(question.id, newValues);
                          } else {
                            handleAnswer(question.id, option.value);
                          }
                        }}
                        className="mr-3 w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 p-6 bg-gray-50 rounded-lg">
          <button
            onClick={() => setCurrentStep(1)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            ← Back to Business Type
          </button>
          
          <button 
            onClick={handleSubmit}
            disabled={Object.keys(answers).length === 0}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Generate Risk Report →
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default IntakeWizard;