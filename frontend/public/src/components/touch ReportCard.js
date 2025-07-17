import React from "react";

const getColor = (score) => {
  if (score >= 3) return "bg-red-500";
  if (score >= 1.5) return "bg-yellow-400";
  return "bg-green-500";
};

const getLabel = (score) => {
  if (score >= 3) return "High Risk";
  if (score >= 1.5) return "Moderate Risk";
  return "Low Risk";
};

const ReportCard = ({ scores }) => {
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = 20; // adjust if needed
  const percent = Math.round((totalScore / maxScore) * 100);

  return (
    <div className="p-6 max-w-2xl mx-auto text-left">
      <h2 className="text-2xl font-bold mb-4">Your Compliance Risk Report</h2>
      <p className="mb-6 text-gray-700">
        This report highlights your estimated risk level by category. Use it as a starting point to dig deeper into the highest-risk areas.
      </p>

      {Object.entries(scores).map(([category, score]) => (
        <div key={category} className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-medium">{category}</span>
            <span className="text-sm">{getLabel(score)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded h-4">
            <div
              className={`${getColor(score)} h-4 rounded`}
              style={{ width: `${Math.min(score * 33, 100)}%` }}
            ></div>
          </div>
        </div>
      ))}

      <div className="mt-8 p-4 border rounded bg-white shadow">
        <h3 className="font-bold mb-2">Overall Score: {percent}%</h3>
        <p>
          Focus first on any <span className="text-red-600 font-bold">High Risk</span> areas.
          This tool is not legal advice — it’s a triage tool to help guide your next step.
        </p>
      </div>
    </div>
  );
};

export default ReportCard;
