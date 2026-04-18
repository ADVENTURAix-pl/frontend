"use client";

import React, { useState } from "react";
import { Field, Input, Button } from "../shared";
import { useLocale } from "../../providers/LocaleProvider";

export function SearchBar() {
  const { t } = useLocale();
  const [dest, setDest]     = useState("");
  const [when, setWhen]     = useState("");
  const [guests, setGuests] = useState("2");

  return (
    <div style={{
      margin: "-56px 72px 0",
      position: "relative",
      zIndex: 10,
      background: "var(--adx-chalk)",
      borderRadius: 20,
      padding: 20,
      display: "flex",
      gap: 16,
      alignItems: "flex-end",
      boxShadow: "var(--shadow-4)",
    }}>
      <div style={{ flex: 2 }}>
        <Field label={t.search.dest_label}>
          <Input placeholder={t.search.dest_placeholder} value={dest} onChange={setDest} />
        </Field>
      </div>
      <div style={{ flex: 1 }}>
        <Field label={t.search.when_label}>
          <Input placeholder={t.search.when_placeholder} value={when} onChange={setWhen} />
        </Field>
      </div>
      <div style={{ width: 140 }}>
        <Field label={t.search.pax_label}>
          <Input placeholder={t.search.pax_placeholder} value={guests} onChange={setGuests} />
        </Field>
      </div>
      <Button size="lg">{t.search.cta}</Button>
    </div>
  );
}
