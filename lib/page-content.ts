import { CountryExtended, VISA_TYPE_LABELS, type VisaTypeExtended } from "@/data/countries-extended";
import type { PageType } from "@/lib/slug-parser";

export interface PageContent {
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { label: string; href: string }[];
  requirements: string[];
  steps: { title: string; description: string }[];
}

const VISA_INTRO: Record<VisaTypeExtended, string> = {
  study: "study at a recognized educational institution",
  work: "work legally for an employer",
  business: "conduct business activities, attend meetings, and explore investment opportunities",
  visit: "visit for tourism, family visits, or short-term travel",
  immigration: "permanently relocate and gain long-term residency or citizenship",
};

const DOCS_BASE: Record<VisaTypeExtended, string[]> = {
  study: [
    "Valid passport (minimum 6 months validity beyond intended stay)",
    "Completed and signed visa application form",
    "Official acceptance letter from an accredited educational institution",
    "Proof of financial sufficiency (bank statements for last 6 months)",
    "Academic transcripts and certificates (high school diploma, bachelor degree if applicable)",
    "English language proficiency test results (IELTS, TOEFL, PTE, or equivalent)",
    "Statement of purpose (why you chose this country and institution)",
    "Health insurance coverage for the entire study period",
    "Passport-sized photographs meeting embassy specifications",
    "Proof of accommodation (university dormitory confirmation or rental agreement)",
    "Medical examination certificate (if required by destination country)",
    "Police clearance certificate from home country",
    "Sponsor/guardian financial documents (if financially supported)",
    "Scholarship award letter (if applicable)",
    "Gap year explanation letter (if applicable)",
  ],
  work: [
    "Valid passport with at least 12 months validity beyond planned stay",
    "Completed visa application form with recent photograph",
    "Employment contract or job offer letter from sponsoring employer",
    "Educational qualifications and professional certifications",
    "Curriculum Vitae / Resume detailing work experience",
    "Employer's business registration and operating license",
    "Proof of salary and benefits package",
    "Labour market test documentation (if required by destination)",
    "Medical fitness certificate from approved medical center",
    "Police clearance certificate from all countries of residence",
    "Professional reference letters from previous employers",
    "Bank statements showing financial stability",
    "Professional organization memberships (if applicable)",
    "Copy of qualifications equivalency evaluation (if required)",
    "Sponsor declaration letter from employing company",
  ],
  business: [
    "Valid business passport with 6+ months validity",
    "Completed business visa application form",
    "Invitation letter from host company or organization",
    "Business registration certificate of your company",
    "Letter from your employer confirming business trip purpose",
    "Proof of business relationship (contracts, correspondence)",
    "Bank statements showing sufficient funds for the trip",
    "Detailed travel itinerary and accommodation bookings",
    "Return flight tickets",
    "Business card and company letterhead",
    "Tax registration and compliance documents",
    "Proof of business ownership or senior position",
    "Previous business trip evidence (if applicable)",
    "Health insurance covering business travel period",
    "Chamber of Commerce or trade association membership (if applicable)",
  ],
  visit: [
    "Valid passport with at least 6 months validity",
    "Completed tourist visa application form",
    "Recent passport-sized photographs (white background)",
    "Proof of sufficient funds (bank statements, traveler's checks)",
    "Confirmed round-trip flight bookings",
    "Hotel reservation or invitation letter from host",
    "Travel insurance covering medical emergencies",
    "Proof of employment, business ownership, or enrollment",
    "Previous travel history (copies of previous visas)",
    "No-objection certificate from employer or institution",
    "Income tax returns or salary slips (last 3 months)",
    "Family ties evidence (property ownership, family photos)",
    "Detailed travel itinerary",
    "Proof of accommodation for entire stay",
    "Vaccination certificates (if required for destination)",
  ],
  immigration: [
    "Valid passport with 12+ months validity",
    "Completed permanent residency/immigration application form",
    "Birth certificate (officially translated if not in English)",
    "Marriage certificate (if applicable)",
    "Educational qualifications with certified translations",
    "Work experience documentation (employment letters, pay slips, reference letters)",
    "Police clearance certificates from all countries of residence (last 10 years)",
    "Medical examination by government-approved physician",
    "Language proficiency test results (IELTS, CELPIP, TEF, etc.)",
    "Proof of settlement funds (bank statements)",
    "Job offer from a qualified employer (if applicable)",
    "Provincial/State nomination certificate (if applicable)",
    "Character and skills assessment from recognized body",
    "Photographs meeting specific requirements",
    "Application processing fees payment receipt",
  ],
};

const REJECTION_REASONS: Record<VisaTypeExtended, string[]> = {
  study: [
    "Insufficient proof of financial support or funds",
    "Weak ties to home country (risk of overstay)",
    "Inadequate or poorly written statement of purpose",
    "Academic qualifications below institution requirements",
    "Missing or invalid language test scores",
    "Incomplete application or missing documents",
    "Previous visa violations or immigration history",
    "Inconsistent information across documents",
    "Institution not recognized or accredited by destination country",
    "Failure to demonstrate genuine study intention",
  ],
  work: [
    "No valid job offer from an approved employer",
    "Employer unable to pass labour market test",
    "Qualifications not recognized in destination country",
    "Criminal record or police clearance issues",
    "Salary below minimum wage threshold",
    "Role not on shortage occupation list",
    "Insufficient work experience for the position",
    "Medical fitness concerns",
    "Previous immigration violations",
    "Employer not registered to sponsor workers",
  ],
  business: [
    "Lack of genuine business relationship with host company",
    "Insufficient proof of business activities",
    "Inadequate funds for the business trip",
    "Previous overstay or visa violations",
    "Weak ties to home country",
    "Vague or suspicious travel itinerary",
    "Missing invitation letter from host organization",
    "Criminal history or security concerns",
    "Inconsistent travel history",
    "Business activities deemed illegal or restricted",
  ],
  visit: [
    "Insufficient proof of financial means",
    "Weak or no ties to home country",
    "Previous visa violations or overstays",
    "Incomplete travel itinerary",
    "Inconsistent information in application",
    "No clear purpose or reason for visit",
    "Failed interview at consulate",
    "Security or criminal history concerns",
    "Medical concerns in high-risk countries",
    "Lack of accommodation proof",
  ],
  immigration: [
    "Insufficient points score in points-based system",
    "Failure to meet language proficiency requirements",
    "Lack of genuine work experience in skilled occupation",
    "Character issues or criminal history",
    "Health conditions not meeting immigration standards",
    "Previous immigration fraud or misrepresentation",
    "Financial requirements not met",
    "Occupation not on skilled list",
    "Failure to pass skills assessment",
    "Sponsor/job offer withdrawal",
  ],
};

function buildFAQs(country: CountryExtended, visaType: VisaTypeExtended, pageType: PageType): { question: string; answer: string }[] {
  const label = VISA_TYPE_LABELS[visaType];
  const fee = country.visaFees[visaType];
  const time = country.processingDays[visaType];
  const diff = country.difficulty[visaType];
  const currency = country.currency;

  return [
    {
      question: `How much does a ${country.name} ${label} cost?`,
      answer: `The ${country.name} ${label} application fee is approximately ${currency} ${fee} (government fee). Additional costs include medical examination, document translation, and courier fees, bringing the total to approximately ${currency} ${Math.round(fee * 1.4)} on average. Fees are subject to change, so always check the official embassy website before applying.`,
    },
    {
      question: `How long does ${country.name} ${label} processing take?`,
      answer: `Standard processing for a ${country.name} ${label} takes approximately ${time}. This can vary based on application volume, completeness of documents, and individual circumstances. You can sometimes request priority or expedited processing for an additional fee. Apply at least 3 months before your intended travel date.`,
    },
    {
      question: `What is the success rate for ${country.name} ${label} applications?`,
      answer: `The overall success rate for ${country.name} ${label} applications varies by applicant nationality and circumstances. Applications rated as ${diff} difficulty have varying approval rates. Strong financial documentation, a compelling purpose statement, and complete document submission significantly increase your chances of approval.`,
    },
    {
      question: `Can I work while studying in ${country.name} on a student visa?`,
      answer: visaType === "study"
        ? `Many ${country.name} student visa holders are permitted to work part-time during their studies, typically up to 20 hours per week during term time and full-time during holidays. Check specific conditions on your ${country.name} student visa, as restrictions vary based on institution type and study level.`
        : `This question is specifically relevant to student visa holders. For ${label} holders in ${country.name}, work authorization is ${visaType === "work" ? "granted as part of the visa conditions" : "subject to separate application"}.`,
    },
    {
      question: `Can I bring my family to ${country.name} on a ${label}?`,
      answer: `${country.name} generally allows ${label} holders to sponsor immediate family members (spouse and dependent children) through dependent/family visa applications. Dependents must meet health and character requirements. Check current dependent visa fees and processing times at the ${country.name} immigration authority.`,
    },
    {
      question: `What language do I need to know for ${country.name} ${label}?`,
      answer: `${country.languageRequirement} is the primary requirement for ${country.name}. The language requirement level varies by visa type and purpose: ${visaType === "study" ? "academic programs often require B2-C1 level proficiency" : visaType === "work" ? "professional work environments typically require B1-B2 level" : "basic communication or no formal language test may be required"}.`,
    },
    {
      question: `Is there a minimum bank balance required for ${country.name} ${label}?`,
      answer: `Yes, ${country.name} requires proof of financial sufficiency for ${label} applicants. While specific amounts change, typical requirements range from ${currency} ${fee * 3} to ${currency} ${fee * 10} in accessible funds, depending on the duration of your stay. Bank statements for the last 3-6 months are required, showing consistent balance (not last-minute deposits).`,
    },
    {
      question: `What happens if my ${country.name} ${label} is rejected?`,
      answer: `If your ${country.name} ${label} application is rejected, you will receive a refusal letter explaining the grounds. You have the right to appeal the decision within a specified period (usually 28-90 days). Common next steps include addressing the refusal reasons, strengthening weak areas of your application, and reapplying with improved documentation. Consulting a licensed immigration advisor is recommended.`,
    },
    {
      question: `How many times can I apply if my ${country.name} ${label} is refused?`,
      answer: `There is generally no limit on the number of times you can apply for a ${country.name} ${label} after a refusal. However, each application must demonstrate improvement over the previous one. Repeated applications without addressing the refusal grounds are unlikely to succeed and may waste fees. Ensure at least 3-6 months gap between applications to rebuild financial evidence.`,
    },
    {
      question: `Do I need travel insurance for ${country.name} ${label}?`,
      answer: `Travel or health insurance is strongly recommended and in many cases mandatory for ${country.name} ${label} applications. Minimum coverage typically required is ${currency} ${Math.round(fee * 15)} in emergency medical and repatriation coverage. Students and workers should ensure their insurance covers the full duration of their stay, including pre-existing conditions if applicable.`,
    },
    {
      question: `Can I apply for ${country.name} ${label} online?`,
      answer: `${country.name} ${visaType === "visit" ? "offers online visa applications through the official immigration portal" : "requires applications through the embassy or official immigration portal"}. The ${country.name} ${label} application process involves completing the official form online or at the embassy, submitting biometric data, and attending an interview if required. Check ${country.officialImmigrationUrl} for the current application method.`,
    },
    {
      question: `What is the validity period of a ${country.name} ${label}?`,
      answer: `A ${country.name} ${label} is typically valid for ${visaType === "study" ? "the duration of your enrolled course plus a grace period of 30-90 days" : visaType === "work" ? "1-3 years, renewable based on employment" : visaType === "visit" ? "90-180 days, sometimes extendable" : visaType === "business" ? "1-5 years, multiple entry" : "1-2 years initially, leading to permanent status"}. Always check your specific visa stamp for the exact validity period and conditions attached.`,
    },
    {
      question: `What embassy or consulate should I apply to for ${country.name} ${label}?`,
      answer: `You should apply to the ${country.name} embassy or consulate in your home country or country of legal residence. If ${country.name} does not have an embassy in your country, apply at the nearest designated embassy. Visit ${country.embassyUrl} for the complete list of ${country.name} missions worldwide and their specific application procedures.`,
    },
    {
      question: `Are there age restrictions for ${country.name} ${label}?`,
      answer: `${country.name} ${label} applicants are generally accepted across all adult age groups. However, ${visaType === "study" ? "programs may have minimum age requirements (usually 16-18 years)" : visaType === "immigration" ? "points-based immigration systems often award higher points to applicants under 45 years of age" : "certain visa categories may have age-specific requirements"}. Young applicants under 18 typically require parental consent documentation.`,
    },
    {
      question: `Can I extend my ${country.name} ${label}?`,
      answer: `${country.name} ${label} extensions are possible in most cases if your circumstances warrant continued stay. Applications for extension should be submitted at least 4-6 weeks before your current visa expires. ${visaType === "study" ? "Extension requires proof of continued enrollment and financial support" : visaType === "work" ? "Extension requires continued employment and employer sponsorship" : "Extension requirements vary based on grounds for continued stay"}. Unauthorized overstay may result in deportation and future visa bans.`,
    },
  ];
}

export function generatePageContent(
  country: CountryExtended,
  visaType: VisaTypeExtended,
  pageType: PageType
): PageContent {
  const label = VISA_TYPE_LABELS[visaType];
  const fee = country.visaFees[visaType];
  const time = country.processingDays[visaType];
  const diff = country.difficulty[visaType];
  const purpose = VISA_INTRO[visaType];
  const docs = DOCS_BASE[visaType];
  const rejections = REJECTION_REASONS[visaType];
  const faqs = buildFAQs(country, visaType, pageType);

  const internalLinks = [
    { label: `${country.name} Visa Information Hub`, href: `/${country.slug}-visa-info` },
    { label: `Apply for ${country.name} Study Visa`, href: `/apply-${country.slug}-study-visa` },
    { label: `Apply for ${country.name} Work Visa`, href: `/apply-${country.slug}-work-visa` },
    { label: `Apply for ${country.name} Business Visa`, href: `/apply-${country.slug}-business-visa` },
    { label: `Apply for ${country.name} Visit Visa`, href: `/apply-${country.slug}-visit-visa` },
    { label: `${country.name} Study Visa Details`, href: `/${country.slug}-study-visa-details` },
    { label: `${country.name} Work Visa Details`, href: `/${country.slug}-work-visa-details` },
    { label: `How to Apply for ${country.name} ${label}`, href: `/how-to-apply-${country.slug}-${visaType}-visa` },
    { label: `${country.name} Immigration Guide`, href: `/${country.slug}-immigration-visa-details` },
    { label: `Visa Eligibility Checker`, href: `/tools/eligibility-checker` },
    { label: `Visa Cost Calculator`, href: `/tools/cost-calculator` },
  ].filter((l) => !l.href.includes(`/${country.slug}-${visaType}-`));

  const sections: { heading: string; body: string }[] = [];

  if (pageType === "country-hub") {
    sections.push(
      {
        heading: `${country.name} Visa & Immigration Overview`,
        body: `${country.name}, officially recognized as one of the world's premier destinations for international travelers, students, and professionals, maintains a comprehensive immigration system managed by ${country.officialImmigrationUrl.replace("https://", "")}. Located in ${country.region} with its capital in ${country.capital}, ${country.name} uses ${country.currency} as its currency and has established clear pathways for individuals wishing to ${purpose}.

The ${country.name} immigration system has been designed to balance the country's economic needs with international commitments. Whether you are seeking a short-term tourist visit, a multi-year student permit, a professional work authorization, or a pathway to permanent residency, ${country.name} offers structured visa categories tailored to each purpose.

Understanding the ${country.name} visa system begins with identifying the correct visa category for your specific purpose of travel. The primary visa categories available for ${country.name} include the ${label} and related permit categories. Each category has distinct eligibility criteria, documentation requirements, processing timelines, and associated fees that must be understood before initiating an application.

Language requirements for ${country.name} vary by visa type. The country requires ${country.languageRequirement} for most visa categories. Applicants are strongly advised to begin language preparation at least 12 months before their intended application date to ensure they meet the minimum standards required by immigration authorities.`,
      },
      {
        heading: `Types of Visas Available for ${country.name}`,
        body: `${country.name} offers a comprehensive range of visa categories to accommodate different purposes of travel and relocation:

**Study Visa (Student Permit)**
The ${country.name} study visa enables international students to enroll in and attend full-time academic programs at accredited institutions. Application fees are approximately ${country.currency} ${country.visaFees.study} with processing times of ${country.processingDays.study}. Difficulty rating: ${country.difficulty.study}.

**Work Visa (Employment Permit)**
The ${country.name} work permit authorizes foreign nationals to work legally for approved employers. Application fees are approximately ${country.currency} ${country.visaFees.work} with processing times of ${country.processingDays.work}. Difficulty rating: ${country.difficulty.work}.

**Business Visa**
The ${country.name} business visa allows professionals to attend meetings, conferences, and explore business opportunities. Application fees are approximately ${country.currency} ${country.visaFees.business} with processing times of ${country.processingDays.business}. Difficulty rating: ${country.difficulty.business}.

**Visit/Tourist Visa**
The ${country.name} tourist visa enables short-term visits for tourism, family, and recreation. Application fees are approximately ${country.currency} ${country.visaFees.visit} with processing times of ${country.processingDays.visit}. Difficulty rating: ${country.difficulty.visit}.

**Immigration/Permanent Residency**
The ${country.name} immigration pathway leads to long-term residency or citizenship. Application fees are approximately ${country.currency} ${country.visaFees.immigration} with processing times of ${country.processingDays.immigration}. Difficulty rating: ${country.difficulty.immigration}.

Each visa category has specific requirements regarding financial capacity, health standards, character assessments, and purpose documentation. Choosing the wrong category is one of the most common errors applicants make, resulting in immediate refusal and loss of application fees.`,
      },
      {
        heading: `Why ${country.name} is a Popular Destination`,
        body: `${country.name} attracts millions of international visitors, students, and professionals annually for several compelling reasons:

${country.popularFor.map((reason, i) => `**${i + 1}. ${reason}**\n${country.name}'s ${reason.toLowerCase()} makes it one of the most sought-after destinations in ${country.region}.`).join("\n\n")}

${country.keyFacts.map((fact) => `- ${fact}`).join("\n")}

These factors combine to make ${country.name} an attractive destination for individuals at all stages of their professional and personal lives. The country's stable economy, high quality of life, and strong international reputation make the visa application process worthwhile despite its complexity.`,
      },
      {
        heading: `${country.name} Immigration Authority and Official Resources`,
        body: `The primary immigration authority for ${country.name} is accessible through the official portal at ${country.officialImmigrationUrl}. This portal provides up-to-date information on visa requirements, application forms, fee structures, and processing times.

For consular services and embassy appointments, visit ${country.embassyUrl} to locate the nearest ${country.name} mission in your country. Most embassies now offer online appointment booking systems, reducing wait times for applicants.

It is critically important to use only official government websites when researching your ${country.name} visa application. There are numerous third-party websites that provide outdated or incorrect information and charge unauthorized fees. Always verify information directly with the official ${country.name} immigration authority.

For the most accurate and current visa requirements, fees, and procedures, consult the official ${country.name} embassy or immigration authority in your country of residence. Requirements change frequently and this guide provides general information only.`,
      }
    );
  } else if (pageType === "apply") {
    sections.push(
      {
        heading: `Overview: ${country.name} ${label} Application`,
        body: `Applying for a ${country.name} ${label} requires careful preparation, accurate documentation, and a thorough understanding of the eligibility criteria established by ${country.name} immigration authorities. This comprehensive guide covers everything you need to know to submit a successful application in ${new Date().getFullYear()}.

The ${country.name} ${label} is designed for individuals who wish to ${purpose} in ${country.name}. The application difficulty is rated as ${diff}, meaning that applicants should plan accordingly and allow sufficient time for document preparation and review.

Current processing time for a ${country.name} ${label} is ${time}. The official application fee is ${country.currency} ${fee}. These figures are subject to change, and applicants should always verify current fees at the official immigration portal: ${country.officialImmigrationUrl}.

${country.name} processes ${label} applications through a combination of online systems and in-person embassy appointments. Most applicants are required to provide biometric data (fingerprints and photograph) at a designated application center. The complete process typically involves online registration, document submission, biometric enrollment, interview (if required), and a decision notification.`,
      },
      {
        heading: `Eligibility Criteria for ${country.name} ${label}`,
        body: `To be eligible for a ${country.name} ${label}, applicants must meet the following core requirements:

**Age and Identity Requirements**
Applicants must hold a valid passport from their country of citizenship. The passport must have at least 6 months of validity beyond the intended stay in ${country.name}. Minors (under 18) applying independently require parental or guardian consent.

**Financial Requirements**
${country.name} requires all ${label} applicants to demonstrate sufficient financial capacity to support their stay. Evidence of funds must be presented through official bank statements from the last 3-6 months, showing consistent maintenance of funds rather than last-minute deposits.

**Purpose and Intention**
Applicants must clearly demonstrate a genuine intention to ${purpose}. This includes having a concrete plan, confirmed arrangements, and clear evidence that they intend to comply with all visa conditions and depart ${country.name} at the end of their authorized stay.

**Health Requirements**
Applicants may be required to undergo a medical examination at an approved medical facility. Certain medical conditions may affect visa eligibility. Medical requirements vary by applicant age, country of origin, and intended length of stay.

**Character Requirements**
All ${country.name} ${label} applicants must be of good character. This typically requires submission of police clearance certificates from all countries of residence in the past 5-10 years. Criminal convictions may lead to visa refusal, though each case is assessed individually.

**Language Requirements**
Depending on the purpose of your stay, ${country.name} may require proof of ${country.languageRequirement} proficiency. Test results must be from approved testing organizations and must be recent (typically within 2 years of the application date).`,
      },
      {
        heading: `Required Documents for ${country.name} ${label}`,
        body: `The following documents are required for a ${country.name} ${label} application. Ensure all documents are current, authentic, and meet the specific requirements outlined by the ${country.name} embassy in your country:

${docs.map((doc, i) => `${i + 1}. **${doc}**`).join("\n")}

**Document Preparation Best Practices:**
All foreign-language documents must be accompanied by certified translations into English (or the official language of ${country.name}). Original documents or certified true copies are required in most cases. Electronic copies may not be accepted unless specified otherwise. Document formats, paper sizes, and certification requirements vary by embassy, so always check with your specific embassy for the most current requirements.`,
      },
      {
        heading: `Common Reasons for ${country.name} ${label} Rejection`,
        body: `Understanding why ${country.name} ${label} applications are commonly refused can help you avoid costly mistakes:

${rejections.map((reason, i) => `**${i + 1}. ${reason}**\nThis is one of the most frequent causes of ${country.name} ${label} refusal. Address this by providing comprehensive evidence that addresses each concern directly.`).join("\n\n")}

**How to Improve Your Chances:**
Review your application carefully before submission. Have a professional immigration consultant review your documents. Ensure every piece of evidence directly supports your visa purpose. Be completely honest in all declarations - misrepresentation leads to permanent bans from ${country.name}.`,
      },
      {
        heading: `${country.name} ${label} Fees Breakdown`,
        body: `Understanding the complete cost of a ${country.name} ${label} application is essential for financial planning:

| Cost Component | Estimated Amount (${country.currency}) |
|---|---|
| Government Application Fee | ${fee} |
| Biometric Enrollment Fee | ${Math.round(fee * 0.15)} |
| Health Examination | ${Math.round(fee * 0.5)} |
| Document Translation | ${Math.round(fee * 0.3)} |
| Document Courier/Notary | ${Math.round(fee * 0.15)} |
| Optional: Immigration Consultant | ${Math.round(fee * 2)}-${Math.round(fee * 5)} |
| **Estimated Total** | **${Math.round(fee * 2.1)}-${Math.round(fee * 7)}** |

All fees are approximate and subject to change. Government fees are non-refundable even if your application is refused. Processing fees paid to VFS Global or other visa facilitation services are separate from government fees.

Exchange rates fluctuate, so calculate the equivalent in your home currency close to the application date. Some embassies require payment in local currency while others accept international credit cards.`,
      }
    );
  } else if (pageType === "how-to") {
    const steps = [
      { title: "Check Eligibility and Requirements", description: `Before starting your ${country.name} ${label} application, thoroughly research the eligibility criteria specific to your nationality. Requirements vary significantly between different passport holders. Visit ${country.officialImmigrationUrl} and the ${country.name} embassy website in your country to get the most accurate, up-to-date requirements for your specific situation.` },
      { title: "Gather All Required Documents", description: `Compile all necessary documents well in advance. Create a checklist based on the official requirements and tick off each document as you obtain it. Ensure all documents are valid, not expired, and meet the specific format requirements. Get translations done by certified translators and have documents notarized where required.` },
      { title: "Complete the Application Form", description: `Fill out the official ${country.name} ${label} application form accurately and completely. Any errors, omissions, or inconsistencies can lead to immediate refusal. Complete the form in English (or the required language) using block capitals where specified. Review every field before submission.` },
      { title: "Pay Application Fees", description: `Pay the required government application fee of ${country.currency} ${fee}. Keep all payment receipts as proof of payment. Fees can typically be paid online via credit card, bank transfer, or at the visa application center. Note that fees are non-refundable regardless of the outcome.` },
      { title: "Submit Application and Biometrics", description: `Submit your complete application package at the designated visa application center or embassy. Most countries now require biometric enrollment (fingerprints and photograph) at this stage. Book your biometric appointment well in advance as slots fill quickly.` },
      { title: "Attend Interview (if Required)", description: `Some ${country.name} ${label} categories require a personal interview at the embassy or consulate. Prepare thoroughly by reviewing your application, understanding your purpose for travel, and being ready to answer questions about your plans, finances, and ties to your home country. Dress professionally and arrive 15 minutes early.` },
      { title: "Track Your Application", description: `After submission, use the official tracking system provided by ${country.name} immigration authorities to monitor your application status. Processing takes approximately ${time}. Do not contact the embassy repeatedly about your application status as this does not speed up processing.` },
      { title: "Respond to Additional Information Requests", description: `Immigration authorities may request additional documents or clarification during processing. Respond promptly and completely to any such requests. Delays in responding can significantly extend processing times or result in refusal.` },
      { title: "Receive Decision", description: `You will be notified of the decision via email, post, or through the tracking system. If approved, your visa will be stamped in your passport or issued as an e-visa. If refused, you will receive a refusal letter explaining the grounds for refusal.` },
      { title: "Pre-Departure Preparation", description: `Once your visa is approved, complete pre-departure preparations including purchasing comprehensive travel insurance, confirming accommodation arrangements, completing any mandatory pre-registration requirements, and ensuring you carry all original documents that were submitted with your application.` },
    ];
    sections.push(
      {
        heading: `How to Apply for ${country.name} ${label}: Step-by-Step Guide (${new Date().getFullYear()})`,
        body: `This comprehensive step-by-step guide walks you through the complete process of applying for a ${country.name} ${label} from start to finish. Following these steps in order will help ensure your application is complete, accurate, and gives you the best possible chance of approval.

The ${country.name} ${label} application process typically takes ${time} from submission to decision. Planning your application well in advance is essential, particularly if your travel or study/work start date is fixed. We recommend beginning your application preparation at least 4-6 months before your intended travel date.

The application difficulty is rated as ${diff}. While this may seem daunting, following a structured approach and using this guide will significantly improve your chances of success.`,
      },
      {
        heading: `Detailed Step-by-Step Application Process`,
        body: steps.map((s, i) => `**Step ${i + 1}: ${s.title}**\n${s.description}`).join("\n\n"),
      },
      {
        heading: `Timeline and Processing Times`,
        body: `Understanding the complete application timeline helps you plan effectively:

- **Document gathering phase:** 4-8 weeks (depending on police clearances, medical appointments)
- **Application preparation:** 1-2 weeks (completing forms, organizing documents)
- **Submission to biometrics:** 1-7 days (appointment availability varies)
- **Government processing:** ${time}
- **Decision notification:** 1-5 business days after processing completion
- **Total recommended lead time:** 5-8 months before travel date

Rush processing may be available for an additional fee in some cases. Medical emergencies or other urgent circumstances may qualify for priority processing consideration.`,
      },
      {
        heading: `Tips for a Successful ${country.name} ${label} Application`,
        body: `These expert tips will help maximize your chances of a successful ${country.name} ${label} application:

**1. Start Early**
Begin the process at least 4-6 months before your intended travel date. Last-minute applications frequently fail due to missing documents, appointment unavailability, or delayed processing.

**2. Read Official Guidelines Carefully**
Every detail in the official ${country.name} immigration guidelines matters. Requirements specific to your nationality may differ from general guidelines.

**3. Be Completely Honest**
Never misrepresent information in your application. Honesty is critical - immigration officers are experienced in detecting inconsistencies. A single misrepresentation can result in a permanent ban.

**4. Strong Financial Evidence**
Present comprehensive bank statements showing consistent funds over 6 months. Sudden large deposits are viewed suspiciously. Show diverse income sources and assets.

**5. Demonstrate Ties to Home Country**
One of the primary concerns of immigration authorities is whether you will leave ${country.name} at the end of your authorized stay. Demonstrate clear ties to your home country through property ownership, family ties, employment contract, or business interests.

**6. Purpose Clarity**
Write a clear, specific, and compelling statement of purpose. Generic statements are red flags. Tailor your statement to your specific circumstances and intentions.

**7. Professional Review**
Consider having a licensed immigration consultant or attorney review your complete application package before submission, particularly for complex cases.`,
      }
    );
  } else if (pageType === "details") {
    sections.push(
      {
        heading: `${country.name} ${label}: Complete Guide and Requirements (${new Date().getFullYear()})`,
        body: `The ${country.name} ${label} is one of the most important immigration documents for individuals seeking to ${purpose} in ${country.name}. This comprehensive guide covers every aspect of the ${country.name} ${label}, including the legal framework, eligibility criteria, documentation requirements, application procedures, fees, processing times, and strategies for maximizing your chance of approval.

${country.name}, located in ${country.region} with its capital in ${country.capital}, is governed by immigration law administered through ${country.officialImmigrationUrl}. The ${label} is a formal authorization that permits foreign nationals to enter and remain in ${country.name} for a specific purpose and duration.

The ${country.name} ${label} is classified as ${diff} difficulty, meaning that careful preparation is essential. The standard processing time is ${time}, with a government fee of ${country.currency} ${fee}. These parameters can change based on policy updates, so always verify current requirements at the official portal.`,
      },
      {
        heading: `Legal Framework and Visa Categories`,
        body: `The ${country.name} ${label} operates under the country's primary immigration legislation. Key aspects of the legal framework include:

**Authorization Scope:** The ${label} authorizes the holder to ${purpose} in ${country.name} for the specified validity period. Any activities beyond the authorized scope are strictly prohibited and may result in deportation and future visa bans.

**Compliance Requirements:** Visa holders must comply with all conditions attached to their ${label}, including any restrictions on work, study, or travel within ${country.name}.

**Extension and Change of Status:** ${label} holders may apply for extensions or changes of visa status within ${country.name} subject to meeting eligibility requirements for the new or extended status.

**Rights and Restrictions:** While in ${country.name} on a ${label}, holders have specific rights including access to certain services and protections under ${country.name} law. Restrictions may include limitations on employment, healthcare access, and duration of stay.

Understanding the legal framework of your ${country.name} ${label} is essential for maintaining your legal status and avoiding inadvertent violations that could jeopardize your immigration history.`,
      },
      {
        heading: `Complete Documentation Guide`,
        body: `A complete and accurate document package is the foundation of a successful ${country.name} ${label} application. Below is the comprehensive documentation checklist:

**Primary Documents**
${docs.slice(0, 8).map((d, i) => `${i + 1}. ${d}`).join("\n")}

**Supporting Documents**
${docs.slice(8).map((d, i) => `${i + 9}. ${d}`).join("\n")}

**Document Quality Standards:**
- All photographs must meet embassy-specific requirements (size, background color, recency)
- Translations must be performed by certified translators recognized by ${country.name} authorities
- Notarization requirements vary by document type and applicant nationality
- Original documents should be kept safe; submit certified copies where permitted
- All documents in a language other than English must be accompanied by certified English translations
- Bank statements must be bank-certified, not internet-printed statements`,
      },
      {
        heading: `Fees, Costs, and Financial Requirements`,
        body: `A complete understanding of all costs associated with the ${country.name} ${label} is essential for financial planning:

**Government Application Fee:** ${country.currency} ${fee}
This is the official fee charged by the ${country.name} government. It is non-refundable regardless of the outcome.

**Biometric Enrollment Fee:** Approximately ${country.currency} ${Math.round(fee * 0.15)}
Required for most applicants for fingerprint and photograph capture.

**Health Examination:** Approximately ${country.currency} ${Math.round(fee * 0.5)}
Medical examination at an approved health facility. Required for most visa categories.

**Translation Services:** ${country.currency} ${Math.round(fee * 0.2)} per document
For certified translation of foreign-language documents.

**Courier/Postal Services:** ${country.currency} ${Math.round(fee * 0.1)}
For secure document delivery to the embassy.

**Immigration Consultant (Optional):** ${country.currency} ${Math.round(fee * 2)}-${Math.round(fee * 6)}
Professional assistance significantly improves success rates.

**Total Estimated Cost:** ${country.currency} ${Math.round(fee * 2)}-${Math.round(fee * 8)} depending on circumstances.

**Proof of Financial Sufficiency:**
${country.name} requires applicants to demonstrate they have sufficient funds for their intended stay. Recommended minimum funds (beyond application fees):
- Short stay (1-3 months): ${country.currency} ${fee * 4}-${fee * 8}
- Medium stay (3-12 months): ${country.currency} ${fee * 8}-${fee * 20}
- Long stay/immigration: Varies significantly; consult official requirements`,
      },
      {
        heading: `Processing Times and Application Status`,
        body: `The ${country.name} ${label} has a standard processing time of ${time}. Understanding the processing timeline helps set realistic expectations:

**Application Stage Timeline:**
1. **Document preparation:** 4-8 weeks
2. **Application submission to appointment:** 1-3 weeks
3. **Government processing:** ${time}
4. **Decision notification:** 1-5 business days
5. **Visa issuance:** 3-7 business days after approval

**Factors Affecting Processing Time:**
- Application volume at specific embassy/consulate
- Completeness and quality of submitted documents
- Additional background checks required
- Interview scheduling (if required)
- Public holidays in ${country.name}
- Applicant nationality (some nationalities undergo additional scrutiny)

**Expedited Processing:**
Some ${country.name} embassies offer priority or expedited processing for applicants with genuine urgent needs. This service typically costs an additional 50-100% of the standard fee and reduces processing time by 30-50%. Emergency processing (for medical or humanitarian reasons) may be available in exceptional circumstances.

**Tracking Your Application:**
Most ${country.name} applications can be tracked online through the official portal. You will receive a reference number at the time of submission. Use only the official tracking system - third-party tracking services are not reliable.`,
      },
      {
        heading: `Approval Strategies and Success Tips`,
        body: `Maximizing your chances of ${country.name} ${label} approval requires attention to detail and a strategic approach:

**Financial Documentation Excellence**
Present bank statements spanning at least 6 months showing consistent maintenance of funds. Avoid sudden large deposits close to the application date as these raise red flags. Diversify your financial evidence with salary slips, property documents, fixed deposits, and investment records.

**Purpose Clarity and Authenticity**
Write a compelling, specific, and honest statement of purpose. Explain exactly why you want to ${purpose} in ${country.name} and how it aligns with your long-term goals. Vague or generic purpose statements are immediate red flags.

**Strong Home Country Ties**
Demonstrate clear reasons why you will return to your home country. This includes property ownership, family responsibilities, employment commitments, educational ties, or business interests. Strong home ties directly address the officer's primary concern about potential overstay.

**Complete and Organized Application**
Submit a complete, well-organized application package with a clear index. Missing documents are the most common cause of delays and refusals. Use a document checklist and verify every item before submission.

**Honesty and Consistency**
Ensure complete consistency between your application form, personal statement, and supporting documents. Any inconsistency, however minor, may trigger additional scrutiny or refusal.

**Professional Photography**
Passport photos are often rejected for technical reasons. Have photographs taken by a professional photographer familiar with ${country.name} embassy requirements.

**Interview Preparation (if required)**
If an interview is required, prepare thoroughly. Practice answering common visa interview questions honestly and confidently. Know your application inside and out.`,
      }
    );
  }

  return {
    heroTitle: pageType === "country-hub"
      ? `${country.name} Visa & Immigration Guide ${new Date().getFullYear()}`
      : pageType === "apply"
        ? `Apply for ${country.name} ${label} — Complete Guide ${new Date().getFullYear()}`
        : pageType === "how-to"
          ? `How to Apply for ${country.name} ${label} — Step-by-Step ${new Date().getFullYear()}`
          : `${country.name} ${label} — Full Details & Requirements ${new Date().getFullYear()}`,
    heroSubtitle: pageType === "country-hub"
      ? `Complete guide to all visa types, requirements, fees, and processes for ${country.name}. Updated for ${new Date().getFullYear()}.`
      : `Processing time: ${time} | Fee: ${country.currency} ${fee} | Difficulty: ${diff} | Updated ${new Date().getFullYear()}`,
    metaTitle: pageType === "country-hub"
      ? `${country.name} Visa Guide ${new Date().getFullYear()} — Types, Requirements & Fees | VisaProcessInfo`
      : pageType === "apply"
        ? `Apply for ${country.name} ${label} ${new Date().getFullYear()} — Requirements & Process | VisaProcessInfo`
        : pageType === "how-to"
          ? `How to Apply for ${country.name} ${label} Step by Step ${new Date().getFullYear()} | VisaProcessInfo`
          : `${country.name} ${label} Details — Requirements, Fees & Process ${new Date().getFullYear()} | VisaProcessInfo`,
    metaDescription: pageType === "country-hub"
      ? `Complete ${country.name} visa guide for ${new Date().getFullYear()}. All visa types, requirements, fees, processing times, and step-by-step application guides for ${country.name}.`
      : `${country.name} ${label} guide ${new Date().getFullYear()}. Requirements, documents, fees (${country.currency} ${fee}), processing time (${time}), and expert tips for approval.`,
    sections,
    faqs,
    internalLinks,
    requirements: docs,
    steps: [
      { title: "Check Eligibility", description: `Verify you meet all ${country.name} ${label} requirements for your nationality.` },
      { title: "Gather Documents", description: `Compile all required documents including financial proof, identity documents, and purpose evidence.` },
      { title: "Complete Application", description: `Fill out the official ${country.name} application form accurately.` },
      { title: "Pay Fees", description: `Pay the ${country.currency} ${fee} government application fee.` },
      { title: "Submit & Biometrics", description: `Submit at the designated application center and provide biometric data.` },
      { title: "Await Decision", description: `Track your application; standard processing takes ${time}.` },
    ],
  };
}
