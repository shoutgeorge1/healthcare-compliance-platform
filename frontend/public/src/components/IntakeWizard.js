import React, { useState } from 'react';

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
    "Do you follow your state’s telehealth practice rules?",
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

const IntakeWizard = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (zone, index, value) => {
    const key = `${zone}-${index}`;
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => setSubmitted(true);

  const calculateScore = (zone) => {
    const questions = complianceData[zone];
    const answeredYes = questions.filter((_, idx) => answers[`${zone}-${idx}`] === 'yes').length;
    return Math.round((answeredYes / questions.length) * 100);
  };

  const getColor = (score) => {
    if (score >= 80) return 'green';
    if (score >= 50) return 'orange';
    return 'red';
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Healthcare Compliance Risk Assessment</h1>

      {!submitted ? (
        <>
          {Object.entries(complianceData).map(([zone, questions]) => (
            <div key={zone} style={{ marginBottom: '2rem' }}>
              <h2>{zone.replace(/_/g, ' ')}</h2>
              {questions.map((question, idx) => (
                <div key={idx} style={{ marginBottom: '0.5rem' }}>
                  <p>{question}</p>
                  <label>
                    <input
                      type="radio"
                      name={`${zone}-${idx}`}
                      value="yes"
                      onChange={() => handleAnswer(zone, idx, 'yes')}
                      checked={answers[`${zone}-${idx}`] === 'yes'}
                    /> Yes
                  </label>{' '}
                  <label>
                    <input
                      type="radio"
                      name={`${zone}-${idx}`}
                      value="no"
                      onChange={() => handleAnswer(zone, idx, 'no')}
                      checked={answers[`${zone}-${idx}`] === 'no'}
                    /> No
                  </label>
                </div>
              ))}
            </div>
          ))}

          <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '16px' }}>
            View Risk Report
          </button>
        </>
      ) : (
        <>
          <h2>📊 Risk Report Card</h2>
          {Object.keys(complianceData).map((zone) => {
            const score = calculateScore(zone);
            const color = getColor(score);
            return (
              <div key={zone} style={{ marginBottom: '1rem' }}>
                <strong>{zone.replace(/_/g, ' ')}:</strong>
                <div
                  style={{
                    width: '100%',
                    background: '#eee',
                    height: '20px',
                    borderRadius: '5px',
                    marginTop: '5px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: `${score}%`,
                      background: color,
                      height: '100%'
                    }}
                  />
                </div>
                <p style={{ color }}>{score}% compliant</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default IntakeWizard;
