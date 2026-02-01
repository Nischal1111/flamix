"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Briefcase, FolderKanban, User, Mail, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/#services", icon: Briefcase },
  { label: "Portfolio", href: "/#portfolio", icon: FolderKanban },
  { label: "About", href: "/about", icon: User },
  { label: "Contact", href: "/contact", icon: Mail },
];

// Magnetic link component for premium hover effects
function MagneticNavLink({
  href,
  children,
  isActive,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
        isActive
          ? "text-white"
          : "text-foreground/70 hover:text-foreground"
      }`}
    >
      {/* Active indicator background */}
      {isActive && (
        <motion.span
          layoutId="activeNav"
          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Hover glow effect */}
      <motion.span
        className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at center, rgba(122, 28, 172, 0.15) 0%, transparent 70%)",
        }}
      />

      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

// Animated CTA button
function NavCTAButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/contact">
      <motion.div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-60 blur-lg"
          animate={{
            opacity: isHovered ? 0.8 : 0.4,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Button */}
        <div className="relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium text-sm overflow-hidden">
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          <Sparkles className="w-4 h-4" />
          <span>Get Started</span>
          <motion.span
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </div>
      </motion.div>
    </Link>
  );
}

// Mobile menu overlay
function MobileMenu({
  isOpen,
  onClose,
  pathname
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background/95 backdrop-blur-xl border-l border-primary/10 z-50 md:hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo */}
            <div className="p-6 pt-20">
              <Link href="/" onClick={onClose} className="flex items-center gap-3">
                <img
                  src="/logo/logo_icon.png"
                  alt="Flamix"
                  className="w-10 h-10 rounded-xl"
                />
                <span className="font-bold text-xl">Flamix</span>
              </Link>
            </div>

            {/* Nav items */}
            <nav className="px-6 py-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl mb-2 transition-all ${
                        active
                          ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary"
                          : "hover:bg-muted/50 text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? "text-primary" : ""}`} />
                      <span className="font-medium">{item.label}</span>
                      {active && (
                        <motion.div
                          layoutId="mobileActive"
                          className="ml-auto w-2 h-2 rounded-full bg-primary"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="absolute bottom-8 left-6 right-6">
              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold"
              >
                <Sparkles className="w-5 h-5" />
                Start Your Project
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block fixed top-0 left-0 right-0 z-50 px-6 pt-4"
      >
        <motion.nav
          animate={{
            backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)",
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0)",
            boxShadow: isScrolled ? "0 4px 30px rgba(122, 28, 172, 0.1)" : "none",
            borderColor: isScrolled ? "rgba(122, 28, 172, 0.1)" : "transparent",
          }}
          transition={{ duration: 0.3 }}
          className="max-w-6xl mx-auto flex items-center justify-between px-2 py-2 rounded-2xl border"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 pl-3">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/logo/logo_icon.png"
                alt="Flamix Technologies"
                className="w-9 h-9 rounded-xl object-contain"
              />
            </motion.div>
            <motion.span
              className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Flamix
            </motion.span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <MagneticNavLink
                key={item.label}
                href={item.href}
                isActive={isActive(item.href)}
                onClick={(e) => handleNavClick(item.href, e)}
              >
                {item.label}
              </MagneticNavLink>
            ))}
          </div>

          {/* CTA Button */}
          <NavCTAButton />
        </motion.nav>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 pt-3"
      >
        <motion.nav
          animate={{
            backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)",
            backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
            boxShadow: isScrolled ? "0 4px 30px rgba(122, 28, 172, 0.1)" : "0 2px 20px rgba(0, 0, 0, 0.05)",
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between px-4 py-3 rounded-2xl border border-primary/10"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo/logo_icon.png"
              alt="Flamix"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="font-bold text-base bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Flamix
            </span>
          </Link>

          {/* Menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
