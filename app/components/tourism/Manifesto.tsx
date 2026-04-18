"use client";

import React from "react";
import { Eyebrow } from "../shared";
import { useLocale } from "../../providers/LocaleProvider";

export function Manifesto() {
  const { t } = useLocale();
  return (
    <section className="mx-4 md:mx-6 my-8 md:my-12 px-6 md:px-[72px] py-16 md:py-[96px] bg-[var(--adx-ink)] text-[var(--adx-paper)] rounded-2xl md:rounded-3xl">
      <Eyebrow style={{ color: "rgba(243,244,242,0.56)" }}>{t.manifesto.eyebrow}</Eyebrow>

      <p style={{
        marginTop: 24,
        fontFamily: "var(--font-serif)",
        fontStyle: "italic",
        fontSize: "clamp(2rem, 4vw, 3.25rem)",
        letterSpacing: "-0.01em",
        lineHeight: 1.15,
        color: "var(--adx-paper)",
        maxWidth: 900,
      }}>
        {t.manifesto.quote}
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {t.manifesto.pillars.map((b) => (
          <div key={b.key}>
            <Eyebrow style={{ color: "rgba(243,244,242,0.48)" }}>{b.key}</Eyebrow>
            <h3 style={{ marginTop: 10, fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--adx-paper)" }}>{b.title}</h3>
            <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.65, color: "rgba(243,244,242,0.66)" }}>{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
