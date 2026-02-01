"use client";

import { Navbar, Footer } from "@/components/layout";
import { Contact } from "@/components/sections";

export default function ContactPage() {
  return (
    <main className="relative pb-20 md:pb-0">
      <Navbar />
      <Contact />
      <Footer />
    </main>
  );
}
