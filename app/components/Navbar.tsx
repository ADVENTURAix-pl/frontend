"use client";

import React from "react";
import { AdventuraLogo } from "./AdventuraLogo";

interface NavbarProps {
  visible?: boolean;
}

export function Navbar({ visible = true }: NavbarProps) {
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
        padding: "0 24px",
        background: "#F3F4F2",
        borderBottom: "1px solid rgba(86,95,89,0.12)",
        zIndex: 100,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease-out",
      }}
    >
      <AdventuraLogo starSize={32} textSize={16} />
    </nav>
  );
}
