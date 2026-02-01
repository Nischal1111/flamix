"use client";

import { Navbar, Footer } from "@/components/layout";
import { Hero, Services, Portfolio } from "@/components/sections";

export default function Home() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Footer />
    </main>
  );
}
