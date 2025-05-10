"use client";
import { usePlayOnHover } from "@/common/hooks/usePlayOnHover";

export const VideoCard = ({ video, id }: { video: string; id: number }) => {
  const { videoRef, containerRef, handleMouseEnter, handleMouseLeave } =
    usePlayOnHover({
      threshold: 0.6,
      rootMargin: "100px",
    });

  return (
    <div
      key={id}
      ref={containerRef}
      className="relative  bg-gray-100 flex justify-center items-center rounded-md cursor-pointer transition-transform hover:scale-[1.02] shadow-sm overflow-hidden"
    >
      <video
        ref={videoRef}
        preload="metadata"
        muted
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};
