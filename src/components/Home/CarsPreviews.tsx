import React from "react";
import { carsPreview } from "@/common/constants/Home/Previews";
import { VideoCard } from "./VideoCard";

const CarsPreviews: React.FC = () => {
  return (
    <div className="py-12 px-4 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Car Previews</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {carsPreview.map((item) => (
          <VideoCard key={item.id} id={item.id} video={item.video} />
        ))}
      </div>
    </div>
  );
};

export default CarsPreviews;
