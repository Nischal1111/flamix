"use client";

import { Navbar, Footer } from "@/components/layout";
import { HeroPremium, Services, Portfolio, Blog } from "@/components/sections";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroPremium />
      <Services />
      <Portfolio />
      <Blog />
      <Footer />
    </main>
  );
}
