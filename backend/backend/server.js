const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Mock database
let assessments = [];

// Calculate risk score
const calculateRisk = (responses) => {
  let score = 0;
  const issues = [];

  if (responses.handles_phi === 'yes' && responses.has_bas !== 'yes_all') {
    score += 25;
    issues.push('Missing Business Associate Agreements');
  }

  if (responses.makes_health_claims === 'yes' && responses.claim_substantiation === 'none') {
    score += 30;
    issues.push('Unsubstantiated Health Claims');
  }

  if (responses.text_marketing === 'purchased_lists') {
    score += 35;
    issues.push('TCPA Violation Risk');
  }

  const riskLevel = score <= 25 ? 'low' : score <= 50 ? 'medium' : score <= 75 ? 'high' : 'critical';
  return { overallScore: score, riskLevel, issues };
};

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.post('/api/assessments/calculate-risk', (req, res) => {
  const { responses } = req.body;
  const results = calculateRisk(responses || {});
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`🚀 Healthcare Compliance API running on port ${PORT}`);
});
