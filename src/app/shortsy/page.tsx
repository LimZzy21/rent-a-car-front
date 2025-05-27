"use client";
import React from "react";
import { useVideos } from "@/common/hooks/useVideos";
import { VideoFeed } from "@/components/shortsy/VideoFeed";

const ShortsyPage: React.FC = () => {
  const { data: videos, isLoading, error } = useVideos();

  return (
    <div
      className="min-h-screen bg-black"
      style={{
        touchAction: "none",
        overscrollBehavior: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <VideoFeed
        videos={videos || []}
        isLoading={isLoading}
        error={error?.message}
      />
    </div>
  );
};

export default ShortsyPage;
