"use client";

import { useState, useEffect, RefObject } from "react";

// Global scroll progress (0-1)
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, scrollProgress)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
}

// Element scroll progress (when element is in viewport)
export function useElementScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the viewport the element has traveled
      const start = windowHeight; // Element enters at bottom
      const end = -rect.height; // Element exits at top
      const current = rect.top;

      const scrollProgress = (start - current) / (start - end);
      setProgress(Math.min(1, Math.max(0, scrollProgress)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, [ref]);

  return progress;
}

// Scroll velocity for momentum-based effects
export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let lastScrollTop = window.scrollY;
    let lastTime = Date.now();
    let animationFrameId: number;

    const updateVelocity = () => {
      const currentScrollTop = window.scrollY;
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime;

      if (timeDelta > 0) {
        const scrollDelta = currentScrollTop - lastScrollTop;
        const newVelocity = scrollDelta / timeDelta;
        setVelocity(newVelocity);
      }

      lastScrollTop = currentScrollTop;
      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(updateVelocity);
    };

    animationFrameId = requestAnimationFrame(updateVelocity);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return velocity;
}

// Scroll direction hook
export function useScrollDirection(): "up" | "down" | null {
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setDirection("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateDirection, { passive: true });
    return () => window.removeEventListener("scroll", updateDirection);
  }, []);

  return direction;
}

// In-view detection with threshold
export function useInView(
  ref: RefObject<HTMLElement | null>,
  options: { threshold?: number; once?: boolean } = {}
): boolean {
  const { threshold = 0.1, once = false } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, once]);

  return isInView;
}
