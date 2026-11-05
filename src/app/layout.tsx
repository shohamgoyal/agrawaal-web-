import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit, Playfair_Display } from "next/font/google";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { shop } from "@/lib/shop";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: `${shop.name} · ${shop.city}`,
    template: `%s · ${shop.name}`,
  },
  description:
    "Fresh mithai, namkeen and snacks from Agarwal Sweets, Mangolpuri, Delhi. Traditional Indian sweets made daily in desi ghee, sold by the kilo.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${playfair.variable} paisley-bg antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
