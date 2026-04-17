"use client";

import { AdventuraLogo } from "./AdventuraLogo";

const LINKS = {
  Explore: ["Destinations", "Experiences", "Travel Styles", "AI Planner"],
  Company: ["About", "Careers", "Press", "Contact"],
  Legal: ["Privacy", "Terms", "Cookie Policy"],
};

export const FOOTER_HEIGHT = 520;

export function Footer() {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: FOOTER_HEIGHT,
        zIndex: 1,
        background: "#565F59",
        color: "#F3F4F2",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "clamp(40px, 5vh, 60px) clamp(32px, 6vw, 80px) 32px",
        boxSizing: "border-box",
      }}
    >
      {/* Top row: brand + links */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 48,
          flexWrap: "wrap",
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: 300 }}>
          <AdventuraLogo starSize={32} textSize={20} color="#F3F4F2" />
          <p
            style={{
              marginTop: 16,
              fontSize: "0.9375rem",
              lineHeight: 1.65,
              color: "rgba(243,244,242,0.6)",
              fontWeight: 300,
              margin: "16px 0 0",
            }}
          >
            AI-powered travel experiences crafted for the curious explorer.
            Every journey, reimagined.
          </p>
        </div>

        {/* Link columns */}
        <div
          style={{
            display: "flex",
            gap: "clamp(32px, 5vw, 64px)",
            flexWrap: "wrap",
          }}
        >
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p
                style={{
                  margin: "0 0 16px",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(243,244,242,0.45)",
                  fontWeight: 500,
                }}
              >
                {group}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        color: "rgba(243,244,242,0.72)",
                        textDecoration: "none",
                        fontSize: "0.9375rem",
                        fontWeight: 300,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLAnchorElement).style.color = "#F3F4F2")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLAnchorElement).style.color =
                          "rgba(243,244,242,0.72)")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: copyright + tagline */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(243,244,242,0.12)",
          paddingTop: 24,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontSize: "0.8125rem",
            color: "rgba(243,244,242,0.4)",
            fontWeight: 300,
          }}
        >
          © 2026 ADVENTURAix. All rights reserved.
        </span>
        <span
          style={{
            fontSize: "0.8125rem",
            color: "rgba(243,244,242,0.4)",
            fontWeight: 300,
            letterSpacing: "0.06em",
          }}
        >
          Adventure, reimagined.
        </span>
      </div>
    </footer>
  );
}
