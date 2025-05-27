"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Video } from "@/common/api/reviews/types";
import { VideoPlayer } from "./VideoPlayer";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useVideosLikeStatus } from "@/common/hooks/useVideos";

interface VideoFeedProps {
  videos: Video[];
  isLoading?: boolean;
  error?: string;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({
  videos,
  isLoading,
  error,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const videoIds = videos.map((video) => video.id);
  useVideosLikeStatus(videoIds);

  const minSwipeDistance = 50;

  const nextVideo = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, videos.length]);

  const prevVideo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe && currentIndex < videos.length - 1) {
      nextVideo();
    }
    if (isDownSwipe && currentIndex > 0) {
      prevVideo();
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        prevVideo();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        nextVideo();
      }
    },
    [nextVideo, prevVideo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleVideoEnd = () => {
    if (currentIndex < videos.length - 1) {
      nextVideo();
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-red-400 mb-2">Error loading videos</p>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl mb-2">No available videos</p>
          <p className="text-gray-400">Try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-[100vh] overflow-hidden bg-black md:bg-gray-900 md:flex md:items-center md:justify-center md:p-8"
      style={{ touchAction: "none" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative h-full md:h-auto md:w-full md:max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 md:relative md:inset-auto"
          >
            <VideoPlayer
              video={videos[currentIndex]}
              isActive={true}
              isMuted={isMuted}
              onVideoEnd={handleVideoEnd}
              onMuteToggle={handleMuteToggle}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-10">
        <button
          onClick={prevVideo}
          disabled={currentIndex === 0}
          className={`p-3 rounded-full transition-all ${
            currentIndex === 0
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          }`}
        >
          <FaChevronUp className="text-xl" />
        </button>

        <button
          onClick={nextVideo}
          disabled={currentIndex === videos.length - 1}
          className={`p-3 rounded-full transition-all ${
            currentIndex === videos.length - 1
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          }`}
        >
          <FaChevronDown className="text-xl" />
        </button>
      </div>
    </div>
  );
};
