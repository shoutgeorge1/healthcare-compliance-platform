export function getQuestionsForBusiness(businessType, state) {
    const sets = {
      "Clinical care (in-person or virtual)": [
        // HIPAA Compliance Section
        {
          id: "hipaa1",
          section: "HIPAA Risk Assessment",
          description: "Do you collect patient intake forms through a website or landing page?",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
          ],
          riskLevel: "high",
          questionType: "risk" // "no" is better for compliance
        },
        {
          id: "hipaa1_followup",
          section: "HIPAA Risk Assessment", 
          description: "What type of information do you collect on these forms?",
          dependsOn: { questionId: "hipaa1", value: "yes" },
          options: [
            { value: "basic_contact", label: "Basic contact information only" },
            { value: "medical_history", label: "Medical history or symptoms" },
            { value: "insurance", label: "Insurance information" },
            { value: "full_phi", label: "Comprehensive health information" }
          ],
          multiSelect: true,
          riskLevel: "high",
          questionType: "risk"
        },
        {
          id: "hipaa2",
          section: "HIPAA Risk Assessment",
          description: "Do you use a HIPAA-compliant Electronic Health Record (EHR) system?",
          options: [
            { value: "yes_baa", label: "Yes, with signed Business Associate Agreement" },
            { value: "yes_no_baa", label: "Yes, but no Business Associate Agreement" },
            { value: "no", label: "No EHR system" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "critical",
          questionType: "compliance" // "yes_baa" is best for compliance
        },
        {
          id: "hipaa3",
          section: "HIPAA Risk Assessment",
          description: "How do you store and transmit patient communications?",
          options: [
            { value: "encrypted_secure", label: "Encrypted, HIPAA-compliant platforms only" },
            { value: "standard_email", label: "Standard email" },
            { value: "text_messages", label: "Text messages" },
            { value: "unsecured_platforms", label: "Social media or other unsecured platforms" },
            { value: "mixed", label: "Combination of methods" }
          ],
          riskLevel: "critical",
          questionType: "compliance" // "encrypted_secure" is best
        },
        
        // 3rd-Party Tracking Section  
        {
          id: "tracking1",
          section: "3rd-Party Tracking & Data Privacy",
          description: "Are tools like Meta Pixel, Google Analytics, or other tracking pixels active on lead forms or intake flows?",
          options: [
            { value: "yes_active", label: "Yes, actively using them" },
            { value: "no_none", label: "No, none at all" },
            { value: "unsure", label: "I'm not sure" },
            { value: "some_pages", label: "Only on certain pages (not intake forms)" }
          ],
          riskLevel: "high",
          questionType: "risk" // "no_none" is best for compliance
        },
        {
          id: "tracking2",
          section: "3rd-Party Tracking & Data Privacy",
          description: "Do you have a privacy policy that covers health information collection?",
          options: [
            { value: "yes_comprehensive", label: "Yes, comprehensive and HIPAA-compliant" },
            { value: "yes_basic", label: "Yes, but basic/generic" },
            { value: "no", label: "No privacy policy" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "medium",
          questionType: "compliance" // "yes_comprehensive" is best
        },
        
        // TCPA / SMS Risk Section
        {
          id: "sms1", 
          section: "TCPA / SMS Compliance",
          description: "Do you send text messages to patients after they fill out an online form?",
          options: [
            { value: "yes_automated", label: "Yes, automated/marketing messages" },
            { value: "yes_appointment", label: "Yes, appointment reminders only" },
            { value: "yes_both", label: "Yes, both marketing and appointment messages" },
            { value: "no", label: "No" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "high",
          questionType: "risk" // "no" is safest for compliance
        },
        {
          id: "sms2",
          section: "TCPA / SMS Compliance", 
          description: "How do you obtain consent for text messaging?",
          dependsOn: { questionId: "sms1", values: ["yes_automated", "yes_appointment", "yes_both"] },
          options: [
            { value: "explicit_checkbox", label: "Explicit checkbox with clear disclosure" },
            { value: "form_submission", label: "Implied through form submission" },
            { value: "verbal", label: "Verbal consent" },
            { value: "no_consent", label: "No specific consent process" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "critical",
          questionType: "compliance" // "explicit_checkbox" is best
        },
        
        // Email Marketing / CAN-SPAM Section
        {
          id: "email1",
          section: "CAN-SPAM / Email Marketing",
          description: "Do you send marketing emails to patients or prospective patients?",
          options: [
            { value: "yes_regular", label: "Yes, regular marketing emails" },
            { value: "yes_occasional", label: "Yes, occasional promotions" },
            { value: "appointment_only", label: "Only appointment-related emails" },
            { value: "no", label: "No marketing emails" }
          ],
          riskLevel: "medium",
          questionType: "risk" // "no" or "appointment_only" are safer
        },
        {
          id: "email2",
          section: "CAN-SPAM / Email Marketing",
          description: "Do your marketing emails include proper unsubscribe mechanisms and sender identification?",
          dependsOn: { questionId: "email1", values: ["yes_regular", "yes_occasional"] },
          options: [
            { value: "yes_compliant", label: "Yes, fully compliant with CAN-SPAM" },
            { value: "partial", label: "Some compliance measures" },
            { value: "no", label: "No formal compliance measures" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "medium",
          questionType: "compliance" // "yes_compliant" is best
        },
        
        // Telehealth Licensing Section
        {
          id: "telehealth1",
          section: "Telehealth & Licensing",
          description: "Do you provide telehealth services across state lines?",
          options: [
            { value: "yes_multiple", label: "Yes, multiple states" },
            { value: "yes_border", label: "Yes, only neighboring states" },
            { value: "no_single", label: "No, single state only" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "high",
          questionType: "risk" // "no_single" is simplest for compliance
        },
        {
          id: "telehealth2",
          section: "Telehealth & Licensing",
          description: "Are you licensed to practice in all states where you provide telehealth services?",
          dependsOn: { questionId: "telehealth1", values: ["yes_multiple", "yes_border"] },
          options: [
            { value: "yes_all", label: "Yes, licensed in all states" },
            { value: "some_states", label: "Licensed in some, not all" },
            { value: "home_state_only", label: "Only licensed in home state" },
            { value: "unsure", label: "I'm not sure about requirements" }
          ],
          riskLevel: "critical",
          questionType: "compliance" // "yes_all" is required for compliance
        },
        
        // Health Claims (FTC) Section
        {
          id: "claims1",
          section: "Health Claims & FTC Compliance",
          description: "Do you make any health benefit claims in your marketing materials?",
          options: [
            { value: "yes_specific", label: "Yes, specific health benefit claims" },
            { value: "yes_general", label: "Yes, general wellness claims" },
            { value: "no_claims", label: "No health claims" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "medium",
          questionType: "risk" // "no_claims" is safest
        },
        {
          id: "claims2",
          section: "Health Claims & FTC Compliance",
          description: "Do you have scientific evidence to support your health claims?",
          dependsOn: { questionId: "claims1", values: ["yes_specific", "yes_general"] },
          options: [
            { value: "yes_clinical", label: "Yes, clinical studies/trials" },
            { value: "yes_peer_reviewed", label: "Yes, peer-reviewed research" },
            { value: "limited_evidence", label: "Limited or anecdotal evidence" },
            { value: "no_evidence", label: "No formal evidence" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "high",
          questionType: "compliance" // "yes_clinical" or "yes_peer_reviewed" best
        },
        
        // Scope of Practice Section
        {
          id: "scope1",
          section: "Scope of Practice & Professional Standards",
          description: "What type of healthcare provider are you?",
          options: [
            { value: "physician", label: "Physician (MD/DO)" },
            { value: "nurse_practitioner", label: "Nurse Practitioner" },
            { value: "physician_assistant", label: "Physician Assistant" },
            { value: "mental_health", label: "Mental Health Professional" },
            { value: "allied_health", label: "Allied Health Professional" },
            { value: "other", label: "Other licensed professional" },
            { value: "unlicensed", label: "Not a licensed healthcare provider" }
          ],
          riskLevel: "critical",
          questionType: "compliance" // Licensed providers are better for compliance
        },
        {
          id: "scope2",
          section: "Scope of Practice & Professional Standards",
          description: "Do you prescribe medications or medical devices?",
          options: [
            { value: "yes_controlled", label: "Yes, including controlled substances" },
            { value: "yes_non_controlled", label: "Yes, non-controlled medications only" },
            { value: "yes_devices", label: "Yes, medical devices only" },
            { value: "no", label: "No prescribing authority" }
          ],
          riskLevel: "high",
          questionType: "neutral" // Depends on scope of practice
        },
        
        // State-Specific Compliance
        {
          id: "state1",
          section: "State-Specific Compliance",
          description: "Are you aware of specific healthcare advertising regulations in your state?",
          options: [
            { value: "yes_compliant", label: "Yes, and we comply with them" },
            { value: "yes_not_compliant", label: "Yes, but we haven't implemented compliance" },
            { value: "no_awareness", label: "No, not aware of state-specific rules" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: state === "California" || state === "New York" || state === "Texas" ? "high" : "medium",
          questionType: "compliance" // "yes_compliant" is best
        }
      ],
      
      "Wellness or cosmetic services": [
        // FTC Health Claims Section
        {
          id: "ftc1",
          section: "FTC Health Claims & Advertising",
          description: "Do you make claims about health benefits, weight loss, or anti-aging?",
          options: [
            { value: "yes_weight_loss", label: "Yes, weight loss claims" },
            { value: "yes_anti_aging", label: "Yes, anti-aging claims" },
            { value: "yes_health_benefits", label: "Yes, general health benefits" },
            { value: "yes_multiple", label: "Yes, multiple types of claims" },
            { value: "no", label: "No health claims" }
          ],
          riskLevel: "high",
          questionType: "risk" // "no" is safest
        },
        {
          id: "ftc2",
          section: "FTC Health Claims & Advertising",
          description: "Do you use before/after photos or testimonials in your marketing?",
          options: [
            { value: "yes_photos_testimonials", label: "Yes, both photos and testimonials" },
            { value: "yes_photos_only", label: "Yes, photos only" },
            { value: "yes_testimonials_only", label: "Yes, testimonials only" },
            { value: "no", label: "No before/after content" }
          ],
          riskLevel: "medium",
          questionType: "risk" // "no" is safest
        },
        {
          id: "ftc3",
          section: "FTC Health Claims & Advertising",
          description: "Do you include proper disclaimers about typical results?",
          dependsOn: { questionId: "ftc2", values: ["yes_photos_testimonials", "yes_photos_only", "yes_testimonials_only"] },
          options: [
            { value: "yes_prominent", label: "Yes, prominent disclaimers" },
            { value: "yes_small_print", label: "Yes, but in small print" },
            { value: "no", label: "No disclaimers" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "high",
          questionType: "compliance" // "yes_prominent" is best
        },
        
        // Professional Licensing Section
        {
          id: "licensing1",
          section: "Professional Licensing & Credentials",
          description: "What type of wellness or cosmetic professional are you?",
          options: [
            { value: "licensed_medical", label: "Licensed medical professional (MD, RN, etc.)" },
            { value: "licensed_cosmetic", label: "Licensed cosmetic professional (esthetician, etc.)" },
            { value: "certified_wellness", label: "Certified wellness professional" },
            { value: "unlicensed", label: "No professional license" }
          ],
          riskLevel: "medium",
          questionType: "compliance" // Licensed is better
        },
        {
          id: "licensing2",
          section: "Professional Licensing & Credentials",
          description: "Do you clearly display your credentials and licensing information?",
          options: [
            { value: "yes_prominent", label: "Yes, prominently displayed" },
            { value: "yes_available", label: "Yes, available upon request" },
            { value: "no", label: "No credential display" },
            { value: "not_applicable", label: "Not applicable (unlicensed)" }
          ],
          riskLevel: "medium",
          questionType: "compliance" // "yes_prominent" is best
        },
        
        // SMS/Email Marketing Section
        {
          id: "communication1",
          section: "SMS & Email Marketing",
          description: "Do you send marketing messages via text or email?",
          options: [
            { value: "yes_both", label: "Yes, both SMS and email" },
            { value: "yes_sms", label: "Yes, SMS only" },
            { value: "yes_email", label: "Yes, email only" },
            { value: "appointment_only", label: "Appointment reminders only" },
            { value: "no", label: "No marketing messages" }
          ],
          riskLevel: "medium",
          questionType: "risk" // "no" or "appointment_only" are safer
        },
        {
          id: "communication2",
          section: "SMS & Email Marketing",
          description: "How do you obtain consent for marketing communications?",
          dependsOn: { questionId: "communication1", values: ["yes_both", "yes_sms", "yes_email"] },
          options: [
            { value: "explicit_opt_in", label: "Explicit opt-in with clear disclosure" },
            { value: "checkbox_consent", label: "Checkbox consent during booking" },
            { value: "implied_consent", label: "Implied through service use" },
            { value: "no_formal_consent", label: "No formal consent process" }
          ],
          riskLevel: "high",
          questionType: "compliance" // "explicit_opt_in" is best
        }
      ],
      
      "Health-related products (e.g., supplements, devices)": [
        // FDA Compliance Section
        {
          id: "fda1",
          section: "FDA Compliance & Product Classification",
          description: "Are your products regulated as medical devices by the FDA?",
          options: [
            { value: "yes_class_3", label: "Yes, Class III medical devices" },
            { value: "yes_class_2", label: "Yes, Class II medical devices" },
            { value: "yes_class_1", label: "Yes, Class I medical devices" },
            { value: "no_supplements", label: "No, dietary supplements" },
            { value: "no_cosmetic", label: "No, cosmetic products" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "critical",
          questionType: "neutral" // Classification itself doesn't indicate compliance
        },
        {
          id: "fda2",
          section: "FDA Compliance & Product Classification",
          description: "Do you have the required FDA registrations and clearances for your products?",
          dependsOn: { questionId: "fda1", values: ["yes_class_3", "yes_class_2", "yes_class_1"] },
          options: [
            { value: "yes_all_current", label: "Yes, all registrations current" },
            { value: "yes_some_pending", label: "Yes, some pending renewal" },
            { value: "no_unregistered", label: "No, products not registered" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "critical",
          questionType: "compliance" // "yes_all_current" is required
        },
        {
          id: "fda3",
          section: "FDA Compliance & Product Classification",
          description: "For supplements: Do you follow FDA Good Manufacturing Practices (GMP)?",
          dependsOn: { questionId: "fda1", value: "no_supplements" },
          options: [
            { value: "yes_certified", label: "Yes, GMP certified facility" },
            { value: "yes_compliant", label: "Yes, following GMP guidelines" },
            { value: "no", label: "No GMP compliance" },
            { value: "third_party", label: "Third-party manufacturer handles this" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "high",
          questionType: "compliance" // "yes_certified" is best
        },
        
        // Product Claims Section  
        {
          id: "claims1",
          section: "Product Claims & Labeling",
          description: "Do you make health or medical claims about your products?",
          options: [
            { value: "yes_medical", label: "Yes, medical/therapeutic claims" },
            { value: "yes_health", label: "Yes, health benefit claims" },
            { value: "yes_structure_function", label: "Yes, structure/function claims only" },
            { value: "no", label: "No health claims" }
          ],
          riskLevel: "high",
          questionType: "risk" // "no" is safest
        },
        {
          id: "claims2",
          section: "Product Claims & Labeling",
          description: "Do you have clinical evidence supporting your product claims?",
          dependsOn: { questionId: "claims1", values: ["yes_medical", "yes_health", "yes_structure_function"] },
          options: [
            { value: "yes_clinical_trials", label: "Yes, clinical trials" },
            { value: "yes_peer_reviewed", label: "Yes, peer-reviewed studies" },
            { value: "yes_in_house", label: "Yes, in-house studies" },
            { value: "limited", label: "Limited evidence" },
            { value: "no", label: "No formal evidence" }
          ],
          riskLevel: "critical",
          questionType: "compliance" // "yes_clinical_trials" or "yes_peer_reviewed" best
        },
        
        // Manufacturing & Quality Section
        {
          id: "manufacturing1",
          section: "Manufacturing & Quality Control",
          description: "Where are your products manufactured?",
          options: [
            { value: "usa_fda_registered", label: "USA, FDA-registered facility" },
            { value: "usa_not_registered", label: "USA, not FDA-registered" },
            { value: "international_compliant", label: "International, meets US standards" },
            { value: "international_unknown", label: "International, unknown standards" },
            { value: "third_party", label: "Third-party manufacturer" }
          ],
          riskLevel: "medium",
          questionType: "compliance" // "usa_fda_registered" is best
        },
        {
          id: "manufacturing2",
          section: "Manufacturing & Quality Control",
          description: "Do you conduct third-party testing for purity and potency?",
          options: [
            { value: "yes_every_batch", label: "Yes, every batch tested" },
            { value: "yes_periodic", label: "Yes, periodic testing" },
            { value: "manufacturer_testing", label: "Manufacturer conducts testing" },
            { value: "no", label: "No third-party testing" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "medium",
          questionType: "compliance" // "yes_every_batch" is best
        }
      ],
      
      "Software, apps, or digital tools for patients or providers": [
        // HIPAA Compliance Section
        {
          id: "hipaa1",
          section: "HIPAA & Data Security",
          description: "Does your software handle any protected health information (PHI)?",
          options: [
            { value: "yes_extensive", label: "Yes, extensive PHI handling" },
            { value: "yes_limited", label: "Yes, limited PHI" },
            { value: "yes_indirect", label: "Yes, indirectly through integrations" },
            { value: "no", label: "No PHI handling" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "critical",
          questionType: "neutral" // PHI handling isn't inherently bad if done correctly
        },
        {
          id: "hipaa2",
          section: "HIPAA & Data Security",
          description: "Do you have Business Associate Agreements (BAAs) with all relevant parties?",
          dependsOn: { questionId: "hipaa1", values: ["yes_extensive", "yes_limited", "yes_indirect"] },
          options: [
            { value: "yes_all_current", label: "Yes, all BAAs current and signed" },
            { value: "yes_most", label: "Yes, most BAAs in place" },
            { value: "some_missing", label: "Some BAAs missing" },
            { value: "no", label: "No BAAs in place" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "critical",
          questionType: "compliance" // "yes_all_current" is required
        },
        {
          id: "hipaa3",
          section: "HIPAA & Data Security",
          description: "What security measures do you have in place?",
          options: [
            { value: "comprehensive", label: "Comprehensive security program" },
            { value: "basic_encryption", label: "Basic encryption and access controls" },
            { value: "minimal", label: "Minimal security measures" },
            { value: "unsure", label: "I'm not sure" }
          ],
          multiSelect: true,
          riskLevel: "critical",
          questionType: "compliance" // "comprehensive" is best
        },
        
        // Data Privacy & Tracking Section
        {
          id: "tracking1",
          section: "3rd-Party Tracking & Analytics",
          description: "Do you have analytics or marketing pixels on PHI-handling pages?",
          options: [
            { value: "yes_phi_pages", label: "Yes, on pages with PHI" },
            { value: "yes_non_phi", label: "Yes, but not on PHI pages" },
            { value: "no", label: "No tracking pixels" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "critical",
          questionType: "risk" // "no" is safest for compliance
        },
        {
          id: "tracking2",
          section: "3rd-Party Tracking & Analytics",
          description: "Do you share any user data with third-party services?",
          options: [
            { value: "yes_anonymized", label: "Yes, anonymized data only" },
            { value: "yes_aggregated", label: "Yes, aggregated data only" },
            { value: "yes_identifiable", label: "Yes, potentially identifiable data" },
            { value: "no", label: "No data sharing" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "high",
          questionType: "risk" // "no" is safest
        },
        
        // Technical Infrastructure Section
        {
          id: "infrastructure1",
          section: "Technical Infrastructure & Hosting",
          description: "Where is your application hosted?",
          options: [
            { value: "hipaa_cloud", label: "HIPAA-compliant cloud provider" },
            { value: "standard_cloud", label: "Standard cloud provider" },
            { value: "on_premise", label: "On-premise servers" },
            { value: "hybrid", label: "Hybrid setup" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "high",
          questionType: "compliance" // "hipaa_cloud" is best for PHI
        },
        {
          id: "infrastructure2",
          section: "Technical Infrastructure & Hosting",
          description: "Do you conduct regular security audits and penetration testing?",
          options: [
            { value: "yes_regular", label: "Yes, regular audits" },
            { value: "yes_annual", label: "Yes, annual audits" },
            { value: "yes_irregular", label: "Yes, but irregularly" },
            { value: "no", label: "No formal audits" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "medium",
          questionType: "compliance" // "yes_regular" is best
        },
        
        // User Access & Identity Management Section
        {
          id: "access1",
          section: "User Access & Identity Management",
          description: "How do you manage user authentication?",
          options: [
            { value: "mfa_required", label: "Multi-factor authentication required" },
            { value: "mfa_optional", label: "Multi-factor authentication optional" },
            { value: "password_only", label: "Password-based only" },
            { value: "sso_integration", label: "Single sign-on integration" },
            { value: "mixed", label: "Mixed authentication methods" }
          ],
          riskLevel: "medium",
          questionType: "compliance" // "mfa_required" is best
        },
        {
          id: "access2",
          section: "User Access & Identity Management",
          description: "Do you implement role-based access controls?",
          options: [
            { value: "yes_granular", label: "Yes, granular role-based controls" },
            { value: "yes_basic", label: "Yes, basic role controls" },
            { value: "no", label: "No role-based controls" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "medium",
          questionType: "compliance" // "yes_granular" is best
        },
        
        // Incident Response Section
        {
          id: "incident1",
          section: "Incident Response & Data Breach",
          description: "Do you have a formal incident response plan?",
          options: [
            { value: "yes_comprehensive", label: "Yes, comprehensive plan" },
            { value: "yes_basic", label: "Yes, basic plan" },
            { value: "informal", label: "Informal procedures" },
            { value: "no", label: "No formal plan" }
          ],
          riskLevel: "medium",
          questionType: "compliance" // "yes_comprehensive" is best
        }
      ]
    };
  
    // Apply state-specific modifications
    const questions = sets[businessType] || [];
    
    if (state && questions.length > 0) {
      const stateSpecificAdjustments = getStateSpecificAdjustments(state);
      return applyStateAdjustments(questions, stateSpecificAdjustments);
    }
    
    return questions;
  }
  
  // Helper function to get state-specific adjustments
  function getStateSpecificAdjustments(state) {
    const highRegulatoryStates = ["California", "New York", "Texas", "Florida", "Illinois"];
    const telemedStrictStates = ["California", "New York", "Texas"];
    
    return {
      isHighRegulatory: highRegulatoryStates.includes(state),
      isTelemedStrict: telemedStrictStates.includes(state),
      state: state
    };
  }
  
  // Helper function to apply state-specific adjustments
  function applyStateAdjustments(questions, adjustments) {
    return questions.map(question => {
      let adjustedQuestion = { ...question };
      
      // Increase risk levels for high regulatory states
      if (adjustments.isHighRegulatory) {
        if (question.riskLevel === "medium") {
          adjustedQuestion.riskLevel = "high";
        }
        if (question.section.includes("Health Claims") || question.section.includes("FTC")) {
          adjustedQuestion.riskLevel = "high";
        }
      }
      
      // Add California-specific privacy considerations
      if (adjustments.state === "California") {
        if (question.section.includes("3rd-Party Tracking") || question.section.includes("Data Privacy")) {
          adjustedQuestion.description += " (Note: California has additional privacy requirements under CCPA)";
          adjustedQuestion.riskLevel = "high";
        }
      }
      
      return adjustedQuestion;
    });
  }
  
  // Helper function to determine if an answer represents good compliance
  export function isGoodAnswer(question, answer) {
    if (!question.questionType) return false;
    
    switch (question.questionType) {
      case "compliance": // Questions where "good" answers = high compliance
        return answer === "yes_baa" || 
               answer === "encrypted_secure" ||
               answer === "yes_comprehensive" ||
               answer === "explicit_checkbox" ||
               answer === "yes_compliant" ||
               answer === "yes_all" ||
               answer === "yes_clinical" ||
               answer === "yes_peer_reviewed" ||
               answer === "yes_prominent" ||
               answer === "licensed_medical" ||
               answer === "yes_all_current" ||
               answer === "yes_certified" ||
               answer === "yes_clinical_trials" ||
               answer === "usa_fda_registered" ||
               answer === "yes_every_batch" ||
               answer === "comprehensive" ||
               answer === "hipaa_cloud" ||
               answer === "yes_regular" ||
               answer === "mfa_required" ||
               answer === "yes_granular" ||
               answer === "yes_comprehensive" ||
               answer === "explicit_opt_in";
               
      case "risk": // Questions where "safe" answers = high compliance  
        return answer === "no" ||
               answer === "no_none" ||
               answer === "no_claims" ||
               answer === "no_single" ||
               answer === "appointment_only";
               
      case "neutral": // Questions where answer doesn't indicate compliance level
      default:
        return false;
    }
  }
  
  // Export additional helper functions for compatibility
  export function getFollowUpQuestions(questionId, answers) {
    return [];
  }
  
  export function calculateRiskScore(answers, businessType) {
    const questions = getQuestionsForBusiness(businessType);
    let totalRisk = 0;
    let maxRisk = 0;
    
    questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer) {
        const questionRisk = calculateQuestionRisk(question, userAnswer);
        totalRisk += questionRisk;
      }
      maxRisk += getRiskWeight(question.riskLevel);
    });
    
    return Math.round((totalRisk / maxRisk) * 100);
  }
  
  function calculateQuestionRisk(question, answer) {
    const riskWeights = {
      "critical": 4,
      "high": 3,
      "medium": 2,
      "low": 1
    };
    
    return riskWeights[question.riskLevel] || 1;
  }
  
  function getRiskWeight(riskLevel) {
    const weights = {
      "critical": 4,
      "high": 3,
      "medium": 2,
      "low": 1
    };
    return weights[riskLevel] || 1;
  }