"use client";

import React, { useEffect, useState } from "react";
import { LogoIntro } from "./components/LogoIntro";
import { Footer } from "./components/Footer";
import { SiteNav } from "./components/SiteNav";
import { BeachScrollVideo } from "./components/BeachScrollVideo";
import { useLocale } from "./providers/LocaleProvider";

// Tourism
import { Hero } from "./components/tourism/Hero";
import { SearchBar } from "./components/tourism/SearchBar";
import { TripGrid, type Trip, TRIPS } from "./components/tourism/TripGrid";
import { Manifesto } from "./components/tourism/Manifesto";
import { Partners } from "./components/tourism/Partners";
import { TripDetail } from "./components/tourism/TripDetail";
import { Checkout } from "./components/tourism/Checkout";
import { Loyalty } from "./components/tourism/Loyalty";

// Education
import { CoursesHome, type Course } from "./components/education/CoursesHome";
import { CourseDetail } from "./components/education/CourseDetail";
import { LessonReader } from "./components/education/LessonReader";

// Chat
import { AIChatWidget } from "./components/AIChatWidget";

// Cookie Consent
import { CookieConsent } from "./components/CookieConsent";

type Tab = "discover" | "education" | "club" | "about";
type Screen =
  | { name: "home" }
  | { name: "tripDetail"; trip: Trip }
  | { name: "checkout"; trip: Trip }
  | { name: "courseDetail"; course: Course }
  | { name: "lesson"; course: Course };

const BG = "#F3F4F2";
const BRAND_COLOR = "#565F59";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("discover");
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const { t } = useLocale();

  useEffect(() => {
    document.body.style.overflow = introComplete ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [introComplete]);

  function handleTab(tab: Tab) {
    setActiveTab(tab);
    setScreen({ name: "home" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goTrip(trip: Trip) { setScreen({ name: "tripDetail", trip }); window.scrollTo({ top: 0 }); }
  function goCheckout(trip: Trip) { setScreen({ name: "checkout", trip }); window.scrollTo({ top: 0 }); }
  function goCourse(course: Course) { setScreen({ name: "courseDetail", course }); window.scrollTo({ top: 0 }); }
  function goLesson(course: Course) { setScreen({ name: "lesson", course }); window.scrollTo({ top: 0 }); }
  function goHome() { setScreen({ name: "home" }); window.scrollTo({ top: 0 }); }

  return (
    <>
      {/* Intro animation */}
      <LogoIntro onComplete={() => setIntroComplete(true)} />

      {/* Floating pill nav with tabs */}
      <SiteNav activeTab={activeTab} onTab={handleTab} visible={introComplete} />

      {/* Main content */}
      <main
        className="relative z-10 bg-[#F3F4F2] transition-opacity duration-800 mb-0 md:mb-[var(--footer-h,380px)]"
        style={{
          opacity: introComplete ? 1 : 0,
          minHeight: "100vh",
        }}
      >
        {/* ─── DISCOVER ───────────────────────────────────────────────────── */}
        {activeTab === "discover" && screen.name === "home" && (
          <>
            <Hero onPlan={() => goTrip(TRIPS[0])} />
            <SearchBar />

            {/* Features strip */}
            <section className="px-6 md:px-[72px] py-16 md:py-[72px]" style={{ background: BG }}>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(86,95,89,0.45)", margin: "0 0 48px", fontWeight: 500 }}>
                {t.why.label}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {t.why.features.map(({ title, body }) => (
                  <div key={title}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 300, letterSpacing: "-0.02em", color: BRAND_COLOR, margin: "0 0 12px" }}>{title}</h3>
                    <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "rgba(86,95,89,0.65)", margin: 0, fontWeight: 300 }}>{body}</p>
                  </div>
                ))}
              </div>
            </section>

            <TripGrid onOpen={goTrip} />
            <Manifesto />
            <Partners />

            {/* CTA */}
            <section className="px-6 md:px-[72px] py-[80px] text-center" style={{ background: BRAND_COLOR }}>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 200, letterSpacing: "-0.03em", color: "#F3F4F2", margin: "0 0 24px", lineHeight: 1.1 }}>
                {t.cta.heading}
              </h2>
              <p style={{ fontSize: "1.0625rem", color: "rgba(243,244,242,0.65)", margin: "0 0 40px", fontWeight: 300, lineHeight: 1.6 }}>
                {t.cta.body}
              </p>
              <button
                onClick={() => goTrip(TRIPS[0])}
                style={{ padding: "16px 40px", background: "#F3F4F2", color: BRAND_COLOR, border: "none", borderRadius: 2, fontSize: "0.9375rem", fontWeight: 400, letterSpacing: "0.04em", cursor: "pointer", fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
              >
                {t.cta.button}
              </button>
            </section>

            <BeachScrollVideo />
          </>
        )}

        {activeTab === "discover" && screen.name === "tripDetail" && (
          <TripDetail trip={screen.trip} onBack={goHome} onBook={goCheckout} />
        )}

        {activeTab === "discover" && screen.name === "checkout" && (
          <Checkout trip={screen.trip} onBack={() => setScreen({ name: "tripDetail", trip: (screen as { name: "checkout"; trip: Trip }).trip })} onDone={goHome} />
        )}

        {/* ─── EDUCATION ──────────────────────────────────────────────────── */}
        {activeTab === "education" && screen.name === "home" && (
          <CoursesHome onOpen={goCourse} />
        )}

        {activeTab === "education" && screen.name === "courseDetail" && (
          <CourseDetail course={screen.course} onBack={goHome} onStart={() => goLesson((screen as { name: "courseDetail"; course: Course }).course)} />
        )}

        {activeTab === "education" && screen.name === "lesson" && (
          <LessonReader course={screen.course} onBack={() => setScreen({ name: "courseDetail", course: (screen as { name: "lesson"; course: Course }).course })} />
        )}

        {/* ─── CLUB ───────────────────────────────────────────────────────── */}
        {activeTab === "club" && <Loyalty />}

        {/* ─── ABOUT ──────────────────────────────────────────────────────── */}
        {activeTab === "about" && (
          <div className="px-6 md:px-[72px] pt-[120px] pb-[96px]">
            <span className="adx-eyebrow">{t.about.eyebrow}</span>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.03em", color: "var(--fg)", marginTop: 16, maxWidth: 720, lineHeight: 1.1 }}>
              {t.about.heading}
            </h1>
            <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 26, color: "var(--fg-muted)", margin: "12px 0 32px" }}>
              {t.about.subheading}
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--fg-muted)", maxWidth: 620 }}>
              {t.about.body}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {t.about.stats.map((s) => (
                <div key={s.label} style={{ borderTop: "1px solid var(--divider)", paddingTop: 24 }}>
                  <div style={{ fontSize: 48, fontWeight: 300, letterSpacing: "-0.03em", color: "var(--fg)" }}>{s.value}</div>
                  <div style={{ fontSize: 14, color: "var(--fg-muted)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Fixed footer — revealed as content scrolls away on desktop, static on mobile */}
      <Footer />

      {/* AI Chat widget — always on after intro */}
      {introComplete && <AIChatWidget />}
    </>
  );
}
