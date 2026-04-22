"use client";

import React, { useState } from "react";
import { AdventuraLogo } from "./AdventuraLogo";

interface NavbarProps {
  visible?: boolean;
}

export function Navbar({ visible = true }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "#F3F4F2",
        borderBottom: "1px solid rgba(86,95,89,0.12)",
        zIndex: 100,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <AdventuraLogo starSize={32} textSize={16} />

      {/* Desktop: Login + Sign Up */}
      <div className="hidden md:flex items-center gap-3">
        <button
          className="px-4 py-2 text-sm font-medium"
          style={{
            color: "#565F59",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            borderRadius: 999,
          }}
        >
          Log in
        </button>
        <button
          className="px-4 py-2 text-sm font-medium"
          style={{
            color: "#F3F4F2",
            background: "#565F59",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            border: "none",
            cursor: "pointer",
            borderRadius: 999,
          }}
        >
          Sign up
        </button>
      </div>

      {/* Mobile: Hamburger */}
      <button
        className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className="block w-5 transition-transform duration-200"
          style={{
            height: 2,
            background: "#565F59",
            transform: mobileMenuOpen ? "translateY(8px) rotate(45deg)" : "none",
          }}
        />
        <span
          className="block w-5 transition-opacity duration-200"
          style={{
            height: 2,
            background: "#565F59",
            opacity: mobileMenuOpen ? 0 : 1,
          }}
        />
        <span
          className="block w-5 transition-transform duration-200"
          style={{
            height: 2,
            background: "#565F59",
            transform: mobileMenuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0"
          style={{
            background: "#F3F4F2",
            borderBottom: "1px solid rgba(86,95,89,0.12)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <button
            className="w-full py-3 text-sm font-medium text-left px-4"
            style={{
              color: "#565F59",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: 999,
            }}
          >
            Log in
          </button>
          <button
            className="w-full py-3 text-sm font-medium px-4"
            style={{
              color: "#F3F4F2",
              background: "#565F59",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              border: "none",
              cursor: "pointer",
              borderRadius: 999,
            }}
          >
            Sign up
          </button>
        </div>
      )}
    </nav>
  );
}
