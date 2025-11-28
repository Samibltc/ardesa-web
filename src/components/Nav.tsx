"use client";
import { useCallback, useState } from "react";
import Image from "next/image";

export default function Nav() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10">
          <Image src="/logo-svg.png" alt="Ardesa Software" fill priority className="object-contain" />
        </div>
        <span className="text-sm font-semibold tracking-wide text-white hidden md:inline">Ardesa Software</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm">
        {[
          { id: "services", label: "Çözümler" },
          { id: "about", label: "Hakkımızda" },
          { id: "why-us", label: "Neden Biz?" },
          { id: "contact", label: "İletişim" },
        ].map((l) => (
          <button
            key={l.id}
            onClick={() => scrollTo(l.id)}
            className="relative text-cyan-100/80 hover:text-white transition-colors group"
          >
            <span className="inline-block group-hover:scale-[1.06] transition-transform">
              {l.label}
            </span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-8 bg-cyan-400/70 transition-all" />
          </button>
        ))}
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-cyan-400/30 bg-white/5 backdrop-blur text-cyan-100"
        aria-label="Menüyü Aç/Kapat"
      >
        {open ? (
          <span className="text-lg">×</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className="h-5 w-5">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full px-6 pb-6 pt-2 bg-[#0a0014]/85 backdrop-blur-xl border-b border-cyan-400/10 md:hidden space-y-2 rounded-b-2xl">
          {[
            { id: "services", label: "Çözümler" },
            { id: "about", label: "Hakkımızda" },
            { id: "why-us", label: "Neden Biz?" },
            { id: "contact", label: "İletişim" },
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => { scrollTo(l.id); setOpen(false); }}
              className="w-full text-left rounded-lg px-4 py-3 text-cyan-100 hover:bg-cyan-400/10 active:bg-cyan-400/20 transition"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
