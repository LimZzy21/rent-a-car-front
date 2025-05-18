"use client";

import { useQuery } from "@tanstack/react-query";
import { getCarById } from "@/common/api/car/car";
import { Car } from "@/common/api/car/types";
import { useState, useEffect } from "react";
import { CardDescription } from "./CardDesctiption";
import { Features } from "./Features";
import { CarActions } from "./CarActions";
import { CarImages } from "./CarImages";
import { CAR_CAR_DETAILS } from "@/common/constants/Car/Car";

const CarDetails = () => {
  const [currentShowImage, setCurrentShowImage] = useState<string | null>(null);

  const {
    data: car,
    isLoading,
    error,
  } = useQuery<Car>({
    queryKey: ["carDetails", "18204bf8-c489-48a4-be2c-842d12939da6"],
    queryFn: () => getCarById("18204bf8-c489-48a4-be2c-842d12939da6"),
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

  useEffect(() => {
    if (car && car.images && car.images.length > 0) {
      setCurrentShowImage(car.images[0]);
    }
  }, [car]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">Error loading data</div>
    );
  }

  if (!car) {
    return <div className="container mx-auto px-4 py-8">Data not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-9xl">
      <div className="flex flex-col md:flex-row gap-8 ">
        <CarImages
          car={car}
          currentShowImage={currentShowImage}
          setCurrentShowImage={setCurrentShowImage}
        />

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
          <p className="text-xl mb-6">${car.price}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {CAR_CAR_DETAILS.map((item) => (
              <CardDescription
                key={item.id}
                icon={item.icon}
                description={car.carDetails?.[item.type]}
                title={item.name}
              />
            ))}
          </div>

          <Features features={car.features} />

          <CarActions />
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
