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

// export const createReview = async (review: Review) => {
//     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, review);
//     return response.data;
// }
