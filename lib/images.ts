/**
 * Centralized image system for VisaProcessInfo
 *
 * All images sourced from Unsplash (free CDN, no API key required).
 * Photo IDs are curated per country/region/visa-type.
 *
 * Quality upgraded to q=85 (was q=75) for HD visual presentation.
 * crop=entropy auto-selects the most visually interesting crop area.
 */

// ── Country-specific photo IDs ────────────────────────────────────────────────

const COUNTRY_PHOTO_IDS: Record<string, string> = {
  // North America
  "usa":             "1485738422979-f5c462b37559", // New York City skyline
  "canada":          "1550353175-a3611868086b",    // Canadian Rocky Mountains
  "mexico":          "1518638150340-f706e86654de", // Mexico City / colonial

  // Europe
  "uk":              "1513635269975-59663e0ac1ad", // London Bridge / Thames
  "germany":         "1467912218720-b79bca5b65dc", // German cathedral
  "france":          "1502602822961-347406341c0f", // Eiffel Tower, Paris
  "netherlands":     "1512470876302-7a506e7e3d65", // Amsterdam canals
  "switzerland":     "1527668752968-14dc70a27c95", // Swiss Alps / mountain lake
  "italy":           "1529260830199-42c24126f198", // Amalfi coast
  "spain":           "1543783207-ec64e4d4f158",    // Barcelona / Sagrada Familia
  "portugal":        "1513735492246-483525079686", // Lisbon streets
  "ireland":         "1555990793-da11153b9d0d",    // Irish green countryside
  "sweden":          "1504829906886-7d4fce15e2dc", // Swedish nature / Stockholm
  "norway":          "1513506003901-1e6a35086659", // Norwegian fjord
  "austria":         "1506905925346-21bda4d32df4", // Austrian Alps / Vienna
  "denmark":         "1524673360337-be3d56f7b421", // Copenhagen
  "finland":         "1529347796977-5f03de20db2c", // Finnish aurora borealis
  "belgium":         "1467189386127-c4e5e31ee213", // Brussels / Grand Place
  "poland":          "1541905693-f3e9d8e78463",    // Warsaw / Krakow
  "czech-republic":  "1519677100203-a0e668c92439", // Prague old town
  "hungary":         "1549572987-a3ede6da4f4a",    // Budapest Parliament
  "romania":         "1611621440736-1bb71c40b2c0", // Romanian castle
  "greece":          "1603565816030-6b389eeb23cb", // Santorini blue domes
  "turkey":          "1524231757912-21f4fe3a7200", // Istanbul Blue Mosque
  "russia":          "1547526932-7ee0e7d48c81",    // Moscow / Red Square
  "ukraine":         "1558618666-fcd25c85cd64",    // Kyiv city

  // Asia Pacific
  "japan":           "1540959733332-eab4deabeeaf", // Tokyo cityscape at dusk
  "south-korea":     "1538669715315-155ec38a86b2", // Seoul skyline
  "china":           "1508804552017-b21f7ca07f44", // Chinese landscape / Great Wall
  "singapore":       "1525625293386-3f8f99389edd", // Singapore Marina Bay Sands
  "australia":       "1523482580672-f109ba8cb9be", // Sydney Opera House
  "new-zealand":     "1507699522086-f46b42a69a68", // New Zealand fiordland
  "indonesia":       "1518548419970-58e3b4079ab2", // Bali rice terraces / temple
  "malaysia":        "1596422846543-3b0e85f1df2f", // KL Petronas Towers
  "philippines":     "1518509562399-e587c6ea8d8c", // Philippine islands
  "vietnam":         "1583417319070-4a2db29c0ae9", // Ha Long Bay, Vietnam
  "thailand":        "1552465011-b4e21bf6e79a",    // Thai temple / landscape
  "cambodia":        "1528360983277-13d401cdc186", // Angkor Wat
  "myanmar":         "1542382257-80dedb977ebb",    // Bagan temples, Myanmar

  // South Asia
  "india":           "1524492412937-b28074a5d7da", // Taj Mahal, Agra
  "nepal":           "1516912481800-0f10ec08a13d", // Himalayas / Nepal
  "sri-lanka":       "1518002054494-3a6f94352e9d", // Sri Lanka landscape
  "bangladesh":      "1612428440393-1e3a96f23a55", // Dhaka cityscape
  "pakistan":        "1548013965-e67a5bc1b494",    // Lahore / Pakistan

  // Middle East
  "uae":             "1512453979798-5ea266f8880c", // Dubai skyline at night
  "saudi-arabia":    "1503854628028-91f91e0c77be", // Riyadh skyline
  "qatar":           "1567696911688-4e3a1f1d07a2", // Doha skyline
  "kuwait":          "1621190285323-18babc30d6f1", // Kuwait City towers
  "bahrain":         "1608836994609-eb19a3b42c97", // Manama, Bahrain
  "israel":          "1547036967-23d11aacaee0",    // Jerusalem old city
  "jordan":          "1530092376999-edf2a4b32c3b", // Petra, Jordan

  // Africa
  "south-africa":    "1516026672322-218a24c0c1e0", // Cape Town / Table Mountain
  "kenya":           "1551632436-cbf8dd35adfa",    // Kenyan savannah / safari
  "egypt":           "1539768942851-b78879ea9ad1", // Pyramids of Giza
  "morocco":         "1536086946659-a58cfbac85da", // Moroccan medina / riad
  "nigeria":         "1580746738099-8eda7b90b4d0", // Lagos / Nigeria skyline
  "ethiopia":        "1605106901227-991b55b6c40f", // Ethiopian landscape
  "ghana":           "1553708881-112a574d0088",    // Ghana / West Africa
  "tanzania":        "1589308454014-7e83d0e83e38", // Kilimanjaro / Tanzania

  // Americas
  "brazil":          "1483729558449-99ef09a8c88a", // Rio / Christ the Redeemer
  "argentina":       "1501854140801-50d01698950b", // Buenos Aires / Patagonia
  "chile":           "1489824904134-12cb2a16f70f", // Chilean Torres del Paine
  "colombia":        "1557511637-7e9fb9bd617a",    // Cartagena, Colombia
  "peru":            "1526778548025-fa2f459cd5ce", // Machu Picchu
};

// ── Region-based fallback photo IDs ──────────────────────────────────────────

const REGION_PHOTO_IDS: Record<string, string> = {
  "North America":   "1485738422979-f5c462b37559",
  "Europe":          "1467912218720-b79bca5b65dc",
  "Asia":            "1540959733332-eab4deabeeaf",
  "South Asia":      "1524492412937-b28074a5d7da",
  "Southeast Asia":  "1552465011-b4e21bf6e79a",
  "Middle East":     "1512453979798-5ea266f8880c",
  "Africa":          "1516026672322-218a24c0c1e0",
  "South America":   "1483729558449-99ef09a8c88a",
  "Central America": "1518638150340-f706e86654de",
  "Oceania":         "1523482580672-f109ba8cb9be",
  "Pacific":         "1507699522086-f46b42a69a68",
  "Caribbean":       "1544551741-f6bb42df6261",
  "Eastern Europe":  "1519677100203-a0e668c92439",
};

// ── Default fallback ─────────────────────────────────────────────────────────

const DEFAULT_PHOTO_ID = "1476514525405-8329922b25f5"; // airplane window / travel

// ── Visa-type themed images ───────────────────────────────────────────────────

const VISA_TYPE_PHOTO_IDS: Record<string, string> = {
  study:       "1523240795612-9a054b0db644", // student in university library
  work:        "1521737604893-d14cc237f11d", // professional in modern office
  business:    "1507679799987-c73779587ccf", // business meeting / handshake
  visit:       "1476514525405-8329922b25f5", // airplane window / travel
  tourist:     "1476514525405-8329922b25f5", // travel / tourism
  immigration: "1436491865332-7a369c3f4d69", // passport and travel documents
};

// ── Process / how-to page images ─────────────────────────────────────────────

const PROCESS_PHOTO_IDS: Record<string, string> = {
  "study-visa":      "1523240795612-9a054b0db644", // student studying
  "work-visa":       "1521737604893-d14cc237f11d", // office professional
  "work-permit":     "1521737604893-d14cc237f11d", // office professional
  "tourist-visa":    "1476514525405-8329922b25f5", // airplane / travel
  "business-visa":   "1507679799987-c73779587ccf", // business meeting
  "pr-immigration":  "1436491865332-7a369c3f4d69", // passport documents
  "interview":       "1560439513-74ec6e8de27a",    // visa interview
  "appeal":          "1589829545856-d10d557cf95f", // formal document / legal
  "rejection":       "1589829545856-d10d557cf95f", // formal document
  "biometrics":      "1555952517-2e8e729e0959",    // fingerprint / identity
  "embassy":         "1541339907198-e08756dedf3f", // embassy / govt building
  "immigration":     "1436491865332-7a369c3f4d69", // passport & documents
  "default":         "1436491865332-7a369c3f4d69", // passport & documents
};

// ── Core builder ─────────────────────────────────────────────────────────────

/**
 * Build Unsplash CDN URL with HD quality.
 * q=85 (crisp HD); fm=webp (smaller file, sharper rendering); crop=entropy auto-selects
 * the most visually interesting region for better focal composition.
 */
function buildUrl(photoId: string, width = 1200, height = 630): string {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&h=${height}&auto=format&fm=webp&q=85&fit=crop&crop=entropy&cs=tinysrgb`;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Return the best Unsplash image URL for a country slug.
 * Falls back: country → region → default travel image.
 */
export function getCountryImageUrl(slug: string, region: string, width = 1200, height = 630): string {
  const id = COUNTRY_PHOTO_IDS[slug] ?? REGION_PHOTO_IDS[region] ?? DEFAULT_PHOTO_ID;
  return buildUrl(id, width, height);
}

/**
 * Return a themed image for a given visa type.
 */
export function getVisaTypeImageUrl(visaType: string, width = 1200, height = 630): string {
  const id = VISA_TYPE_PHOTO_IDS[visaType] ?? DEFAULT_PHOTO_ID;
  return buildUrl(id, width, height);
}

/**
 * Return a process-page hero image based on topic key.
 * Accepts strings like "study-visa-application", "embassy-interview-guide", etc.
 */
export function getProcessImageUrl(topic: string, width = 1200, height = 630): string {
  for (const [key, id] of Object.entries(PROCESS_PHOTO_IDS)) {
    if (topic.includes(key)) return buildUrl(id, width, height);
  }
  return buildUrl(PROCESS_PHOTO_IDS.default, width, height);
}

/**
 * Return a thumbnail-sized country image (for cards / lists).
 */
export function getCountryThumbnailUrl(slug: string, region: string): string {
  return getCountryImageUrl(slug, region, 640, 400);
}

/**
 * Return a thumbnail-sized visa-type image.
 */
export function getVisaTypeThumbnailUrl(visaType: string): string {
  return getVisaTypeImageUrl(visaType, 640, 400);
}
