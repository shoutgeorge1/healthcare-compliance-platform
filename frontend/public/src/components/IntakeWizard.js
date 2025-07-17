import React, { useState } from 'react';
import ReportCard from './ReportCard';

const complianceData = {
  HIPAA: [
    "Do you store patient data in a HIPAA-compliant system?",
    "Do you have BAAs signed with all vendors who handle PHI?",
    "Is your team trained on HIPAA annually?",
    "Do you encrypt patient data at rest and in transit?",
    "Do you have a documented breach response plan?"
  ],
  TCPA: [
    "Do you obtain explicit consent before sending SMS campaigns?",
    "Are your calls scrubbed against the DNC list?",
    "Do you have opt-out functionality for SMS and calls?",
    "Do you retain consent logs for at least 5 years?",
    "Do you segment marketing vs transactional outreach?"
  ],
  FDA: [
    "Are you marketing unapproved drugs or devices?",
    "Are your marketing claims supported by scientific evidence?",
    "Do you properly label all supplements and compounds?",
    "Do you avoid testimonial ads that mislead consumers?",
    "Do you have SOPs to avoid off-label promotion?"
  ],
  FTC: [
    "Do your ads disclose typical results?",
    "Do you include disclaimers for before-and-after photos?",
    "Is all testimonial content backed by actual experience?",
    "Do you have marketing approvals logged/documented?",
    "Do you comply with influencer disclosure rules?"
  ],
  MedicalBoard: [
    "Are providers operating within scope of their license?",
    "Are supervising physicians involved in daily operations?",
    "Do you follow your state's telehealth practice rules?",
    "Are advanced practice providers properly credentialed?",
    "Do you maintain current licenses for all providers?"
  ],
  SOP_Training: [
    "Do you provide SOPs to all team members?",
    "Are staff trained on protocols at least annually?",
    "Do you document patient education steps?",
    "Do you have a protocol for handling medical emergencies?",
    "Is your training tracked and logged?"
  ],
  AI_Usage: [
    "Do you disclose when AI is used in patient interactions?",
    "Is AI use limited to non-diagnostic support?",
    "Do you audit your AI content for accuracy?",
    "Do you avoid AI in regulated clinical decisions?",
    "Are humans always involved in clinical judgments?"
  ]
};

const businessTypes = [
  "Clinical care (in-person or virtual)",
  "Wellness or cosmetic services", 
  "Health-related products (e.g., supplements, devices)",
  "Software, apps, or digital tools for patients or providers"
];

const IntakeWizard = () => {
  const [answers, setAnswers] = useState({});
  const [businessType, setBusinessType] = useState('');
  const [showReportCard, setShowReportCard] = useState(false);

  const handleAnswer = (zone, index, value) => {
    const key = `${zone}-${index}`;
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setShowReportCard(true);
  };

  const handleRestartAssessment = () => {
    setShowReportCard(false);
    setAnswers({});
    setBusinessType('');
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

  // Show the assessment form
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Healthcare Compliance Risk Assessment
        </h1>
        <p className="text-gray-600">
          Complete this assessment to identify compliance risks and get actionable recommendations
        </p>
      </div>

      {/* Business Type Selection */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          What type of business do you operate?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {businessTypes.map((type) => (
            <label key={type} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-white transition-colors">
              <input
                type="radio"
                name="businessType"
                value={type}
                checked={businessType === type}
                onChange={(e) => setBusinessType(e.target.value)}
                className="mr-3"
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Compliance Questions */}
      {Object.entries(complianceData).map(([zone, questions]) => (
        <div key={zone} className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {zone.replace(/_/g, ' ')}
          </h2>
          <div className="space-y-4">
            {questions.map((question, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-800 mb-3 font-medium">{question}</p>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`${zone}-${idx}`}
                      value="yes"
                      onChange={() => handleAnswer(zone, idx, 'yes')}
                      checked={answers[`${zone}-${idx}`] === 'yes'}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`${zone}-${idx}`}
                      value="no"
                      onChange={() => handleAnswer(zone, idx, 'no')}
                      checked={answers[`${zone}-${idx}`] === 'no'}
                      className="mr-2"
                    />
                    <span className="text-gray-700">No</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`${zone}-${idx}`}
                      value="unsure"
                      onChange={() => handleAnswer(zone, idx, 'unsure')}
                      checked={answers[`${zone}-${idx}`] === 'unsure'}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Not Sure</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Submit Button */}
      <div className="text-center mt-8">
        <button 
          onClick={handleSubmit}
          disabled={!businessType}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg font-medium"
        >
          Generate Risk Report
        </button>
        {!businessType && (
          <p className="text-red-500 text-sm mt-2">Please select your business type to continue</p>
        )}
      </div>
    </div>
  );
};

export default IntakeWizard;