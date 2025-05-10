"use client";
import { useState, useRef, useCallback, useEffect } from "react";

interface UseVideoHoverReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isHovering: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface UsePlayOnHoverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const usePlayOnHover = (
  options: UsePlayOnHoverOptions = {}
): UseVideoHoverReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { threshold = 0.5, rootMargin = "0px" } = options;

  useEffect(() => {
    const checkIfMobile = () => {
      return window.matchMedia("(max-width: 768px)").matches;
    };

    setIsMobile(checkIfMobile());

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleResize);
      return () => mediaQuery.removeEventListener("change", handleResize);
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (!videoRef.current || !isMobile) return;

    const currentContainer = containerRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
            setIsHovering(true);
          } else {
            videoRef.current?.pause();
            setIsHovering(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [threshold, rootMargin, isMobile]);

  const handleMouseEnter = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsHovering(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsHovering(false);
    }
  }, []);

  return {
    videoRef,
    isHovering,
    handleMouseEnter,
    handleMouseLeave,
    containerRef,
  };
};
