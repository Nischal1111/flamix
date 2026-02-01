"use client";

import React from "react";
import { motion } from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  gap?: number;
}

export function Marquee({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  className = "",
  gap = 40,
}: MarqueeProps) {
  const content = React.Children.toArray(children);

  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <motion.div
        className={`flex shrink-0 gap-[${gap}px] ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ gap: `${gap}px` }}
      >
        {/* First set */}
        {content.map((child, index) => (
          <div key={`first-${index}`} className="shrink-0">
            {child}
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {content.map((child, index) => (
          <div key={`second-${index}`} className="shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Logo/Brand marquee
interface LogoMarqueeProps {
  logos: {
    name: string;
    icon?: React.ReactNode;
    imageUrl?: string;
  }[];
  title?: string;
  className?: string;
  speed?: number;
}

export function LogoMarquee({
  logos,
  title = "Trusted by industry leaders",
  className = "",
  speed = 40,
}: LogoMarqueeProps) {
  return (
    <div className={`py-12 ${className}`}>
      {title && (
        <p className="text-center text-sm text-foreground/50 uppercase tracking-widest mb-8">
          {title}
        </p>
      )}
      <Marquee speed={speed} gap={60}>
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-3 rounded-xl bg-muted/30 border border-primary/5 hover:border-primary/20 transition-colors duration-300"
          >
            {logo.imageUrl ? (
              <img
                src={logo.imageUrl}
                alt={logo.name}
                className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              />
            ) : logo.icon ? (
              <div className="text-foreground/60">{logo.icon}</div>
            ) : null}
            <span className="text-foreground/60 font-medium whitespace-nowrap">
              {logo.name}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// Text marquee with gradient
interface TextMarqueeProps {
  text: string;
  className?: string;
  speed?: number;
  textClassName?: string;
}

export function TextMarquee({
  text,
  className = "",
  speed = 20,
  textClassName = "",
}: TextMarqueeProps) {
  const words = text.split(" ");

  return (
    <div className={`py-8 ${className}`}>
      <Marquee speed={speed} gap={100}>
        {words.map((word, index) => (
          <span
            key={index}
            className={`text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/20 ${textClassName}`}
          >
            {word}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

// Tech stack marquee
interface TechStackMarqueeProps {
  technologies: string[];
  className?: string;
}

export function TechStackMarquee({
  technologies,
  className = "",
}: TechStackMarqueeProps) {
  return (
    <div className={`py-6 ${className}`}>
      <Marquee speed={25} gap={20}>
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm text-foreground/70 hover:bg-primary/10 hover:border-primary/20 transition-colors duration-300"
          >
            {tech}
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// Testimonial marquee
interface TestimonialMarqueeProps {
  testimonials: {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  }[];
  className?: string;
}

export function TestimonialMarquee({
  testimonials,
  className = "",
}: TestimonialMarqueeProps) {
  return (
    <div className={`py-12 ${className}`}>
      <Marquee speed={60} gap={30} pauseOnHover>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-[350px] p-6 rounded-2xl bg-muted/50 border border-primary/10 hover:border-primary/20 transition-colors duration-300"
          >
            <p className="text-foreground/80 text-sm leading-relaxed mb-4">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-xs text-foreground/50">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}
