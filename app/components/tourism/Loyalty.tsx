"use client";

import React from "react";
import { Card, Eyebrow } from "../shared";
import { useLocale } from "../../providers/LocaleProvider";

export function Loyalty() {
  const { t } = useLocale();
  return (
    <div style={{ padding: "96px 72px 96px" }}>
      <Eyebrow>{t.loyalty.eyebrow}</Eyebrow>
      <h1 style={{ fontSize: 44, fontWeight: 300, letterSpacing: "-0.03em", color: "var(--fg)", marginTop: 10, maxWidth: 720 }}>
        {t.loyalty.heading}
      </h1>

      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
        {/* Balance card */}
        <Card style={{ padding: 28, background: "var(--adx-sage)", color: "var(--adx-paper)" }}>
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
        <Card style={{ padding: 28 }}>
          <Eyebrow>{t.loyalty.redeem_eyebrow}</Eyebrow>
          <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {t.loyalty.rewards.map(([title, pts]) => (
              <div key={title} style={{ padding: "16px 18px", border: "1px solid var(--adx-sage-a12)", borderRadius: 10, cursor: "pointer" }}>
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
