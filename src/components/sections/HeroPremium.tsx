"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextRevealWord, GradientTextReveal } from "@/components/ui/TextReveal";
import { GradientMesh } from "@/components/ui/Spotlight";
import { ArrowRight, Play, Sparkles, Zap, Shield, Cpu } from "lucide-react";
import { staggerReveal, scrollReveal, easings } from "@/lib/scroll-animations";

interface HeroPremiumProps {
  title?: string;
  highlightedText?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    text: string;
    onClick?: () => void;
  };
  showFloatingElements?: boolean;
}

export function HeroPremium({
  title = "Transforming Ideas Into",
  highlightedText = "Digital Excellence",
  subtitle = "We craft innovative software solutions that drive business growth. From cloud infrastructure to AI-powered applications, we turn your vision into reality.",
  primaryCTA = { text: "View Our Work" },
  secondaryCTA = { text: "Watch Demo" },
  showFloatingElements = true,
}: HeroPremiumProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // Floating elements data
  const floatingElements = [
    { icon: Sparkles, position: "top-20 left-10", delay: 0, size: 24 },
    { icon: Zap, position: "top-40 right-20", delay: 0.5, size: 20 },
    { icon: Shield, position: "bottom-40 left-20", delay: 1, size: 22 },
    { icon: Cpu, position: "bottom-20 right-10", delay: 1.5, size: 26 },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20 md:pb-0"
    >
      {/* Animated mesh gradient background */}
      <GradientMesh className="absolute inset-0">
        <div />
      </GradientMesh>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(122, 28, 172, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(122, 28, 172, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 70%, transparent 110%)",
        }}
      />

      {/* Floating decorative elements */}
      {showFloatingElements && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingElements.map((el, index) => {
            const Icon = el.icon;
            return (
              <motion.div
                key={index}
                className={`absolute ${el.position}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 0.6,
                  scale: 1,
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  delay: el.delay,
                  duration: 0.5,
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="relative">
                  <Icon
                    size={el.size}
                    className="text-primary/40"
                  />
                  <div className="absolute inset-0 bg-primary/20 blur-xl" />
                </div>
              </motion.div>
            );
          })}

          {/* Glowing orbs */}
          <motion.div
            className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Main Content */}
      <motion.div
        style={{ y: smoothY, opacity, scale }}
        className="relative z-10 w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Heading */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerReveal}
            className="mb-8"
          >
            {/* First line */}
            <motion.div variants={scrollReveal} className="mb-2 sm:mb-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight font-heading">
                <TextRevealWord className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight font-heading">
                  {title}
                </TextRevealWord>
              </h1>
            </motion.div>

            {/* Highlighted text */}
            <motion.div variants={scrollReveal}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight font-heading">
                <span className="relative inline-block">
                  <GradientTextReveal
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight font-heading"
                    delay={0.3}
                  >
                    {highlightedText}
                  </GradientTextReveal>

                  {/* Animated underline */}
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.6 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: easings.smooth }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
              </h1>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4 font-light"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => {
                primaryCTA.onClick?.();
                scrollToSection("#portfolio");
              }}
              className="w-full sm:w-auto"
            >
              <span>{primaryCTA.text}</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </MagneticButton>

            <MagneticButton
              variant="outline"
              size="lg"
              onClick={() => {
                secondaryCTA.onClick?.();
                scrollToSection("#services");
              }}
              className="w-full sm:w-auto"
              glow={false}
            >
              <Play className="w-5 h-5 mr-2 fill-primary" />
              <span>{secondaryCTA.text}</span>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroPremium;
