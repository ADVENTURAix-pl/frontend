"use client";

import React, { createContext, useContext, useState } from "react";

export type Locale = "pl" | "en";

export const translations = {
  pl: {
    nav: {
      discover: "Podróże", education: "Edukacja", club: "Klub", about: "O nas", plan: "Zaplanuj",
    },
    hero: {
      badge: "Jakość ponad ilość",
      heading: "Podróżuj uważnie.",
      subheading: "Travel with intention.",
      body: "Butikowe podróże planowane przez ludzi, układane przez AI — dla podróżnych, którzy wolą jakość od liczby kilometrów.",
      cta_plan: "Zaplanuj podróż",
      cta_how: "Zobacz, jak działamy →",
    },
    search: {
      dest_label: "Destynacja", dest_placeholder: "Bałkany, Maroko, Jordania…",
      when_label: "Termin",     when_placeholder: "Kwiecień 2026",
      pax_label:  "Podróżni",  pax_placeholder: "2",
      cta: "Znajdź trasę",
    },
    beach: {
      scroll: "Przewiń, by odkrywać",
      heading: "Gdzie zaczyna się\npodróż.",
    },
    why: {
      label: "Dlaczego ADVENTURAix",
      features: [
        { title: "Trasy tworzone przez AI",          body: "Każda podróż jest generowana wokół Twoich zainteresowań, tempa i budżetu — nie szablonu." },
        { title: "Adaptacja w czasie rzeczywistym",  body: "Pogoda, tłumy, lokalne wydarzenia — Twoja trasa zmienia się dynamicznie, by podróż zawsze była wyjątkowa." },
        { title: "Kuratorska, nie tłumna",           body: "Współpracujemy z lokalnymi ekspertami. Żadnego influencer-fluffu — tylko głęboko zbadane miejsca warte odwiedzenia." },
      ],
    },
    trips: {
      eyebrow: "Kuratorzy · Curators",
      heading: "Cztery trasy, każda ułożona ręcznie.",
      all: "Wszystkie wyprawy →",
      from: "od",
      currency: "zł",
      curator: "kurator",
    },
    manifesto: {
      eyebrow: "Nasza filozofia",
      quote: "Świat nie potrzebuje więcej pakietów podróżnych — potrzebuje lepszych. Dlatego odeszliśmy od taśmy produkcyjnej „all-inclusive\".",
      pillars: [
        { key: "Creative curation",   title: "Kreatywna kuracja",       body: "Nasz zespół wymyśla przygodę, szuka lokalnych sekretów i projektuje emocjonalny rdzeń podróży." },
        { key: "AI arrangement",      title: "Aranżacja AI",            body: "Silnik AI zajmuje się ciężarem logistycznym — optymalizuje trasy i analizuje tysiące danych." },
        { key: "Secure tech",         title: "Bezpieczna technologia",  body: "Apple Pay i Visa. Aplikacja iOS i Android zostaje uruchomiona w 2026 roku." },
      ],
    },
    partners: {
      eyebrow: "Partnerzy · Partners",
      heading: "Wspólnota 200 000+ zweryfikowanych podróżników.",
      followers: "obserwujących",
    },
    cta: {
      heading: "Gotowy na odkrycia?",
      body: "Zaplanuj swoją pierwszą podróż zasilaną przez AI już dziś.",
      button: "Zaplanuj podróż",
    },
    loyalty: {
      eyebrow: "Program lojalnościowy · ADX Points",
      heading: "Twoje punkty, twoje upgrade'y.",
      balance_label: "Saldo punktów",
      last_update: "ostatnia aktualizacja · dziś",
      status: "Status:",
      progress: "760 pkt do statusu Pioneer",
      redeem_eyebrow: "Do wymiany · redeem",
      rewards: [
        ["Upgrade do suity",    "420 pkt"],
        ["Prywatny przewodnik", "680 pkt"],
        ["Warsztat kulinarny",  "340 pkt"],
        ["Dzień spa",           "520 pkt"],
      ],
    },
    footer: {
      tagline: "Most pomiędzy europejską innowacją a globalnym podróżnikiem. Poznań, Polska.",
      cols: [
        { h: "Podróże", l: ["Bałkany", "Maroko", "Jordania", "Gruzja"] },
        { h: "Firma",   l: ["O nas", "Zespół", "Partnerzy", "Kontakt"] },
        { h: "Prawo",   l: ["Regulamin", "Prywatność", "Cookies", "Reklamacje"] },
      ],
      copy: "© 2026 ADVENTURAix. Wszelkie prawa zastrzeżone. · Adventuraix Sp. z o.o. · NIP: 123-456-78-90",
      tagline2: "Przygoda, przemyślana na nowo.",
      payments: "Apple Pay · Visa · Mastercard",
    },
    about: {
      eyebrow: "O nas · About",
      heading: "Most pomiędzy europejską innowacją a globalnym podróżnikiem.",
      subheading: "A bridge between European innovation and the global traveller.",
      body: "ADVENTURAix powstało z przekonania, że podróżowanie może być jednocześnie odważne i uważne. Łączymy kreatywną kurację ludzką z precyzją silnika AI — by każda trasa była wyjątkowa, a nie seryjnie wyprodukowana.",
      stats: [
        { label: "Zweryfikowanych podróżników", value: "200K+" },
        { label: "Kuratorów-ekspertów",          value: "12" },
        { label: "Destynacji",                   value: "28+" },
      ],
    },
  },
  en: {
    nav: {
      discover: "Trips", education: "Education", club: "Club", about: "About", plan: "Plan a trip",
    },
    hero: {
      badge: "Quality over quantity",
      heading: "Travel with intention.",
      subheading: "Podróżuj uważnie.",
      body: "Boutique journeys planned by humans, arranged by AI — for travellers who prefer quality over kilometres.",
      cta_plan: "Plan a trip",
      cta_how: "See how we work →",
    },
    search: {
      dest_label: "Destination",  dest_placeholder: "Balkans, Morocco, Jordan…",
      when_label: "When",         when_placeholder: "April 2026",
      pax_label:  "Travellers",   pax_placeholder: "2",
      cta: "Find route",
    },
    beach: {
      scroll: "Scroll to explore",
      heading: "Where the journey\nbegins.",
    },
    why: {
      label: "Why ADVENTURAix",
      features: [
        { title: "AI-Crafted Itineraries",   body: "Every trip is generated around your interests, pace, and budget — not a generic template." },
        { title: "Real-Time Adaptation",     body: "Weather, crowds, local events — your itinerary shifts dynamically so the journey always feels right." },
        { title: "Curated, Not Crowdsourced",body: "We partner with local experts. No influencer fluff, just deeply researched places worth visiting." },
      ],
    },
    trips: {
      eyebrow: "Curators",
      heading: "Four routes, each crafted by hand.",
      all: "All expeditions →",
      from: "from",
      currency: "PLN",
      curator: "curator",
    },
    manifesto: {
      eyebrow: "Our philosophy",
      quote: "The world doesn't need more travel packages — it needs better ones. That's why we walked away from the all-inclusive production line.",
      pillars: [
        { key: "Creative curation",  title: "Creative curation",      body: "Our team dreams up the adventure, hunts local secrets, and designs the emotional core of every journey." },
        { key: "AI arrangement",     title: "AI arrangement",         body: "The AI engine takes care of the logistical heavy lifting — optimising routes and parsing thousands of data points." },
        { key: "Secure tech",        title: "Secure technology",      body: "Apple Pay and Visa. iOS and Android app launching in 2026." },
      ],
    },
    partners: {
      eyebrow: "Partners",
      heading: "A community of 200,000+ verified travellers.",
      followers: "followers",
    },
    cta: {
      heading: "Ready to explore?",
      body: "Start planning your first AI-powered adventure today.",
      button: "Plan a trip",
    },
    loyalty: {
      eyebrow: "Loyalty programme · ADX Points",
      heading: "Your points, your upgrades.",
      balance_label: "Points balance",
      last_update: "last updated · today",
      status: "Status:",
      progress: "760 pts to Pioneer status",
      redeem_eyebrow: "Redeem",
      rewards: [
        ["Suite upgrade",      "420 pts"],
        ["Private guide",      "680 pts"],
        ["Culinary workshop",  "340 pts"],
        ["Spa day",            "520 pts"],
      ],
    },
    footer: {
      tagline: "A bridge between European innovation and the global traveller. Poznań, Poland.",
      cols: [
        { h: "Trips",    l: ["Balkans", "Morocco", "Jordan", "Georgia"] },
        { h: "Company",  l: ["About", "Team", "Partners", "Contact"] },
        { h: "Legal",    l: ["Terms", "Privacy", "Cookies", "Complaints"] },
      ],
      copy: "© 2026 ADVENTURAix. All rights reserved. · Adventuraix Sp. z o.o. · NIP: 123-456-78-90",
      tagline2: "Adventure, reimagined.",
      payments: "Apple Pay · Visa · Mastercard",
    },
    about: {
      eyebrow: "About · O nas",
      heading: "A bridge between European innovation and the global traveller.",
      subheading: "Most pomiędzy europejską innowacją a globalnym podróżnikiem.",
      body: "ADVENTURAix was born from the belief that travel can be both bold and thoughtful. We combine human creative curation with AI engine precision — so every route is unique, never mass-produced.",
      stats: [
        { label: "Verified travellers", value: "200K+" },
        { label: "Expert curators",     value: "12" },
        { label: "Destinations",        value: "28+" },
      ],
    },
  },
} as const;

export type T = {
  nav: { discover: string; education: string; club: string; about: string; plan: string };
  hero: { badge: string; heading: string; subheading: string; body: string; cta_plan: string; cta_how: string };
  search: { dest_label: string; dest_placeholder: string; when_label: string; when_placeholder: string; pax_label: string; pax_placeholder: string; cta: string };
  beach: { scroll: string; heading: string };
  why: { label: string; features: ReadonlyArray<{ title: string; body: string }> };
  trips: { eyebrow: string; heading: string; all: string; from: string; currency: string; curator: string };
  manifesto: { eyebrow: string; quote: string; pillars: ReadonlyArray<{ key: string; title: string; body: string }> };
  partners: { eyebrow: string; heading: string; followers: string };
  cta: { heading: string; body: string; button: string };
  loyalty: { eyebrow: string; heading: string; balance_label: string; last_update: string; status: string; progress: string; redeem_eyebrow: string; rewards: ReadonlyArray<readonly [string, string]> };
  footer: { tagline: string; cols: ReadonlyArray<{ h: string; l: ReadonlyArray<string> }>; copy: string; tagline2: string; payments: string };
  about: { eyebrow: string; heading: string; subheading: string; body: string; stats: ReadonlyArray<{ label: string; value: string }> };
};

type LocaleCtx = { locale: Locale; setLocale: (l: Locale) => void; t: T };

const LocaleContext = createContext<LocaleCtx>({
  locale: "pl",
  setLocale: () => {},
  t: translations.pl as unknown as T,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pl");
  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translations[locale] as unknown as T }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
