"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Cloud Solutions", href: "#" },
    { label: "Custom Development", href: "#" },
    { label: "AI & ML", href: "#" },
    { label: "DevOps", href: "#" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/#portfolio" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "Support", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4 transition-opacity hover:opacity-80">
              <img 
                src="/logo/logo_icon.png" 
                alt="Flamix Technologies Logo" 
                className="w-8 h-8 object-contain rounded-full"
              />
              <span className="font-bold text-2xl">Flamix Technologies</span>
            </a>
            <p className="text-foreground/60 mb-6 max-w-sm">
              Empowering businesses with cutting-edge technology solutions.
              From cloud infrastructure to AI-powered applications, we build the future.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-lg mb-4 capitalize">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-foreground/60 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-sm">
            &copy; {new Date().getFullYear()} Flamix Technologies. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-foreground/50">
            <a href="#" className="text-primary hover:opacity-80 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="text-primary hover:opacity-80 transition-opacity">
              Terms of Service
            </a>
            <a href="#" className="text-primary hover:opacity-80 transition-opacity">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
