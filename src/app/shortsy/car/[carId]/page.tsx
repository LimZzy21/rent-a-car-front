"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useVideosByCarId } from "@/common/hooks/useVideos";
import { VideoFeed } from "@/components/shortsy/VideoFeed";
import { FaArrowLeft } from "react-icons/fa";

const CarVideosPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const carId = params.carId as string;
  
  const { data: videos, isLoading, error } = useVideosByCarId(carId);

  const handleBack = () => {
    router.back();
  };

  return (
    <div 
      className="min-h-screen bg-black relative"
      style={{ 
        touchAction: 'none',
        overscrollBehavior: 'none',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-20 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
      >
        <FaArrowLeft className="text-xl" />
      </button>

      <VideoFeed
        videos={videos || []}
        isLoading={isLoading}
        error={error?.message}
      />
    </div>
  );
};

export default CarVideosPage; 