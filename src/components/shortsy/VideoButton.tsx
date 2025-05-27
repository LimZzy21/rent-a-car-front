"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";

interface VideoButtonProps {
  carId: string;
  className?: string;
  showText?: boolean;
}

export const VideoButton: React.FC<VideoButtonProps> = ({
  carId,
  className = "",
  showText = true,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/videos/car/${carId}`);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg ${className}`}
    >
      <FaVideo className="text-lg" />
      {showText && <span className="font-medium">Відео огляди</span>}
    </motion.button>
  );
}; 