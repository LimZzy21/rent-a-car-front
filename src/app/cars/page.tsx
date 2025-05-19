"use client";

import { useState } from "react";
import CarCard from "@/app/cars/CarCard";
import Pagination from "@/components/common/Pagination";
import { getCars } from "@/common/api/car/car";
import { useQuery } from "@tanstack/react-query";
import { Car, ApiResponse } from "@/common/api/car/types";

export default function Cars() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const {
    data: response,
    isLoading,
    error,
  } = useQuery<ApiResponse<Car>>({
    queryKey: ["cars", currentPage, searchQuery, sortOrder],
    queryFn: () => getCars(currentPage, 6),
    placeholderData: (previousData) => previousData,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!response?.data || !Array.isArray(response.data)) {
    return <div>No cars available</div>;
  }

  const filteredCars = response.data.filter((car: Car) => {
    const carName = `${car.name} ${car.model} ${car.brand}`;
    return carName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedCars = [...filteredCars].sort((a: Car, b: Car) => {
    if (sortOrder === "price-asc") {
      return a.price - b.price;
    } else if (sortOrder === "price-desc") {
      return b.price - a.price;
    } else if (sortOrder === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="w-full h-full bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 ">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Available Sports Cars</h1>
          <p className="text-gray-600">
            Choose your dream car and hit the road in style.
          </p>
        </div>

        <div className="flex justify-between mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search cars..."
              className="border rounded px-3 py-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select
              className="border rounded px-3 py-2"
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option className="font-sans" value="">
                Sort by
              </option>
              <option className="font-sans" value="price-asc">
                Price: Low to High
              </option>
              <option className="font-sans" value="price-desc">
                Price: High to Low
              </option>
              <option className="font-sans" value="name-asc">
                Name: A to Z
              </option>
              <option className="font-sans" value="name-desc">
                Name: Z to A
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCars.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No cars found
              </h3>
              <p className="text-gray-500">
                Try changing the search parameters
              </p>
            </div>
          ) : (
            sortedCars.map((car) => (
              <CarCard
                key={car.id}
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
            ))
          )}
        </div>

        <div className="mt-8 flex justify-center items-end">
          <Pagination
            currentPage={currentPage}
            totalPages={response.meta.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
