import React from 'react';

function ReportCard({ answers }) {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Your Compliance Risk Report</h2>
      <ul className="list-disc list-inside space-y-2">
        {Object.entries(answers).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
      <div className="mt-6 text-lg font-semibold text-green-700">
        ✅ Thanks for completing the assessment. Review your answers above.
      </div>
    </div>
  );
}

export default ReportCard;
