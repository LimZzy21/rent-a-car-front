"use client";

import { LINKS } from "@/common/constants/Globals/Links";
import { CustomButton } from "@/components/common/UI/Buttons/CustomButton";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";

export const CarActions = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["userProfile"]);
  const { id } = useParams();


  const handleRentCar = () => {
    if (user) {
      router.push(`${LINKS.RENT_CAR}/${id}`);
    } else {
      router.push(LINKS.LOGIN);
    }
  };

  const handleScheduleTestDrive = () => {
    if (user) {
      router.push(LINKS.TEST_DRIVE);
    } else {
      router.push(LINKS.LOGIN);
    }
  };

  return (
    <div className="space-y-3">
      <CustomButton
        onClick={handleRentCar}
        className="w-full py-3 rounded-lg font-medium"
      >
        Rent This Car
      </CustomButton>
      <CustomButton
        variant="secondary"
        onClick={handleScheduleTestDrive}
        className="w-full py-3 rounded-lg font-medium"
      >
        Schedule Test Drive
      </CustomButton>
    </div>
  );
};
