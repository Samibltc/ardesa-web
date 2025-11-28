"use client";
import React from "react";

type Variant = "footer" | "contact";

interface SocialLinksProps { variant?: Variant; className?: string; }

// Brand colors chosen to respect spec while keeping consistent style.
// X: #000000, Instagram: #E1306C, LinkedIn: #0A66C2
const socials = [
  {
    key: "x",
    label: "X",
    href: "https://x.com/ardesasoftware",
    bg: "#000000",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.5 3h3.3l-7.2 8.2 8.5 9.8H16l-5.4-6.4L4.8 21H1.5l7.7-8.8L.9 3h5.7l4.9 5.9L17.5 3Z" />
      </svg>
    ),
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/adresasoftware/",
    bg: "#E1306C",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ardesa-software/",
    bg: "#0A66C2",
    icon: (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9h3v10H6z" />
        <circle cx="7.5" cy="6" r="1.5" />
        <path d="M11 9h3v1.5a3 3 0 0 1 5 2.5V19h-3v-6a2 2 0 0 0-4 0v6h-3z" />
      </svg>
    ),
  },
];

export function SocialLinks({ variant = "footer", className = "" }: SocialLinksProps) {
  return (
    <div className={className}>
      <div className={`text-center ${variant === "contact" ? "md:text-left" : ""} mb-4`}>
        <div className="text-[15px] font-medium tracking-wide text-[#94A3B8]"></div>
      </div>
      <div className="flex flex-wrap justify-center md:justify-start gap-3">
        {socials.map((s) => (
          <a
            key={s.key}
            href={s.href}
            aria-label={s.label}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center rounded-full w-10 h-10 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-transform duration-200"
            style={{ backgroundColor: s.bg, boxShadow: "0 0 0 1px rgba(255,255,255,0.08)" }}
          >
            <div className="text-white group-hover:scale-110 transition-transform">
              {s.icon}
            </div>
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-80 group-hover:bottom-1 transition-all text-white/80">
              {s.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default SocialLinks;