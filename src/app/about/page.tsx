"use client";

import { Navbar, Footer } from "@/components/layout";
import { About } from "@/components/sections";

export default function AboutPage() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <About />
      <Footer />
    </main>
  );
}
