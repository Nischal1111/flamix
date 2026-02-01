"use client";

import { Navbar, Footer } from "@/components/layout";
import { HeroPremium, Services, Portfolio, Blog } from "@/components/sections";

export default function Home() {
  return (
    <>
      {/* Main content that scrolls over the footer */}
      <main className="relative z-10 bg-background shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]">
        <Navbar />
        <HeroPremium />
        <Services />
        <Portfolio />
        <Blog />
      </main>

      {/* Sticky footer that gets revealed as content scrolls up */}
      <Footer />
    </>
  );
}
