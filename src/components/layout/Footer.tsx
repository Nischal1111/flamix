"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ArrowUpRight,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

const footerLinks = {
  product: [
    { label: "Services", href: "/#services" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Case Studies", href: "#" },
    { label: "Pricing", href: "#" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Support", href: "#" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <footer
      ref={containerRef}
      className="relative bg-primary text-white"
      style={{
        // Sticky footer reveal effect
        position: "sticky",
        bottom: 0,
        zIndex: 0,
      }}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-20 pb-12">
        {/* Top Section - CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] font-heading max-w-4xl">
            Ready to build your next{" "}
            <span className="text-white/60">digital product?</span>
          </h2>
          <div className="mt-8">
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg group"
              >
                Get in Touch
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pb-16 border-b border-white/10"
        >
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <img
                src="/logo/logo_icon.png"
                alt="Flamix"
                className="w-10 h-10 rounded-xl brightness-0 invert"
              />
              <span className="font-bold text-xl">Flamix</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              We build digital products that help businesses grow and succeed in the modern world.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <Phone className="w-4 h-4" />
              <span>+977 9800000000</span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Flamix Technologies. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Large Brand Text */}
      <div className="overflow-hidden border-t border-white/5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="py-8 md:py-12"
        >
          <div className="flex items-center justify-center">
            <span className="text-[15vw] md:text-[12vw] font-bold text-white/[0.03] leading-none font-heading select-none">
              FLAMIX
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
