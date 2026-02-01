"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  glowColor?: string;
  rotationIntensity?: number;
  glareEnabled?: boolean;
  borderGlow?: boolean;
  floatingElements?: React.ReactNode;
}

export function Card3D({
  children,
  className = "",
  containerClassName = "",
  glowColor = "rgba(122, 28, 172, 0.4)",
  rotationIntensity = 15,
  glareEnabled = true,
  borderGlow = true,
  floatingElements,
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [rotationIntensity, -rotationIntensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-rotationIntensity, rotationIntensity]), springConfig);

  // Glare effect position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  // Floating elements parallax
  const floatX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const floatY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className={`perspective-1000 ${containerClassName}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative rounded-2xl transition-shadow duration-500 ${className}`}
      >
        {/* Glow border effect */}
        {borderGlow && (
          <motion.div
            className="absolute -inset-[1px] rounded-2xl opacity-0 blur-sm transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${glowColor}, transparent, ${glowColor})`,
              opacity: isHovered ? 0.8 : 0,
            }}
          />
        )}

        {/* Main card content */}
        <div
          className="relative rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

          {/* Glare effect */}
          {glareEnabled && (
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, transparent 50%)`,
                opacity: isHovered ? 1 : 0,
              }}
            />
          )}

          {/* Floating decorative elements */}
          {floatingElements && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                x: floatX,
                y: floatY,
                transformStyle: "preserve-3d",
                transform: "translateZ(40px)",
              }}
            >
              {floatingElements}
            </motion.div>
          )}

          {/* Content */}
          <div style={{ transform: "translateZ(20px)" }}>{children}</div>
        </div>

        {/* Shadow that follows the tilt */}
        <motion.div
          className="absolute -z-10 inset-4 rounded-2xl blur-2xl transition-opacity duration-500"
          style={{
            background: glowColor,
            opacity: isHovered ? 0.3 : 0.1,
          }}
        />
      </motion.div>
    </div>
  );
}

// Glassmorphism Card variant
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className = "",
  blur = "lg",
  opacity = 10,
  hoverEffect = true,
}: GlassCardProps) {
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hoverEffect ? { y: -5, scale: 1.02 } : undefined}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative rounded-2xl overflow-hidden
        bg-white/${opacity} ${blurClasses[blur]}
        border border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,0.1)]
        ${hoverEffect ? "hover:shadow-[0_16px_48px_rgba(122,28,172,0.15)] hover:border-primary/30" : ""}
        transition-all duration-500
        ${className}
      `}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Spotlight Card - follows cursor with spotlight effect
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(122, 28, 172, 0.15)",
  spotlightSize = 300,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`
        relative rounded-2xl overflow-hidden
        bg-muted/50 border border-primary/10
        hover:border-primary/30 transition-colors duration-500
        ${className}
      `}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Border gradient that follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(${spotlightSize * 0.5}px circle at ${position.x}px ${position.y}px, rgba(122,28,172,0.3), transparent 50%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
