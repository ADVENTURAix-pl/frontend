import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo, Button, Icon } from "./shared";
import { useLocale, type Locale } from "../providers/LocaleProvider";

type Tab = "discover" | "education" | "club" | "about";

const TAB_KEYS: { id: Tab; key: keyof ReturnType<typeof useLocale>["t"]["nav"] }[] = [
  { id: "discover",  key: "discover" },
  { id: "education", key: "education" },
  { id: "club",      key: "club" },
  { id: "about",     key: "about" },
];

const LOCALES: Locale[] = ["pl", "en"];

export function SiteNav({
  activeTab,
  onTab,
  visible = true,
}: {
  activeTab: Tab;
  onTab: (tab: Tab) => void;
  visible?: boolean;
}) {
  const { locale, setLocale, t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sidebarRef.current || !backdropRef.current) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      
      // Reveal backdrop
      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Expand sidebar radially from top-right corner
      gsap.to(sidebarRef.current, {
        clipPath: "circle(150% at calc(100% - 40px) 40px)",
        duration: 1.2, // Drastically longer to ensure maximum drag and buttery-slow finish
        ease: "expo.out",
      });
    } else {
      document.body.style.overflow = "";

      // Hide backdrop
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // Shrink sidebar radially
      gsap.to(sidebarRef.current, {
        clipPath: "circle(0px at calc(100% - 40px) 40px)",
        duration: 0.6,
        ease: "expo.out",
      });
    }
  }, { scope: container, dependencies: [menuOpen] });

  const handleTabClick = (id: Tab) => {
    onTab(id);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <div ref={container} className="relative z-[100]">
      {/* Desktop/Mobile Pill Nav */}
      <nav 
        className="fixed top-4 left-4 right-4 md:left-6 md:right-6 flex md:grid grid-cols-[auto_1fr_auto] items-center justify-between md:justify-start px-4 py-3 md:px-5 md:py-3 bg-[rgba(243,244,242,0.88)] backdrop-blur-xl border border-[var(--adx-sage-a12)] rounded-full font-sans transition-opacity duration-500 z-[102]"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        <button onClick={() => handleTabClick("discover")} className="bg-transparent border-none p-0 cursor-pointer flex-shrink-0 flex items-center justify-center relative z-[103]">
          <Logo size={22} />
        </button>

        <div className="hidden md:flex gap-1 justify-center w-full">
          {TAB_KEYS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              style={{
                background: activeTab === tab.id ? "var(--adx-sage-a06)" : "transparent",
                color: activeTab === tab.id ? "var(--fg)" : "var(--fg-muted)",
              }}
              className={`border-none cursor-pointer px-3 py-1.5 rounded-full font-sans text-[13px] transition-colors duration-150 ${activeTab === tab.id ? 'font-medium' : 'font-normal'}`}
            >
              {t.nav[tab.key]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-0.5">
            {LOCALES.map((l, i) => (
              <React.Fragment key={l}>
                {i > 0 && <span className="text-[var(--fg-faint)] text-[11px] px-[2px]">/</span>}
                <button
                  onClick={() => setLocale(l)}
                  className={`bg-transparent border-none cursor-pointer font-mono text-[11px] tracking-[0.12em] px-[5px] py-[3px] rounded uppercase transition-colors duration-200 ${locale === l ? 'text-[var(--fg)] font-semibold underline underline-offset-4' : 'text-[var(--fg-faint)] font-normal no-underline'}`}
                >
                  {l}
                </button>
              </React.Fragment>
            ))}
          </div>

          <div className="hidden md:block">
            <Button size="sm" variant="primary" onClick={() => handleTabClick("discover")}>{t.nav.plan}</Button>
          </div>

          <button 
            className="md:hidden bg-transparent border-none p-1 -mr-1 cursor-pointer flex items-center justify-center relative z-[103]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={24} color="var(--fg)" />
          </button>
        </div>
      </nav>

      {/* Mobile Animated Nav Overlay */}
      <div className={`fixed inset-0 z-[101] ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        
        {/* Dim Backdrop */}
        <div 
          ref={backdropRef} 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0"
          onClick={() => setMenuOpen(false)}
        />

        {/* The Sidebar Itself */}
        <div 
          ref={sidebarRef}
          className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-[#F3F4F2] shadow-2xl flex flex-col pt-24 px-8 border-l border-[var(--adx-sage-a12)]"
          style={{ 
            clipPath: "circle(0px at calc(100% - 40px) 40px)",
            willChange: "clip-path" 
          }}
        >
          <div className="flex flex-col gap-6 font-sans">
            <h3 className="text-[var(--fg-faint)] text-xs uppercase tracking-widest font-semibold font-mono mb-2">Menu</h3>
            
            {TAB_KEYS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="bg-transparent border-none text-left text-3xl font-light tracking-[-0.02em] text-[var(--fg)] cursor-pointer"
              >
                {t.nav[tab.key]}
              </button>
            ))}
            
            <div className="w-full h-[1px] bg-[var(--adx-sage-a24)] my-4" />

            <div className="flex flex-col gap-4">
              <h3 className="text-[var(--fg-faint)] text-xs uppercase tracking-widest font-semibold font-mono mb-1">{t.nav.language || "Język / Language"}</h3>
              <div className="flex items-center gap-4">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLocale(l);
                      setMenuOpen(false);
                    }}
                    className={`bg-transparent border-none cursor-pointer font-mono text-[14px] tracking-[0.1em] py-1 uppercase ${locale === l ? 'text-[var(--adx-sage)] font-semibold border-b border-[var(--adx-sage)]' : 'text-[var(--fg-muted)] font-normal'}`}
                  >
                    {l === 'pl' ? 'Polski' : 'English'}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pb-12 w-full">
              <Button size="lg" className="w-full justify-center" variant="primary" onClick={() => handleTabClick("discover")}>{t.nav.plan}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
