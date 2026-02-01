"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glowing?: boolean;
}

export function Card({
  children,
  className = "",
  hoverable = true,
  glowing = false,
}: CardProps) {
  return (
    <motion.div variants={fadeInUp}>
      <div
        className={`rounded-2xl bg-muted/50 border border-primary/10 backdrop-blur-sm ${
          hoverable
            ? "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            : ""
        } ${glowing ? "animate-pulse-glow" : ""} ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="px-6 pt-6 pb-2">{children}</div>;
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-2">{children}</div>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return <div className="px-6 pb-6 pt-2">{children}</div>;
}

