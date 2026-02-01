"use client";

import * as React from "react";
import Link from "next/link";

type ButtonVariant = "solid" | "bordered" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "as"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isIconOnly?: boolean;
  as?: React.ElementType;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-60 disabled:cursor-not-allowed";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-linear-to-r from-primary to-secondary text-white shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40",
  bordered:
    "border border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary",
  ghost: "text-primary hover:bg-primary/10",
};

export function Button({
  className = "",
  children,
  variant = "solid",
  size = "md",
  isLoading,
  startContent,
  endContent,
  isIconOnly,
  disabled,
  as,
  ...props
}: ButtonProps) {
  const content = (
    <>
      {startContent && (
        <span className="mr-2 inline-flex items-center justify-center">
          {startContent}
        </span>
      )}
      <span className={isIconOnly ? "sr-only" : ""}>{children}</span>
      {endContent && (
        <span className="ml-2 inline-flex items-center justify-center">
          {endContent}
        </span>
      )}
    </>
  );

  const Component = as || "button";
  const buttonProps = as
    ? props
    : { ...props, disabled: disabled || isLoading };

  return (
    <Component
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        isIconOnly ? "p-2 aspect-square" : ""
      } ${className}`}
      {...buttonProps}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        content
      )}
    </Component>
  );
}

