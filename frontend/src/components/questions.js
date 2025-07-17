const questions = [
  {
    id: 'q1',
    section: 'Business Model',
    description: 'How would you describe your business?',
    options: [
      { value: 'clinic', label: 'Traditional Medical Clinic' },
      { value: 'telehealth', label: 'Telehealth Platform' },
    ],
    next: {
      clinic: 1,
      telehealth: 2,
    }
  },
  {
    id: 'q2',
    section: 'HIPAA & Data',
    description: 'Do you handle PHI?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    id: 'q3',
    section: 'TCPA Compliance',
    description: 'Do you have documented SMS consent?',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  }
];

export default questions;
