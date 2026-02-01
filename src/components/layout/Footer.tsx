"use client";

import { useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Heart,
  ExternalLink,
  Send
} from "lucide-react";
import Link from "next/link";

const footerLinks = {
  services: [
    { label: "Cloud Solutions", href: "/#services" },
    { label: "Custom Development", href: "/#services" },
    { label: "AI & Machine Learning", href: "/#services" },
    { label: "DevOps & CI/CD", href: "/#services" },
    { label: "Cybersecurity", href: "/#services" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Portfolio", href: "/#portfolio" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Support Center", href: "#" },
    { label: "Status Page", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub", color: "#333" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "#0A66C2" },
  { icon: Twitter, href: "#", label: "Twitter", color: "#1DA1F2" },
  { icon: Mail, href: "mailto:hello@flamix.tech", label: "Email", color: "#EA4335" },
];

const contactInfo = [
  { icon: MapPin, text: "Kathmandu, Nepal", label: "Location" },
  { icon: Phone, text: "+977 9800000000", label: "Phone" },
  { icon: Clock, text: "Mon - Fri, 9AM - 6PM", label: "Hours" },
];

// Magnetic social icon component
function MagneticSocialIcon({
  href,
  icon: Icon,
  label,
  color
}: {
  href: string;
  icon: typeof Github;
  label: string;
  color: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={label}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group"
    >
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: isHovered ? `${color}15` : "rgba(122, 28, 172, 0.05)",
          borderColor: isHovered ? color : "rgba(122, 28, 172, 0.1)",
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
      >
        <Icon
          className="w-5 h-5 transition-colors duration-300"
          style={{ color: isHovered ? color : "currentColor" }}
        />
      </motion.div>

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.8,
        }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg whitespace-nowrap"
      >
        {label}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-foreground rotate-45" />
      </motion.span>
    </motion.a>
  );
}

// Newsletter subscription component
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />

        <div className="relative flex items-center bg-muted/50 rounded-xl border border-primary/10 overflow-hidden">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3.5 bg-transparent text-foreground placeholder:text-foreground/40 focus:outline-none text-sm"
          />
          <motion.button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
          >
            {isSubmitted ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Subscribed!</span>
              </>
            ) : isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </form>
  );
}

// Animated link component
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors duration-300"
    >
      <motion.span
        className="w-0 h-px bg-primary"
        whileHover={{ width: 12 }}
        transition={{ duration: 0.2 }}
      />
      <span>{children}</span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <footer ref={containerRef} className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-muted/50" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Top CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="py-16 md:py-20 border-b border-primary/10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm text-primary font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Ready to Transform Your Business?
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading">
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h2>

            <p className="text-foreground/60 text-lg mb-8 max-w-2xl mx-auto">
              Partner with us to bring your vision to life. From concept to deployment,
              we&apos;re here to make it happen.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-60 blur group-hover:opacity-80 transition-opacity" />
                  <div className="relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>

              <Link
                href="/#portfolio"
                className="flex items-center gap-2 px-8 py-4 border border-primary/20 rounded-xl font-semibold hover:bg-primary/5 transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <motion.img
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                src="/logo/logo_icon.png"
                alt="Flamix Technologies"
                className="w-10 h-10 rounded-xl"
              />
              <span className="font-bold text-xl">Flamix Technologies</span>
            </Link>

            <p className="text-foreground/60 mb-6 leading-relaxed">
              Empowering businesses with cutting-edge technology solutions.
              We transform ideas into digital excellence through innovation,
              expertise, and unwavering commitment to quality.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-foreground/60">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <MagneticSocialIcon
                  key={social.label}
                  {...social}
                />
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="lg:col-span-2"
            >
              <h4 className="font-semibold text-lg mb-5 capitalize">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <h4 className="font-semibold text-lg mb-5">Stay Updated</h4>
            <p className="text-foreground/60 text-sm mb-4">
              Get the latest updates on tech trends and our newest projects.
            </p>
            <NewsletterForm />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="py-6 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-foreground/50 text-sm flex items-center gap-1">
            &copy; {new Date().getFullYear()} Flamix Technologies. Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
            in Nepal
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-foreground/50 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
