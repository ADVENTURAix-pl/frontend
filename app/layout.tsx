import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LenisProvider } from "./providers/LenisProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ADVENTURAix",
  description: "Adventure, reimagined.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body style={{ margin: 0, padding: 0 }}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
