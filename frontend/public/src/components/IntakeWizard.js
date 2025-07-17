// src/components/IntakeWizard.js
import React, { useState } from "react";

const questions = [
  {
    category: "HIPAA",
    text: "Do you store or send PHI using Gmail, Google Drive, Slack, or GoHighLevel?",
    weight: 2,
  },
  {
    category: "HIPAA",
    text: "Do you have signed BAAs with all software vendors handling PHI?",
    weight: 1,
  },
  {
    category: "TCPA",
    text: "Do you send promotional texts or emails without documented consent?",
    weight: 2,
  },
  {
    category: "TCPA",
    text: "Do your emails lack unsubscribe links or footer info?",
    weight: 1,
  },
  {
    category: "FDA/FTC",
    text: "Do you market treatments or supplements as 'FDA-approved' when they’re not?",
    weight: 2,
  },
  {
    category: "FDA/FTC",
    text: "Do you make medical claims without citations or disclaimers?",
    weight: 1,
  },
  {
    category: "Medical Board",
    text: "Do providers offer services across state lines without multi-state licensure?",
    weight: 2,
  },
  {
    category: "Medical Board",
    text: "Are non-physicians making treatment decisions or diagnoses?",
    weight: 2,
  },
  {
    category: "AI/Automation",
    text: "Do you use AI-generated emails, chat, or landing pages without human review?",
    weight: 1,
  },
  {
    category: "SOPs",
    text: "Do you have no documented HIPAA training or breach protocol for staff?",
    weight: 2,
  },
];

const categories = ["HIPAA", "TCPA", "FDA/FTC", "Medical Board", "AI/Automation", "SOPs"];

export default function IntakeWizard({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (risk) => {
    setAnswers([...answers, risk]);
    setStep(step + 1);
  };

  if (step >= questions.length) {
    const categoryScores = {};
    questions.forEach((q, i) => {
      if (!categoryScores[q.category]) categoryScores[q.category] = 0;
      categoryScores[q.category] += answers[i] * q.weight;
    });
    onComplete(categoryScores);
    return null;
  }

  return (
    <div className="p-4 text-center max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {questions[step].text}
      </h2>
      <div className="flex justify-center gap-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => handleAnswer(1)}
        >
          Yes
        </button>
        <button
          className="bg-yellow-400 text-black px-4 py-2 rounded"
          onClick={() => handleAnswer(0.5)}
        >
          Not Sure
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleAnswer(0)}
        >
          No
        </button>
      </div>
    </div>
  );
}
