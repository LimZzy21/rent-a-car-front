'use client'
import { useState, useRef, useCallback, useEffect } from 'react';

interface UseVideoHoverReturn {
  videoRef: React.RefObject<HTMLVideoElement| null>;
  isHovering: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

interface UsePlayOnHoverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const usePlayOnHover = (options: UsePlayOnHoverOptions = {}): UseVideoHoverReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { threshold = 0.5, rootMargin = '0px' } = options;

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold, rootMargin]);

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
    containerRef
  };
};