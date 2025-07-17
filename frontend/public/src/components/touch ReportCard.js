import React from 'react';

const categories = [
  "HIPAA",
  "TCPA/CAN-SPAM",
  "Scope of Practice",
  "FDA/FTC",
  "AI & Automation",
  "Training & SOPs",
  "Medical Board Exposure"
];

export default function ReportCard({ answers }) {
  const calculateRisk = () => {
    return categories.map(cat => {
      const base = answers[cat] === 1 ? 0 : 1;
      const follow = answers[`${cat}_followUp`] === 1 ? 0 : 1;
      const risk = (base + follow) / 2;
      return { category: cat, risk };
    });
  };

  const scores = calculateRisk();

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>
      <h2>📋 Compliance Risk Report</h2>
      {scores.map(({ category, risk }) => (
        <div key={category} style={{ marginBottom: 15 }}>
          <strong>{category}</strong>
          <div style={{
            background: '#eee',
            height: 20,
            width: '100%',
            borderRadius: 5,
            overflow: 'hidden',
            marginTop: 5
          }}>
            <div style={{
              width: `${risk * 100}%`,
              height: '100%',
              background: risk > 0.7 ? '#d9534f' : risk > 0.3 ? '#f0ad4e' : '#5cb85c',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <small>{Math.round(risk * 100)}% Risk</small>
        </div>
      ))}
      <p style={{ marginTop: 30 }}>✅ This report highlights where you're most exposed so you can prioritize fixes and avoid audits, fines, or legal trouble.</p>
    </div>
  );
}
