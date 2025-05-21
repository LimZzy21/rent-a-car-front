import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSimilarCars } from "@/common/api/car/car";
import { useParams } from "next/navigation";
import CarCard from "../cars/CarCard";

export const SimilarVehicles = () => {
  const { id } = useParams();

  const { data: cars } = useQuery({
    queryKey: ["similarCars"],
    queryFn: () => getSimilarCars(id as string),
  });

  if (!cars) return null;
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-semibold mb-6">Similar Vehicles</h2>
      <div className=" gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {cars.map((car, idx) => (
          <CarCard
            key={idx}
            id={car.id}
            name={car.name}
            image={car.images[0]}
            model={car.model}
            brand={car.brand}
            price={car.price.toString()}
            speed={car.carDetails?.topSpeed.toString() || "0"}
            horsepower={car.carDetails?.enginePower.toString() || "0"}
            features={car.features.map((feature: string) => ({
              text: feature,
            }))}
            gearbox={car.carDetails?.transmission || "N/A"}
            acceleration={car.carDetails?.acceleration.toString() || "0"}
          />
        ))}
      </div>
    </div>
  );
};
