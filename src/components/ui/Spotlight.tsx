"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Seeded pseudo-random for deterministic values
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Cursor spotlight that follows the mouse
interface SpotlightProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  blur?: number;
}

export function Spotlight({
  children,
  className = "",
  spotlightColor = "rgba(122, 28, 172, 0.15)",
  spotlightSize = 400,
  blur = 80,
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        style={{
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 60%)`,
          filter: `blur(${blur}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}

// Grid spotlight effect (like Stripe)
interface GridSpotlightProps {
  children: React.ReactNode;
  className?: string;
  gridColor?: string;
  spotlightColor?: string;
}

export function GridSpotlight({
  children,
  className = "",
  gridColor = "rgba(122, 28, 172, 0.05)",
  spotlightColor = "rgba(122, 28, 172, 0.1)",
}: GridSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${gridColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial spotlight on grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Aurora/Northern lights effect background
interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function AuroraBackground({
  children,
  className = "",
  intensity = "medium",
}: AuroraBackgroundProps) {
  const opacityMap = {
    low: "opacity-30",
    medium: "opacity-50",
    high: "opacity-70",
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora blobs */}
      <div className={`absolute inset-0 ${opacityMap[intensity]}`}>
        <motion.div
          className="absolute top-0 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-primary via-secondary to-primary blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-l from-secondary via-primary to-secondary blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-1/3 h-1/3 rounded-full bg-gradient-to-tr from-accent via-primary to-secondary blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Beam effect (like Vercel)
interface BeamProps {
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "horizontal" | "vertical";
}

export function Beam({
  className = "",
  delay = 0,
  duration = 3,
  direction = "horizontal",
}: BeamProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <motion.div
      initial={{
        [isHorizontal ? "x" : "y"]: "-100%",
        opacity: 0,
      }}
      animate={{
        [isHorizontal ? "x" : "y"]: "200%",
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 2,
      }}
      className={`absolute ${
        isHorizontal ? "h-px w-1/3" : "w-px h-1/3"
      } bg-gradient-to-r from-transparent via-primary to-transparent ${className}`}
    />
  );
}

// Particle field background
interface ParticleFieldProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  particleColor?: string;
}

export function ParticleField({
  children,
  className = "",
  particleCount = 50,
  particleColor = "rgba(122, 28, 172, 0.5)",
}: ParticleFieldProps) {
  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: seededRandom(i * 1) * 100,
      y: seededRandom(i * 2) * 100,
      size: seededRandom(i * 3) * 3 + 1,
      duration: seededRandom(i * 4) * 20 + 10,
      delay: seededRandom(i * 5) * 5,
      xOffset: seededRandom(i * 6) * 20 - 10,
    }));
  }, [particleCount]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particleColor,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
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

// Gradient mesh background
interface GradientMeshProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientMesh({ children, className = "" }: GradientMeshProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Mesh gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 40% 20%, rgba(122, 28, 172, 0.3) 0px, transparent 50%),
              radial-gradient(at 80% 0%, rgba(173, 73, 225, 0.2) 0px, transparent 50%),
              radial-gradient(at 0% 50%, rgba(46, 7, 63, 0.3) 0px, transparent 50%),
              radial-gradient(at 80% 50%, rgba(122, 28, 172, 0.2) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(173, 73, 225, 0.3) 0px, transparent 50%),
              radial-gradient(at 80% 100%, rgba(235, 211, 248, 0.2) 0px, transparent 50%),
              radial-gradient(at 0% 0%, rgba(122, 28, 172, 0.2) 0px, transparent 50%)
            `,
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
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
