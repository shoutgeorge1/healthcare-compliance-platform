export function getQuestionsForBusiness(businessType, state) {
    const sets = {
      'Clinical care (in-person or virtual)': [
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
            { value: 'unsure', label: 'I'm not sure' },
          ],
        },
        {
          id: 'sms1',
          section: 'TCPA / SMS Risk',
          description: 'Do you send text messages to patients after they fill out an online form?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'I'm not sure' },
          ],
        },
        {
          id: 'telehealth1',
          section: 'Telehealth Licensing',
          description: 'Do you provide telehealth services across state lines?',
          options: [
            { value: 'yes', label: 'Yes, multiple states' },
            { value: 'no', label: 'No, single state only' },
            { value: 'unsure', label: 'I'm not sure' },
          ],
        },
        {
          id: 'claims1',
          section: 'Health Claims (FTC)',
          description: 'Do you make any health benefit claims in your marketing?',
          options: [
            { value: 'yes', label: 'Yes, we mention health benefits' },
            { value: 'no', label: 'No health claims' },
            { value: 'unsure', label: 'I'm not sure' },
          ],
        }
      ],
  
      'Wellness or cosmetic services': [
        {
          id: 'ftc1',
          section: 'FTC Health Claims',
          description: 'Do you make claims about health benefits, weight loss, or anti-aging?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          id: 'tracking2',
          section: '3rd-Party Tracking',
          description: 'Do you use Facebook Pixel or Google Analytics on your website?',
          options: [
            { value: 'yes', label: 'Yes, actively using them' },
            { value: 'no', label: 'No, none at all' },
            { value: 'unsure', label: 'I'm not sure' },
          ],
        }
      ],
  
      'Health-related products (e.g., supplements, devices)': [
        {
          id: 'fda1',
          section: 'FDA Compliance',
          description: 'Are your products regulated as medical devices by the FDA?',
          options: [
            { value: 'yes', label: 'Yes, FDA regulated' },
            { value: 'no', label: 'No, not regulated' },
            { value: 'unsure', label: 'I'm not sure' },
          ],
        },
        {
          id: 'claims2',
          section: 'Product Claims',
          description: 'Do you make health or medical claims about your products?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        }
      ],
  
      'Software, apps, or digital tools for patients or providers': [
        {
          id: 'hipaa2',
          section: 'HIPAA Risk',
          description: 'Does your software handle any protected health information (PHI)?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
        },
        {
          id: 'tracking3',
          section: '3rd-Party Tracking',
          description: 'Do you have analytics or marketing pixels on PHI-handling pages?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
            { value: 'unsure', label: 'I'm not sure' },
          ],
        }
      ]
    };
  
    return sets[businessType] || [];
  }