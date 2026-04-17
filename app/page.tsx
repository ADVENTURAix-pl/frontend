"use client";

import React, { useEffect, useState } from "react";
import { LogoIntro } from "./components/LogoIntro";
import { Navbar } from "./components/Navbar";
import { BeachScrollVideo } from "./components/BeachScrollVideo";
import { Footer, FOOTER_HEIGHT } from "./components/Footer";

const BRAND_COLOR = "#565F59";
const BG = "#F3F4F2";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  // Prevent scroll during intro
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [introComplete]);

  return (
    <>
      {/* Full-screen intro — highest z-index, removed once done */}
      <LogoIntro onComplete={() => setIntroComplete(true)} />

      {/* Fixed navbar */}
      <Navbar visible={introComplete} />

      {/* Fixed footer — z-index:1, lives BEHIND main content */}
      <Footer />

      {/* All page content — z-index:10, opaque bg, scrolls over footer */}
      <main
        style={{
          position: "relative",
          zIndex: 10,
          background: BG,
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.8s ease-out",
          paddingTop: 72, // navbar height
          marginBottom: FOOTER_HEIGHT, // transparent gap (margins have no bg) reveals footer at page end
        }}
      >
        {/* ── Hero ── */}
        <section
          style={{
            minHeight: "calc(100vh - 72px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "64px 24px",
            textAlign: "center",
            background: BG,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              color: BRAND_COLOR,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Adventure, reimagined.
          </h1>
          <p
            style={{
              marginTop: 24,
              fontSize: "1.125rem",
              color: "rgba(86,95,89,0.65)",
              maxWidth: 480,
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            AI-powered travel experiences crafted for the curious explorer.
          </p>
          {/* Scroll cue */}
          <div
            style={{
              marginTop: 64,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity: 0.4,
            }}
          >
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: BRAND_COLOR,
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: 1,
                height: 48,
                background: BRAND_COLOR,
                opacity: 0.4,
              }}
            />
          </div>
        </section>

        {/* ── Beach scroll-driven video ── */}
        <BeachScrollVideo />

        {/* ── Features strip ── */}
        <section
          style={{
            background: BG,
            padding: "72px clamp(32px, 6vw, 80px)",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(86,95,89,0.45)",
              margin: "0 0 48px",
              fontWeight: 500,
            }}
          >
            Why ADVENTURAix
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 48,
            }}
          >
            {[
              {
                title: "AI-Crafted Itineraries",
                body: "Every trip is generated around your interests, pace, and budget — not a generic template.",
              },
              {
                title: "Real-Time Adaptation",
                body: "Weather, crowds, local events — your itinerary shifts dynamically so the journey always feels right.",
              },
              {
                title: "Curated, Not Crowdsourced",
                body: "We partner with local experts. No influencer fluff, just deeply researched places worth visiting.",
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: BRAND_COLOR,
                    margin: "0 0 12px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                    color: "rgba(86,95,89,0.65)",
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA section (last opaque content before footer reveals) ── */}
        <section
          style={{
            background: BRAND_COLOR,
            padding: "80px clamp(32px, 6vw, 80px)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 200,
              letterSpacing: "-0.03em",
              color: "#F3F4F2",
              margin: "0 0 24px",
              lineHeight: 1.1,
            }}
          >
            Ready to explore?
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "rgba(243,244,242,0.65)",
              margin: "0 0 40px",
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Start planning your first AI-powered adventure today.
          </p>
          <button
            style={{
              padding: "16px 40px",
              background: "#F3F4F2",
              color: BRAND_COLOR,
              border: "none",
              borderRadius: 2,
              fontSize: "0.9375rem",
              fontWeight: 400,
              letterSpacing: "0.04em",
              cursor: "pointer",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            Get early access
          </button>
        </section>
      </main>
    </>
  );
}
