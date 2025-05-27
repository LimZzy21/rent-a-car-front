"use client";
import React, { useRef, useState, useEffect } from "react";
import { Video } from "@/common/api/reviews/types";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaHeart,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
  isMuted: boolean;
  onVideoEnd?: () => void;
  onMuteToggle?: () => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isActive,
  isMuted,
  onVideoEnd,
  onMuteToggle,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isActive) {
      videoElement
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateProgress = () => {
      const progress = (videoElement.currentTime / videoElement.duration) * 100;
      setProgress(progress);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onVideoEnd?.();
    };

    videoElement.addEventListener("timeupdate", updateProgress);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      videoElement.removeEventListener("timeupdate", updateProgress);
      videoElement.removeEventListener("ended", handleEnded);
    };
  }, [onVideoEnd]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls]);

  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
      setIsPlaying(false);
    } else {
      videoElement.play().then(() => {
        setIsPlaying(true);
      });
    }
    setShowControls(true);
  };

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.muted = !videoElement.muted;
    onMuteToggle?.();
    setShowControls(true);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleVideoClick = () => {
    const isTouchDevice = "ontouchstart" in window;
    if (!isTouchDevice) {
      togglePlayPause();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchStartY(e.touches[0].clientY);
    setTouchEndY(null);
    onTouchStart?.(e);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchEndY(e.touches[0].clientY);
    onTouchMove?.(e);
  };

  const handleTouchEnd = () => {
    const startY = touchStartY;
    const endY = touchEndY;

    setTouchStartY(null);
    setTouchEndY(null);

    if (startY !== null && endY !== null) {
      const distance = Math.abs(startY - endY);
      if (distance < 30) {
        togglePlayPause();
      }
    } else if (startY !== null && endY === null) {
      togglePlayPause();
    }

    onTouchEnd?.();
  };

  return (
    <div
      className="relative w-full h-[90vh] md:h-auto md:max-w-md md:max-h-[90vh] md:mx-auto bg-black flex items-center justify-center overflow-hidden md:rounded-xl md:shadow-2xl"
      style={{ touchAction: "none" }}
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-cover cursor-pointer md:aspect-[9/16]"
        muted={isMuted}
        playsInline
        preload="metadata"
        onClick={handleVideoClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
          onClick={handleVideoClick}
        >
          <div className="flex flex-col items-center">
            <div className="bg-black bg-opacity-60 rounded-full p-6 shadow-xl mb-4">
              <FaPlay className="text-white text-4xl ml-1" />
            </div>
            <p className="text-white text-sm opacity-80 md:hidden">
              Tap to play or swipe to switch video
            </p>
            <p className="text-white text-sm opacity-80 hidden md:block">
              Tap to play or swipe to swich video
            </p>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent"
      >
        <div className="flex justify-between items-end">
          <div className="flex-1">
            {/* User Info */}
            <div className="flex items-center mb-2">
              {video.reviewer?.avatar ? (
                <Image
                  width={32}
                  height={32}
                  src={video.reviewer.avatar}
                  alt={video.reviewer.fullName}
                  className="w-8 h-8 rounded-full mr-2 border-2 border-white"
                />
              ) : (
                <div className="w-8 h-8 rounded-full mr-2 bg-gray-600 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {video.reviewer?.fullName?.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
              )}
              <span className="text-white text-sm font-medium">
                {video.reviewer?.fullName || "Unknown User"}
              </span>
            </div>

            {video.reviewedCar && (
              <div
                className="mb-1 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-lg p-2 -m-2 transition-colors"
                onClick={() => router.push(`/car/${video.reviewedCar!.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {video.reviewedCar.images?.[0] && (
                      <Image
                        width={70}
                        height={40}
                        src={video.reviewedCar.images[0]}
                        alt={`${video.reviewedCar.name} ${video.reviewedCar.brand}`}
                        className="w-10 h-6 rounded object-cover mr-2"
                      />
                    )}
                    <div>
                      <p className="text-white text-sm font-medium">
                        {video.reviewedCar.name} {video.reviewedCar.brand}{" "}
                        {video.reviewedCar.model}
                      </p>
                      <p className="text-gray-300 text-xs">
                        ${video.reviewedCar.price}/день • ⭐{" "}
                        {video.reviewedCar.rating}
                      </p>
                    </div>
                  </div>
                  <FaExternalLinkAlt className="text-white text-xs opacity-70" />
                </div>
              </div>
            )}

            <p className="text-gray-400 text-xs">
              {new Date(video.createdAt).toLocaleDateString("uk-UA")}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 ml-4">
            <button
              onClick={toggleLike}
              className={`p-3 rounded-full transition-colors ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-black bg-opacity-50 text-white hover:bg-opacity-70"
              }`}
            >
              <FaHeart className="text-xl" />
            </button>

            {/* Car Page Link Button */}
            {video.reviewedCar && (
              <button
                onClick={() => router.push(`/car/${video.reviewedCar!.id}`)}
                className="p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
                title="Переглянути автомобіль"
              >
                <FaExternalLinkAlt className="text-lg" />
              </button>
            )}

            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
            >
              {isMuted ? (
                <FaVolumeMute className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>

            <button
              onClick={togglePlayPause}
              className="p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
            >
              {isPlaying ? (
                <FaPause className="text-xl" />
              ) : (
                <FaPlay className="text-xl" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full h-1 bg-gray-600 rounded mt-2">
          <div
            className="h-full bg-white rounded transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
};
