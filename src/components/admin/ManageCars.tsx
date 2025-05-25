"use client";

import { getFilteredCars } from "@/common/api/car/car";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCar, FaSearch, FaEye, FaTachometerAlt } from "react-icons/fa";
import { Car, ApiResponse, CarFilters } from "@/common/api/car/types";
import CarCard from "@/app/cars/CarCard";
import { getDashboardData, DashboardData } from "@/common/api/admin/dashboard";

export const ManageCars = ({
  onDeleteCar,
}: {
  onDeleteCar?: (id: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [availabilityFilter, setAvailabilityFilter] = useState<
    "ALL" | "AVAILABLE" | "RENTED"
  >("ALL");
  const limit = 6;

  const filters: CarFilters = {
    page: currentPage,
    limit: limit,
    ...(searchTerm && {
      name: searchTerm,
    }),
    ...(availabilityFilter === "AVAILABLE" && { isCurrentlyRented: false }),
    ...(availabilityFilter === "RENTED" && { isCurrentlyRented: true }),
  };

  const {
    data: carsResponse,
    isLoading,
    error,
  } = useQuery<ApiResponse<Car>>({
    queryKey: ["filtered-cars", filters],
    queryFn: () => getFilteredCars(filters),
    placeholderData: (previousData) => previousData,
  });

  const { data: dashboardData } = useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  const totalPages = carsResponse?.meta?.totalPages || 1;
  const filteredCars = carsResponse?.data || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
          <p className="text-gray-600 text-lg">Loading cars...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <FaCar size={64} className="text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to load cars
          </h2>
          <p className="text-gray-600 text-center">Failed to load cars list</p>
        </div>
      </div>
    );
  }

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FaCar size={32} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Cars management</h1>
        </div>
        <div className="text-sm text-gray-500">
          Total: {carsResponse?.meta?.total || 0} cars
        </div>
      </div>

      <div className="mb-6 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, brand or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={availabilityFilter}
          onChange={(e) =>
            setAvailabilityFilter(
              e.target.value as "ALL" | "AVAILABLE" | "RENTED"
            )
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="ALL">All cars</option>
          <option value="AVAILABLE">Available</option>
          <option value="RENTED">Currently rented</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <FaCar className="text-blue-600" />
            <div>
              <p className="text-sm text-blue-800">Total cars</p>
              <p className="text-xl font-bold text-blue-600">
                {dashboardData?.totalCars || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2">
            <FaEye className="text-green-600" />
            <div>
              <p className="text-sm text-green-800">Available</p>
              <p className="text-xl font-bold text-green-600">
                {dashboardData?.availableCars || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center gap-2">
            <FaTachometerAlt className="text-orange-600" />
            <div>
              <p className="text-sm text-orange-800">Rented</p>
              <p className="text-xl font-bold text-orange-600">
                {dashboardData?.activeRentals || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {filteredCars.length === 0 ? (
        <div className="text-center py-12">
          <FaCar className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 text-lg">
            {searchTerm || availabilityFilter !== "ALL"
              ? "No cars found"
              : "No cars"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              name={car.name}
              model={car.model}
              brand={car.brand}
              image={car.images[0]}
              price={car.price.toString()}
              fuelType={car.carDetails?.fuelType || "N/A"}
              transmission={car.carDetails?.transmission || "N/A"}
              topSpeed={car.carDetails?.topSpeed.toString() || "0"}
              isCurrentlyRented={car.isCurrentlyRented}
              features={car.features.map((feature: string) => ({
                text: feature,
              }))}
              speed={car.carDetails?.topSpeed.toString() || "0"}
              horsepower={car.carDetails?.enginePower.toString() || "0"}
              gearbox={car.carDetails?.transmission || "N/A"}
              acceleration={car.carDetails?.acceleration.toString() || "0"}
              isAdmin={true}
              onDeleteCar={onDeleteCar}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-2 rounded-lg border ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};
