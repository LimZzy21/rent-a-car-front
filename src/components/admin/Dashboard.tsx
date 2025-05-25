import { getDashboardData } from "@/common/api/admin/dashboard";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <motion.div
          className="flex flex-col items-center justify-center min-h-[400px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate="animate"
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mb-4"
          />
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading statistics...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Total cars
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {data?.totalCars || 0}
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Active rentals
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {data?.activeRentals || 0}
          </p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Total users
          </h3>
          <p className="text-3xl font-bold text-yellow-600">
            {data?.totalUsers || 0}
          </p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Available cars
          </h3>
          <p className="text-3xl font-bold text-red-600">
            {data?.availableCars || 0}
          </p>
        </div>
      </div>
    </div>
  );
};
