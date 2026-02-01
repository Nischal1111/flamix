"use client";

import { Chip } from "./chip";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "solid" | "bordered" | "light";
  color?: "primary" | "secondary" | "default";
  size?: "sm" | "md" | "lg";
}

export function Badge({ children, variant = "bordered", color = "primary", size = "sm" }: BadgeProps) {
  const colorClasses = {
    primary: "border-primary/50 text-primary bg-primary/10",
    secondary: "border-secondary/50 text-secondary bg-secondary/10",
    default: "border-foreground/20 text-foreground/70 bg-foreground/5",
  };

  return (
    <Chip
      size={size}
      className={`${colorClasses[color]} transition-colors duration-200 font-medium`}
    >
      {children}
    </Chip>
  );
}
