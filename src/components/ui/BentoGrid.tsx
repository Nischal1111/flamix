"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerReveal, scrollReveal, easings } from "@/lib/scroll-animations";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

export function BentoGrid({
  children,
  className = "",
  columns = 3,
  gap = "md",
}: BentoGridProps) {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-3",
    md: "gap-4 md:gap-6",
    lg: "gap-6 md:gap-8",
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerReveal}
      className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  featured?: boolean;
  gradient?: "primary" | "secondary" | "accent" | "none";
  glowOnHover?: boolean;
}

export function BentoItem({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
  featured = false,
  gradient = "none",
  glowOnHover = true,
}: BentoItemProps) {
  const colSpanClasses = {
    1: "",
    2: "md:col-span-2",
  };

  const rowSpanClasses = {
    1: "",
    2: "md:row-span-2",
  };

  const gradientClasses = {
    primary: "bg-gradient-to-br from-primary/20 via-primary/5 to-transparent",
    secondary: "bg-gradient-to-br from-secondary/20 via-secondary/5 to-transparent",
    accent: "bg-gradient-to-br from-accent/30 via-accent/10 to-transparent",
    none: "",
  };

  return (
    <motion.div
      variants={scrollReveal}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.4, ease: easings.smooth },
      }}
      className={`
        relative group rounded-2xl overflow-hidden
        bg-muted/50 backdrop-blur-sm
        border border-primary/10 hover:border-primary/30
        ${colSpanClasses[colSpan]}
        ${rowSpanClasses[rowSpan]}
        ${featured ? "ring-2 ring-primary/20" : ""}
        transition-colors duration-500
        ${className}
      `}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${gradientClasses[gradient]} pointer-events-none`} />

      {/* Animated border gradient on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      </div>

      {/* Glow effect on hover */}
      {glowOnHover && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
      )}

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

// Feature Bento Card with icon and description
interface BentoFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
  iconColor?: string;
}

export function BentoFeature({
  icon,
  title,
  description,
  className = "",
  colSpan = 1,
  rowSpan = 1,
  iconColor = "text-primary",
}: BentoFeatureProps) {
  return (
    <BentoItem colSpan={colSpan} rowSpan={rowSpan} className={className}>
      <div className="p-6 md:p-8 h-full flex flex-col">
        {/* Icon with glow */}
        <div className="relative mb-4">
          <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${iconColor}`}>
            {icon}
          </div>
          <div className="absolute inset-0 w-12 h-12 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-foreground/60 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        {/* Animated arrow */}
        <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
          <span className="text-sm font-medium">Learn more</span>
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </BentoItem>
  );
}

// Bento Stats Card
interface BentoStatProps {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}

export function BentoStat({
  value,
  label,
  suffix = "",
  prefix = "",
  trend,
  className = "",
}: BentoStatProps) {
  return (
    <BentoItem gradient="primary" className={className}>
      <div className="p-6 md:p-8 h-full flex flex-col justify-center">
        {/* Value */}
        <div className="flex items-baseline gap-1">
          {prefix && (
            <span className="text-2xl font-medium text-primary">{prefix}</span>
          )}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            {value}
          </motion.span>
          {suffix && (
            <span className="text-2xl font-medium text-secondary">{suffix}</span>
          )}
        </div>

        {/* Label */}
        <p className="text-foreground/60 text-sm mt-2">{label}</p>

        {/* Trend indicator */}
        {trend && (
          <div
            className={`mt-3 flex items-center gap-1 text-sm ${
              trend.isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            <svg
              className={`w-4 h-4 ${trend.isPositive ? "" : "rotate-180"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </BentoItem>
  );
}

// Bento Image Card
interface BentoImageProps {
  src: string;
  alt: string;
  overlay?: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

export function BentoImage({
  src,
  alt,
  overlay,
  className = "",
  colSpan = 1,
  rowSpan = 1,
}: BentoImageProps) {
  return (
    <BentoItem colSpan={colSpan} rowSpan={rowSpan} className={`overflow-hidden ${className}`}>
      <div className="relative h-full min-h-[200px]">
        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        {/* Custom overlay content */}
        {overlay && (
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            {overlay}
          </div>
        )}
      </div>
    </BentoItem>
  );
}
