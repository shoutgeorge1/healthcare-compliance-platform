const questionSets = {
    'Traditional Medical Clinic or Group Practice': {
      default: [
        {
          id: 'hipaa1',
          section: 'HIPAA: Protected Health Info (PHI)',
          description: 'Do you store or send any patient data (like name, DOB, diagnosis, email, phone) using non-HIPAA-compliant platforms (e.g., Gmail, Google Sheets, GoHighLevel)?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'Not sure' },
          ],
        },
        {
          id: 'tcp1',
          section: 'TCPA + CAN-SPAM: Contact Permissions',
          description: 'Do you send texts, calls, or emails to leads who did **not** explicitly opt in via a form or verbal consent?',
          options: [
            { value: 'yes', label: 'Yes, sometimes' },
            { value: 'no', label: 'No, we always get permission' },
            { value: 'unsure', label: 'Not sure how we handle this' },
          ],
        },
        {
          id: 'pixel1',
          section: 'Marketing & Tracking Pixels',
          description: 'Do you use Meta Pixel, Google Analytics, or session recording tools (like Hotjar) on **pages that collect PHI** (e.g., lead forms, booking pages)?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'I’m not sure' },
          ],
        },
      ],
      California: [
        {
          id: 'scope1',
          section: 'Corporate Practice of Medicine (CPOM)',
          description: 'Is your medical clinic owned or financially controlled by a non-doctor (e.g., marketer, investor, spouse)?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'Not sure' },
          ],
        },
      ],
    },
  
    // Add other business types here (telehealth, medspa, pharmacy, etc.)
  };
  
  export default function getQuestionSet(businessType, state) {
    const base = questionSets[businessType]?.default || [];
    const stateSpecific = questionSets[businessType]?.[state] || [];
    return [...base, ...stateSpecific];
  }
