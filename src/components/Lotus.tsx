"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// 5 yapraklı lotus bileşeni: her 5 saniyede aktif yaprak değişir, tıklayınca seçilir.
export default function Lotus() {
  const imgs = useMemo(() => [
    "/hakkimizda/1.png",
    "/hakkimizda/2.png",
    "/hakkimizda/3.png",
    "/hakkimizda/4.png",
    "/hakkimizda/5.png",
  ], []);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setActive(i => (i + 1) % imgs.length), 5000);
    return () => window.clearInterval(t);
  }, [imgs.length]);

  // Beşgen konum hesaplama (yüzde koordinatlar)
  const positions = useMemo(() => {
    const radius = 38; // merkezden uzaklık yüzde
    return imgs.map((_, i) => {
      const angleDeg = -90 + i * (360 / imgs.length); // ilk yaprak üstte
      const angle = angleDeg * Math.PI / 180;
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);
      return { left: `${x}%`, top: `${y}%` };
    });
  }, [imgs.length]);

  return (
    <div className="relative h-72 lg:h-96">
      {imgs.map((src, i) => (
        <motion.button
          key={src}
          onClick={() => setActive(i)}
          className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
          style={positions[i]}
          initial={false}
          animate={{
            scale: i === active ? 1.15 : 0.92,
            zIndex: i === active ? 30 : 10,
            boxShadow: i === active ? "0 12px 34px -6px rgba(29,78,216,0.35)" : "0 6px 16px -4px rgba(0,0,0,0.10)",
          }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
        >
          <div className="relative w-28 h-20 lg:w-36 lg:h-28 rounded-2xl overflow-hidden border border-slate-200 bg-white">
            <Image src={src} alt={`Hakkımızda görsel ${i + 1}`} fill className="object-cover" />
          </div>
        </motion.button>
      ))}

      {/* Merkez logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-blue-200 bg-white shadow-lg flex items-center justify-center">
          <Image src="/logo-svg.png" alt="Ardesa Logo" fill className="object-contain p-2" />
        </div>
      </div>
    </div>
  );
}
