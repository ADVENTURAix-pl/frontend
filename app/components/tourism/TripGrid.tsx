"use client";

import React, { useState } from "react";
import { Card, Badge, Eyebrow, Icon, Button } from "../shared";
import { useLocale } from "../../providers/LocaleProvider";

export type Trip = {
  id: string; name: string; name_en: string;
  region: string; region_en: string;
  sub: string; sub_en: string;
  days: string; days_en: string;
  group: string; group_en: string;
  price: string; tag: string; tag_en: string; curator: string; img: string;
};

export const TRIPS: Trip[] = [
  {
    id: "t1", name: "Bukiet Bałkanów", name_en: "Balkan Bouquet",
    region: "Bałkany", region_en: "Balkans",
    sub: "Czarnogóra · Albania · Macedonia", sub_en: "Montenegro · Albania · Macedonia",
    days: "10 dni", days_en: "10 days", group: "Grupa do 8", group_en: "Group up to 8",
    price: "4 200", tag: "Kurator", tag_en: "Curator", curator: "Abdelrahman A.",
    img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=80",
  },
  {
    id: "t2", name: "Atlas & Sahara", name_en: "Atlas & Sahara",
    region: "Maroko", region_en: "Morocco",
    sub: "Marrakesz · Merzouga · Esauira", sub_en: "Marrakech · Merzouga · Essaouira",
    days: "7 dni", days_en: "7 days", group: "Prywatnie", group_en: "Private",
    price: "5 900", tag: "Premium", tag_en: "Premium", curator: "Paradise Egypt",
    img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80",
  },
  {
    id: "t3", name: "Petra & pustynia", name_en: "Petra & the Desert",
    region: "Jordania", region_en: "Jordan",
    sub: "Amman · Petra · Wadi Rum · Aqaba", sub_en: "Amman · Petra · Wadi Rum · Aqaba",
    days: "8 dni", days_en: "8 days", group: "Grupa do 6", group_en: "Group up to 6",
    price: "6 400", tag: "Zweryfikowane", tag_en: "Verified", curator: "Yasser El-Deeb",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80",
  },
  {
    id: "t4", name: "Kaukaski przełom", name_en: "Caucasian Crossing",
    region: "Gruzja", region_en: "Georgia",
    sub: "Tbilisi · Kazbegi · Svaneti", sub_en: "Tbilisi · Kazbegi · Svaneti",
    days: "9 dni", days_en: "9 days", group: "Grupa do 8", group_en: "Group up to 8",
    price: "4 800", tag: "Boutique", tag_en: "Boutique", curator: "Abdelrahman A.",
    img: "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=1200&q=80",
  },
];

function TripCard({ trip, onOpen }: { trip: Trip; onOpen?: (t: Trip) => void }) {
  const { t, locale } = useLocale();
  const [imgHover, setImgHover] = useState(false);
  const name   = locale === "pl" ? trip.name    : trip.name_en;
  const region = locale === "pl" ? trip.region  : trip.region_en;
  const sub    = locale === "pl" ? trip.sub     : trip.sub_en;
  const days   = locale === "pl" ? trip.days    : trip.days_en;
  const tag    = locale === "pl" ? trip.tag     : trip.tag_en;

  return (
    <Card onClick={() => onOpen?.(trip)}>
      <div
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
        style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}
      >
        <img
          src={trip.img} alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transform: imgHover ? "scale(1.04)" : "scale(1)", transition: "transform 620ms var(--ease-out)" }}
        />
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <Badge variant="glass">{region}</Badge>
        </div>
        <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(243,244,242,0.88)", backdropFilter: "blur(8px)", width: 32, height: 32, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="heart" size={14} color="var(--fg)" />
        </div>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <Eyebrow style={{ fontSize: 10 }}>{days} · {tag}</Eyebrow>
        <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--fg)", margin: "6px 0 6px" }}>{name}</h3>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)" }}>{sub}</div>
        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontSize: 14, color: "var(--fg-muted)" }}>
            {t.trips.from} <span style={{ color: "var(--fg)", fontWeight: 500, fontSize: 18 }}>{trip.price} {t.trips.currency}</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-faint)" }}>
            {t.trips.curator} · {trip.curator}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function TripGrid({ onOpen }: { onOpen?: (t: Trip) => void }) {
  const { t } = useLocale();
  return (
    <section style={{ padding: "96px 72px 48px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
        <div>
          <Eyebrow>{t.trips.eyebrow}</Eyebrow>
          <h2 style={{ fontSize: 44, fontWeight: 300, letterSpacing: "-0.03em", color: "var(--fg)", margin: "8px 0 0", maxWidth: 560 }}>
            {t.trips.heading}
          </h2>
        </div>
        <Button variant="secondary">{t.trips.all}</Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
        {TRIPS.map((trip) => <TripCard key={trip.id} trip={trip} onOpen={onOpen} />)}
      </div>
    </section>
  );
}
