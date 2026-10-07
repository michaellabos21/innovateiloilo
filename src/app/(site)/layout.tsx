import type { Metadata } from "next";
import { Roboto, Titillium_Web } from "next/font/google";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/motion";
import "../globals.css";

const titillium = Titillium_Web({
  variable: "--font-titillium",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: { default: "Innovate Iloilo", template: "%s | Innovate Iloilo" },
  description:
    "A public-private movement to promote innovation in the city & province of Iloilo, Philippines.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${titillium.variable} ${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <ScrollProgress />
        <Suspense>
          <Header />
        </Suspense>
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
