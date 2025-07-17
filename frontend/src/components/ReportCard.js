import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  MessageSquare, 
  Eye, 
  Globe, 
  AlertTriangle, 
  Award, 
  Pill, 
  MapPin, 
  Download, 
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { getQuestionsForBusiness } from '../questionSets';



// Sample data - replace with props in real implementation
const sampleAnswers = {
  hipaa1: "yes",
  hipaa2: "no",
  hipaa3: "unsure",
  tracking1: "yes", 
  tracking2: "unsure",
  sms1: "yes",
  sms2: "no",
  telehealth1: "yes",
  telehealth2: "unsure",
  claims1: "yes",
  claims2: "no",
  licensing1: "yes",
  licensing2: "unsure",
  fda1: "yes",
  fda2: "no",
  state1: "unsure"
};

const ReportCard = ({ answers = sampleAnswers, businessType = "Clinical care (in-person or virtual)" }) => {
  const [copied, setCopied] = useState(false);

  // Section definitions with icons and question mappings
  const sections = {
    'HIPAA Risk Assessment': {
      icon: Shield,
      color: 'blue',
      questions: ['hipaa1', 'hipaa2', 'hipaa3', 'hipaa_advanced1', 'hipaa_advanced2', 'hipaa_advanced3']
    },
    'TCPA/SMS Compliance': {
      icon: MessageSquare,
      color: 'purple',
      questions: ['sms1', 'sms2', 'tcpa_advanced1', 'tcpa_advanced2', 'tcpa_advanced3']
    },
    '3rd-Party Tracking': {
      icon: Eye,
      color: 'orange',
      questions: ['tracking1', 'tracking2', 'tracking3']
    },
    'Telehealth & Licensing': {
      icon: Globe,
      color: 'green',
      questions: ['telehealth1', 'telehealth2', 'licensing1', 'licensing2', 'licensing3']
    },
    'Health Claims & FTC': {
      icon: AlertTriangle,
      color: 'red',
      questions: ['claims1', 'claims2', 'ftc1', 'ftc2', 'ftc3', 'ftc_advanced1', 'ftc_advanced2', 'ftc_advanced3']
    },
    'Professional Standards': {
      icon: Award,
      color: 'indigo',
      questions: ['scope1', 'scope2', 'licensing1', 'licensing2']
    },
    'FDA Compliance': {
      icon: Pill,
      color: 'pink',
      questions: ['fda1', 'fda2', 'fda3', 'fda_detailed1', 'fda_detailed2']
    },
    'State Regulations': {
      icon: MapPin,
      color: 'yellow',
      questions: ['state1']
    }
  };

const riskWeights = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1
};

const sectionScores = useMemo(() => {
  const scores = {};
  const allQuestions = getQuestionsForBusiness(businessType); // Get actual questions
  const questionMap = {};
  allQuestions.forEach(q => {
    questionMap[q.id] = q;
  });

  Object.entries(sections).forEach(([sectionName, sectionData]) => {
    let totalPoints = 0;
    let maxPoints = 0;

    sectionData.questions.forEach(questionId => {
      const answer = answers[questionId];
      const question = questionMap[questionId];

      if (question && answer) {
        const weight = riskWeights[question.riskLevel] || 1;
        maxPoints += weight;

        if (Array.isArray(answer)) {
          totalPoints += weight * 0.75; // generous multi-select partial credit
        } else if (
          ['yes', 'yes_both', 'yes_automated', 'yes_controlled', 'yes_clinical', 'yes_peer_reviewed'].includes(answer)
        ) {
          totalPoints += weight * 1.25; // super-boost for yes answers
        } else if (answer === 'unsure') {
          totalPoints += weight * 0.75; // softer penalty
        }
        
        // else (e.g., 'no') = 0
      }
    });

    const score = maxPoints > 0 ? Math.min(10, Math.round((totalPoints / maxPoints) * 10)) : 0;


    scores[sectionName] = {
      score,
      totalPoints,
      maxPoints,
      riskLevel: score <= 2 ? 'low' : score <= 6 ? 'moderate' : 'high'
    };
  });

  return scores;
}, [answers, businessType]);


  // Calculate overall score
  const overallScore = useMemo(() => {
    const validScores = Object.values(sectionScores).filter(s => s.maxPoints > 0);
    if (validScores.length === 0) return 0;
    
    const average = validScores.reduce((sum, s) => sum + s.score, 0) / validScores.length;
    return Math.round(average);
  }, [sectionScores]);

  const overallRiskLevel = overallScore <= 2 ? 'low' : overallScore <= 6 ? 'moderate' : 'high';

  // Generate recommendations based on answers
  const generateRecommendations = (sectionName, sectionData) => {
    const recommendations = [];
    
    sectionData.questions.forEach(questionId => {
      const answer = answers[questionId];
      
      if (answer === 'yes' || answer === 'unsure') {
        // Generate specific recommendations based on question ID and answer
        const recs = getRecommendationsForQuestion(questionId, answer);
        recommendations.push(...recs);
      }
    });
    
    return recommendations.slice(0, 3); // Limit to 3 recommendations
  };

  const getRecommendationsForQuestion = (questionId, answer) => {
    const recommendations = {
      hipaa1: ["Implement HIPAA-compliant intake forms using platforms like JotForm HIPAA or IntakeQ", "Remove tracking pixels from patient intake pages to prevent PHI exposure"],
      hipaa2: ["Obtain signed Business Associate Agreements (BAAs) from your EHR vendor immediately", "Conduct a HIPAA risk assessment with a qualified professional"],
      tracking1: ["Remove Meta Pixel and Google Analytics from pages containing patient information", "Implement cookieless analytics or patient portal-based tracking"],
      sms1: ["Ensure TCPA-compliant SMS consent with clear opt-in language and frequency disclosure", "Implement proper consent timestamp logging for all SMS communications"],
      telehealth1: ["Verify licensing requirements in all states where you provide telehealth services", "Consider joining telehealth compacts for multi-state practice"],
      claims1: ["Ensure all health claims are substantiated with clinical evidence", "Add proper disclaimers about individual results varying"],
      fda1: ["Verify FDA registration status and maintain current certifications", "Consult with FDA regulatory specialist for device classification"],
      state1: ["Research state-specific healthcare advertising regulations", "Implement state-compliant marketing practices"]
    };
    
    return recommendations[questionId] || [`Review ${questionId} compliance requirements with legal counsel`];
  };

  // Risk level styling
  const getRiskStyling = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return {
          color: 'text-green-600',
          bg: 'bg-green-100',
          border: 'border-green-200',
          progress: 'text-green-600'
        };
      case 'moderate':
        return {
          color: 'text-yellow-600',
          bg: 'bg-yellow-100', 
          border: 'border-yellow-200',
          progress: 'text-yellow-600'
        };
      case 'high':
        return {
          color: 'text-red-600',
          bg: 'bg-red-100',
          border: 'border-red-200',
          progress: 'text-red-600'
        };
      default:
        return {
          color: 'text-gray-600',
          bg: 'bg-gray-100',
          border: 'border-gray-200',
          progress: 'text-gray-600'
        };
    }
  };

  // Circular progress component
  const CircularProgress = ({ score, size = 'lg', className = '' }) => {
    const radius = size === 'sm' ? 20 : size === 'lg' ? 40 : 30;
    const strokeWidth = size === 'sm' ? 3 : 4;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDasharray = `${circumference} ${circumference}`;
    const strokeDashoffset = circumference - (score / 10) * circumference;
    
    const riskLevel = score <= 2 ? 'low' : score <= 6 ? 'moderate' : 'high';
    const styling = getRiskStyling(riskLevel);

    return (
      <div className={`relative ${className}`}>
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="#e5e7eb"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={styling.progress}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${styling.color}`}>
            {score}
          </span>
        </div>
      </div>
    );
  };

  // Export functions
  const handleCopyToClipboard = () => {
    const reportText = generateReportText();
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const generateReportText = () => {
    let report = `Healthcare Compliance Risk Assessment Report\n`;
    report += `Business Type: ${businessType}\n`;
    report += `Overall Risk Score: ${overallScore}/10 (${overallRiskLevel.toUpperCase()})\n\n`;
    
    Object.entries(sectionScores).forEach(([section, data]) => {
      if (data.maxPoints > 0) {
        report += `${section}: ${data.score}/10 (${data.riskLevel.toUpperCase()})\n`;
        const recommendations = generateRecommendations(section, sections[section]);
        recommendations.forEach(rec => {
          report += `  • ${rec}\n`;
        });
        report += `\n`;
      }
    });
    
    return report;
  };

  const overallStyling = getRiskStyling(overallRiskLevel);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Healthcare Compliance Risk Assessment
        </h1>
        <p className="text-gray-600">
          Comprehensive analysis for {businessType}
        </p>
      </div>

      {/* Overall Score */}
      <div className={`${overallStyling.bg} ${overallStyling.border} border-2 rounded-xl p-8 mb-8`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <CircularProgress score={overallScore} size="lg" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Overall Risk Score
              </h2>
              <p className={`text-lg font-semibold ${overallStyling.color}`}>
                {overallScore}/10 - {overallRiskLevel.charAt(0).toUpperCase() + overallRiskLevel.slice(1)} Risk
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Based on {Object.values(sectionScores).filter(s => s.maxPoints > 0).length} compliance areas
              </p>
            </div>
          </div>
          
          {/* Export Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleCopyToClipboard}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm">{copied ? 'Copied!' : 'Copy Report'}</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.entries(sections).map(([sectionName, sectionData]) => {
          const score = sectionScores[sectionName];
          if (!score || score.maxPoints === 0) return null;
          
          const Icon = sectionData.icon;
          const styling = getRiskStyling(score.riskLevel);
          const recommendations = generateRecommendations(sectionName, sectionData);
          
          return (
            <div
              key={sectionName}
              className={`${styling.bg} ${styling.border} border rounded-xl p-6 hover:shadow-lg transition-shadow`}
            >
              {/* Section Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-white ${styling.border} border`}>
                    <Icon className={`w-5 h-5 ${styling.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {sectionName}
                    </h3>
                    <p className={`text-xs ${styling.color} font-medium`}>
                      {score.riskLevel.charAt(0).toUpperCase() + score.riskLevel.slice(1)} Risk
                    </p>
                  </div>
                </div>
                <CircularProgress score={score.score} size="sm" />
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Risk Level</span>
                  <span>{score.score}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      score.riskLevel === 'low' 
                        ? 'bg-green-500' 
                        : score.riskLevel === 'moderate' 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(score.score / 10) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Action Items
                  </h4>
                  <ul className="space-y-2">
                    {recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="flex-shrink-0 mt-0.5">
                          {score.riskLevel === 'high' ? (
                            <XCircle className="w-3 h-3 text-red-500" />
                          ) : score.riskLevel === 'moderate' ? (
                            <AlertCircle className="w-3 h-3 text-yellow-500" />
                          ) : (
                            <CheckCircle className="w-3 h-3 text-green-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {rec}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-xs text-gray-500">
          This assessment is for informational purposes only and does not constitute legal advice. 
          Consult with qualified legal counsel for specific compliance guidance.
        </p>
      </div>
    </div>
  );
};

export default ReportCard;