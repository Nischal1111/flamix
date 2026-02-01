"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Top progress bar
interface ScrollProgressBarProps {
  className?: string;
  height?: number;
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  showGlow?: boolean;
}

export function ScrollProgressBar({
  className = "",
  height = 3,
  gradientFrom = "from-primary",
  gradientTo = "to-secondary",
  showGlow = true,
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 origin-left bg-gradient-to-r ${gradientFrom} ${gradientTo} ${className}`}
      style={{
        scaleX,
        height,
      }}
    >
      {showGlow && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} blur-sm opacity-60`}
        />
      )}
    </motion.div>
  );
}

// Circular progress indicator
interface ScrollProgressCircleProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export function ScrollProgressCircle({
  className = "",
  size = 60,
  strokeWidth = 4,
  showPercentage = true,
  position = "bottom-right",
}: ScrollProgressCircleProps) {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const percentage = useTransform(scrollYProgress, (v) => Math.round(v * 100));
  const [displayPercentage, setDisplayPercentage] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = percentage.on("change", (v) => {
      setDisplayPercentage(v);
    });
    return unsubscribe;
  }, [percentage]);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-20 right-6",
    "top-left": "top-20 left-6",
  };

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <motion.div
      className={`fixed z-50 ${positionClasses[position]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />
        </svg>

        {/* Progress circle */}
        <svg
          className="absolute inset-0 -rotate-90"
          width={size}
          height={size}
        >
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              pathLength,
            }}
            initial={{ pathLength: 0 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7A1CAC" />
              <stop offset="100%" stopColor="#AD49E1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage text */}
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-semibold text-foreground/80">
              {displayPercentage}%
            </span>
          </div>
        )}

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20 blur-lg" />
      </div>
    </motion.div>
  );
}

// Scroll to top button with progress
interface ScrollToTopProps {
  className?: string;
  showAfter?: number;
  size?: number;
}

export function ScrollToTop({
  className = "",
  showAfter = 300,
  size = 48,
}: ScrollToTopProps) {
  const { scrollYProgress, scrollY } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setIsVisible(y > showAfter);
    });
    return unsubscribe;
  }, [scrollY, showAfter]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = (size - 4) / 2;

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        bg-background/80 backdrop-blur-sm
        border border-primary/20 rounded-full
        shadow-lg shadow-primary/10
        hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20
        transition-all duration-300
        cursor-pointer
        ${className}
      `}
      style={{ width: size, height: size }}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
      >
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scrollGradient)"
          strokeWidth={2}
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A1CAC" />
            <stop offset="100%" stopColor="#AD49E1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Arrow icon */}
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </motion.svg>
    </motion.button>
  );
}

// Section indicator dots
interface SectionIndicatorProps {
  sections: string[];
  className?: string;
}

export function SectionIndicator({ sections, className = "" }: SectionIndicatorProps) {
  const [activeSection, setActiveSection] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 ${className}`}>
      {sections.map((sectionId, index) => (
        <motion.button
          key={sectionId}
          onClick={() => scrollToSection(sectionId)}
          className={`
            w-3 h-3 rounded-full border-2 transition-all duration-300
            ${
              activeSection === index
                ? "bg-primary border-primary scale-125"
                : "bg-transparent border-primary/30 hover:border-primary/60"
            }
          `}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Go to ${sectionId} section`}
        />
      ))}
    </div>
  );
}

// Parallax scroll container
interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({
  children,
  speed = 0.5,
  className = "",
}: ParallaxScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Use speed to control the parallax intensity
  const yRange = 20 * speed;

  const y = useTransform(scrollYProgress, [0, 1], [`-${yRange}%`, `${yRange}%`]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
}
