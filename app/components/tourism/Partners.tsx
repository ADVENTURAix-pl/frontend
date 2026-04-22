"use client";

import React from "react";
import Image from "next/image";
import { Eyebrow, Card, StarMark } from "../shared";
import { useLocale } from "../../providers/LocaleProvider";

const PARTNERS = [
  { n: "Paradise Egypt",  r: "Strategiczny partner · Middle East", re: "Strategic partner · Middle East", k: "118K+", img: "/images/378898858_835225808007519_1743864382048987601_n.jpg" },
  { n: "Yasser El-Deeb", r: "UK Business & Travel Consultant",     re: "UK Business & Travel Consultant",  k: "56K+" },
  { n: "Community ADX",  r: "Weryfikowani podróżnicy",             re: "Verified travellers",              k: "16K+" },
];

export function Partners() {
  const { t, locale } = useLocale();
  return (
    <section className="px-6 md:px-[72px] pt-10 md:pt-12 pb-16 md:pb-[96px]">
      <Eyebrow>{t.partners.eyebrow}</Eyebrow>
      <h2 style={{ marginTop: 10, fontSize: 32, fontWeight: 300, letterSpacing: "-0.02em", color: "var(--fg)" }}>
        {t.partners.heading}
      </h2>

      <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {PARTNERS.map((p) => (
          <Card key={p.n} className="p-5 md:p-6">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              {p.img ? (
                <div style={{ width: 40, height: 40, borderRadius: 999, overflow: "hidden", border: "2px solid var(--adx-sage-a24)", flexShrink: 0, position: "relative" }}>
                  <Image src={p.img} alt={p.n} fill style={{ objectFit: "cover" }} sizes="40px" />
                </div>
              ) : (
                <div style={{ width: 40, height: 40, borderRadius: 999, background: "var(--adx-paper-warm)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <StarMark size={18} color="var(--adx-sage)" />
                </div>
              )}
              <div style={{ minWidth: 0 }}>
                <div className="truncate" style={{ fontSize: 16, fontWeight: 500, color: "var(--fg)", letterSpacing: "-0.01em" }}>{p.n}</div>
                <div className="truncate" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)" }}>
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
