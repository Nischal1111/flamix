"use client";

import { Navbar, Footer } from "@/components/layout";
import { HeroPremium, Services, Portfolio } from "@/components/sections";

export default function Home() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <HeroPremium />
      <Services />
      <Portfolio />
      <Footer />
    </main>
  );
}
