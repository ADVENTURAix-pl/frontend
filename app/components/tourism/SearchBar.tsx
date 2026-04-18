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
    <div className="mx-6 md:mx-[72px] mt-[-56px] relative z-10 bg-[var(--adx-chalk)] rounded-2xl p-5 flex flex-col md:flex-row gap-4 md:items-end" style={{
      boxShadow: "var(--shadow-4)",
    }}>
      <div className="w-full md:flex-[2]">
        <Field label={t.search.dest_label}>
          <Input placeholder={t.search.dest_placeholder} value={dest} onChange={setDest} />
        </Field>
      </div>
      <div className="w-full md:flex-1">
        <Field label={t.search.when_label}>
          <Input placeholder={t.search.when_placeholder} value={when} onChange={setWhen} />
        </Field>
      </div>
      <div className="w-full md:w-[140px]">
        <Field label={t.search.pax_label}>
          <Input placeholder={t.search.pax_placeholder} value={guests} onChange={setGuests} />
        </Field>
      </div>
      <Button size="lg" className="w-full md:w-auto">{t.search.cta}</Button>
    </div>
  );
}
