import React from 'react';

function ReportCard({ answers }) {
  if (!answers || !answers.overallScore) {
    return <p className="text-center text-gray-600">No report data found.</p>;
  }

  const { businessType, state, overallScore, breakdown } = answers;

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Compliance Risk Report</h2>
        <p className="text-gray-600 mt-2">
          Business type: <strong>{businessType}</strong> <br />
          Operating in: <strong>{state}</strong>
        </p>
      </div>

      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Overall Risk Score</h3>
        <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full ${getScoreColor(overallScore)}`}
            style={{ width: `${overallScore}%` }}
          />
        </div>
        <p className="mt-2 text-center text-xl font-bold">{overallScore}/100</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Category Breakdown</h4>
        {breakdown.map((item, index) => (
          <div key={index} className="space-y-1">
            <p className="font-medium">{item.area}</p>
            <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
              <div
                className={`h-full ${getScoreColor(item.score)}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">Score: {item.score}/100</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportCard;
