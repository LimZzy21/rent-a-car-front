import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviews,
  getVideosByCarId,
  checkLikeStatus,
  likeReview,
} from "@/common/api/reviews/reviews";
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

export const useVideoLikeStatus = (videoId: string) => {
  return useQuery({
    queryKey: ["videoLike", videoId],
    queryFn: () => checkLikeStatus(videoId),
    enabled: !!videoId,
    staleTime: 20 * 60 * 1000,
    gcTime: 20 * 60 * 1000,
    retry: 1,
  });
};

export const useVideoLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeReview,
    onMutate: async (videoId: string) => {
      await queryClient.cancelQueries({ queryKey: ["videoLike", videoId] });

      const previousData = queryClient.getQueryData(["videoLike", videoId]);

      queryClient.setQueryData(
        ["videoLike", videoId],
        (old: { isLiked: boolean } | undefined) => ({
          isLiked: !old?.isLiked,
        })
      );

      return { previousData, videoId };
    },
    onError: (err, videoId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["videoLike", context.videoId],
          context.previousData
        );
      }
    },
    onSettled: (data, error, videoId) => {
      queryClient.invalidateQueries({ queryKey: ["videoLike", videoId] });
    },
  });
};

export const useVideosLikeStatus = (videoIds: string[]) => {
  return useQuery({
    queryKey: ["videosLike", videoIds.sort().join(",")],
    queryFn: async () => {
      const results = await Promise.allSettled(
        videoIds.map((id) => checkLikeStatus(id))
      );

      const likesMap: Record<string, boolean> = {};
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          likesMap[videoIds[index]] = result.value.isLiked;
        } else {
          likesMap[videoIds[index]] = false;
        }
      });

      return likesMap;
    },
    enabled: videoIds.length > 0,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
