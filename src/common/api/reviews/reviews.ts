import axios from "axios";
import { REVIEWS_API } from "@/common/constants/api/reviews";
import { Video } from "./types";

export const getReviews = async () => {
  const response = await axios.get(
    `${REVIEWS_API.BASE_URL}${REVIEWS_API.GET_REVIEWS}`
  );
  return response.data;
};

export const getVideos = async (): Promise<Video[]> => {
  const response = await axios.get(
    `${REVIEWS_API.BASE_URL}${REVIEWS_API.GET_VIDEOS}`
  );
  return response.data;
};

export const getVideosByCarId = async (carId: string): Promise<Video[]> => {
  const response = await axios.get(
    `${REVIEWS_API.BASE_URL}${REVIEWS_API.GET_VIDEOS_BY_CAR_ID}/${carId}`
  );
  return response.data;
};

export const likeReview = async (reviewId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(
    `${REVIEWS_API.BASE_URL}${REVIEWS_API.LIKE_REVIEW}/${reviewId}`,{
      withCredentials: true,
    },
    {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
  );
  return response.data;
};

export const checkLikeStatus = async (videoId: string): Promise<{ isLiked: boolean }> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${REVIEWS_API.BASE_URL}${REVIEWS_API.CHECK_LIKE_STATUS}/${videoId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// export const createReview = async (review: Review) => {
//     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, review);
//     return response.data;
// }
