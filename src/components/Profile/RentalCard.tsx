import { UserRental } from "@/common/api/rental/types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRentalStatus } from "@/common/api/rental/rent";
import {
  RentalImage,
  RentalHeader,
  RentalDates,
  RentalDetails,
  RentalActions,
} from "./RentalCard/";

interface RentalCardProps {
  rental: UserRental;
}

export const RentalCard = ({ rental }: RentalCardProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateRentalStatusMutation } = useMutation({
    mutationFn: ({ rentalId, status }: { rentalId: string; status: string }) =>
      updateRentalStatus(rentalId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userRentals"] });
    },
  });

  const handleUpdateRentalStatus = (status: string) => {
    const newStatus = status === "PENDING" ? "NOW_RENTED" : "RETURNED";
    updateRentalStatusMutation({
      rentalId: rental.id,
      status: newStatus,
    });
  };

  const handleViewDetails = () => {
    router.push(`/car/${rental.carId}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
      <div className="w-full sm:w-auto flex justify-center sm:block">
        <RentalImage image={rental.car.images[0]} carName={rental.car.name} />
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-3 sm:space-y-0">
        <div className="space-y-2 sm:space-y-3">
          <RentalHeader
            carName={rental.car.name}
            carBrand={rental.car.brand}
            carModel={rental.car.model}
            status={rental.status}
            onStatusUpdate={handleUpdateRentalStatus}
          />

          <RentalDates
            rentedFrom={rental.rentedFrom}
            rentedTo={rental.rentedTo}
          />

          <RentalDetails
            fuelType={rental.car.carDetails.fuelType}
            transmission={rental.car.carDetails.transmission}
            totalPrice={rental.totalPrice}
          />
        </div>

        <div className="mt-3 sm:mt-0">
          <RentalActions onViewDetails={handleViewDetails} />
        </div>
      </div>
    </div>
  );
};
