"use client";

import { useState } from "react";
import CarCard from "@/app/cars/CarCard";
import Pagination from "@/components/common/Pagination";
import { getFilteredCars } from "@/common/api/car/car";
import { useQuery } from "@tanstack/react-query";
import { Car, ApiResponse, CarFilters } from "@/common/api/car/types";

export default function Cars() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const filters: CarFilters = {
    page: currentPage,
    limit: 6,
    ...(searchQuery && { name: searchQuery }),
    ...(sortOrder === "price-asc" && { sortBy: "price", sortOrder: "asc" }),
    ...(sortOrder === "price-desc" && { sortBy: "price", sortOrder: "desc" }),
    ...(sortOrder === "name-asc" && { sortBy: "name", sortOrder: "asc" }),
    ...(sortOrder === "name-desc" && { sortBy: "name", sortOrder: "desc" }),
  };

  const {
    data: response,
    isLoading,
    error,
  } = useQuery<ApiResponse<Car>>({
    queryKey: ["filtered-cars", filters, sortOrder],
    queryFn: () => getFilteredCars(filters),
    placeholderData: (previousData) => previousData,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Loading cars...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Failed to load cars
              </h2>
              <p className="text-gray-600">Please try again later</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!response?.data || !Array.isArray(response.data)) {
    return (
      <div className="w-full h-full bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No cars available
            </h3>
            <p className="text-gray-500">Check back later for new cars</p>
          </div>
        </div>
      </div>
    );
  }

  const displayedCars = response.data;

  return (
    <div className="w-full h-full bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Available Sports Cars</h1>
          <p className="text-gray-600">
            Choose your dream car and hit the road in style.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search cars..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          <div className="text-sm text-gray-500 flex items-center">
            Found: {response.meta.total} cars
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCars.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No cars found
              </h3>
              <p className="text-gray-500">
                {searchQuery
                  ? `No results for "${searchQuery}". Try different search terms.`
                  : "Try changing the search parameters"}
              </p>
            </div>
          ) : (
            displayedCars.map((car) => (
              <CarCard
                key={car.id}
                id={car.id}
                name={car.name}
                image={car.images[0]}
                model={car.model}
                fuelType={car.carDetails?.fuelType || "N/A"}
                transmission={car.carDetails?.transmission || "N/A"}
                topSpeed={car.carDetails?.topSpeed.toString() || "0"}
                isCurrentlyRented={car.isCurrentlyRented}
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

        {response.meta.totalPages > 1 && (
          <div className="mt-8 flex justify-center items-end">
            <Pagination
              currentPage={currentPage}
              totalPages={response.meta.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
