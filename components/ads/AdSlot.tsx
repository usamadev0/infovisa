"use client";

interface AdSlotProps {
  slot: "banner" | "in-content" | "sidebar";
  className?: string;
}

/**
 * AdSense-ready slot. To activate:
 * 1. Add <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" /> to app/layout.tsx <head>.
 * 2. Replace data-ad-client and data-ad-slot below with your publisher/slot IDs.
 * 3. Uncomment the <ins> element.
 */
export default function AdSlot({ slot, className = "" }: AdSlotProps) {
  const dimensions: Record<AdSlotProps["slot"], string> = {
    banner: "min-h-[90px] w-full",
    "in-content": "min-h-[250px] w-full",
    sidebar: "min-h-[600px] w-full",
  };

  return (
    <div
      className={`bg-gray-100 border border-dashed border-gray-300 rounded flex items-center justify-center text-xs text-gray-400 ${dimensions[slot]} ${className}`}
      data-ad-slot={slot}
      aria-label="Advertisement"
    >
      {/* Advertisement placeholder — replace with AdSense <ins> tag */}
      <span>Advertisement</span>
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
    </div>
  );
}
