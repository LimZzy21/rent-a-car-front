"use client";
import { getCarById } from "@/common/api/car/car";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CarCard from "@/app/cars/CarCard";
import { createRental, getRentals } from "@/common/api/rental/rent";
import { RentalFormData } from "@/common/validation/schemas/rent-car";
import { RentalForm } from "./components/RentalForm";
import { useDateLogic } from "./hooks/useDateLogic";
import { AxiosError } from "axios";

export const RentCarPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: car } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id as string),
  });

  const { data: rentals } = useQuery({
    queryKey: ["rentals", id],
    queryFn: () => getRentals(id as string),
  });

  const { mutate: rentCar, isPending } = useMutation({
    mutationKey: ["rentCar"],
    mutationFn: createRental,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.setQueryData(["userProfile"], null);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
    },
  });

  const { isDateDisabled } = useDateLogic({ rentals });

  const onSubmit = (data: RentalFormData) => {
    console.log(data);
    console.log(rentals);
    rentCar({
      carId: id as string,
      rentedFrom: data.pickUpDate,
      rentedTo: data.returnDate,
      fullName: data.fullName,
      tel: data.phone,
      notes: data.notes,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col md:flex-row gap-10 p-10">
        <div className="w-full md:w-[400px] rounded-lg flex flex-col justify-center font-semibold text-lg">
          <CarCard
            id={car?.id || ""}
            name={car?.name || ""}
            image={car?.images[0] || "/placeholder-car.jpg"}
            model={car?.model || ""}
            brand={car?.brand || ""}
            price={car?.price.toString() || "0"}
            speed={car?.carDetails?.topSpeed.toString() || "0"}
            horsepower={car?.carDetails?.enginePower.toString() || "0"}
            features={
              car?.features.map((feature: string) => ({
                text: feature,
              })) || []
            }
            gearbox={car?.carDetails?.transmission || "N/A"}
            acceleration={car?.carDetails?.acceleration.toString() || "0"}
          />
        </div>

        <RentalForm
          isDateDisabled={isDateDisabled}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </div>
    </div>
  );
};

export default RentCarPage;
