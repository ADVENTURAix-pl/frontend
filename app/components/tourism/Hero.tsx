"use client";

import React from "react";
import { Badge, Button } from "../shared";
import { useLocale } from "../../providers/LocaleProvider";

const NAVBAR_H = 72 + 16; // fixed navbar height + top offset

export function Hero({ onPlan }: { onPlan?: () => void }) {
  const { t } = useLocale();
  return (
    <section style={{
      position: "relative",
      minHeight: "88vh",
      margin: `${NAVBAR_H + 16}px 24px 0`,  // clear navbar + small gap
      borderRadius: 24,
      overflow: "hidden",
      background: "#2a2e2b",
    }}>
      <img
        src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=2000&q=80"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.72) saturate(0.85)" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,36,33,0.1) 40%, rgba(31,36,33,0.72) 100%)" }} />

      <div style={{ position: "relative", padding: "88px 72px 64px", display: "flex", flexDirection: "column", minHeight: "88vh", color: "var(--adx-paper)" }}>
        <Badge variant="glass" style={{ alignSelf: "flex-start" }}>{t.hero.badge}</Badge>
        <div style={{ flex: 1 }} />

        <h1 style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.02, margin: 0, color: "var(--adx-paper)", maxWidth: 920 }}>
          {t.hero.heading}
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 32, letterSpacing: "-0.01em", margin: "8px 0 0", color: "rgba(243,244,242,0.82)" }}>
          {t.hero.subheading}
        </p>
        <p style={{ marginTop: 24, maxWidth: 560, fontSize: 17, fontWeight: 300, lineHeight: 1.6, color: "rgba(243,244,242,0.78)" }}>
          {t.hero.body}
        </p>

        <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
          <Button variant="inverse" size="lg" onClick={onPlan}>{t.hero.cta_plan}</Button>
          <Button variant="ghost" size="lg" style={{ color: "var(--adx-paper)", border: "1px solid rgba(243,244,242,0.32)" }}>
            {t.hero.cta_how}
          </Button>
        </div>
      </div>
    </section>
  );
}
