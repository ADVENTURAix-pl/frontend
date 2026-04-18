"use client";

import React, { useState } from "react";
import { Button, Card, Eyebrow, Field, Icon, Input } from "../shared";
import type { Trip } from "./TripGrid";

export function Checkout({
  trip,
  onBack,
  onDone,
}: {
  trip: Trip;
  onBack: () => void;
  onDone: () => void;
}) {
  const [step, setStep] = useState(1);

  return (
    <div style={{ padding: "32px 72px 96px", maxWidth: 1200, margin: "0 auto", paddingTop: 96 }}>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--fg-muted)", padding: 0, marginBottom: 24 }}
      >← wróć</button>

      <Eyebrow>Rezerwacja · Booking</Eyebrow>
      <h1 style={{ fontSize: 40, fontWeight: 300, letterSpacing: "-0.03em", color: "var(--fg)", marginTop: 10 }}>
        {trip.name}
      </h1>

      {/* Step indicators */}
      <div style={{ display: "flex", gap: 32, marginTop: 32, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {["Podróżni", "Płatność", "Potwierdzenie"].map((s, i) => (
          <span key={s} style={{ color: i + 1 <= step ? "var(--fg)" : "var(--fg-faint)" }}>0{i + 1} · {s}</span>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, marginTop: 32 }}>
        {/* Main card */}
        <Card style={{ padding: 32 }}>
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Field label="Imię i nazwisko"><Input placeholder="Jan Kowalski" /></Field>
              <Field label="Email"><Input placeholder="jan@example.com" type="email" /></Field>
              <Field label="Telefon"><Input placeholder="+48 600 000 000" /></Field>
              <Field label="Dietetyczne preferencje" hint="Opcjonalnie — nasz zespół dopasuje restauracje">
                <Input placeholder="wegetariańskie, bez glutenu…" />
              </Field>
              <Button onClick={() => setStep(2)} style={{ alignSelf: "flex-start", marginTop: 12 }}>Dalej →</Button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <Eyebrow>Metoda płatności</Eyebrow>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {["Apple Pay", "Visa / Mastercard", "Przelew · BLIK", "ADX Credit"].map((m, i) => (
                  <div key={m} style={{
                    padding: "16px 18px",
                    border: `1px solid ${i === 0 ? "var(--adx-sage)" : "var(--adx-sage-a24)"}`,
                    borderRadius: 10, cursor: "pointer",
                    background: i === 0 ? "var(--adx-sage-a06)" : "transparent",
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--fg)" }}>{m}</div>
                  </div>
                ))}
              </div>
              <Field label="Numer karty"><Input placeholder="4111 1111 1111 1111" /></Field>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Field label="Ważność"><Input placeholder="04 / 28" /></Field>
                <Field label="CVC"><Input placeholder="•••" /></Field>
              </div>
              <Button onClick={() => setStep(3)} style={{ alignSelf: "flex-start", marginTop: 12 }}>
                Zapłać {trip.price} zł
              </Button>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{
                margin: "0 auto 16px", width: 56, height: 56, borderRadius: 999,
                background: "rgba(95,122,90,0.14)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="check" size={28} color="var(--adx-ok)" />
              </div>
              <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.02em", color: "var(--fg)", margin: 0 }}>
                Rezerwacja potwierdzona.
              </h2>
              <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 20, color: "var(--fg-muted)", margin: "6px 0 0" }}>
                Your booking is confirmed.
              </p>
              <p style={{ marginTop: 16, fontSize: 14.5, color: "var(--fg-muted)" }}>
                ADX-2026-PL-00142 · wysłaliśmy szczegóły na email
              </p>
              <Button variant="secondary" size="md" onClick={onDone} style={{ marginTop: 20 }}>
                Przejdź do mojego konta
              </Button>
            </div>
          )}
        </Card>

        {/* Summary sidebar */}
        <Card style={{ padding: 24, alignSelf: "flex-start" }}>
          <Eyebrow>Podsumowanie</Eyebrow>
          <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
            <img src={trip.img} alt={trip.name} style={{ width: 64, height: 64, borderRadius: 10, objectFit: "cover" }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "var(--fg)" }}>{trip.name}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)" }}>{trip.days} · 2 osoby</div>
            </div>
          </div>
          <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid var(--adx-sage-a12)" }} />
          {[
            ["Cena bazowa",       `${trip.price} zł`],
            ["Podatek",           "320 zł"],
            ["Upgrade kuratora",  "wliczone"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, color: "var(--fg-muted)" }}>
              <span>{k}</span><span>{v}</span>
            </div>
          ))}
          <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid var(--adx-sage-a12)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "var(--fg)" }}>
            <span>Razem</span>
            <span style={{ fontWeight: 500 }}>{trip.price} zł</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
