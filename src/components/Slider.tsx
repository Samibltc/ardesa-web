"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export type Slide = {
  title: string;
  text: string;
  image?: string; // public yol (opsiyonel)
};

export default function Slider({ slides, interval = 7000 }: { slides: Slide[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const timerRef = useRef<number | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    const id = window.setInterval(() => { if (!hover) setIndex((i) => (i + 1) % slides.length); }, interval);
    timerRef.current = id;
    return () => { if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; } };
  }, [slides.length, interval, hover]);

  useEffect(() => {
    if (!progressRef.current) return;
    progressRef.current.style.transition = "none";
    progressRef.current.style.width = "0%";
    void progressRef.current.offsetWidth;
    progressRef.current.style.transition = `width ${interval}ms linear`;
    progressRef.current.style.width = hover ? "0%" : "100%";
  }, [index, interval, hover]);

  const go = (i: number) => setIndex((i + slides.length) % slides.length);

  const current = slides[index];
  const renderCTAs = () => {
    // Configure per-slide CTAs by index
    switch (index) {
      case 0:
        return (
          <div className="mt-10 flex flex-wrap gap-6">
            <a href="#services" className="group relative inline-flex items-center justify-center rounded-xl bg-cyan-400 text-[#0a0014] font-semibold px-7 py-4 text-sm shadow-[0_0_0_1px_rgba(34,211,238,0.4),0_8px_32px_-6px_rgba(34,211,238,0.35)] hover:shadow-[0_0_0_1px_rgba(34,211,238,0.6),0_8px_40px_-4px_rgba(34,211,238,0.6)] transition">
              <span className="relative">Çözümlerimizi İncele</span>
            </a>
            <a href="#contact" className="group relative inline-flex items-center justify-center rounded-xl border border-cyan-300/40 text-cyan-200 font-semibold px-7 py-4 text-sm backdrop-blur hover:bg-cyan-300/10 transition">
              <span className="relative group-hover:text-white">İletişime Geç</span>
            </a>
          </div>
        );
      case 1:
        return (
          <div className="mt-10 flex flex-wrap gap-6">
            <a href="#contact" className="group relative inline-flex items-center justify-center rounded-xl bg-cyan-400 text-[#0a0014] font-semibold px-7 py-4 text-sm shadow-[0_0_0_1px_rgba(34,211,238,0.4),0_8px_32px_-6px_rgba(34,211,238,0.35)] hover:shadow-[0_0_0_1px_rgba(34,211,238,0.6),0_8px_40px_-4px_rgba(34,211,238,0.6)] transition">
              <span className="relative">Projeni Başlat</span>
            </a>
          </div>
        );
      case 2:
        return (
          <div className="mt-10 flex flex-wrap gap-6">
            <a href="#contact" className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 via-cyan-500 to-cyan-300 text-white font-semibold px-7 py-4 text-sm shadow-[0_0_0_1px_rgba(168,85,247,0.5),0_8px_32px_-6px_rgba(56,189,248,0.4)] hover:shadow-[0_0_0_1px_rgba(168,85,247,0.7),0_8px_40px_-4px_rgba(56,189,248,0.55)] transition">
              <span className="relative">Teklif Al</span>
            </a>
          </div>
        );
      case 3:
        return (
          <div className="mt-10 flex flex-wrap gap-6">
            <a href="#contact" className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 via-fuchsia-500 to-cyan-400 text-white font-semibold px-7 py-4 text-sm shadow-[0_0_0_1px_rgba(239,68,68,0.5),0_8px_32px_-6px_rgba(34,211,238,0.45)] hover:shadow-[0_0_0_1px_rgba(239,68,68,0.7),0_8px_40px_-4px_rgba(34,211,238,0.7)] transition">
              <span className="relative">Kontenjanı Kap</span>
            </a>
            <span className="inline-flex items-center rounded-full bg-red-600/90 backdrop-blur px-5 py-2 text-xs font-semibold text-white shadow-[0_0_0_1px_rgba(239,68,68,0.6),0_4px_18px_-2px_rgba(239,68,68,0.5)]">Sadece 7 kontenjan kaldı</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rootRef.current) return;
    const bounds = rootRef.current.getBoundingClientRect();
    setMouseX(e.clientX - bounds.left);
  };

  return (
    <div
      ref={rootRef}
      className="relative w-full h-screen select-none"
      aria-live="polite"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full h-full bg-[#0a0014]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {current.image ? (
              <Image src={current.image} alt={current.title} fill priority className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20" />
            )}
            <div className="absolute inset-0 bg-[#0a0014]/70" />
            <div className="absolute inset-0 flex">
              <div className="flex items-center justify-center w-full px-6 md:px-16 xl:px-24">
                <div className="max-w-[1200px] text-center" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.6)" }}>
                  <h1 className="font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 [font-size:clamp(2.2rem,6.5vw,5rem)] leading-tight mx-auto">
                    {(() => {
                      const parts = current.title.split("otomatikleştirin");
                      return (
                        <>
                          {parts[0]}
                          {parts.length > 1 && <span className="whitespace-nowrap">otomatikleştirin</span>}
                          {parts.slice(1).join("otomatikleştirin")}
                        </>
                      );
                    })()}
                  </h1>
                  <p className="mt-6 mx-auto text-gray-300 max-w-3xl leading-relaxed text-[clamp(1rem,2.6vw,1.4rem)]">{current.text}</p>
                  <div className="flex justify-center">{renderCTAs()}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-3/5 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500" style={{ width: 0, boxShadow: "0 0 12px 2px rgba(34,211,238,0.5)" }} />
        </div>
      </div>

      {/* Dots removed in favor of progress bar */}

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          {/* Premium Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ x: Math.min(40, Math.max(0, 120 - (mouseX || 0) * 0.4)) }}
            onClick={() => go(index - 1)}
            aria-label="Önceki"
            className="group absolute top-1/2 -translate-y-1/2 left-4 md:left-8 h-16 w-16 md:h-20 md:w-20 rounded-full bg-black/30 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_8px_32px_-6px_rgba(0,0,0,0.6)] transition"
          >
            <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-cyan-300 to-purple-400 group-hover:from-cyan-300 group-hover:to-purple-400">&#x2039;</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ x: -Math.min(40, Math.max(0,  (rootRef.current?.clientWidth || 0) - (mouseX || 0) - 120 )) }}
            onClick={() => go(index + 1)}
            aria-label="Sonraki"
            className="group absolute top-1/2 -translate-y-1/2 right-4 md:right-8 h-16 w-16 md:h-20 md:w-20 rounded-full bg-black/30 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center shadow-[0_0_0_1px_rgba(34,211,238,0.3),0_8px_32px_-6px_rgba(0,0,0,0.6)] transition"
          >
            <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-cyan-300 to-purple-400 group-hover:from-cyan-300 group-hover:to-purple-400">&#x203A;</span>
          </motion.button>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-10 flex gap-3">
            {slides.map((_, iDot) => (
              <button
                key={iDot}
                onClick={() => setIndex(iDot)}
                aria-label={`Slide ${iDot + 1}`}
                className={`h-3 w-3 rounded-full transition-all ${
                  iDot === index ? 'bg-cyan-400 shadow-[0_0_0_4px_rgba(34,211,238,0.25)] scale-110' : 'bg-cyan-700/30 hover:bg-cyan-500/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
