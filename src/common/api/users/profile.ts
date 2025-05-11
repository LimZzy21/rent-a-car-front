import axios from "axios";
import { PROFILE_API } from "@/common/constants/api/profile";

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${PROFILE_API.BASE}${PROFILE_API.PROFILE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to get user profile");
  }

  return response.data;
};
