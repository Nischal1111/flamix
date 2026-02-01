"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GradientButton({
  children,
  href,
  onClick,
  icon: Icon,
  iconPosition = "right",
  variant = "solid",
  size = "md",
  className = "",
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    solid: "bg-linear-to-r from-primary to-secondary text-white hover:opacity-90",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/10",
  };

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5 mr-2" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5 ml-2" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {content}
      </Button>
    </motion.div>
  );
}
