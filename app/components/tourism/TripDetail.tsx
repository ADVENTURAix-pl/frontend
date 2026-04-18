"use client";

import React from "react";
import { Badge, Button, Card, Eyebrow, Icon } from "../shared";
import type { Trip } from "./TripGrid";

const ITINERARY = [
  { d: "01", t: "Kotor → Budva",         sub: "Wieczór w starej części miasta, kolacja u Mare" },
  { d: "02", t: "Przez Lovćen",           sub: "Serpentyny, mauzoleum, prywatny przewodnik" },
  { d: "03", t: "Albania · Shkodër",      sub: "Przeprawa przez jezioro, wieczór z jazzem" },
  { d: "04", t: "Berat · miasto tysiąca okien", sub: "Warsztat rakija, nocleg w dawnej rezydencji" },
  { d: "05", t: "Himara · Riwiera",       sub: "Dzień bez planu. Morze, łódka, cisza." },
];

export function TripDetail({
  trip,
  onBack,
  onBook,
}: {
  trip: Trip;
  onBack: () => void;
  onBook: (trip: Trip) => void;
}) {
  return (
    <div className="pb-12">
      {/* Hero image */}
      <div className="relative h-[400px] md:h-[520px] mx-4 md:mx-6 mt-20 md:mt-24 rounded-2xl overflow-hidden">
        <img src={trip.img} alt={trip.name} className="absolute inset-0 w-full h-full object-cover" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,36,33,0) 50%, rgba(31,36,33,0.7) 100%)" }} />
        <button
          onClick={onBack}
          style={{
            position: "absolute", top: 24, left: 24,
            background: "rgba(243,244,242,0.88)", backdropFilter: "blur(8px)",
            border: "none", borderRadius: 999, padding: "8px 16px",
            cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg)",
          }}
        >← Wszystkie trasy</button>
        <div style={{ position: "absolute", bottom: 40, left: 48, color: "var(--adx-paper)" }}>
          <Badge variant="glass">{trip.region}</Badge>
          <h1 style={{
            margin: "16px 0 4px", fontSize: 64, fontWeight: 300,
            letterSpacing: "-0.03em", color: "var(--adx-paper)",
          }}>{trip.name}</h1>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(243,244,242,0.78)", letterSpacing: "0.04em" }}>
            {trip.sub}
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 px-6 md:px-[72px] pt-8 md:pt-12">
        {/* Left column */}
        <div>
          <Eyebrow>Dlaczego ta trasa</Eyebrow>
          <h2 style={{ marginTop: 10, fontSize: 32, fontWeight: 300, letterSpacing: "-0.02em", color: "var(--fg)" }}>
            Trzy kraje, jedna opowieść. Żadnych powtórek.
          </h2>
          <p style={{ marginTop: 16, fontSize: 16.5, lineHeight: 1.7, color: "var(--fg-muted)", maxWidth: 620 }}>
            Rozpoczynamy w Kotorze, przecinamy albańską Riwierę i kończymy w Ochrydzie.
            Każdy nocleg jest osobistym wyborem kuratora — nie hotelowej centrali.
            Co dzień jedno „niemożliwe" doświadczenie, które niemożliwe być nie musi.
          </p>

          {/* Itinerary */}
          <div style={{ marginTop: 40 }}>
            <Eyebrow>Plan dnia · itinerary</Eyebrow>
            <div style={{ marginTop: 16, borderTop: "1px solid var(--adx-sage-a12)" }}>
              {ITINERARY.map((d) => (
                <div key={d.d} style={{
                  padding: "18px 0", borderBottom: "1px solid var(--adx-sage-a12)",
                  display: "flex", gap: 20, alignItems: "baseline",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--fg-faint)", letterSpacing: "0.08em", minWidth: 36 }}>
                    {d.d}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 500, color: "var(--fg)", letterSpacing: "-0.01em" }}>{d.t}</div>
                    <div style={{ fontSize: 14, color: "var(--fg-muted)", marginTop: 2 }}>{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky sidebar */}
        <aside style={{ position: "sticky", top: 96, alignSelf: "flex-start" }}>
          <Card style={{ padding: 24 }}>
            <div style={{ fontSize: 13, color: "var(--fg-muted)" }}>od</div>
            <div style={{ fontSize: 40, fontWeight: 300, letterSpacing: "-0.03em", color: "var(--fg)" }}>{trip.price} zł</div>
            <div style={{ fontSize: 13, color: "var(--fg-faint)" }}>za osobę · {trip.days}</div>
            <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid var(--adx-sage-a12)" }} />
            {[
              ["Termin",    "Kwiecień 15 — 25, 2026"],
              ["Grupa",     trip.group],
              ["Kurator",   trip.curator],
              ["Logistyka", "AI Engine · Adventuraix"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
                <span style={{ color: "var(--fg-faint)" }}>{k}</span>
                <span style={{ color: "var(--fg)" }}>{v}</span>
              </div>
            ))}
            <Button size="lg" style={{ width: "100%", marginTop: 20 }} onClick={() => onBook(trip)}>
              Zarezerwuj miejsce
            </Button>
            <Button variant="secondary" size="md" style={{ width: "100%", marginTop: 8 }}>
              Porozmawiaj z kuratorem
            </Button>
            <div style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)", textAlign: "center", letterSpacing: "0.06em" }}>
              Apple Pay · Visa · Mastercard
            </div>
          </Card>

          <Card style={{ padding: 20, marginTop: 16, background: "var(--adx-paper-warm)" }}>
            <Eyebrow>Punkty ADX</Eyebrow>
            <div style={{ marginTop: 8, fontSize: 14, color: "var(--fg)", lineHeight: 1.55 }}>
              Zarabiasz{" "}
              <b style={{ color: "var(--adx-clay-deep)" }}>420 pkt</b>{" "}
              po zakończeniu podróży. Wymieniaj na upgrade'y i warsztaty.
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
