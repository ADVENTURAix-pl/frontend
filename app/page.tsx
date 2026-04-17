"use client";

import React, { useState } from "react";
import { LogoIntro } from "./components/LogoIntro";
import { Navbar } from "./components/Navbar";

const BRAND_COLOR = "#565F59";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F3F4F2",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {/* Full-screen intro animation — covers everything until done */}
      <LogoIntro onComplete={() => setIntroComplete(true)} />

      {/* Navbar becomes visible after intro */}
      <Navbar visible={introComplete} />

      {/* Page content */}
      <main
        style={{
          paddingTop: 72,
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.8s ease-out", // Slightly slower fade for content to feel premium
        }}
      >
        <section
          style={{
            minHeight: "calc(100vh - 72px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "64px 24px",
            textAlign: "center",
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
        </section>
      </main>
    </div>
  );
}
