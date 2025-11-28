import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import { ThemeProvider } from "../components/ThemeProvider";
import Image from "next/image";
import SocialLinks from "../components/SocialLinks";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Ardesa Software",
    description: "Ultra modern çözümlerle yüksek performanslı yazılım",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased selection:bg-cyan-300/40 selection:text-white`}>        
          <ThemeProvider>
          <div className="min-h-dvh flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0014] border-b border-cyan-500/20 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.5)]">
              <Nav />
            </header>
            <main className="flex-1 pt-[4.2rem]">{children}</main>
            <footer className="bg-[#0f172a] text-slate-200">
              <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sol: Logo + isim + açıklama */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9">
                      <Image src="/logo-svg.png" alt="Ardesa Software" fill className="object-contain" />
                    </div>
                    <div className="text-lg font-semibold">Ardesa Software</div>
                  </div>
                  <p className="text-sm text-slate-300">
                    Modern yazılım çözümleri ile işinizi dijitale taşıyoruz.
                  </p>
                </div>

                {/* Orta: Hızlı bağlantılar */}
                <div>
                  <div className="text-base font-semibold mb-3">Hızlı Bağlantılar</div>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#slider" className="hover:text-white">Ana Sayfa</a></li>
                    <li><a href="#about" className="hover:text-white">Hakkımızda</a></li>
                    <li><a href="#services" className="hover:text-white">Hizmetler</a></li>
                    <li><a href="#contact" className="hover:text-white">İletişim</a></li>
                  </ul>
                </div>

                {/* Sağ: İletişim */}
                <div>
                  <div className="text-base font-semibold mb-3">İletişim</div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className="h-5 w-5 text-slate-300">
                        <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
                        <path d="M3 8l8.27 5.18a2 2 0 0 0 2.06 0L21 8" />
                      </svg>
                      <span>contact@ardesa.info</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" stroke="currentColor" className="h-5 w-5 text-slate-300">
                        <path d="M3 5c0-.55.45-1 1-1h3c.47 0 .88.33.98.79l.7 3.16c.08.35-.03.73-.3.98l-1.5 1.46a12.5 12.5 0 0 0 5.73 5.73l1.46-1.5c.25-.27.63-.38.98-.3l3.16.7c.46.1.79.51.79.98v3c0 .55-.45 1-1 1h-1C9.16 20 4 14.84 4 8V7c0-.55.45-1 1-1Z" />
                      </svg>
                      <span>+90 (538) 424 73 69</span>
                    </li>
                      <li className="pt-1">
                        <SocialLinks variant="footer" />
                      </li>
                  </ul>
                </div>
              </div>
              <div className="mx-auto max-w-6xl px-4 pb-8">
                <div className="border-t border-slate-700/60" />
              </div>
              <div className="mx-auto max-w-6xl px-4 pb-10 text-xs text-slate-400">
                © {new Date().getFullYear()} Ardesa Software. Tüm hakları saklıdır.
              </div>
            </footer>
          </div>
          </ThemeProvider>
        </body>
      </html>
  );
}
