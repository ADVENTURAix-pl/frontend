"use client";

import React from "react";
import { Badge, Button } from "../shared";
import { useLocale } from "../../providers/LocaleProvider";

const NAVBAR_H = 72 + 16; // fixed navbar height + top offset

export function Hero({ onPlan }: { onPlan?: () => void }) {
  const { t } = useLocale();
  return (
    <section className="mx-3 md:mx-6 rounded-2xl md:rounded-3xl overflow-hidden relative min-h-[88vh] bg-[#2a2e2b]" style={{
      marginTop: NAVBAR_H + 16,
    }}>
      <img
        src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=2000&q=80"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.72) saturate(0.85)" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,36,33,0.1) 40%, rgba(31,36,33,0.72) 100%)" }} />

      <div className="relative pt-[88px] pb-16 px-6 md:px-[72px] flex flex-col min-h-[88vh]" style={{ color: "var(--adx-paper)" }}>
        <Badge variant="glass" style={{ alignSelf: "flex-start" }}>{t.hero.badge}</Badge>
        <div style={{ flex: 1 }} />

        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.02, margin: 0, color: "var(--adx-paper)", maxWidth: 920 }}>
          {t.hero.heading}
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(1.5rem, 4vw, 2rem)", letterSpacing: "-0.01em", margin: "8px 0 0", color: "rgba(243,244,242,0.82)" }}>
          {t.hero.subheading}
        </p>
        <p style={{ marginTop: 24, maxWidth: 560, fontSize: 17, fontWeight: 300, lineHeight: 1.6, color: "rgba(243,244,242,0.78)" }}>
          {t.hero.body}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button variant="inverse" size="lg" onClick={onPlan} className="w-full sm:w-auto">{t.hero.cta_plan}</Button>
          <Button variant="ghost" size="lg" className="w-full sm:w-auto" style={{ color: "var(--adx-paper)", border: "1px solid rgba(243,244,242,0.32)" }}>
            {t.hero.cta_how}
          </Button>
        </div>
      </div>
    </section>
  );
}
