"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flag, BadgeCheck, ShieldCheck, Wallet, BrainCircuit, TicketPercent } from "lucide-react";

interface Reason {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const reasons: Reason[] = [
  { key: "yerli", title: "%100 Yerli & Türk", desc: "İstanbul merkezli ekip, 7/24 Türkçe destek.", icon: <Flag className="h-11 w-11" /> },
  { key: "tecrube", title: "15+ Yıl Tecrübe", desc: "300+ kurumsal proje, %98 memnuniyet.", icon: <BadgeCheck className="h-11 w-11" /> },
  { key: "garanti", title: "90 Gün Canlı Garantisi", desc: "Geçmezsek ücret iade + sınırsız revizyon.", icon: <ShieldCheck className="h-11 w-11" /> },
  { key: "fiyat", title: "Sabit Fiyat Modeli", desc: "Sürpriz yok, teklif neyse o.", icon: <Wallet className="h-11 w-11" /> },
  { key: "aierp", title: "AI + ERP Tek Pakette", desc: "Hem ERP hem yapay zeka aynı platformda.", icon: <BrainCircuit className="h-11 w-11" /> },
  { key: "indirim", title: "İlk 10 Müşteriye %30 İndirim", desc: "2025 lansman kampanyası (sınırlı).", icon: <TicketPercent className="h-11 w-11" /> },
];

export default function WhyUs() {
  const [active, setActive] = useState<string | null>(null);
  const toggle = (key: string) => setActive((a) => (a === key ? null : key));

  return (
    <div className="relative py-10 md:py-14 rounded-3xl" style={{
      background: "linear-gradient(135deg,#f8faff 0%,#f0f4ff 100%)",
    }}>
      <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
        Neden şirketler Ardesa'yı tercih ediyor?
      </h2>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((r) => {
          const isActive = active === r.key;
          return (
            <motion.button
              key={r.key}
              onClick={() => toggle(r.key)}
              whileHover={{ scale: 1.05 }}
              animate={{ scale: isActive ? 1.07 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="group relative isolate w-full aspect-square rounded-3xl shadow-md overflow-hidden focus:outline-none focus:ring-4 focus:ring-cyan-300"
              style={{
                background: isActive
                  ? "linear-gradient(140deg,rgba(203,213,225,0.65),rgba(226,232,240,0.85))"
                  : "linear-gradient(140deg,rgba(255,255,255,0.85),rgba(248,250,255,0.9))",
              }}
              aria-expanded={isActive}
              aria-label={r.title}
            >
              <div className="absolute inset-0 rounded-3xl p-[2px]" style={{
                background: "linear-gradient(120deg,#06b6d4,#8b5cf6 55%,#06b6d4)",
                boxShadow: isActive
                  ? "0 0 0 3px rgba(34,211,238,0.45),0 12px 32px -8px rgba(8,145,178,0.35)"
                  : "0 0 0 1px rgba(139,92,246,0.25),0 8px 28px -10px rgba(8,145,178,0.25)",
              }} />
              <div className="relative z-10 flex flex-col items-center justify-center h-full w-full rounded-[calc(1.5rem-2px)] text-center px-6">
                <motion.div
                  layout
                  className="flex flex-col items-center"
                >
                  <div className="text-cyan-600 group-hover:text-cyan-500 transition-colors drop-shadow-sm">
                    {r.icon}
                  </div>
                  <span className="mt-4 font-bold text-gray-800 text-xl leading-snug">
                    {r.title}
                  </span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        key="desc"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="mt-4 text-sm text-gray-600 max-w-[15ch] mx-auto leading-relaxed"
                      >
                        {r.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </div>
      
    </div>
  );
}
