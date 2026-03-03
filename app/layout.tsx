import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import Nav from "@/components/Nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — Diseñadora UX/UI",
  description:
    "Portfolio de Mariana Ghione: diseño de producto con foco en UX, sistemas y documentación.",
  openGraph: {
    title: "Portfolio — Diseñadora UX/UI",
    description: "Portfolio de Mariana Ghione: diseño de producto con foco en UX, sistemas y documentación.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} dark`}
    >
      <body suppressHydrationWarning className="antialiased">
        <LanguageProvider>
          <Nav />
          <main className="pl-32">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
