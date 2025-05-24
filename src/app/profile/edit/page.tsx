"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaCamera, FaUser } from "react-icons/fa";
import { Input } from "@/components/common/UI/Inputs/Input";
import { CustomButton } from "@/components/common/UI/Buttons/CustomButton";
import toast from "react-hot-toast";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "@/common/api/users/profile";

const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Zа-яА-ЯіІїЇєЄ\s]+$/,
      "Name can only contain letters and spaces"
    ),
});

type ProfileFormData = z.infer<typeof profileSchema> & {
  profileImage?: File;
};

export default function EditProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(),
  });

  const { mutate: updateUser, isPending } = useMutation({
    mutationKey: ["updateUserProfile"],
    mutationFn: (data: ProfileFormData) => updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        fullName: userProfile.fullName || "",
      });
    }
  }, [userProfile, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size cannot exceed 5MB");
        return;
      }
      
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    updateUser({ ...data, profileImage: imageFile || undefined });
  };

  const handleCancel = () => {
    window.history.back();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="text-center py-6 sm:py-8 px-4 sm:px-6">
          <div className="relative inline-block mb-4 sm:mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gray-200 mx-auto">
              {!profileImage && (!userProfile?.avatar) ? (
                <div className="w-full h-full flex items-center justify-center">
                  <FaUser className="text-gray-400 text-2xl sm:text-3xl" />
                </div>
              ) : (
                <Image
                  src={profileImage || userProfile?.avatar || ""}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={96}
                  height={96}
                />
              )}
            </div>
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-black text-white p-1.5 sm:p-2 rounded-full cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <FaCamera className="text-xs sm:text-sm" />
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
            Edit Profile
          </h1>
          <p className="text-gray-600 text-sm">
            Update your account details below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-4 sm:px-6 pb-6 sm:pb-8">
          <div className="space-y-4 sm:space-y-6">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
            <CustomButton
              type="submit"
              variant="primary"
              size="large"
              isLoading={isPending}
              disabled={!isValid || isPending}
              className="w-full sm:flex-1"
            >
              Save Changes
            </CustomButton>

            <CustomButton
              type="button"
              variant="secondary"
              size="large"
              onClick={handleCancel}
              disabled={isPending}
              className="w-full sm:flex-1"
            >
              Cancel
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
