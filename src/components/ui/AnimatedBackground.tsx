"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Animated gradient orbs background
interface GradientOrbsProps {
  children: React.ReactNode;
  className?: string;
  orbCount?: number;
}

// Seeded pseudo-random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export function GradientOrbs({
  children,
  className = "",
  orbCount = 3,
}: GradientOrbsProps) {
  const orbs = React.useMemo(() => {
    return Array.from({ length: orbCount }, (_, i) => ({
      id: i,
      size: seededRandom(i * 1) * 400 + 300,
      x: seededRandom(i * 2) * 100,
      y: seededRandom(i * 3) * 100,
      duration: seededRandom(i * 4) * 10 + 15,
      delay: seededRandom(i * 5) * 5,
      color: i % 2 === 0 ? "primary" : "secondary",
    }));
  }, [orbCount]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full blur-[100px] ${
              orb.color === "primary" ? "bg-primary/20" : "bg-secondary/20"
            }`}
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Noise texture overlay
interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
}

export function NoiseOverlay({ opacity = 0.03, className = "" }: NoiseOverlayProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

// Animated gradient text background
interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationDuration?: number;
}

export function AnimatedGradientText({
  children,
  className = "",
  colors = ["#7A1CAC", "#AD49E1", "#7A1CAC"],
  animationDuration = 3,
}: AnimatedGradientTextProps) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
      }}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: animationDuration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

// Radial gradient spotlight
interface RadialSpotlightProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  size?: string;
  position?: string;
}

export function RadialSpotlight({
  children,
  className = "",
  color = "rgba(122, 28, 172, 0.15)",
  size = "800px",
  position = "50% 0%",
}: RadialSpotlightProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(${size} circle at ${position}, ${color}, transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Scroll-based gradient shift
interface ScrollGradientProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollGradient({ children, className = "" }: ScrollGradientProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const hue = useTransform(scrollYProgress, [0, 1], [280, 320]);
  const smoothHue = useSpring(hue, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        background: `linear-gradient(180deg, hsl(${smoothHue}, 70%, 20%) 0%, transparent 100%)`,
      }}
    >
      {children}
    </motion.div>
  );
}

// Beam lines background
interface BeamLinesProps {
  children: React.ReactNode;
  className?: string;
  lineCount?: number;
}

export function BeamLines({
  children,
  className = "",
  lineCount = 5,
}: BeamLinesProps) {
  const lines = React.useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => ({
      id: i,
      left: `${(i / lineCount) * 100}%`,
      delay: i * 0.5,
      duration: 3 + seededRandom(i * 7) * 2,
    }));
  }, [lineCount]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Beam lines */}
      <div className="absolute inset-0 pointer-events-none">
        {lines.map((line) => (
          <motion.div
            key={line.id}
            className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            style={{ left: line.left }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scaleY: [0, 1, 1, 0],
            }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Dot grid pattern
interface DotGridProps {
  children: React.ReactNode;
  className?: string;
  dotSize?: number;
  dotSpacing?: number;
  dotColor?: string;
}

export function DotGrid({
  children,
  className = "",
  dotSize = 1,
  dotSpacing = 30,
  dotColor = "rgba(122, 28, 172, 0.2)",
}: DotGridProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Stripe-style animated gradient
interface StripeGradientProps {
  className?: string;
}

export function StripeGradient({ className = "" }: StripeGradientProps) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: `
          radial-gradient(at 27% 37%, hsla(280, 60%, 30%, 0.8) 0px, transparent 50%),
          radial-gradient(at 97% 21%, hsla(290, 70%, 40%, 0.6) 0px, transparent 50%),
          radial-gradient(at 52% 99%, hsla(300, 60%, 35%, 0.7) 0px, transparent 50%),
          radial-gradient(at 10% 29%, hsla(270, 50%, 25%, 0.8) 0px, transparent 50%),
          radial-gradient(at 97% 96%, hsla(285, 65%, 30%, 0.6) 0px, transparent 50%),
          radial-gradient(at 33% 50%, hsla(295, 55%, 35%, 0.7) 0px, transparent 50%),
          radial-gradient(at 79% 53%, hsla(275, 60%, 28%, 0.8) 0px, transparent 50%)
        `,
        filter: "blur(100px) saturate(150%)",
      }}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Vignette effect
interface VignetteProps {
  intensity?: "light" | "medium" | "strong";
  className?: string;
}

export function Vignette({ intensity = "medium", className = "" }: VignetteProps) {
  const intensityMap = {
    light: "rgba(0,0,0,0.3)",
    medium: "rgba(0,0,0,0.5)",
    strong: "rgba(0,0,0,0.7)",
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(ellipse at center, transparent 40%, ${intensityMap[intensity]} 100%)`,
      }}
    />
  );
}
