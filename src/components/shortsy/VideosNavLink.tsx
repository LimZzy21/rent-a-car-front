"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";

interface VideosNavLinkProps {
  className?: string;
  mobile?: boolean;
}

export const VideosNavLink: React.FC<VideosNavLinkProps> = ({
  className = "",
  mobile = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const isActive = pathname === "/shortsy";

  const handleClick = () => {
    router.push("/shortsy");
  };

  if (mobile) {
    return (
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
            : "text-gray-700 hover:bg-gray-100"
        } ${className}`}
      >
        <FaVideo className="text-lg" />
        <span className="font-medium">Video</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg" 
          : "text-gray-700 hover:bg-gray-100"
      } ${className}`}
    >
      <FaVideo className="text-lg" />
      <span className="font-medium hidden md:block">Video</span>
    </motion.button>
  );
}; 