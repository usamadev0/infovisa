export interface VisaType {
  slug: string;
  name: string;
  icon: string;
  description: string;
  shortDescription: string;
  targetAudience: string;
  typicalDuration: string;
  commonRequirements: string[];
  steps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export const VISA_TYPES: VisaType[] = [
  {
    slug: "study",
    name: "Study Visa",
    icon: "🎓",
    description: "A study visa (student visa) allows international students to pursue academic programs at accredited institutions abroad. It is one of the most applied-for visa categories worldwide.",
    shortDescription: "For international students enrolled in accredited programs",
    targetAudience: "Students admitted to a recognized college, university, language school, or vocational program",
    typicalDuration: "Duration of the course + 60–90 days",
    commonRequirements: [
      "Acceptance letter from an accredited institution",
      "Proof of financial support (bank statements, sponsor letter)",
      "Valid passport (minimum 6 months validity beyond stay)",
      "Completed visa application form",
      "Passport-sized photographs",
      "English language test scores (IELTS/TOEFL) if applicable",
      "Medical examination certificate (varies by country)",
      "Health insurance coverage",
    ],
    steps: [
      { title: "Get admission", description: "Secure an acceptance letter from a recognized educational institution in your destination country." },
      { title: "Gather documents", description: "Collect all required documents including financial proof, language scores, and identity documents." },
      { title: "Submit application", description: "Apply online or at the consulate/embassy with the complete document package and pay visa fees." },
      { title: "Attend biometrics/interview", description: "Submit biometrics and attend a visa interview if required by the destination country." },
      { title: "Await decision", description: "Processing times vary from 2 to 12 weeks. Track your application through the official portal." },
      { title: "Collect visa and travel", description: "Once approved, collect your visa, arrange travel, and comply with arrival registration requirements." },
    ],
    faqs: [
      { question: "Can I work on a student visa?", answer: "Most countries allow limited part-time work (typically 20 hours/week during term) on a student visa. Check the specific rules of your destination country." },
      { question: "Can I bring my family on a student visa?", answer: "Many countries allow dependants (spouse/children) to accompany student visa holders. A separate dependent visa or permit is usually required." },
      { question: "What happens if my course is extended?", answer: "You must apply to extend your student visa before it expires. Contact your institution's international student office for guidance." },
      { question: "Do I need health insurance for a student visa?", answer: "Yes, most countries require comprehensive health insurance as a mandatory condition for student visa approval." },
      { question: "Can a student visa lead to permanent residency?", answer: "In countries like Canada, Australia, and Germany, completing a degree can provide points or pathways toward permanent residency programs." },
    ],
  },
  {
    slug: "work",
    name: "Work Visa",
    icon: "💼",
    description: "A work visa authorizes foreign nationals to be employed in another country. Requirements and categories vary widely — from skilled worker programs to intra-company transfers and seasonal work permits.",
    shortDescription: "For professionals seeking employment abroad",
    targetAudience: "Skilled workers, engineers, healthcare professionals, IT specialists, and other professionals with a job offer",
    typicalDuration: "1–3 years (renewable)",
    commonRequirements: [
      "Job offer letter from a licensed employer",
      "Valid passport",
      "Employer sponsorship / labor market impact assessment (if required)",
      "Educational qualifications and credentials",
      "Professional experience certificates",
      "Completed visa application and fees",
      "Police clearance certificate",
      "Medical examination",
    ],
    steps: [
      { title: "Secure a job offer", description: "Obtain a formal job offer from a registered employer in the destination country." },
      { title: "Employer sponsorship", description: "The employer may need to obtain a work permit or sponsorship authorization from the government." },
      { title: "Prepare documents", description: "Compile educational certificates, work experience letters, police clearance, and medical results." },
      { title: "Submit visa application", description: "Apply at the embassy/consulate or online portal with all documents and pay the applicable fee." },
      { title: "Biometrics and interview", description: "Attend biometrics appointment and interview at the embassy if required." },
      { title: "Receive visa and relocate", description: "Travel to the destination country and complete any arrival registration or work authorization steps." },
    ],
    faqs: [
      { question: "Do I need a job offer before applying for a work visa?", answer: "In most cases, yes. Countries like Canada (Express Entry) have points-based systems that allow applications without a prior offer, but an offer significantly improves chances." },
      { question: "Can my family join me on a work visa?", answer: "Most work visa holders can bring immediate family (spouse and children) on dependent visas. Family members may be eligible to work depending on the country." },
      { question: "What is a work permit vs a work visa?", answer: "A work visa is stamped in your passport allowing entry. A work permit is a separate document authorizing you to work. Some countries issue both; others combine them." },
      { question: "Can a work visa lead to permanent residency?", answer: "Yes. Countries like Canada, Australia, and Germany have structured pathways from work visas to permanent residency based on employment history and points." },
      { question: "How long does a work visa take to process?", answer: "Processing times range from 2 weeks to 6 months depending on the country, visa category, and application backlog." },
    ],
  },
  {
    slug: "tourist",
    name: "Tourist Visa",
    icon: "✈️",
    description: "A tourist visa (visitor visa) permits temporary visits for leisure, sightseeing, visiting family and friends, or attending short events. Many countries now offer e-visas or visa-on-arrival options.",
    shortDescription: "For leisure travel, sightseeing, and visiting family",
    targetAudience: "Travelers planning holidays, family visits, or short-term stays for leisure purposes",
    typicalDuration: "15–90 days per visit",
    commonRequirements: [
      "Valid passport (6 months validity beyond stay)",
      "Completed tourist visa application",
      "Passport-sized photographs",
      "Proof of accommodation (hotel bookings or host letter)",
      "Return flight ticket",
      "Proof of sufficient funds (bank statements)",
      "Travel insurance",
      "Previous travel history (may help)",
    ],
    steps: [
      { title: "Check visa requirements", description: "Verify whether your nationality requires a visa, or if you qualify for visa-free travel, e-visa, or visa-on-arrival." },
      { title: "Book flights and accommodation", description: "Secure hotel reservations and return tickets to demonstrate planned travel and intent to return." },
      { title: "Prepare documents", description: "Gather bank statements, travel insurance, passport copies, photos, and the completed application form." },
      { title: "Apply online or at consulate", description: "Submit your application via the e-visa portal or in person at the embassy/consulate." },
      { title: "Pay visa fee", description: "Pay the required tourist visa fee online or at the application center." },
      { title: "Receive visa and travel", description: "Once approved, travel within the validity period and respect the maximum stay duration." },
    ],
    faqs: [
      { question: "Can I extend a tourist visa?", answer: "Some countries allow tourist visa extensions. You must apply before the current visa expires. Extensions are not always guaranteed." },
      { question: "Can I work on a tourist visa?", answer: "No. Tourist visas strictly prohibit any form of employment. Working on a tourist visa can result in deportation and future visa bans." },
      { question: "What is a multiple-entry tourist visa?", answer: "A multiple-entry visa lets you enter and exit the destination country multiple times within the visa validity period." },
      { question: "Do I need travel insurance for a tourist visa?", answer: "Many countries (especially Schengen/Europe) require proof of travel insurance covering at least €30,000 in medical emergencies." },
      { question: "How early should I apply for a tourist visa?", answer: "Apply at least 4–6 weeks in advance. For popular destinations during peak season, 8–10 weeks is recommended." },
    ],
  },
  {
    slug: "immigration",
    name: "Immigration & PR",
    icon: "🏠",
    description: "Permanent residency (PR) and immigration pathways allow foreign nationals to live and work in a country indefinitely, with a pathway to citizenship. Popular programs include Canada's Express Entry, Australia's SkillSelect, and Germany's settlement permit.",
    shortDescription: "For permanent residency and long-term settlement",
    targetAudience: "Skilled workers, graduates, and long-term residents seeking permanent settlement rights",
    typicalDuration: "Permanent (renewable status; pathway to citizenship after 3–5 years)",
    commonRequirements: [
      "Points-based eligibility score (age, education, work experience, language)",
      "Language proficiency (IELTS/CELPIP/PTE/German B1+)",
      "Educational credential assessment (ECA)",
      "Clean criminal record",
      "Medical examination",
      "Proof of settlement funds",
      "Valid job offer (significantly boosts score in many systems)",
      "Continuous residence requirement (where applicable)",
    ],
    steps: [
      { title: "Check eligibility", description: "Use the official points calculator or eligibility checker for your target country's PR program." },
      { title: "Improve your profile", description: "Boost language scores, get credentials assessed, and accumulate qualifying work experience." },
      { title: "Submit expression of interest", description: "Enter the points pool (e.g., Express Entry, SkillSelect) and wait for an Invitation to Apply (ITA)." },
      { title: "Submit full application", description: "Once invited, submit your complete PR application with all supporting documents within the deadline." },
      { title: "Biometrics and medical", description: "Complete biometrics and the required medical examination at an approved panel physician." },
      { title: "Receive PR status", description: "Upon approval, receive your permanent resident card and understand your rights, obligations, and the path to citizenship." },
    ],
    faqs: [
      { question: "What is the difference between PR and citizenship?", answer: "Permanent residents can live and work indefinitely but cannot vote in national elections. Citizens have full rights including voting and a passport. PR holders can typically apply for citizenship after 3–5 years." },
      { question: "Can I lose my permanent residency?", answer: "Yes. PR can be revoked if you do not meet residency obligations (e.g., living in the country for the required minimum days), commit serious crimes, or obtained PR through misrepresentation." },
      { question: "Does PR in one Schengen country give freedom of movement?", answer: "No. PR in a Schengen country gives you rights only in that specific country, though you can travel within the Schengen Area as a long-term resident." },
      { question: "How long does it take to get PR?", answer: "Processing times range from 6 months (Canada Express Entry) to several years (USA green card for some categories). It depends heavily on the country, category, and backlog." },
      { question: "Can I include my family in a PR application?", answer: "Yes. Most PR programs allow principal applicants to include a spouse/partner and dependent children in the same application." },
    ],
  },
];

export function getVisaTypeBySlug(slug: string): VisaType | undefined {
  return VISA_TYPES.find((v) => v.slug === slug);
}
