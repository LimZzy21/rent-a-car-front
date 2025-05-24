import axios from "axios";
import { PROFILE_API } from "@/common/constants/api/profile";
import { FILE_API } from "@/common/constants/api/file";

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${PROFILE_API.BASE}${PROFILE_API.PROFILE}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to get user profile");
  }

  return response.data;
};

export const updateUserProfile = async (data: {
  fullName?: string;
  profileImage?: File;
}) => {
  const token = localStorage.getItem("token");

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append("file", image);

    const response = await axios.post(
      `${FILE_API.BASE}${FILE_API.UPLOAD}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Failed to upload image");
    }

    return response.data;
  };

  if (data.profileImage) {
    try {
      const imageUrl = await uploadImage(data.profileImage);
      data.profileImage = imageUrl.url;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  console.log(data);
  const response = await axios.patch(
    `${PROFILE_API.BASE}${PROFILE_API.PROFILE}`,
    {
      fullName: data.fullName,
      avatar: data.profileImage,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
