"use client";
import { CustomButton } from "@/components/common/UI/Buttons/CustomButton";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { Rental } from "@/common/api/rental/types";
import { Car } from "@/common/api/car/types";
import { format } from "date-fns";
import { LINKS } from "@/common/constants/Globals/Links";

export default function SuccessRentPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push(LINKS.HOME);
  };

  const queryClient = useQueryClient();
  const rentals = queryClient.getQueryData(["rentedCar"]) as Rental;
  const car = queryClient.getQueryData(["car", rentals?.carId]) as Car;

  if (!car || !rentals) {
    return <div>No rentals found</div>;
  }

  return (
    <div className="max-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black"></div>

      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl">
        <div className="flex justify-center mb-6 ">
          <div className="bg-gray-100 rounded-full p-5">
            <div className="bg-black rounded-full p-3">
              <FaCheck className="text-white text-lg" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-900 mb-3">
          Booking Confirmed!
        </h1>

        <div className="text-center text-gray-600 mb-6">
          <p className="mb-1">
            Your luxury car rental has been successfully booked.
          </p>
          <p className="text-purple-600 font-medium">
            We can&apos;t wait to see you behind the wheel!
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Booking Date</span>
            <span className="text-gray-900 font-medium">
              {format(rentals?.createdAt || new Date(), "MMM d, yyyy")}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Car</span>
            <span className="text-gray-900 font-medium">
              {car.name} {car.model} {car.brand}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Pick-up</span>
            <span className="text-gray-900 font-medium">
              {format(rentals?.rentedFrom, "MMM d, yyyy")}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Return</span>
            <span className="text-gray-900 font-medium">
              {format(rentals?.rentedTo, "MMM d, yyyy")}
            </span>
          </div>
        </div>

        <CustomButton
          variant="primary"
          size="large"
          className="w-full"
          onClick={handleClose}
        >
          Close
        </CustomButton>
      </div>
    </div>
  );
}
