"use client";

import React from "react";
import { Logo, Eyebrow } from "./shared";
import { useLocale } from "../providers/LocaleProvider";

export function Footer() {
  const { t } = useLocale();
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const update = () => {
      document.body.style.setProperty("--footer-h", `${ref.current?.getBoundingClientRect().height}px`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(ref.current);
    update(); // initial sync
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-0 bg-[var(--adx-paper-warm)] font-sans flex flex-col justify-between p-4 md:p-10 lg:px-[80px] lg:pt-[52px] lg:pb-[28px] box-border lg:min-h-[380px]"
    >
      {/* Top row */}
      <div className="w-full">
        {/* Mobile: compact logo above columns */}
        <div className="md:hidden mb-3">
          <Logo size={20} />
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-x-3 md:gap-x-4 md:gap-y-8 lg:gap-12 w-full">
          {/* Desktop brand */}
          <div className="hidden md:block md:col-span-1">
            <Logo size={24} />
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: "var(--fg-muted)", fontWeight: 300, maxWidth: 300 }}>
              {t.footer.tagline}
            </p>
          </div>

          {t.footer.cols.map((col) => (
            <div key={col.h} className="col-span-1">
              <Eyebrow>{col.h}</Eyebrow>
              <ul className="mt-2 md:mt-[14px] flex flex-col gap-1 md:gap-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {col.l.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[11px] md:text-[13px]"
                      style={{ color: "var(--fg-muted)", textDecoration: "none", transition: "color 180ms var(--ease-out)" }}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--fg)")}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--fg-muted)")}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-6 md:mt-12 lg:mt-0 pt-4 md:pt-5 border-t border-[var(--adx-sage-a12)] flex flex-col md:flex-row justify-between items-start md:items-center flex-wrap gap-3 font-mono text-[11px] text-[var(--fg-faint)]">
        <span>{t.footer.copy}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span>{t.footer.tagline2}</span>
          <Logo size={13} />
          <span style={{ marginLeft: 6 }}>{t.footer.payments}</span>
        </span>
      </div>
    </footer>
  );
}
