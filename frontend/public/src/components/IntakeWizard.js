import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, Upload, X } from 'lucide-react';

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
        },
        {
          id: 'has_bas',
          text: 'Do you have Business Associate Agreements with third-party vendors?',
          type: 'radio',
          showIf: (responses) => responses.handles_phi === 'yes',
          required: true,
          options: [
            { value: 'yes_all', label: 'Yes, with all vendors' },
            { value: 'partial', label: 'With some vendors' },
            { value: 'none', label: 'No BAAs in place' }
          ]
        }
      ]
    },
    {
      id: 'marketing_claims',
      title: 'Marketing & Health Claims',
      description: 'FTC compliance requirements',
      questions: [
        {
          id: 'makes_health_claims',
          text: 'Do you make health-related claims in your marketing?',
          type: 'radio',
          required: true,
          options: [
            { value: 'yes', label: 'Yes, we make health claims' },
            { value: 'no', label: 'No health claims' }
          ]
        },
        {
          id: 'claim_substantiation',
          text: 'Do you have scientific studies supporting your health claims?',
          type: 'radio',
          showIf: (responses) => responses.makes_health_claims === 'yes',
          required: true,
          options: [
            { value: 'yes_clinical', label: 'Yes, clinical trials and studies' },
            { value: 'yes_some', label: 'Some scientific support' },
            { value: 'none', label: 'No scientific substantiation' }
          ]
        }
      ]
    },
    {
      id: 'digital_marketing',
      title: 'Digital Marketing & TCPA',
      description: 'Text and email marketing compliance',
      questions: [
        {
          id: 'text_marketing',
          text: 'How do you obtain consent for text marketing?',
          type: 'radio',
          required: true,
          options: [
            { value: 'explicit_optin', label: 'Explicit opt-in with disclosures' },
            { value: 'checkbox_consent', label: 'Checkbox consent' },
            { value: 'purchased_lists', label: 'Purchased marketing lists' },
            { value: 'no_texting', label: 'We do not send marketing texts' }
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
    let score = 0;
    const issues = [];

    // HIPAA risks
    if (responses.handles_phi === 'yes') {
      score += 15;
      if (responses.has_bas !== 'yes_all') {
        score += 25;
        issues.push('Missing Business Associate Agreements');
      }
    }

    // FTC risks
    if (responses.makes_health_claims === 'yes' && responses.claim_substantiation === 'none') {
      score += 30;
      issues.push('Unsubstantiated Health Claims');
    }

    // TCPA risks
    if (responses.text_marketing === 'purchased_lists') {
      score += 35;
      issues.push('TCPA Violation Risk');
    }

    const riskLevel = score <= 25 ? 'low' : score <= 50 ? 'medium' : score <= 75 ? 'high' : 'critical';
    
    return { overallScore: score, riskLevel, issues };
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete assessment
      const results = calculateRisk();
      onComplete(results);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = (step) => {
    return step.questions.every(q => {
      if (q.showIf && !q.showIf(responses)) return true;
      if (!q.required) return true;
      return responses[q.id] !== undefined;
    });
  };

  const currentStepData = steps[currentStep];
  const canProceed = isStepComplete(currentStepData);
  const isLastStep = currentStep === steps.length - 1;

  const renderQuestion = (question) => {
    if (question.showIf && !question.showIf(responses)) {
      return null;
    }

    const value = responses[question.id] || '';

    if (question.type === 'radio') {
      return (
        <div className="space-y-3">
          {question.options.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => handleResponse(question.id, e.target.value)}
                className="text-blue-600"
              />
              <span className="text-gray-900">{option.label}</span>
            </label>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Healthcare Compliance Assessment</h1>
        <p className="text-gray-600 mt-2">Complete this assessment to identify compliance risks</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blu
