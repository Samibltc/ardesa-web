"use client";
import { useEffect, useMemo, useState } from "react";

type CategoryKey = "web" | "mobile" | "ai" | "cloud" | "security" | "bi";

const categories: { key: CategoryKey; label: string }[] = [
  { key: "web", label: "Web Uygulamaları" },
  { key: "mobile", label: "Mobil Uygulamalar" },
  { key: "ai", label: "AI & Machine Learning" },
  { key: "cloud", label: "Cloud Çözümleri" },
  { key: "security", label: "Güvenlik & Danışmanlık" },
  { key: "bi", label: "Veri Analizi & BI" },
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState<CategoryKey | "">("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const c = url.searchParams.get("category") as CategoryKey | null;
    if (c && categories.some((x) => x.key === c)) {
      setCategory(c);
      // İlgili bölüme yumuşak kaydır
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, phone, email, message, category };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Gönderim başarısız");
      }
      alert("Mesajınız alındı. En kısa sürede dönüş yapacağız.");
      setName(""); setPhone(""); setEmail(""); setMessage(""); setCategory("");
    } catch (err: any) {
      alert(`Hata: ${err.message || "Gönderim sırasında bir sorun oluştu"}`);
    }
  };

  return (
    <form className="mt-4 grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-1">
        <label className="text-sm font-medium">Kategori</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as CategoryKey)}
          className="rounded-md bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Bir kategori seçin…</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Ad Soyad <span className="text-red-500">*</span></label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Adınız ve soyadınız"
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Telefon <span className="text-red-500">*</span></label>
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="rounded-md bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="(5xx) xxx xx xx"
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">E-posta <span className="text-red-500">*</span></label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="ornek@domain.com"
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Ne Sormak İstiyorsunuz? <span className="text-red-500">*</span></label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="rounded-md bg-white border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Mesajınızı buraya yazın..."
        />
      </div>

      <button className="btn-primary inline-flex items-center justify-center gap-2" type="submit">
        Gönder <span aria-hidden>✈️</span>
      </button>
    </form>
  );
}
