"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, FolderKanban, User, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/#services", icon: Briefcase },
  { label: "Portfolio", href: "/#portfolio", icon: FolderKanban },
  { label: "About", href: "/about", icon: User },
  { label: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href.startsWith("#")) {
      return false; // Hash links are handled by scroll position
    }
    return pathname === href;
  };

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 px-2">
        <div className="bg-background border border-primary/20 rounded-full px-4 py-3 flex items-center gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center px-3 transition-opacity hover:opacity-80"
            aria-label="Flamix Technologies Home"
          >
            <img 
              src="/logo/logo_icon.png" 
              alt="Flamix Technologies Logo" 
              className="w-8 h-8 object-contain rounded-full"
            />
          </Link>

          {/* Desktop Navigation Items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            className="bg-linear-to-r from-primary to-secondary text-white rounded-full px-6 ml-2"
            size="sm"
            as={Link}
            href="/contact"
          >
            Get Started
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-primary/20">
        <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-[60px] ${
                  active
                    ? "text-primary bg-primary/10"
                    : "text-foreground/60"
                }`}
                aria-label={item.label}
              >
                <Icon className={`w-5 h-5 ${active ? "text-primary" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
