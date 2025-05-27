import { useQuery } from "@tanstack/react-query";
import { getReviews, getVideosByCarId } from "@/common/api/reviews/reviews";
import { Video } from "@/common/api/reviews/types";

export const useVideos = () => {
  return useQuery<Video[], Error>({
    queryKey: ["videos"],
    queryFn: getReviews,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
  });
};

export const useVideosByCarId = (carId: string) => {
  return useQuery<Video[], Error>({
    queryKey: ["videos", "car", carId],
    queryFn: () => getVideosByCarId(carId),
    enabled: !!carId,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
  });
}; 