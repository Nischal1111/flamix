"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  Shield,
  Cpu,
  Globe,
  Layers,
  Code2,
  CheckCircle2,
  Star,
  Users,
  TrendingUp
} from "lucide-react";

// Animated counter for stats
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Floating badge component
function FloatingBadge({
  icon: Icon,
  text,
  className,
  delay = 0
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-primary/10"
      >
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{text}</span>
      </motion.div>
    </motion.div>
  );
}

// Animated text reveal
function TextReveal({ children, delay = 0 }: { children: string; delay?: number }) {
  const words = children.split(" ");

  return (
    <motion.span className="inline">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: delay + i * 0.08,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Client logos marquee
function ClientMarquee() {
  const clients = [
    "Microsoft", "Google", "Amazon", "Meta", "Apple",
    "Netflix", "Spotify", "Airbnb", "Uber", "Stripe"
  ];

  return (
    <div className="relative overflow-hidden py-8 mt-20">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex items-center gap-16 whitespace-nowrap"
      >
        {[...clients, ...clients, ...clients, ...clients].map((client, i) => (
          <span
            key={i}
            className="text-foreground/30 text-xl font-bold tracking-wider"
          >
            {client}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Video play button
function PlayButton({ onClick }: { onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.95 }}
      className="relative group"
    >
      {/* Pulse rings */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-primary/20"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className="absolute inset-0 rounded-full bg-primary/10"
      />

      {/* Button */}
      <div className="relative w-16 h-16 rounded-full bg-white shadow-xl flex items-center justify-center">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
        >
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        </motion.div>
      </div>

      {/* Label */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 text-sm font-medium whitespace-nowrap"
      >
        Watch Demo
      </motion.span>
    </motion.button>
  );
}

export function HeroPremium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const smoothY = useSpring(y, { stiffness: 50, damping: 20 });
  const smoothImageY = useSpring(imageY, { stiffness: 50, damping: 20 });

  // Stats data
  const stats = [
    { value: 150, suffix: "+", label: "Projects Delivered", icon: Layers },
    { value: 50, suffix: "+", label: "Happy Clients", icon: Users },
    { value: 99, suffix: "%", label: "Success Rate", icon: TrendingUp },
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-accent/20 via-background to-background"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(122, 28, 172, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(122, 28, 172, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 -left-40 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 -right-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Text content */}
          <motion.div style={{ y: smoothY, opacity, scale }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Award-Winning Digital Agency
              </span>
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
            </motion.div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight font-heading mb-6">
              <TextReveal delay={0.2}>We Build</TextReveal>
              <br />
              <span className="relative inline-block">
                <TextReveal delay={0.4}>Digital</TextReveal>{" "}
                <span className="relative">
                  <TextReveal delay={0.5}>Experiences</TextReveal>
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <motion.path
                      d="M2 10C50 2 100 2 150 6C200 10 250 10 298 2"
                      stroke="url(#gradient)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                        <stop offset="0%" stopColor="#7A1CAC" />
                        <stop offset="100%" stopColor="#AD49E1" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </span>
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                <TextReveal delay={0.6}>That Matter</TextReveal>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-lg sm:text-xl text-foreground/60 max-w-xl mb-10 leading-relaxed"
            >
              We transform bold ideas into exceptional digital products.
              From cloud infrastructure to AI-powered solutions, we craft
              technology that drives growth and inspires innovation.
            </motion.p>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {["Scalable Solutions", "24/7 Support", "Agile Development"].map((feature, i) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-foreground/70"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-60 blur group-hover:opacity-80 transition-opacity" />

                  <div className="relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>

              <PlayButton />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-wrap gap-8 mt-12 pt-12 border-t border-primary/10"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-foreground/50">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            style={{ y: smoothImageY, scale: imageScale }}
            className="relative hidden lg:block"
          >
            {/* Main image container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              className="relative"
            >
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] relative">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=1000&fit=crop"
                    alt="Modern workspace with technology"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>

                {/* Floating stats card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/60">Project Success Rate</p>
                      <p className="text-2xl font-bold text-primary">99.9%</p>
                    </div>
                    <div className="w-16 h-16">
                      <svg viewBox="0 0 36 36" className="w-full h-full">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="#EBD3F8"
                          strokeWidth="3"
                        />
                        <motion.circle
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 0.999 }}
                          transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="url(#progressGradient)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                        <defs>
                          <linearGradient id="progressGradient" x1="0" y1="0" x2="100%" y2="0">
                            <stop offset="0%" stopColor="#7A1CAC" />
                            <stop offset="100%" stopColor="#AD49E1" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating badges */}
              <FloatingBadge
                icon={Globe}
                text="Global Reach"
                className="-top-4 -left-8"
                delay={0.8}
              />
              <FloatingBadge
                icon={Zap}
                text="Fast Delivery"
                className="top-1/3 -right-12"
                delay={1}
              />
              <FloatingBadge
                icon={Shield}
                text="Secure & Reliable"
                className="bottom-32 -left-16"
                delay={1.2}
              />
            </motion.div>

            {/* Background decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 w-1 h-8 bg-gradient-to-b from-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-1/2 w-1 h-8 bg-gradient-to-t from-secondary/20 to-transparent" />
                <div className="absolute left-0 top-1/2 w-8 h-1 bg-gradient-to-r from-primary/20 to-transparent" />
                <div className="absolute right-0 top-1/2 w-8 h-1 bg-gradient-to-l from-secondary/20 to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <p className="text-center text-sm text-foreground/40 mb-4">
            Trusted by leading companies worldwide
          </p>
          <ClientMarquee />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroPremium;
