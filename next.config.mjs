/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  trailingSlash: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Prefer AVIF (smallest), fallback to WebP — both are modern lossless-equivalent formats
    formats: ["image/avif", "image/webp"],
    // Responsive breakpoints matching common device widths
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache TTL (1 week) for CDN-sourced images
    minimumCacheTTL: 604800,
    // Allow SVG (for flag CDN fallbacks)
    dangerouslyAllowSVG: false,
  },

  // Enable HTTP compression (gzip/brotli)
  compress: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  // Additional headers for security + performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
