"use client";

import React from "react";
import { Card, Eyebrow } from "../shared";
import { useLocale } from "../../providers/LocaleProvider";

export function Loyalty() {
  const { t } = useLocale();
  return (
    <div className="px-6 md:px-[72px] py-16 md:py-[96px]">
      <Eyebrow>{t.loyalty.eyebrow}</Eyebrow>
      <h1 className="mt-2.5 text-3xl md:text-[44px] font-light tracking-[-0.03em] max-w-[720px] text-[var(--fg)] leading-tight">
        {t.loyalty.heading}
      </h1>

      <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance card */}
        <Card className="p-6 md:p-7 md:col-span-1" style={{ background: "var(--adx-sage)", color: "var(--adx-paper)" }}>
          <Eyebrow style={{ color: "rgba(243,244,242,0.52)" }}>{t.loyalty.balance_label}</Eyebrow>
          <div style={{ fontSize: 64, fontWeight: 300, letterSpacing: "-0.03em", margin: "8px 0", color: "var(--adx-paper)" }}>1 240</div>
          <div style={{ fontSize: 13, color: "rgba(243,244,242,0.72)" }}>{t.loyalty.last_update}</div>
          <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid rgba(243,244,242,0.16)" }} />
          <div style={{ fontSize: 14, color: "rgba(243,244,242,0.85)" }}>
            {t.loyalty.status} <b style={{ color: "var(--adx-clay-soft)" }}>Curator</b>
          </div>
          <div style={{ marginTop: 8, height: 4, background: "rgba(243,244,242,0.16)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: "62%", height: "100%", background: "var(--adx-clay-soft)" }} />
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: "rgba(243,244,242,0.6)" }}>{t.loyalty.progress}</div>
        </Card>

        {/* Redeem card */}
        <Card className="p-6 md:p-7 md:col-span-2">
          <Eyebrow>{t.loyalty.redeem_eyebrow}</Eyebrow>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {t.loyalty.rewards.map(([title, pts]) => (
              <div key={title} className="p-4 rounded-xl border border-[var(--adx-sage-a12)] cursor-pointer hover:bg-black/5 transition-colors">
                <div style={{ fontSize: 15, color: "var(--fg)", fontWeight: 500 }}>{title}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--adx-clay-deep)", marginTop: 4 }}>{pts}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
