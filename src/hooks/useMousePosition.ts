"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface RelativeMousePosition extends MousePosition {
  elementX: number;
  elementY: number;
  isInside: boolean;
}

// Global mouse position hook
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return position;
}

// Mouse position relative to an element
export function useRelativeMousePosition(
  ref: RefObject<HTMLElement | null>
): RelativeMousePosition {
  const [position, setPosition] = useState<RelativeMousePosition>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    isInside: false,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updatePosition = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      const elementX = e.clientX - rect.left;
      const elementY = e.clientY - rect.top;
      const isInside =
        elementX >= 0 &&
        elementX <= rect.width &&
        elementY >= 0 &&
        elementY <= rect.height;

      setPosition({ x, y, elementX, elementY, isInside });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, [ref]);

  return position;
}

// 3D tilt effect based on mouse position
export function useTilt3D(ref: RefObject<HTMLElement | null>) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (max 15 degrees)
    const rotateX = (mouseY / (rect.height / 2)) * -15;
    const rotateY = (mouseX / (rect.width / 2)) * 15;

    setTilt({ rotateX, rotateY });
  }, [ref]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);

  return tilt;
}

// Magnetic effect hook
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength: number = 0.3) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setOffset({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  }, [ref, strength]);

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseLeave]);

  return offset;
}
