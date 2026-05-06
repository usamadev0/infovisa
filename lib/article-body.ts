import { ArticleMeta, simpleHash } from "./articles";

// Variant pools — picked by hash of slug to produce unique-looking content.

const introVariants = [
  (a: ArticleMeta) =>
    `Planning to ${a.visaType === "tourist" ? "visit" : a.visaType === "study" ? "study in" : a.visaType === "work" ? "work in" : "immigrate to"} ${a.countryName}? You are in the right place. This comprehensive guide covers everything you need to know about the ${a.title.toLowerCase()} — from eligibility requirements and required documents to fees, processing times, and insider tips that improve your chances of approval. Whether you are applying for the first time or dealing with a previous rejection, this ${new Date().getFullYear()} guide is updated with the latest information from official sources.`,
  (a: ArticleMeta) =>
    `The ${a.countryName} ${a.visaType} visa is one of the most sought-after travel authorizations in ${new Date().getFullYear()}. Thousands of applicants from around the world apply each year, but many face rejection due to incomplete documents or misunderstandings about the process. This guide is designed to walk you through every step — from gathering documents to the final approval — so you can apply with confidence and clarity.`,
  (a: ArticleMeta) =>
    `Navigating the ${a.countryName} visa system can feel overwhelming, especially when requirements change frequently. This up-to-date ${new Date().getFullYear()} guide on "${a.title}" breaks down the entire process in plain language. You will learn exactly which documents to prepare, what fees to pay, how long to wait, and how to avoid the most common mistakes that lead to refusals.`,
];

const requirementsVariants = [
  () => [
    "Valid passport with at least 6 months of remaining validity",
    "Completed visa application form (signed and dated)",
    "Recent passport-sized photographs meeting official specifications",
    "Proof of financial means (bank statements for the last 3–6 months)",
    "Accommodation proof (hotel booking or host invitation letter)",
    "Travel insurance with adequate medical coverage",
    "Completed medical examination from an approved panel physician (if required)",
    "Police clearance certificate from your home country",
    "Previous travel history documentation (previous visas, stamps)",
  ],
  () => [
    "Current valid passport (validity must extend beyond your intended stay)",
    "Visa application form — completely filled and signed",
    "Biometric-quality photographs (white background, recent)",
    "Bank statements or proof of sponsorship covering travel costs",
    "Return travel tickets or detailed itinerary",
    "Proof of ties to home country (property, employment letter, family)",
    "Travel insurance policy document",
    "Proof of purpose (enrollment letter, job offer, invitation, etc.)",
  ],
  () => [
    "Machine-readable passport (valid for at least 6 months beyond stay)",
    "Official visa application form with correct fees paid",
    "Two recent color photographs as per specification",
    "Original bank statements or financial guarantee letter",
    "Evidence of accommodation arrangements",
    "Comprehensive travel and medical insurance",
    "Cover letter explaining purpose and duration of visit",
    "Supporting documents specific to visa category (e.g., admission letter for study, job contract for work)",
  ],
];

const feesVariants = [
  (a: ArticleMeta) =>
    `Visa fees for ${a.countryName} vary by nationality, visa type, and processing speed. Standard application fees for a ${a.visaType} visa typically range from USD 60–200 (or local currency equivalent). Premium/priority processing services, where available, may cost an additional USD 100–300. Service charges from visa application centers (VFS Global, BLS International) are separate. Always check the official embassy website for the most current fee schedule before applying, as fees can change annually.`,
  (a: ArticleMeta) =>
    `The cost of a ${a.countryName} ${a.visaType} visa in ${new Date().getFullYear()} depends on your nationality and the visa category. Base government fees generally range between USD 75–250. If you apply through a third-party visa application center, expect additional service charges of USD 20–50. Biometric fees (where applicable) add another USD 10–30. Express processing typically doubles the base fee. Note that visa fees are non-refundable even if your application is refused.`,
];

const mistakesVariants = [
  () => [
    "Submitting incomplete or unsigned application forms",
    "Providing bank statements that do not show consistent balances or unexplained large deposits",
    "Submitting photographs that do not meet specifications (wrong size, background, or recency)",
    "Not providing a clear purpose of visit or a convincing cover letter",
    "Applying too late — always apply at least 4–8 weeks before your travel date",
    "Ignoring travel insurance requirements or submitting expired policies",
    "Misrepresenting information — always be truthful; discrepancies cause immediate rejection",
  ],
  () => [
    "Not translating documents into the required language (usually English or the local language)",
    "Submitting photocopies instead of originals where originals are required",
    "Failing to show strong ties to your home country, which raises overstay concerns",
    "Booking non-refundable flights before visa approval",
    "Providing insufficient financial evidence — ensure the balance meets the minimum required",
    "Missing or expired supporting documents (expired police clearance, medical certificate, etc.)",
    "Failing to attend a scheduled biometrics or interview appointment",
  ],
];

const conclusionVariants = [
  (a: ArticleMeta) =>
    `Applying for a ${a.countryName} ${a.visaType} visa in ${new Date().getFullYear()} is entirely manageable when you follow a structured approach. Start early, gather all required documents, ensure your finances meet the threshold, and submit a complete, honest application. If your application is refused, carefully review the refusal letter, address the stated reasons, and reapply with stronger supporting evidence. With the right preparation, thousands of applicants successfully obtain this visa each year — and you can too.`,
  (a: ArticleMeta) =>
    `Success with your ${a.countryName} visa application comes down to preparation, accuracy, and timing. By following the steps outlined in this guide, avoiding common mistakes, and submitting a well-documented application, you significantly improve your chances of approval. Always use official government portals and embassy websites for the latest requirements. We recommend bookmarking this page and checking back for updates as policies evolve throughout ${new Date().getFullYear()}.`,
];

function pick<T>(arr: T[], hash: number): T {
  return arr[hash % arr.length];
}

export interface ArticleSection {
  type: "intro" | "requirements" | "steps" | "fees" | "mistakes" | "faq" | "conclusion";
  content: string | string[] | { question: string; answer: string }[] | { title: string; description: string }[];
}

export function buildArticleBody(article: ArticleMeta): ArticleSection[] {
  const h = simpleHash(article.slug);

  const faqs = [
    {
      question: `What are the basic requirements for a ${article.countryName} ${article.visaType} visa?`,
      answer: `You generally need a valid passport, completed application form, photographs, proof of financial means, and supporting documents specific to the ${article.visaType} visa category. Always check the official embassy website for the most current requirements.`,
    },
    {
      question: `How long does the ${article.countryName} ${article.visaType} visa processing take in ${new Date().getFullYear()}?`,
      answer: `Processing times vary from 2 to 12 weeks depending on the nationality of the applicant, time of year, and current application volumes. Applying well in advance is strongly recommended.`,
    },
    {
      question: `Can I track my ${article.countryName} visa application?`,
      answer: `Yes. Most countries offer online tracking through the embassy's official portal or the visa application center (e.g., VFS Global, BLS International). You will receive a reference number at submission.`,
    },
    {
      question: `Is it possible to get a ${article.countryName} ${article.visaType} visa with a previous refusal?`,
      answer: `Yes, but you must address the reasons for the previous refusal. Strengthen your application with additional evidence, a better cover letter, and ensure all documents are complete and accurate.`,
    },
    {
      question: `How much does a ${article.countryName} ${article.visaType} visa cost?`,
      answer: `Government fees typically range from USD 60–250 depending on the visa type and nationality, plus additional service and biometric fees charged by application centers. Fees are non-refundable.`,
    },
  ];

  const steps = [
    { title: "Check eligibility", description: `Verify you meet all eligibility criteria for the ${article.countryName} ${article.visaType} visa on the official government website.` },
    { title: "Gather documents", description: "Collect all required documents including your passport, photographs, financial statements, and category-specific supporting documents." },
    { title: "Complete the application", description: "Fill out the official visa application form carefully. Ensure all details match your passport exactly." },
    { title: "Book an appointment", description: "Schedule a biometrics appointment at the nearest visa application center or embassy. Book early as slots fill up quickly." },
    { title: "Attend biometrics and interview", description: "Bring all original documents to your appointment. If an interview is required, be prepared to explain your travel purpose clearly." },
    { title: "Track and receive your visa", description: "Use the reference number to track your application. Once approved, collect your passport/visa and check all details before traveling." },
  ];

  return [
    { type: "intro", content: pick(introVariants, h)(article) },
    { type: "requirements", content: pick(requirementsVariants, h + 1)() },
    { type: "steps", content: steps },
    { type: "fees", content: pick(feesVariants, h + 2)(article) },
    { type: "mistakes", content: pick(mistakesVariants, h + 3)() },
    { type: "faq", content: faqs },
    { type: "conclusion", content: pick(conclusionVariants, h + 4)(article) },
  ];
}
