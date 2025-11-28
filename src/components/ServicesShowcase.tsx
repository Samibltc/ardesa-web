"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

import { ReactNode } from "react";
interface ServiceCard {
  key: string;
  title: string;
  desc: string;
  bullets: string[];
  icon: ReactNode;
  long: string[]; // ekstra içerik (detay maddeler)
}

export default function ServicesShowcase() {
  const services = useMemo<ServiceCard[]>(
    () => [
      {
        key: "web",
        title: "Web Uygulamaları",
        desc: "Modern, responsive ve kullanıcı dostu çözümler.",
        bullets: ["E-ticaret", "Kurumsal", "Admin", "SaaS"],
        long: [
          "Performans odaklı Next.js mimarisi",
          "SEO ve erişilebilirlik optimizasyonu",
          "Role & permission bazlı güvenlik",
          "Ölçeklenebilir modüler yapı",
        ],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-5 w-5">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
          </svg>
        ),
      },
      {
        key: "mobile",
        title: "Mobil Uygulamalar",
        desc: "iOS & Android için native / cross-platform.",
        bullets: ["React Native", "Cross-platform", "UI/UX", "App Store"],
        long: [
          "Hızlı prototipleme ve MVP odaklı süreç",
          "App Store & Play Store yayın danışmanlığı",
          "Performans ve bellek optimizasyonları",
          "Push notification & derin link entegrasyonu",
        ],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-5 w-5">
            <rect x="7" y="2.5" width="10" height="19" rx="2" />
            <circle cx="12" cy="18.5" r=".9" fill="currentColor" />
          </svg>
        ),
      },
      {
        key: "ai",
        title: "AI & Machine Learning",
        desc: "Akıllı otomasyon ve entegrasyonlar.",
        bullets: ["Chatbot", "Görüntü", "Analiz", "Otomasyon"],
        long: [
          "LLM tabanlı metin işleme entegrasyonu",
          "Vektör arama / RAG mimarisi",
          "Model performans ölçümü & iyileştirme",
          "Veri pipeline ve temizleme süreçleri",
        ],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-5 w-5">
            <path d="M8 9a4 4 0 1 1 8 0v1h1.5A2.5 2.5 0 0 1 20 12.5V14a3 3 0 0 1-3 3h-1l-.5 1.5a2 2 0 0 1-1.9 1.5H10a2 2 0 0 1-1.9-1.3L7.6 17H7a3 3 0 0 1-3-3v-1.5A2.5 2.5 0 0 1 6.5 10H8V9Z" />
          </svg>
        ),
      },
      {
        key: "cloud",
        title: "Cloud Çözümleri",
        desc: "Güvenilir ve ölçeklenebilir altyapılar.",
        bullets: ["Migration", "DevOps", "Yönetim", "Backup"],
        long: [
          "IaC (Terraform/CDK) süreçleri",
          "Kubernetes & container orkestrasyonu",
          "Gözlemleme (logging, metrics, tracing)",
          "Otomatik ölçeklendirme & maliyet optimizasyonu",
        ],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-5 w-5">
            <path d="M7 18h9.5a4.5 4.5 0 0 0 .5-8.96A6 6 0 0 0 6 9.5 4.5 4.5 0 0 0 7 18Z" />
          </svg>
        ),
      },
      {
        key: "security",
        title: "Güvenlik & Danışmanlık",
        desc: "KVKK / GDPR uyumlu güvenli altyapı.",
        bullets: ["Test", "KVKK", "Kod", "Danışmanlık"],
        long: [
          "Penetrasyon testi hazırlığı & koordinasyonu",
          "Bağımlılık güvenlik taramaları",
            "Güvenlik başlıkları & sertifikalar (CSP/HSTS)",
          "Kod inceleme ve risk analizi",
        ],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-5 w-5">
            <path d="M12 3 5 6v6c0 4.97 3.05 9.34 7 10 3.95-.66 7-5.03 7-10V6l-7-3Z" />
            <path d="M9.5 12 11 13.5 14.5 10" />
          </svg>
        ),
      },
      {
        key: "bi",
        title: "Veri Analizi & BI",
        desc: "Verilerinizden karar destek sistemleri.",
        bullets: ["Dashboard", "Görselleştirme", "Raporlama", "Entegrasyon"],
        long: [
          "Özelleştirilebilir dashboard tasarımı",
          "Veri ETL ve dönüştürme",
          "Self-service raporlama altyapısı",
          "API & veri entegrasyon katmanı",
        ],
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" stroke="currentColor" className="h-5 w-5">
            <path d="M4 19V7M10 19V5M16 19v-8M22 19V9" />
          </svg>
        ),
      },
    ],
    []
  );

  const [active, setActive] = useState<string | null>(null);
  const activeData = services.find((s) => s.key === active) || null;

  return (
    <LayoutGroup>
      <div className="relative">
        <AnimatePresence mode="wait">
          {active && activeData ? (
            <motion.div
              key="spotlight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Sol mini kartlar */}
              <motion.div layout className="lg:col-span-4 space-y-4">
                {services.filter((s) => s.key !== active).map((s) => (
                  <motion.button
                    key={s.key}
                    layout
                    onClick={() => setActive(s.key)}
                    className="w-full flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-left hover:border-blue-300 transition"
                  >
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600 text-white">
                      {s.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-blue-800">{s.title}</div>
                      <div className="text-xs text-blue-700">{s.desc}</div>
                    </div>
                  </motion.button>
                ))}
                <button
                  onClick={() => setActive(null)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:border-slate-400 transition"
                >
                  ← Tüm Kartları Gör
                </button>
              </motion.div>

              {/* Aktif geniş kart */}
              <motion.div
                layout
                className="lg:col-span-8 rounded-2xl border bg-white shadow-sm border-blue-200 p-6 relative"
              >
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                    {activeData.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900">{activeData.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-6">{activeData.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeData.bullets.map((b) => (
                        <span key={b} className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs text-blue-700 font-medium">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {activeData.long.map((l) => (
                    <div key={l} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      {l}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <button
                    className="btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      const url = new URL(window.location.href);
                      url.searchParams.set("category", activeData.key as string);
                      url.hash = "contact";
                      history.pushState(null, "", url.toString());
                      const el = document.getElementById("contact");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Teklif Al
                  </button>
                  <button className="btn-outline" onClick={() => setActive(null)}>Kapat</button>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((c) => (
                <motion.button
                  layout
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className="card-surface text-left group hover:shadow-md hover:border-blue-200"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                    {c.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-6">{c.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.bullets.map((b) => (
                      <span key={b} className="px-2 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-medium text-blue-700">
                        {b}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
