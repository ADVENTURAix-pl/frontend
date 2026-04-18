"use client";

import React from "react";
import { Eyebrow, Card, StarMark } from "../shared";
import { useLocale } from "../../providers/LocaleProvider";

const PARTNERS = [
  { n: "Paradise Egypt",  r: "Strategiczny partner · Middle East", re: "Strategic partner · Middle East", k: "118K+" },
  { n: "Yasser El-Deeb", r: "UK Business & Travel Consultant",     re: "UK Business & Travel Consultant",  k: "56K+" },
  { n: "Community ADX",  r: "Weryfikowani podróżnicy",             re: "Verified travellers",              k: "16K+" },
];

export function Partners() {
  const { t, locale } = useLocale();
  return (
    <section style={{ padding: "48px 72px 96px" }}>
      <Eyebrow>{t.partners.eyebrow}</Eyebrow>
      <h2 style={{ marginTop: 10, fontSize: 32, fontWeight: 300, letterSpacing: "-0.02em", color: "var(--fg)" }}>
        {t.partners.heading}
      </h2>

      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {PARTNERS.map((p) => (
          <Card key={p.n} style={{ padding: "24px 24px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 999, background: "var(--adx-paper-warm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <StarMark size={18} color="var(--adx-sage)" />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "var(--fg)", letterSpacing: "-0.01em" }}>{p.n}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)" }}>
                  {locale === "pl" ? p.r : p.re}
                </div>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 28, fontWeight: 300, letterSpacing: "-0.03em", color: "var(--fg)" }}>{p.k}</div>
            <div style={{ fontSize: 13, color: "var(--fg-muted)", marginTop: 2 }}>{t.partners.followers}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
