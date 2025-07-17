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
          followUp: "hipaa1_followup"
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
          riskLevel: "high"
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
          riskLevel: "critical"
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
          riskLevel: "critical"
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
          riskLevel: "high"
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
          riskLevel: "medium"
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
          riskLevel: "high"
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
          riskLevel: "critical"
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
          riskLevel: "medium"
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
          riskLevel: "medium"
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
          riskLevel: "high"
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
          riskLevel: "critical"
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
          riskLevel: "medium"
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
          riskLevel: "high"
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
          riskLevel: "critical"
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
          riskLevel: "high"
        },
        
        // Multi-State Licensing Section
        {
          id: "licensing1",
          section: "Multi-State Licensing & Credentials",
          description: "Do you have National Provider Identifier (NPI) numbers for all licensed practitioners?",
          options: [
            { value: "yes_all_current", label: "Yes, all practitioners have current NPIs" },
            { value: "yes_some_missing", label: "Yes, but some practitioners missing NPIs" },
            { value: "no_npis", label: "No NPI numbers obtained" },
            { value: "not_applicable", label: "Not applicable (unlicensed practitioners)" }
          ],
          riskLevel: "high"
        },
        {
          id: "licensing2",
          section: "Multi-State Licensing & Credentials",
          description: "For nurse practitioners or PAs: Do you have proper supervising physician agreements where required?",
          dependsOn: { questionId: "scope1", values: ["nurse_practitioner", "physician_assistant"] },
          options: [
            { value: "yes_all_states", label: "Yes, compliant agreements in all practice states" },
            { value: "yes_some_states", label: "Yes, but only in some states" },
            { value: "no_agreements", label: "No supervising physician agreements" },
            { value: "not_required", label: "Not required in our practice states" },
            { value: "unsure", label: "I'm not sure what's required" }
          ],
          riskLevel: "critical"
        },
        {
          id: "licensing3",
          section: "Multi-State Licensing & Credentials",
          description: "Do any practitioners use the title 'Doctor' without holding an MD, DO, or equivalent medical degree?",
          options: [
            { value: "no_title_misuse", label: "No, titles accurately reflect credentials" },
            { value: "phd_clarified", label: "Yes, PhDs but clearly specify non-medical" },
            { value: "unclear_usage", label: "Unclear usage of doctor title" },
            { value: "potential_misuse", label: "Potential title misuse" }
          ],
          riskLevel: "high"
        },
        
        // Advanced TCPA Compliance Section
        {
          id: "tcpa_advanced1",
          section: "Advanced TCPA Compliance",
          description: "Do you use pre-recorded voicemails or AI-generated voice messages for patient outreach?",
          options: [
            { value: "yes_prerecorded", label: "Yes, pre-recorded voicemails" },
            { value: "yes_ai_generated", label: "Yes, AI-generated voice messages" },
            { value: "yes_both", label: "Yes, both pre-recorded and AI" },
            { value: "live_only", label: "Live calls only" },
            { value: "no_voice_outreach", label: "No voice outreach" }
          ],
          riskLevel: "high"
        },
        {
          id: "tcpa_advanced2",
          section: "Advanced TCPA Compliance",
          description: "Do you store timestamps and records of all consent opt-ins for text messaging?",
          dependsOn: { questionId: "sms1", values: ["yes_automated", "yes_appointment", "yes_both"] },
          options: [
            { value: "yes_comprehensive", label: "Yes, comprehensive timestamp logging" },
            { value: "yes_basic", label: "Yes, basic consent records" },
            { value: "no_timestamps", label: "No timestamp storage" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "critical"
        },
        {
          id: "tcpa_advanced3",
          section: "Advanced TCPA Compliance",
          description: "What specific language do you use for SMS consent opt-in?",
          dependsOn: { questionId: "sms2", values: ["explicit_checkbox", "form_submission"] },
          options: [
            { value: "compliant_language", label: "TCPA-compliant language with frequency disclosure" },
            { value: "basic_consent", label: "Basic consent language" },
            { value: "unclear_language", label: "Unclear or minimal language" },
            { value: "no_specific_language", label: "No specific consent language" }
          ],
          riskLevel: "high"
        },
        
        // Advanced HIPAA Implementation Section
        {
          id: "hipaa_advanced1",
          section: "Advanced HIPAA Implementation",
          description: "Do you use encrypted email for all patient communications containing PHI?",
          options: [
            { value: "yes_end_to_end", label: "Yes, end-to-end encrypted email" },
            { value: "yes_portal_only", label: "Yes, secure patient portal only" },
            { value: "standard_email", label: "Standard email with disclaimers" },
            { value: "mixed_methods", label: "Mixed secure and standard methods" },
            { value: "unsure", label: "I'm not sure about encryption status" }
          ],
          riskLevel: "critical"
        },
        {
          id: "hipaa_advanced2",
          section: "Advanced HIPAA Implementation",
          description: "Do you maintain internal access logs for who views patient records?",
          options: [
            { value: "yes_comprehensive", label: "Yes, comprehensive audit logging" },
            { value: "yes_basic", label: "Yes, basic access tracking" },
            { value: "system_dependent", label: "Depends on EHR system capabilities" },
            { value: "no_logging", label: "No formal access logging" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "high"
        },
        {
          id: "hipaa_advanced3",
          section: "Advanced HIPAA Implementation",
          description: "Do you have signed BAAs with ALL vendors who might access PHI (including IT support, billing, cleaning services)?",
          options: [
            { value: "yes_all_vendors", label: "Yes, comprehensive vendor BAAs" },
            { value: "yes_major_vendors", label: "Yes, major vendors only" },
            { value: "some_missing", label: "Some vendor BAAs missing" },
            { value: "no_vendor_baas", label: "No vendor BAAs" },
            { value: "unsure", label: "I'm not sure who needs BAAs" }
          ],
          riskLevel: "critical"
        },
        
        // CAN-SPAM for CRM/E-commerce Section
        {
          id: "canspam1",
          section: "CAN-SPAM & CRM Compliance",
          description: "Do you send automated emails from CRM systems or e-commerce platforms?",
          options: [
            { value: "yes_crm", label: "Yes, CRM automated emails" },
            { value: "yes_ecommerce", label: "Yes, e-commerce transactional emails" },
            { value: "yes_both", label: "Yes, both CRM and e-commerce" },
            { value: "manual_only", label: "Manual emails only" },
            { value: "no_email_marketing", label: "No email marketing" }
          ],
          riskLevel: "medium"
        },
        {
          id: "canspam2",
          section: "CAN-SPAM & CRM Compliance",
          description: "Do your automated emails clearly identify your business and include physical address?",
          dependsOn: { questionId: "canspam1", values: ["yes_crm", "yes_ecommerce", "yes_both"] },
          options: [
            { value: "yes_compliant", label: "Yes, full CAN-SPAM compliance" },
            { value: "partial_compliance", label: "Partial compliance (missing some elements)" },
            { value: "no_compliance", label: "No formal compliance measures" },
            { value: "unsure", label: "I'm not sure about requirements" }
          ],
          riskLevel: "medium"
        },
        
        // Advanced FTC Deceptive Marketing Section
        {
          id: "ftc_advanced1",
          section: "FTC Deceptive Marketing Prevention",
          description: "Do you publish specific success rates or outcome percentages in your marketing?",
          options: [
            { value: "yes_substantiated", label: "Yes, with proper substantiation" },
            { value: "yes_unsubstantiated", label: "Yes, but limited substantiation" },
            { value: "general_claims_only", label: "General claims only, no specific rates" },
            { value: "no_outcome_claims", label: "No outcome claims" }
          ],
          riskLevel: "high"
        },
        {
          id: "ftc_advanced2",
          section: "FTC Deceptive Marketing Prevention",
          description: "Do you use patient testimonials in your marketing materials?",
          options: [
            { value: "yes_with_disclaimers", label: "Yes, with proper disclaimers about typical results" },
            { value: "yes_limited_disclaimers", label: "Yes, with limited disclaimers" },
            { value: "yes_no_disclaimers", label: "Yes, without disclaimers" },
            { value: "no_testimonials", label: "No patient testimonials" }
          ],
          riskLevel: "medium"
        },
        {
          id: "ftc_advanced3",
          section: "FTC Deceptive Marketing Prevention",
          description: "Do your call-to-action buttons or marketing copy use potentially misleading language?",
          options: [
            { value: "clear_accurate", label: "Clear and accurate language only" },
            { value: "potentially_misleading", label: "Some potentially misleading elements" },
            { value: "unclear_language", label: "Unclear or exaggerated language" },
            { value: "unsure", label: "I'm not sure about our copy" }
          ],
          riskLevel: "medium"
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
          riskLevel: state === "California" || state === "New York" || state === "Texas" ? "high" : "medium"
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
          riskLevel: "high"
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
          riskLevel: "medium"
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
          riskLevel: "high"
        },
        
        // 3rd-Party Tracking Section
        {
          id: "tracking2",
          section: "3rd-Party Tracking & Data Privacy",
          description: "Do you use Facebook Pixel, Google Analytics, or other tracking on your website?",
          options: [
            { value: "yes_extensive", label: "Yes, extensive tracking setup" },
            { value: "yes_basic", label: "Yes, basic analytics only" },
            { value: "no", label: "No tracking tools" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "medium"
        },
        {
          id: "tracking3",
          section: "3rd-Party Tracking & Data Privacy",
          description: "Do you collect personal information through online forms?",
          options: [
            { value: "yes_extensive", label: "Yes, detailed personal information" },
            { value: "yes_basic", label: "Yes, basic contact information" },
            { value: "consultation_only", label: "Only for consultations" },
            { value: "no", label: "No online forms" }
          ],
          riskLevel: "low"
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
          riskLevel: "medium"
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
          riskLevel: "medium"
        },
        
        // Marketing Claims Section
        {
          id: "marketing1",
          section: "Marketing Claims & Pricing",
          description: "Do you advertise specific pricing or promotional offers?",
          options: [
            { value: "yes_specific", label: "Yes, specific prices listed" },
            { value: "yes_promotions", label: "Yes, promotional offers" },
            { value: "yes_both", label: "Yes, both pricing and promotions" },
            { value: "consultation_based", label: "Consultation-based pricing only" },
            { value: "no", label: "No pricing information" }
          ],
          riskLevel: "low"
        },
        {
          id: "marketing2",
          section: "Marketing Claims & Pricing",
          description: "Do you include all required terms and conditions for promotions?",
          dependsOn: { questionId: "marketing1", values: ["yes_promotions", "yes_both"] },
          options: [
            { value: "yes_clear", label: "Yes, clear terms and conditions" },
            { value: "yes_fine_print", label: "Yes, in fine print" },
            { value: "partial", label: "Some terms included" },
            { value: "no", label: "No terms and conditions" }
          ],
          riskLevel: "medium"
        },
        
        // Medical Device Usage Without License Section
        {
          id: "device_licensing1",
          section: "Medical Device Usage & Licensing",
          description: "Do you use medical devices that typically require medical supervision (lasers, microneedling, injectables)?",
          options: [
            { value: "yes_lasers", label: "Yes, laser devices" },
            { value: "yes_microneedling", label: "Yes, microneedling devices" },
            { value: "yes_injectables", label: "Yes, injectable treatments" },
            { value: "yes_multiple", label: "Yes, multiple device types" },
            { value: "no_medical_devices", label: "No medical devices used" }
          ],
          riskLevel: "critical"
        },
        {
          id: "device_licensing2",
          section: "Medical Device Usage & Licensing",
          description: "Are these devices operated by licensed medical professionals?",
          dependsOn: { questionId: "device_licensing1", values: ["yes_lasers", "yes_microneedling", "yes_injectables", "yes_multiple"] },
          options: [
            { value: "yes_licensed_operator", label: "Yes, licensed medical professional operates" },
            { value: "yes_licensed_supervision", label: "Yes, under licensed medical supervision" },
            { value: "no_unlicensed_operator", label: "No, operated by unlicensed staff" },
            { value: "mixed_operators", label: "Mixed - some licensed, some not" },
            { value: "unsure", label: "I'm not sure about requirements" }
          ],
          riskLevel: "critical"
        },
        
        // Client Consent for Marketing Materials Section
        {
          id: "client_consent1",
          section: "Client Consent & Photo Rights",
          description: "Do you take before/after photos of clients for marketing purposes?",
          options: [
            { value: "yes_marketing", label: "Yes, for marketing and website" },
            { value: "yes_social_media", label: "Yes, for social media" },
            { value: "yes_both", label: "Yes, for multiple marketing channels" },
            { value: "documentation_only", label: "Documentation only, not marketing" },
            { value: "no_photos", label: "No client photos taken" }
          ],
          riskLevel: "medium"
        },
        {
          id: "client_consent2",
          section: "Client Consent & Photo Rights",
          description: "Do you obtain written consent specifically for photo/video use in marketing?",
          dependsOn: { questionId: "client_consent1", values: ["yes_marketing", "yes_social_media", "yes_both"] },
          options: [
            { value: "yes_comprehensive", label: "Yes, comprehensive written consent" },
            { value: "yes_basic", label: "Yes, basic photo release" },
            { value: "verbal_only", label: "Verbal consent only" },
            { value: "no_specific_consent", label: "No specific photo consent" }
          ],
          riskLevel: "high"
        },
        {
          id: "client_consent3",
          section: "Client Consent & Photo Rights",
          description: "Do you obtain separate consent for client testimonials and reviews?",
          options: [
            { value: "yes_written", label: "Yes, written testimonial consent" },
            { value: "yes_verbal", label: "Yes, verbal consent documented" },
            { value: "implied_consent", label: "Implied through service agreement" },
            { value: "no_formal_consent", label: "No formal testimonial consent" },
            { value: "no_testimonials", label: "We don't use client testimonials" }
          ],
          riskLevel: "medium"
        },
        
        // Wellness vs Medical Claims Section
        {
          id: "wellness_claims1",
          section: "Wellness vs Medical Claims",
          description: "Do you use terms that could imply medical treatment (cure, heal, treat, diagnose)?",
          options: [
            { value: "yes_medical_terms", label: "Yes, we use medical terminology" },
            { value: "yes_some_terms", label: "Yes, some borderline terms" },
            { value: "wellness_only", label: "Wellness terminology only" },
            { value: "unsure", label: "I'm not sure what's considered medical" }
          ],
          riskLevel: "high"
        },
        {
          id: "wellness_claims2",
          section: "Wellness vs Medical Claims",
          description: "Do your marketing materials clearly distinguish between cosmetic and medical benefits?",
          options: [
            { value: "yes_clear_distinction", label: "Yes, clear distinction maintained" },
            { value: "somewhat_clear", label: "Somewhat clear distinction" },
            { value: "unclear_distinction", label: "Unclear distinction" },
            { value: "no_distinction", label: "No distinction made" }
          ],
          riskLevel: "medium"
        },
        
        // Influencer Marketing & FTC Section
        {
          id: "influencer1",
          section: "Influencer Marketing & FTC Guidelines",
          description: "Do you work with influencers or social media personalities for marketing?",
          options: [
            { value: "yes_paid", label: "Yes, paid influencer partnerships" },
            { value: "yes_free_services", label: "Yes, free services for promotion" },
            { value: "yes_both", label: "Yes, both paid and trade partnerships" },
            { value: "no_influencers", label: "No influencer partnerships" }
          ],
          riskLevel: "medium"
        },
        {
          id: "influencer2",
          section: "Influencer Marketing & FTC Guidelines",
          description: "Do influencers properly disclose their relationship with your business?",
          dependsOn: { questionId: "influencer1", values: ["yes_paid", "yes_free_services", "yes_both"] },
          options: [
            { value: "yes_proper_disclosure", label: "Yes, proper FTC-compliant disclosure" },
            { value: "yes_basic_disclosure", label: "Yes, basic disclosure" },
            { value: "inconsistent_disclosure", label: "Inconsistent disclosure" },
            { value: "no_disclosure", label: "No formal disclosure requirements" },
            { value: "unsure", label: "I'm not sure about disclosure requirements" }
          ],
          riskLevel: "high"
        },
        {
          id: "influencer3",
          section: "Influencer Marketing & FTC Guidelines",
          description: "Do you provide influencers with guidelines about what claims they can/cannot make?",
          dependsOn: { questionId: "influencer1", values: ["yes_paid", "yes_free_services", "yes_both"] },
          options: [
            { value: "yes_written_guidelines", label: "Yes, written guidelines provided" },
            { value: "yes_verbal_guidelines", label: "Yes, verbal guidelines only" },
            { value: "no_guidelines", label: "No specific guidelines" },
            { value: "influencer_discretion", label: "Left to influencer's discretion" }
          ],
          riskLevel: "high"
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
          riskLevel: "medium"
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
          riskLevel: "high"
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
          riskLevel: "critical"
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
          riskLevel: "critical"
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
          riskLevel: "high"
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
          riskLevel: "high"
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
          riskLevel: "critical"
        },
        {
          id: "claims3",
          section: "Product Claims & Labeling",
          description: "Do your supplement labels include the required FDA disclaimer?",
          dependsOn: { questionId: "fda1", value: "no_supplements" },
          options: [
            { value: "yes_compliant", label: "Yes, proper FDA disclaimer" },
            { value: "yes_modified", label: "Yes, but modified version" },
            { value: "no", label: "No FDA disclaimer" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "high"
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
          riskLevel: "medium"
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
          riskLevel: "medium"
        },
        
        // E-commerce & Sales Section
        {
          id: "ecommerce1",
          section: "E-commerce & Sales Compliance",
          description: "How do you sell your products?",
          options: [
            { value: "direct_online", label: "Direct online sales" },
            { value: "retail_stores", label: "Through retail stores" },
            { value: "healthcare_providers", label: "Through healthcare providers" },
            { value: "multiple_channels", label: "Multiple sales channels" },
            { value: "wholesale_only", label: "Wholesale only" }
          ],
          riskLevel: "low"
        },
        {
          id: "ecommerce2",
          section: "E-commerce & Sales Compliance",
          description: "Do you have clear return and refund policies?",
          dependsOn: { questionId: "ecommerce1", values: ["direct_online", "multiple_channels"] },
          options: [
            { value: "yes_comprehensive", label: "Yes, comprehensive policies" },
            { value: "yes_basic", label: "Yes, basic policies" },
            { value: "no_returns", label: "No returns accepted" },
            { value: "no_policy", label: "No formal policy" }
          ],
          riskLevel: "low"
        },
        
        // Detailed FDA Status & Clearance Section
        {
          id: "fda_detailed1",
          section: "FDA Status & Regulatory Pathway",
          description: "What is the specific FDA regulatory status of your medical devices?",
          dependsOn: { questionId: "fda1", values: ["yes_class_3", "yes_class_2", "yes_class_1"] },
          options: [
            { value: "510k_cleared", label: "510(k) cleared" },
            { value: "pma_approved", label: "PMA approved" },
            { value: "exempt_510k", label: "510(k) exempt" },
            { value: "investigational", label: "Investigational device exemption (IDE)" },
            { value: "unsure_pathway", label: "I'm not sure of the pathway" }
          ],
          riskLevel: "critical"
        },
        {
          id: "fda_detailed2",
          section: "FDA Status & Regulatory Pathway",
          description: "Do you clearly distinguish between FDA 'approval' vs 'clearance' in your marketing?",
          dependsOn: { questionId: "fda_detailed1", values: ["510k_cleared", "pma_approved"] },
          options: [
            { value: "yes_accurate", label: "Yes, accurate terminology used" },
            { value: "sometimes_confused", label: "Sometimes confused terminology" },
            { value: "no_distinction", label: "No distinction made" },
            { value: "unsure", label: "I'm not sure of the difference" }
          ],
          riskLevel: "high"
        },
        
        // Supplement Manufacturing & CGMP Section
        {
          id: "supplement_cgmp1",
          section: "Supplement Manufacturing & CGMP",
          description: "Is your supplement manufacturing facility cGMP certified by FDA or third-party?",
          dependsOn: { questionId: "fda1", value: "no_supplements" },
          options: [
            { value: "fda_certified", label: "FDA inspected and compliant" },
            { value: "third_party_certified", label: "Third-party cGMP certified" },
            { value: "self_reported", label: "Self-reported cGMP compliance" },
            { value: "no_cgmp", label: "No cGMP certification" },
            { value: "contract_manufacturer", label: "Contract manufacturer handles this" }
          ],
          riskLevel: "high"
        },
        {
          id: "supplement_cgmp2",
          section: "Supplement Manufacturing & CGMP",
          description: "Do your supplement labels include all required FDA elements?",
          dependsOn: { questionId: "fda1", value: "no_supplements" },
          options: [
            { value: "fully_compliant", label: "Fully FDA-compliant labeling" },
            { value: "mostly_compliant", label: "Mostly compliant, minor gaps" },
            { value: "basic_compliance", label: "Basic compliance only" },
            { value: "non_compliant", label: "Not FDA-compliant" },
            { value: "unsure", label: "I'm not sure about requirements" }
          ],
          riskLevel: "high"
        },
        {
          id: "supplement_cgmp3",
          section: "Supplement Manufacturing & CGMP",
          description: "Do you maintain lot records and adverse event reporting as required?",
          dependsOn: { questionId: "fda1", value: "no_supplements" },
          options: [
            { value: "comprehensive_records", label: "Comprehensive lot records and AE reporting" },
            { value: "basic_records", label: "Basic record keeping" },
            { value: "minimal_records", label: "Minimal documentation" },
            { value: "no_formal_system", label: "No formal system" }
          ],
          riskLevel: "medium"
        },
        
        // International Shipping & Labeling Section
        {
          id: "international_detailed1",
          section: "International Shipping & Compliance",
          description: "Do you ship health products internationally?",
          options: [
            { value: "yes_multiple_countries", label: "Yes, to multiple countries" },
            { value: "yes_limited_countries", label: "Yes, to limited countries" },
            { value: "yes_canada_only", label: "Canada only" },
            { value: "domestic_only", label: "Domestic shipping only" }
          ],
          riskLevel: "medium"
        },
        {
          id: "international_detailed2",
          section: "International Shipping & Compliance",
          description: "Do you comply with destination country labeling and registration requirements?",
          dependsOn: { questionId: "international_detailed1", values: ["yes_multiple_countries", "yes_limited_countries", "yes_canada_only"] },
          options: [
            { value: "fully_compliant", label: "Fully compliant with destination requirements" },
            { value: "partially_compliant", label: "Partially compliant" },
            { value: "us_labels_only", label: "US labeling only" },
            { value: "unsure", label: "I'm not sure about requirements" }
          ],
          riskLevel: "high"
        },
        {
          id: "international_detailed3",
          section: "International Shipping & Compliance",
          description: "Do you handle customs declarations and import restrictions properly?",
          dependsOn: { questionId: "international_detailed1", values: ["yes_multiple_countries", "yes_limited_countries", "yes_canada_only"] },
          options: [
            { value: "professional_handling", label: "Professional customs/import handling" },
            { value: "basic_compliance", label: "Basic customs compliance" },
            { value: "customer_responsibility", label: "Customer handles customs" },
            { value: "unsure", label: "I'm not sure about process" }
          ],
          riskLevel: "medium"
        },
        
        // Health Claims Substantiation Section
        {
          id: "claims_substantiation1",
          section: "Health Claims Substantiation",
          description: "What level of scientific evidence supports your product health claims?",
          dependsOn: { questionId: "claims1", values: ["yes_medical", "yes_health", "yes_structure_function"] },
          options: [
            { value: "randomized_trials", label: "Randomized controlled trials" },
            { value: "observational_studies", label: "Observational studies" },
            { value: "in_vitro_studies", label: "In vitro/laboratory studies" },
            { value: "literature_review", label: "Literature review/meta-analysis" },
            { value: "traditional_use", label: "Traditional use evidence" },
            { value: "no_formal_evidence", label: "No formal scientific evidence" }
          ],
          riskLevel: "critical"
        },
        {
          id: "claims_substantiation2",
          section: "Health Claims Substantiation",
          description: "Are your studies conducted on your specific product formulation?",
          dependsOn: { questionId: "claims_substantiation1", values: ["randomized_trials", "observational_studies", "in_vitro_studies"] },
          options: [
            { value: "exact_formulation", label: "Yes, on exact product formulation" },
            { value: "similar_formulation", label: "Similar formulation" },
            { value: "individual_ingredients", label: "On individual ingredients only" },
            { value: "unrelated_studies", label: "Studies on unrelated products" }
          ],
          riskLevel: "high"
        },
        
        // E-commerce Privacy & SMS Section
        {
          id: "ecommerce_privacy1",
          section: "E-commerce Privacy & Communications",
          description: "Do you collect customer data through your e-commerce platform?",
          dependsOn: { questionId: "ecommerce1", values: ["direct_online", "multiple_channels"] },
          options: [
            { value: "comprehensive_data", label: "Comprehensive customer data" },
            { value: "basic_purchase_data", label: "Basic purchase data only" },
            { value: "minimal_data", label: "Minimal data collection" },
            { value: "third_party_platform", label: "Third-party platform handles data" }
          ],
          riskLevel: "medium"
        },
        {
          id: "ecommerce_privacy2",
          section: "E-commerce Privacy & Communications",
          description: "Do you send SMS notifications for order updates or marketing?",
          dependsOn: { questionId: "ecommerce1", values: ["direct_online", "multiple_channels"] },
          options: [
            { value: "yes_order_marketing", label: "Yes, both order updates and marketing" },
            { value: "yes_order_only", label: "Yes, order updates only" },
            { value: "yes_marketing_only", label: "Yes, marketing only" },
            { value: "no_sms", label: "No SMS communications" }
          ],
          riskLevel: "medium"
        },
        {
          id: "ecommerce_privacy3",
          section: "E-commerce Privacy & Communications",
          description: "How do you obtain consent for e-commerce SMS communications?",
          dependsOn: { questionId: "ecommerce_privacy2", values: ["yes_order_marketing", "yes_marketing_only"] },
          options: [
            { value: "explicit_checkbox", label: "Explicit checkbox during checkout" },
            { value: "opt_in_page", label: "Separate opt-in page" },
            { value: "terms_conditions", label: "Included in terms and conditions" },
            { value: "no_explicit_consent", label: "No explicit SMS consent" }
          ],
          riskLevel: "high"
        },
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
          riskLevel: "critical"
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
          riskLevel: "critical"
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
          riskLevel: "critical"
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
          riskLevel: "critical"
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
          riskLevel: "high"
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
          riskLevel: "high"
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
          riskLevel: "medium"
        },
        
        // API & Integration Security Section
        {
          id: "api1",
          section: "API & Integration Security",
          description: "Do you integrate with Electronic Health Record (EHR) systems?",
          options: [
            { value: "yes_multiple", label: "Yes, multiple EHR systems" },
            { value: "yes_single", label: "Yes, single EHR system" },
            { value: "planned", label: "Planned integration" },
            { value: "no", label: "No EHR integrations" }
          ],
          riskLevel: "medium"
        },
        {
          id: "api2",
          section: "API & Integration Security",
          description: "How do you authenticate and authorize API access?",
          dependsOn: { questionId: "api1", values: ["yes_multiple", "yes_single"] },
          options: [
            { value: "oauth_secure", label: "OAuth 2.0 with secure tokens" },
            { value: "api_keys", label: "API keys" },
            { value: "basic_auth", label: "Basic authentication" },
            { value: "custom", label: "Custom authentication" },
            { value: "unsure", label: "I'm not sure" }
          ],
          riskLevel: "high"
        },
        
        // Detailed BAA Management Section
        {
          id: "baa_detailed1",
          section: "Business Associate Agreement Details",
          description: "Which types of vendors do you have BAAs with?",
          dependsOn: { questionId: "hipaa2", values: ["yes_all_current", "yes_most"] },
          options: [
            { value: "cloud_hosting", label: "Cloud hosting providers" },
            { value: "analytics_tools", label: "Analytics and tracking tools" },
            { value: "payment_processors", label: "Payment processors" },
            { value: "crm_systems", label: "CRM/marketing systems" },
            { value: "it_support", label: "IT support vendors" },
            { value: "all_vendors", label: "All potentially PHI-accessing vendors" }
          ],
          multiSelect: true,
          riskLevel: "critical"
        },
        {
          id: "baa_detailed2",
          section: "Business Associate Agreement Details",
          description: "Do your BAAs include specific data breach notification timeframes?",
          dependsOn: { questionId: "hipaa2", values: ["yes_all_current", "yes_most"] },
          options: [
            { value: "yes_specific_timeframes", label: "Yes, specific notification timeframes" },
            { value: "yes_general_language", label: "Yes, general breach language" },
            { value: "no_breach_clauses", label: "No specific breach clauses" },
            { value: "unsure", label: "I'm not sure what's included" }
          ],
          riskLevel: "high"
        },
        
        // Third-Party SDK & Integration Risks Section
        {
          id: "sdk_risks1",
          section: "Third-Party SDK & Integration Risks",
          description: "Do you use third-party SDKs or widgets that could access user data?",
          options: [
            { value: "yes_analytics", label: "Yes, analytics SDKs (Google, Facebook, etc.)" },
            { value: "yes_chat_support", label: "Yes, chat/support widgets" },
            { value: "yes_payment", label: "Yes, payment processing SDKs" },
            { value: "yes_multiple", label: "Yes, multiple types of SDKs" },
            { value: "no_third_party", label: "No third-party SDKs" }
          ],
          riskLevel: "high"
        },
        {
          id: "sdk_risks2",
          section: "Third-Party SDK & Integration Risks",
          description: "Do these SDKs have access to pages containing PHI?",
          dependsOn: { questionId: "sdk_risks1", values: ["yes_analytics", "yes_chat_support", "yes_payment", "yes_multiple"] },
          options: [
            { value: "yes_phi_pages", label: "Yes, on PHI-containing pages" },
            { value: "no_phi_isolation", label: "No, PHI pages isolated from SDKs" },
            { value: "unsure_scope", label: "I'm not sure of their scope" },
            { value: "conditional_access", label: "Conditional/limited access" }
          ],
          riskLevel: "critical"
        },
        {
          id: "sdk_risks3",
          section: "Third-Party SDK & Integration Risks",
          description: "Do you audit third-party code for HIPAA compliance before implementation?",
          dependsOn: { questionId: "sdk_risks1", values: ["yes_analytics", "yes_chat_support", "yes_payment", "yes_multiple"] },
          options: [
            { value: "yes_formal_audit", label: "Yes, formal compliance audit" },
            { value: "yes_basic_review", label: "Yes, basic security review" },
            { value: "vendor_assurance", label: "Rely on vendor assurances" },
            { value: "no_audit", label: "No formal audit process" }
          ],
          riskLevel: "high"
        },
        
        // AI/ML Auto-Triage & Diagnosis Section
        {
          id: "ai_diagnosis1",
          section: "AI/ML Auto-Triage & Diagnosis",
          description: "Does your software provide automated health assessments or diagnostic suggestions?",
          options: [
            { value: "yes_diagnostic", label: "Yes, diagnostic suggestions" },
            { value: "yes_triage", label: "Yes, triage/urgency recommendations" },
            { value: "yes_risk_assessment", label: "Yes, health risk assessments" },
            { value: "yes_multiple", label: "Yes, multiple AI health features" },
            { value: "no_ai_health", label: "No AI health assessment features" }
          ],
          riskLevel: "critical"
        },
        {
          id: "ai_diagnosis2",
          section: "AI/ML Auto-Triage & Diagnosis",
          description: "Do you clearly disclaim that AI suggestions are not medical advice?",
          dependsOn: { questionId: "ai_diagnosis1", values: ["yes_diagnostic", "yes_triage", "yes_risk_assessment", "yes_multiple"] },
          options: [
            { value: "prominent_disclaimers", label: "Yes, prominent disclaimers throughout" },
            { value: "standard_disclaimers", label: "Yes, standard disclaimer language" },
            { value: "minimal_disclaimers", label: "Minimal disclaimer language" },
            { value: "no_disclaimers", label: "No specific disclaimers" }
          ],
          riskLevel: "critical"
        },
        {
          id: "ai_diagnosis3",
          section: "AI/ML Auto-Triage & Diagnosis",
          description: "What safeguards prevent your AI from providing inappropriate medical advice?",
          dependsOn: { questionId: "ai_diagnosis1", values: ["yes_diagnostic", "yes_triage", "yes_risk_assessment", "yes_multiple"] },
          options: [
            { value: "medical_oversight", label: "Medical professional oversight of AI outputs" },
            { value: "conservative_algorithms", label: "Conservative algorithms with high thresholds" },
            { value: "basic_filtering", label: "Basic content filtering" },
            { value: "no_safeguards", label: "No specific safeguards" },
            { value: "unsure", label: "I'm not sure about safeguards" }
          ],
          riskLevel: "critical"
        },
        
        // App Store & Platform Policies Section
        {
          id: "platform_policies1",
          section: "App Store & Platform Compliance",
          description: "Do you distribute your software through app stores (Apple, Google, etc.)?",
          options: [
            { value: "yes_apple", label: "Yes, Apple App Store" },
            { value: "yes_google", label: "Yes, Google Play Store" },
            { value: "yes_both", label: "Yes, both major app stores" },
            { value: "web_only", label: "Web-based only" },
            { value: "enterprise_distribution", label: "Enterprise distribution only" }
          ],
          riskLevel: "medium"
        },
        {
          id: "platform_policies2",
          section: "App Store & Platform Compliance",
          description: "Do you comply with app store health data and privacy policies?",
          dependsOn: { questionId: "platform_policies1", values: ["yes_apple", "yes_google", "yes_both"] },
          options: [
            { value: "fully_compliant", label: "Fully compliant with all policies" },
            { value: "mostly_compliant", label: "Mostly compliant" },
            { value: "basic_compliance", label: "Basic compliance only" },
            { value: "unsure_requirements", label: "I'm not sure about requirements" }
          ],
          riskLevel: "medium"
        },
        {
          id: "platform_policies3",
          section: "App Store & Platform Compliance",
          description: "Do you properly categorize your app (medical vs wellness vs general health)?",
          dependsOn: { questionId: "platform_policies1", values: ["yes_apple", "yes_google", "yes_both"] },
          options: [
            { value: "medical_category", label: "Medical app category" },
            { value: "wellness_category", label: "Health & fitness/wellness category" },
            { value: "general_category", label: "General/other category" },
            { value: "unsure_categorization", label: "I'm not sure about proper categorization" }
          ],
          riskLevel: "medium"
        },
        
        // Advanced Consent & Opt-out Section
        {
          id: "consent_advanced1",
          section: "Advanced Consent & User Control",
          description: "Do you provide granular consent options for different types of data use?",
          options: [
            { value: "granular_consent", label: "Yes, granular consent for each data type" },
            { value: "basic_consent", label: "Basic all-or-nothing consent" },
            { value: "implied_consent", label: "Implied consent through terms" },
            { value: "no_consent_options", label: "No specific consent mechanisms" }
          ],
          riskLevel: "medium"
        },
        {
          id: "consent_advanced2",
          section: "Advanced Consent & User Control",
          description: "Can users easily opt out of data sharing or delete their data?",
          options: [
            { value: "easy_self_service", label: "Easy self-service data control" },
            { value: "request_based", label: "Available upon request" },
            { value: "complex_process", label: "Complex deletion process" },
            { value: "no_deletion_option", label: "No data deletion option" }
          ],
          riskLevel: "medium"
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
          riskLevel: "medium"
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
          riskLevel: "medium"
        },
        
        // Compliance Certifications Section
        {
          id: "certifications1",
          section: "Compliance Certifications",
          description: "Do you have any formal security or compliance certifications?",
          options: [
            { value: "soc2", label: "SOC 2 Type II" },
            { value: "hipaa_assessment", label: "HIPAA Risk Assessment" },
            { value: "iso27001", label: "ISO 27001" },
            { value: "hitrust", label: "HITRUST CSF" },
            { value: "multiple", label: "Multiple certifications" },
            { value: "none", label: "No formal certifications" }
          ],
          multiSelect: true,
          riskLevel: "low"
        },
        {
          id: "certifications2",
          section: "Compliance Certifications",
          description: "Do you conduct regular compliance training for your team?",
          options: [
            { value: "yes_regular", label: "Yes, regular training program" },
            { value: "yes_onboarding", label: "Yes, during onboarding only" },
            { value: "yes_irregular", label: "Yes, but irregularly" },
            { value: "no", label: "No formal training" }
          ],
          riskLevel: "low"
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
          riskLevel: "medium"
        },
        {
          id: "incident2",
          section: "Incident Response & Data Breach",
          description: "Have you experienced any data security incidents?",
          options: [
            { value: "no", label: "No incidents" },
            { value: "minor_resolved", label: "Minor incidents, resolved" },
            { value: "major_resolved", label: "Major incidents, resolved" },
            { value: "recent_incident", label: "Recent incident" },
            { value: "prefer_not_answer", label: "Prefer not to answer" }
          ],
          riskLevel: "varies"
        }
      ]
    };
  
    // Apply state-specific modifications
    const questions = sets[businessType] || [];
    
    if (state && questions.length > 0) {
      // Add state-specific questions or modify risk levels based on state
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
  
  // Helper function to get follow-up questions
  export function getFollowUpQuestions(questionId, answers) {
    // Implementation for dynamic follow-up questions based on previous answers
    // This would contain logic to determine which additional questions to show
    // based on the user's responses to previous questions
    return [];
  }
  
  // Helper function to calculate risk score
  export function calculateRiskScore(answers, businessType) {
    // Implementation for calculating overall compliance risk score
    // based on answers provided
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
  
  // Helper function to calculate individual question risk
  function calculateQuestionRisk(question, answer) {
    const riskWeights = {
      "critical": 4,
      "high": 3,
      "medium": 2,
      "low": 1
    };
    
    const baseWeight = riskWeights[question.riskLevel] || 1;
    
    // Adjust risk based on specific answers
    // This would contain logic to determine risk multipliers
    // based on specific answer values
    
    return baseWeight;
  }
  
  // Helper function to get risk weight
  function getRiskWeight(riskLevel) {
    const weights = {
      "critical": 4,
      "high": 3,
      "medium": 2,
      "low": 1
    };
    return weights[riskLevel] || 1;
  }