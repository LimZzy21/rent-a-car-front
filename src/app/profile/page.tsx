"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/common/api/users/profile";
import { getUserRentals } from "@/common/api/rental/rent";
import { RentalCard } from "@/components/Profile/RentalCard";
import { useState } from "react";
import Image from "next/image";
import { FaUser, FaEdit, FaGift } from "react-icons/fa";
import { LINKS } from "@/common/constants/Globals/Links";
import Link from "next/link";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"rentals" | "shortly">("rentals");

  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(),
  });

  const { data: userRentals, isLoading: rentalsLoading } = useQuery({
    queryKey: ["userRentals"],
    queryFn: () => getUserRentals(),
    enabled: activeTab === "rentals",
  });

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load profile</p>
        </div>
      </div>
    );
  }

  const displayRentals = userRentals;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">
                  {userProfile.avatar ? (
                    <Image
                      src={userProfile.avatar}
                      alt="User Profile"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <span className="text-2xl">
                      <FaUser />
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {userProfile.fullName}
                </h1>
                <Link href={LINKS.PROFILE_EDIT} className="cursor-pointer">
                  <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                    <FaEdit />
                  </button>
                </Link>
              </div>
              <p className="text-gray-600 mb-2">{userProfile.email}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium flex items-center gap-2">
                  <FaGift size={18} /> Bonuses:
                </span>
                <span className="text-sm font-semibold">
                  {userProfile.bonuses}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              className={`pb-2 px-1 mr-8 font-medium border-b-2 transition-colors ${
                activeTab === "rentals"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("rentals")}
            >
              My Rentals
            </button>
            <button
              className={`pb-2 px-1 font-medium border-b-2 transition-colors ${
                activeTab === "shortly"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("shortly")}
            >
              My Shortly
            </button>
          </div>
          <div>
            {activeTab === "rentals" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  My Rentals
                </h2>

                {rentalsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                  </div>
                ) : displayRentals && displayRentals.length > 0 ? (
                  <div className="space-y-4">
                    {displayRentals.map((rental) => (
                      <RentalCard key={rental.id} rental={rental} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No rentals found</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "shortly" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  My Shortly
                </h2>
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Shortly content will be displayed here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
