export function getQuestionsForBusiness(businessType, state) {
    // In the future, state-specific overrides can go here
    const sets = {
      'Traditional Medical Clinic': [
        {
          id: 'hipaa1',
          section: 'HIPAA Risk',
          description: 'Do you collect patient intake forms through a website or landing page?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          id: 'tracking1',
          section: '3rd-Party Tracking',
          description: 'Are tools like Meta Pixel or Google Analytics active on lead forms or intake flows?',
          options: [
            { value: 'yes', label: 'Yes, actively using them' },
            { value: 'no', label: 'No, none at all' },
            { value: 'unsure', label: 'I’m not sure' },
          ],
        },
        {
          id: 'sms1',
          section: 'TCPA / SMS Risk',
          description: 'Do you send text messages to patients after they fill out an online form?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'I’m not sure' },
          ],
        }
      ],
  
      // Add more business types here
    };
  
    return sets[businessType] || [];
  }
  