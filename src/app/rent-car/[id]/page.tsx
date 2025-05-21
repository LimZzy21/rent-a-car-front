"use client";
import { getCarById } from "@/common/api/car/car";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CarCard from "@/app/cars/CarCard";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RentalFormData,
  rentalFormSchema,
} from "@/common/validation/schemas/rent-car";
import { PatternFormat } from "react-number-format";

export const RentCarPage = () => {
  const { id } = useParams();
  const { data: car } = useQuery({
    queryKey: ["car", id],
    queryFn: () => getCarById(id as string),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RentalFormData>({
    resolver: zodResolver(rentalFormSchema),
  });

  const onSubmit = (data: RentalFormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg flex flex-col md:flex-row gap-10 p-10">
        <div className="w-full md:w-[400px]  rounded-lg flex flex-col  justify-center  font-semibold text-lg ">
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 min-w-[320px]"
        >
          <h2 className="text-2xl font-semibold mb-6">Book Your Dream Car</h2>
          <div className="mb-4">
            <label className="font-medium">Full Name</label>  
            <input
              {...register("fullName")}
              type="text"
              placeholder="Enter your full name"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none focus:ring-2 focus:ring-black"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="font-medium">Email Address</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email address"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="font-medium">Phone Number</label>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <PatternFormat
                  format="+38 ### ## ## ###"
                  mask="_"
                  placeholder="+38 095 35 98 404"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none focus:ring-2 focus:ring-black"
                  allowEmptyFormatting
                  value={value}
                  onValueChange={(values) => {
                    onChange(values.value);
                  }}
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="font-medium">Pick-up Date</label>
              <input
                {...register("pickUpDate")}
                type="date"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none"
              />
              {errors.pickUpDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pickUpDate.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="font-medium">Return Date</label>
              <input
                {...register("returnDate")}
                type="date"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none"
              />
              {errors.returnDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.returnDate.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label className="font-medium">
              Additional Notes{" "}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <textarea
              {...register("notes")}
              placeholder="Let us know anything special..."
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-base outline-none min-h-[60px] resize-y"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold text-lg rounded-md py-3 transition hover:bg-gray-800"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default RentCarPage;
