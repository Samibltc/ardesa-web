"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import WhyUs from "../components/WhyUs";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";
import dynamic from "next/dynamic";
const ServicesShowcase = dynamic(() => import("../components/ServicesShowcase"), { ssr: false });
const Lotus = dynamic(() => import("../components/Lotus"), { ssr: false });

const Slider = dynamic(() => import("../components/Slider"), { ssr: false });

type Section = {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
};

function useSectionScroll(total: number) {
  const [index, setIndex] = useState(0);

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(total - 1, next));
    const el = document.querySelector(`[data-index='${clamped}']`);
    (el as HTMLElement | null)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-index]"));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target) {
          const i = Number((visible.target as HTMLElement).dataset.index);
          setIndex(i);
        }
      },
      { threshold: [0.4, 0.6, 0.8] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") go(index + 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total]);

  // Mouse wheel ile tek bölüm atla (throttle)
  useEffect(() => {
    let last = 0;
    const onWheel = (e: WheelEvent) => {
      const now = performance.now();
      if (now - last < 700) return;
      const dy = e.deltaY;
      if (Math.abs(dy) < 10) return;
      last = now;
      e.preventDefault();
      go(index + (dy > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel as any);
  }, [index, total]);

  return { index, setIndex, go };
}

export default function Home() {
  const sections: Section[] = useMemo(
    () => [
      {
        id: "slider",
        title: "",
        content: (
          <Slider
            slides={[
              {
                title: "Türkiye’nin en hızlı büyüyen yerli ERP platformu",
                text: "10.000+ kullanıcı, %100 bulut, yapay zeka destekli stok & finans tahminleri",
                image: "/carousel/erp.jpg",
              },
              {
                title: "React + .NET Core ile geleceğe hazır uygulamalar",
                text: "Modern frontend, kurumsal backend. 15+ yıllık .NET tecrübesiyle sıfırdan özel projeler",
                image: "/carousel/ReactNETfloatingdevices.png",
              },
              {
                title: "İş süreçlerinizi yapay zeka ile otomatikleştirin",
                text: "Fatura okuma, talep tahminleme, akıllı raporlama, chatbot asistan… Hepsi tek platformda",
                image: "/carousel/aiturkiye.png",
              },
              {
                title: "2025’te rakipleriniz yapay zekaya geçecek. Siz de geçin.",
                text: "İlk 10 yeni müşteri için %30 lansman indirimi (sınırlı kontenjan)",
                image: "/carousel/last10.png",
              },
            ]}
          />
        ),
      },
      {
        id: "services",
        title: "Çözümlerimiz",
        content: <ServicesShowcase />,
      },
      {
        id: "about",
        title: "Hakkımızda",
        content: (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-600 text-sm leading-7">
                2019 yılında, yazılımın ve yapay zekanın gücüne olan sarsılmaz inancımızla bir yolculuğa çıktık. Ardesa Software olarak, o günden bu yana, işletmelerin karmaşık sorunlarına sadece teknik değil, aynı zamanda insan odaklı, güçlü çözümler sunmayı misyon edindik. Temel uzmanlık alanımız, son teknoloji Yazılım Geliştirme ve Yapay Zeka (AI) Çözümleri etrafında şekilleniyor. Verimlilik ve karar alma süreçlerini optimize eden, öğrenen ve adapte olan yapay zeka modelleri geliştiriyor; ihtiyaçlarınıza tam olarak uyan, ölçeklenebilir ve sağlam kurumsal yazılımlarla iş süreçlerinizi dijitalleştiriyoruz. Sadece trendleri takip etmekle kalmıyor, aynı zamanda geleceğin teknolojilerini bugünden inşa ederek müşterilerimize rekabet avantajı sağlıyoruz.
              </p>
              <p className="mt-3 text-slate-600 text-sm leading-7">
                Ekibimiz; full-stack geliştirme, bulut altyapıları ve AI entegrasyonlarında deneyimli mühendislerden oluşur.
              </p>
            </div>
            <Lotus />
          </div>
        ),
      },
      {
        id: "why-us",
        title: "",
        content: (
          <div className="py-4">
            {/* Yeni premium WhyUs bileşeni */}
            <WhyUs />
          </div>
        ),
      },
      {
        id: "contact",
        title: "İletişim",
        subtitle: "Projeleriniz için bizimle iletişime geçin. Size en kısa sürede geri dönüş yapalım.",
        content: (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol kolon: İletişim Bilgileri + Çalışma Saatleri */}
            <div className="space-y-6">
              <div className="card-surface">
                <h3 className="text-base font-semibold">İletişim Bilgileri</h3>
                <div className="mt-4 space-y-4">
                  {/* E-posta */}
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-200">
                      {/* Envelope icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className="h-5 w-5 text-blue-600">
                        <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
                        <path d="M3 8l8.27 5.18a2 2 0 0 0 2.06 0L21 8" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-sm font-medium">E-posta</div>
                      <div className="text-sm text-slate-600">contact@ardesa.info</div>
                    </div>
                  </div>
                  {/* Telefon */}
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-200">
                      {/* Phone icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className="h-5 w-5 text-blue-600">
                        <path d="M3 5c0-.55.45-1 1-1h3c.47 0 .88.33.98.79l.7 3.16c.08.35-.03.73-.3.98l-1.5 1.46a12.5 12.5 0 0 0 5.73 5.73l1.46-1.5c.25-.27.63-.38.98-.3l3.16.7c.46.1.79.51.79.98v3c0 .55-.45 1-1 1h-1C9.16 20 4 14.84 4 8V7c0-.55.45-1 1-1Z" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-sm font-medium">Telefon</div>
                      <div className="text-sm text-slate-600">+90 (538) 424 73 69</div>
                    </div>
                  </div>
                  {/* Adres */}
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-200">
                      {/* Map pin icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className="h-5 w-5 text-blue-600">
                        <path d="M12 22s7-5.33 7-12A7 7 0 1 0 5 10c0 6.67 7 12 7 12Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-sm font-medium">Adres</div>
                      <div className="text-sm text-slate-600">İstanbul, Türkiye</div>
                    </div>
                  </div>
                  {/* Sosyal Bağlantılar yeni tasarım */}
                  <div className="mt-2">
                    <SocialLinks variant="contact" />
                  </div>
                </div>
              </div>

              <div className="card-surface">
                <h3 className="text-base font-semibold">Çalışma Saatleri</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <div><span className="font-medium">Pazartesi - Cuma:</span> 09:00 - 18:00</div>
                  <div><span className="font-medium">Cumartesi:</span> 10:00 - 15:00</div>
                  <div><span className="font-medium">Pazar:</span> Kapalı</div>
                </div>
              </div>
            </div>

            {/* Sağ kolon: Form */}
            <div className="card-surface">
              <h3 className="text-base font-semibold">Bize Ulaşın</h3>
              <ContactForm />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const { index, setIndex, go } = useSectionScroll(sections.length);

  // Arkaplan renk paleti (her bölüm için farklı ton)
  const bgPalette = [
    "#f0f9ff", // Slider - sky50
    "#eff6ff", // Çözümler - blue50
    "#f5f3ff", // Hakkımızda - violet50
    "#f0fdf4", // Neden Biz - green50
    "#fefce8", // İletişim - yellow50
  ];

  return (
    <div className="relative">
      {/* Arkaplan renk geçişi */}
      <motion.div
        key={index}
        className="fixed inset-0 -z-10"
        initial={{ backgroundColor: bgPalette[index] }}
        animate={{ backgroundColor: bgPalette[index] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Sağdaki dikey indicatorlar kaldırıldı */}

      <div id="sections-container" className="snap-y snap-mandatory">{/* Belge kaydırması ile bölüm bölüm ilerleme */}
        {sections.map((s, i) => {
          const isSlider = s.id === "slider";
          return (
            <section
              id={s.id}
              data-index={i}
              key={s.id}
              className={isSlider ? "snap-start min-h-screen" : "snap-start min-h-screen flex items-center"}
            >
              {isSlider ? (
                <div className="w-full h-full">{s.content}</div>
              ) : (
                <div className="mx-auto max-w-6xl px-4 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {s.title && <h2 className="section-heading">{s.title}</h2>}
                    {s.subtitle && <p className="mt-2 text-slate-600">{s.subtitle}</p>}
                    <div className="mt-8">{s.content}</div>
                  </motion.div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
