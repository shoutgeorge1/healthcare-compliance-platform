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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Healthcare Compliance Platform
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Risk Assessment Wizard
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Get personalized compliance insights and actionable recommendations tailored to your healthcare business
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Business Type Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Business Type</h2>
                    <p className="text-gray-600">Select your primary business model</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {businessTypes.map((type, index) => {
                    const isSelected = businessType === type;
                    return (
                      <label key={type} className="group cursor-pointer block">
                        <input
                          type="radio"
                          name="businessType"
                          value={type}
                          checked={isSelected}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`
                          relative border-2 rounded-xl p-4 transition-all duration-200 
                          ${isSelected 
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                          }
                          group-hover:transform group-hover:scale-105
                        `}>
                          <div className="flex items-center space-x-3">
                            <div className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                              ${isSelected 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300 group-hover:border-blue-400'
                              }
                            `}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <span className={`font-medium transition-colors duration-200 ${
                              isSelected ? 'text-blue-700' : 'text-gray-700 group-hover:text-blue-600'
                            }`}>
                              {type}
                            </span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* State Selection Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Primary State</h2>
                    <p className="text-gray-600">Where do you operate?</p>
                  </div>
                </div>
                
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium appearance-none cursor-pointer hover:border-blue-300 transition-colors"
                  >
                    <option value="">-- Select your primary state --</option>
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
                    <option value="Washington">Washington</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-amber-800">State-Specific Regulations</p>
                      <p className="text-sm text-amber-700 mt-1">
                        States like California, New York, and Texas have additional compliance requirements that will be included in your assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="text-center mt-12">
              <button 
                onClick={() => handleBusinessTypeSelection(businessType, state)}
                disabled={!businessType || !state}
                className="group inline-flex items-center space-x-3 px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:transform-none"
              >
                <span>Start Compliance Assessment</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              {(!businessType || !state) && (
                <p className="text-red-500 text-sm mt-4 font-medium">
                  Please select both your business type and state to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Dynamic Questions Based on Business Type
  if (currentStep === 2) {
    const visibleQuestions = questions.filter(question => {
      if (question.dependsOn) {
        const dependentAnswer = answers[question.dependsOn.questionId];
        const requiredValues = Array.isArray(question.dependsOn.values) 
          ? question.dependsOn.values 
          : [question.dependsOn.value];
        
        return requiredValues.includes(dependentAnswer);
      }
      return true;
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {businessType} Assessment
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Compliance Risk Analysis
            </h1>
            <p className="text-gray-600 mb-6">
              Answer these targeted questions to identify your compliance risks
            </p>
            
            {/* Progress Bar */}
            <div className="bg-white rounded-full p-1 shadow-lg max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2 px-4">
                <span>Progress</span>
                <span className="font-semibold text-blue-600">
                  {Object.keys(answers).length} of {visibleQuestions.length}
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(Object.keys(answers).length / visibleQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Questions - One per Card */}
          <div className="space-y-6">
            {visibleQuestions.map((question, index) => (
              <div key={question.id} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white bg-opacity-20 rounded-full p-2">
                          <span className="text-white font-bold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <span className="inline-block bg-white bg-opacity-20 text-white text-xs font-medium px-3 py-1 rounded-full">
                            {question.section}
                          </span>
                        </div>
                      </div>
                      
                      {question.riskLevel && (
                        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                          question.riskLevel === 'critical' ? 'bg-red-500 text-white' :
                          question.riskLevel === 'high' ? 'bg-orange-500 text-white' :
                          question.riskLevel === 'medium' ? 'bg-yellow-500 text-white' :
                          'bg-green-500 text-white'
                        }`}>
                          {question.riskLevel.toUpperCase()} RISK
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                      {question.description}
                    </h3>
                    
                    {/* Answer Options */}
                    <div className={`${question.multiSelect ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-3 gap-3'}`}>
                      {question.options.map((option) => {
                        const isSelected = question.multiSelect 
                          ? (answers[question.id] || []).includes(option.value)
                          : answers[question.id] === option.value;
                          
                        return (
                          <label key={option.value} className={`
                            relative cursor-pointer group/option
                            ${question.multiSelect ? 'block' : ''}
                          `}>
                            <input
                              type={question.multiSelect ? "checkbox" : "radio"}
                              name={question.id}
                              value={option.value}
                              checked={isSelected}
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
                              className="sr-only"
                            />
                            <div className={`
                              relative border-2 rounded-xl p-4 transition-all duration-200
                              ${isSelected 
                                ? 'border-blue-500 bg-blue-50 shadow-md' 
                                : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                              }
                              group-hover/option:transform group-hover/option:scale-105
                            `}>
                              <div className="flex items-center space-x-3">
                                <div className={`
                                  w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                                  ${isSelected 
                                    ? 'border-blue-500 bg-blue-500' 
                                    : 'border-gray-300 group-hover/option:border-blue-400'
                                  }
                                `}>
                                  {isSelected && (
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                                <span className={`font-medium transition-colors duration-200 ${
                                  isSelected ? 'text-blue-700' : 'text-gray-700 group-hover/option:text-blue-600'
                                }`}>
                                  {option.label}
                                </span>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all duration-200 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Business Type</span>
              </button>
              
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">
                  {Object.keys(answers).length > 0 
                    ? `${Object.keys(answers).length} questions completed` 
                    : 'Start answering questions above'
                  }
                </div>
                <div className="text-xs text-gray-400">
                  You can generate your report anytime
                </div>
              </div>
              
              <button 
                onClick={handleSubmit}
                disabled={Object.keys(answers).length === 0}
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Generate Risk Report</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default IntakeWizard;