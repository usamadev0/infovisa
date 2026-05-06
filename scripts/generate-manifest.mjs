#!/usr/bin/env node
/**
 * Generates data/article-manifest.json with 500 articles across 5 categories.
 * Run: node scripts/generate-manifest.mjs
 * Commit the output to keep builds reproducible.
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const COUNTRIES = [
  { slug: "usa", name: "United States" },
  { slug: "uk", name: "United Kingdom" },
  { slug: "canada", name: "Canada" },
  { slug: "germany", name: "Germany" },
  { slug: "australia", name: "Australia" },
  { slug: "uae", name: "UAE" },
  { slug: "saudi-arabia", name: "Saudi Arabia" },
  { slug: "turkey", name: "Turkey" },
  { slug: "italy", name: "Italy" },
  { slug: "spain", name: "Spain" },
  { slug: "france", name: "France" },
  { slug: "netherlands", name: "Netherlands" },
  { slug: "sweden", name: "Sweden" },
  { slug: "norway", name: "Norway" },
  { slug: "switzerland", name: "Switzerland" },
];

const YEAR = 2026;

// ── Study Visa — 100 patterns ──────────────────────────────────────────────
const studyPatterns = [
  (c) => ({
    slug: `how-to-apply-${c.slug}-study-visa-${YEAR}-step-by-step`,
    title: `How to Apply for ${c.name} Study Visa ${YEAR}: Step-by-Step Guide`,
    metaDescription: `Complete guide on how to apply for a ${c.name} student visa in ${YEAR}. Requirements, fees, processing time, and step-by-step instructions.`,
    primaryKeyword: `how to apply ${c.name.toLowerCase()} study visa ${YEAR}`,
    tags: ["study visa", c.slug, `study visa ${YEAR}`, "student visa guide"],
  }),
  (c) => ({
    slug: `${c.slug}-student-visa-requirements-${YEAR}`,
    title: `${c.name} Student Visa Requirements ${YEAR}: Complete Checklist`,
    metaDescription: `Full checklist of ${c.name} student visa requirements for ${YEAR}. Documents, financial proof, language scores, and application tips.`,
    primaryKeyword: `${c.name.toLowerCase()} student visa requirements ${YEAR}`,
    tags: ["study visa", c.slug, "requirements", "student visa checklist"],
  }),
  (c) => ({
    slug: `${c.slug}-study-visa-from-pakistan-${YEAR}`,
    title: `${c.name} Study Visa for Pakistani Students ${YEAR}: Full Guide`,
    metaDescription: `How Pakistani students can apply for a ${c.name} study visa in ${YEAR}. Embassy process, financial requirements, and scholarship tips.`,
    primaryKeyword: `${c.name.toLowerCase()} study visa from Pakistan ${YEAR}`,
    tags: ["study visa", c.slug, "pakistan", "student visa"],
  }),
  (c) => ({
    slug: `${c.slug}-scholarship-study-visa-guide-${YEAR}`,
    title: `${c.name} Scholarship and Study Visa Guide ${YEAR}`,
    metaDescription: `How to get a scholarship and student visa for ${c.name} in ${YEAR}. Top scholarships, eligibility, and visa application process.`,
    primaryKeyword: `${c.name.toLowerCase()} scholarship study visa ${YEAR}`,
    tags: ["study visa", c.slug, "scholarship", "student funding"],
  }),
  (c) => ({
    slug: `${c.slug}-study-visa-processing-time-${YEAR}`,
    title: `${c.name} Study Visa Processing Time ${YEAR}: What to Expect`,
    metaDescription: `How long does a ${c.name} student visa take in ${YEAR}? Processing timelines, delays, and how to track your application.`,
    primaryKeyword: `${c.name.toLowerCase()} study visa processing time ${YEAR}`,
    tags: ["study visa", c.slug, "processing time", "visa timeline"],
  }),
  (c) => ({
    slug: `${c.slug}-student-visa-rejection-reasons-${YEAR}`,
    title: `Top Reasons for ${c.name} Student Visa Rejection in ${YEAR} and How to Avoid Them`,
    metaDescription: `Why student visas get rejected for ${c.name} in ${YEAR} and proven tips to avoid refusal. Common mistakes and solutions.`,
    primaryKeyword: `${c.name.toLowerCase()} student visa rejection reasons`,
    tags: ["study visa", c.slug, "visa rejection", "student visa tips"],
  }),
  (c) => ({
    slug: `${c.slug}-study-visa-without-ielts-${YEAR}`,
    title: `Can You Get a ${c.name} Study Visa Without IELTS in ${YEAR}?`,
    metaDescription: `Is IELTS mandatory for a ${c.name} study visa? Find out IELTS-free options and alternative English proficiency proofs for ${YEAR}.`,
    primaryKeyword: `${c.name.toLowerCase()} study visa without ielts ${YEAR}`,
    tags: ["study visa", c.slug, "no ielts", "english waiver"],
  }),
];

// ── Work Visa — 100 patterns ───────────────────────────────────────────────
const workPatterns = [
  (c) => ({
    slug: `${c.slug}-work-visa-requirements-${YEAR}`,
    title: `${c.name} Work Visa Requirements for ${YEAR}: Complete Guide`,
    metaDescription: `Everything you need to know about ${c.name} work visa requirements in ${YEAR}. Documents, fees, processing time, and expert tips.`,
    primaryKeyword: `${c.name.toLowerCase()} work visa requirements ${YEAR}`,
    tags: ["work visa", c.slug, "work permit", `work visa ${YEAR}`],
  }),
  (c) => ({
    slug: `how-to-get-${c.slug}-work-visa-${YEAR}`,
    title: `How to Get a ${c.name} Work Visa in ${YEAR}: Step-by-Step`,
    metaDescription: `Step-by-step process for getting a ${c.name} work visa in ${YEAR}. Employer sponsorship, required documents, and application tips.`,
    primaryKeyword: `how to get ${c.name.toLowerCase()} work visa ${YEAR}`,
    tags: ["work visa", c.slug, "work permit", "job abroad"],
  }),
  (c) => ({
    slug: `${c.slug}-work-visa-for-unskilled-workers-${YEAR}`,
    title: `${c.name} Work Visa for Unskilled Workers ${YEAR}: Options & Process`,
    metaDescription: `Can unskilled workers get a ${c.name} work visa in ${YEAR}? Explore available visa categories, requirements, and application steps.`,
    primaryKeyword: `${c.name.toLowerCase()} work visa unskilled workers ${YEAR}`,
    tags: ["work visa", c.slug, "unskilled work", "labor visa"],
  }),
  (c) => ({
    slug: `${c.slug}-work-visa-from-pakistan-${YEAR}`,
    title: `${c.name} Work Visa for Pakistani Workers ${YEAR}: Complete Process`,
    metaDescription: `How Pakistanis can apply for a ${c.name} work visa in ${YEAR}. Embassy requirements, job offers, and sponsorship details.`,
    primaryKeyword: `${c.name.toLowerCase()} work visa from Pakistan ${YEAR}`,
    tags: ["work visa", c.slug, "pakistan", "overseas employment"],
  }),
  (c) => ({
    slug: `${c.slug}-skilled-worker-visa-${YEAR}`,
    title: `${c.name} Skilled Worker Visa ${YEAR}: How to Qualify and Apply`,
    metaDescription: `Full guide to the ${c.name} skilled worker visa in ${YEAR}. Qualifying occupations, salary thresholds, and the complete application process.`,
    primaryKeyword: `${c.name.toLowerCase()} skilled worker visa ${YEAR}`,
    tags: ["work visa", c.slug, "skilled worker", "professional visa"],
  }),
  (c) => ({
    slug: `${c.slug}-work-visa-salary-requirements-${YEAR}`,
    title: `${c.name} Work Visa Minimum Salary Requirements ${YEAR}`,
    metaDescription: `What is the minimum salary threshold for a ${c.name} work visa in ${YEAR}? Salary benchmarks, thresholds by occupation, and recent updates.`,
    primaryKeyword: `${c.name.toLowerCase()} work visa salary requirements ${YEAR}`,
    tags: ["work visa", c.slug, "salary threshold", "work permit"],
  }),
  (c) => ({
    slug: `${c.slug}-work-permit-vs-work-visa-${YEAR}`,
    title: `${c.name} Work Permit vs Work Visa ${YEAR}: Key Differences Explained`,
    metaDescription: `Confused about work permits vs work visas in ${c.name}? This ${YEAR} guide explains the difference, which you need, and how to apply.`,
    primaryKeyword: `${c.name.toLowerCase()} work permit vs work visa`,
    tags: ["work visa", c.slug, "work permit", "visa differences"],
  }),
];

// ── Tourist Visa — 100 patterns ────────────────────────────────────────────
const touristPatterns = [
  (c) => ({
    slug: `${c.slug}-tourist-visa-guide-${YEAR}`,
    title: `${c.name} Tourist Visa Complete Guide ${YEAR}`,
    metaDescription: `Complete guide to the ${c.name} tourist visa in ${YEAR}. Application process, required documents, fees, and validity.`,
    primaryKeyword: `${c.name.toLowerCase()} tourist visa guide ${YEAR}`,
    tags: ["tourist visa", c.slug, "travel visa", `tourist visa ${YEAR}`],
  }),
  (c) => ({
    slug: `${c.slug}-tourist-visa-for-beginners-${YEAR}`,
    title: `${c.name} Tourist Visa for Beginners ${YEAR}: Easy Step-by-Step`,
    metaDescription: `First time applying for a ${c.name} tourist visa? This ${YEAR} beginner guide covers every step from documents to approval.`,
    primaryKeyword: `${c.name.toLowerCase()} tourist visa for beginners ${YEAR}`,
    tags: ["tourist visa", c.slug, "beginner guide", "first time visa"],
  }),
  (c) => ({
    slug: `${c.slug}-tourist-visa-from-pakistan-${YEAR}`,
    title: `${c.name} Tourist Visa for Pakistanis ${YEAR}: Process and Requirements`,
    metaDescription: `Pakistani nationals applying for a ${c.name} tourist visa in ${YEAR}. Documents, embassy appointment, and common tips for approval.`,
    primaryKeyword: `${c.name.toLowerCase()} tourist visa from Pakistan ${YEAR}`,
    tags: ["tourist visa", c.slug, "pakistan", "travel"],
  }),
  (c) => ({
    slug: `${c.slug}-tourist-visa-fee-${YEAR}`,
    title: `${c.name} Tourist Visa Fee in ${YEAR}: Full Cost Breakdown`,
    metaDescription: `How much does a ${c.name} tourist visa cost in ${YEAR}? Full fee breakdown including application, service, and hidden costs.`,
    primaryKeyword: `${c.name.toLowerCase()} tourist visa fee ${YEAR}`,
    tags: ["tourist visa", c.slug, "visa fee", "travel cost"],
  }),
  (c) => ({
    slug: `${c.slug}-tourist-visa-bank-statement-requirements-${YEAR}`,
    title: `${c.name} Tourist Visa Bank Statement Requirements ${YEAR}`,
    metaDescription: `What bank statement do you need for a ${c.name} tourist visa in ${YEAR}? Minimum balance, statement format, and tips for approval.`,
    primaryKeyword: `${c.name.toLowerCase()} tourist visa bank statement requirements`,
    tags: ["tourist visa", c.slug, "bank statement", "financial proof"],
  }),
  (c) => ({
    slug: `${c.slug}-evisa-how-to-apply-${YEAR}`,
    title: `${c.name} eVisa ${YEAR}: How to Apply Online Step-by-Step`,
    metaDescription: `How to apply for a ${c.name} eVisa online in ${YEAR}. Simple step-by-step instructions, documents needed, and processing time.`,
    primaryKeyword: `${c.name.toLowerCase()} evisa how to apply ${YEAR}`,
    tags: ["tourist visa", c.slug, "evisa", "online visa"],
  }),
  (c) => ({
    slug: `${c.slug}-tourist-visa-extension-${YEAR}`,
    title: `How to Extend a ${c.name} Tourist Visa in ${YEAR}`,
    metaDescription: `Can you extend your ${c.name} tourist visa in ${YEAR}? Find out the process, eligibility, documents needed, and important deadlines.`,
    primaryKeyword: `${c.name.toLowerCase()} tourist visa extension ${YEAR}`,
    tags: ["tourist visa", c.slug, "visa extension", "overstay"],
  }),
];

// ── Immigration & PR — 100 patterns ───────────────────────────────────────
const immigrationPatterns = [
  (c) => ({
    slug: `${c.slug}-immigration-process-explained-${YEAR}`,
    title: `${c.name} Immigration Process Explained ${YEAR}`,
    metaDescription: `A full explanation of the ${c.name} immigration process in ${YEAR}. Visa categories, PR pathways, and step-by-step instructions.`,
    primaryKeyword: `${c.name.toLowerCase()} immigration process explained ${YEAR}`,
    tags: ["immigration", c.slug, "permanent residency", `immigration ${YEAR}`],
  }),
  (c) => ({
    slug: `${c.slug}-pr-eligibility-requirements-${YEAR}`,
    title: `${c.name} PR Eligibility Requirements ${YEAR}: Complete Checklist`,
    metaDescription: `Am I eligible for ${c.name} permanent residency in ${YEAR}? Full checklist of PR eligibility requirements, points criteria, and documents.`,
    primaryKeyword: `${c.name.toLowerCase()} PR eligibility requirements ${YEAR}`,
    tags: ["immigration", c.slug, "PR", "permanent residency"],
  }),
  (c) => ({
    slug: `how-to-get-${c.slug}-permanent-residency-${YEAR}`,
    title: `How to Get ${c.name} Permanent Residency in ${YEAR}: Full Guide`,
    metaDescription: `Step-by-step guide to obtaining ${c.name} permanent residency (PR) in ${YEAR}. Categories, point systems, and application tips.`,
    primaryKeyword: `how to get ${c.name.toLowerCase()} permanent residency ${YEAR}`,
    tags: ["immigration", c.slug, "PR guide", "settlement"],
  }),
  (c) => ({
    slug: `${c.slug}-citizenship-after-pr-${YEAR}`,
    title: `${c.name} Citizenship After Permanent Residency ${YEAR}: What You Need to Know`,
    metaDescription: `How long to become a ${c.name} citizen after PR? This ${YEAR} guide covers residency requirements, naturalization, and application steps.`,
    primaryKeyword: `${c.name.toLowerCase()} citizenship after PR ${YEAR}`,
    tags: ["immigration", c.slug, "citizenship", "naturalization"],
  }),
  (c) => ({
    slug: `${c.slug}-immigration-points-calculator-${YEAR}`,
    title: `${c.name} Immigration Points Calculator ${YEAR}: Check Your Score`,
    metaDescription: `Calculate your ${c.name} immigration points score for ${YEAR}. Understand how age, education, work experience, and language affect your eligibility.`,
    primaryKeyword: `${c.name.toLowerCase()} immigration points calculator ${YEAR}`,
    tags: ["immigration", c.slug, "points calculator", "CRS score"],
  }),
  (c) => ({
    slug: `${c.slug}-immigration-from-pakistan-${YEAR}`,
    title: `${c.name} Immigration Guide for Pakistanis ${YEAR}`,
    metaDescription: `Complete ${c.name} immigration guide for Pakistani nationals in ${YEAR}. Top pathways, required documents, and processing timelines.`,
    primaryKeyword: `${c.name.toLowerCase()} immigration from Pakistan ${YEAR}`,
    tags: ["immigration", c.slug, "pakistan", "settle abroad"],
  }),
  (c) => ({
    slug: `${c.slug}-family-immigration-${YEAR}`,
    title: `${c.name} Family Immigration ${YEAR}: Sponsoring Your Family`,
    metaDescription: `How to sponsor your family for ${c.name} immigration in ${YEAR}. Eligibility, documentation, processing times, and costs.`,
    primaryKeyword: `${c.name.toLowerCase()} family immigration ${YEAR}`,
    tags: ["immigration", c.slug, "family sponsorship", "family visa"],
  }),
];

// ── Country-Specific Guides — 100 patterns ────────────────────────────────
const countryGuidePatterns = [
  (c) => ({
    slug: `${c.slug}-visa-guide-complete-${YEAR}`,
    title: `${c.name} Visa Guide ${YEAR}: Everything You Need to Know`,
    metaDescription: `Your complete ${c.name} visa guide for ${YEAR}. All visa types, requirements, fees, and expert tips for a successful application.`,
    primaryKeyword: `${c.name.toLowerCase()} visa guide ${YEAR}`,
    tags: ["country guide", c.slug, "visa guide", `${c.name.toLowerCase()} visa`],
  }),
  (c) => ({
    slug: `living-in-${c.slug}-expat-guide-${YEAR}`,
    title: `Living in ${c.name} as an Expat ${YEAR}: Complete Guide`,
    metaDescription: `What is it like to live in ${c.name} as a foreigner in ${YEAR}? Cost of living, visa options, culture, and practical tips for expats.`,
    primaryKeyword: `living in ${c.name.toLowerCase()} expat ${YEAR}`,
    tags: ["country guide", c.slug, "expat life", "living abroad"],
  }),
  (c) => ({
    slug: `${c.slug}-cost-of-living-${YEAR}`,
    title: `Cost of Living in ${c.name} ${YEAR}: Budget Guide for Immigrants`,
    metaDescription: `How much does it cost to live in ${c.name} in ${YEAR}? Rent, food, transport, and living expenses for new immigrants and expats.`,
    primaryKeyword: `cost of living in ${c.name.toLowerCase()} ${YEAR}`,
    tags: ["country guide", c.slug, "cost of living", "expat budget"],
  }),
  (c) => ({
    slug: `best-cities-to-live-in-${c.slug}-${YEAR}`,
    title: `Best Cities to Live in ${c.name} for Immigrants ${YEAR}`,
    metaDescription: `Top cities in ${c.name} for immigrants and expats in ${YEAR}. Job market, housing, quality of life, and immigration support compared.`,
    primaryKeyword: `best cities to live in ${c.name.toLowerCase()} immigrants`,
    tags: ["country guide", c.slug, "best cities", "immigration destination"],
  }),
  (c) => ({
    slug: `${c.slug}-healthcare-for-immigrants-${YEAR}`,
    title: `${c.name} Healthcare for Immigrants ${YEAR}: What to Know`,
    metaDescription: `How does healthcare work for immigrants in ${c.name} in ${YEAR}? Public vs private, eligibility, registration, and health insurance requirements.`,
    primaryKeyword: `${c.name.toLowerCase()} healthcare for immigrants ${YEAR}`,
    tags: ["country guide", c.slug, "healthcare", "immigrant health"],
  }),
  (c) => ({
    slug: `${c.slug}-job-market-for-foreigners-${YEAR}`,
    title: `${c.name} Job Market for Foreigners ${YEAR}: In-Demand Skills`,
    metaDescription: `Which jobs are in high demand for foreigners in ${c.name} in ${YEAR}? Top industries, hiring process, and how to find a job as an immigrant.`,
    primaryKeyword: `${c.name.toLowerCase()} job market for foreigners ${YEAR}`,
    tags: ["country guide", c.slug, "job market", "employment abroad"],
  }),
  (c) => ({
    slug: `${c.slug}-language-requirements-for-visa-${YEAR}`,
    title: `${c.name} Language Requirements for Visa and PR ${YEAR}`,
    metaDescription: `What language tests are required for ${c.name} visas and PR in ${YEAR}? IELTS, CELPIP, Goethe, DELF — accepted tests and minimum scores.`,
    primaryKeyword: `${c.name.toLowerCase()} language requirements visa ${YEAR}`,
    tags: ["country guide", c.slug, "language test", "ielts requirement"],
  }),
];

const categoryMap = {
  study: { patterns: studyPatterns, category: "Study Visa Guides" },
  work: { patterns: workPatterns, category: "Work Visa Guides" },
  tourist: { patterns: touristPatterns, category: "Tourist Visa Guides" },
  immigration: { patterns: immigrationPatterns, category: "Immigration Guides" },
  country: { patterns: countryGuidePatterns, category: "Country-Specific Guides" },
};

function simpleHash(str) {
  let hash = 0;
  for (const char of str) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0;
  }
  return Math.abs(hash);
}

const manifest = [];
const baseDate = new Date("2026-01-01");

for (const [visaType, { patterns, category }] of Object.entries(categoryMap)) {
  let count = 0;
  for (let pi = 0; pi < patterns.length && count < 100; pi++) {
    for (let ci = 0; ci < COUNTRIES.length && count < 100; ci++) {
      const country = COUNTRIES[ci];
      const data = patterns[pi](country);
      const hash = simpleHash(data.slug);
      const publishedAt = new Date(baseDate.getTime() + (hash % 90) * 86400000)
        .toISOString()
        .split("T")[0];
      manifest.push({
        ...data,
        category,
        visaType,
        country: country.slug,
        countryName: country.name,
        publishedAt,
        readingTimeMinutes: 6 + (hash % 6),
      });
      count++;
    }
  }
}

const outputPath = join(__dirname, "../data/article-manifest.json");
writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
console.log(`Generated ${manifest.length} articles → data/article-manifest.json`);
