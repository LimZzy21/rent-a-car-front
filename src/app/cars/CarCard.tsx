"use client";
import { FaCar, FaEye, FaTrash, FaGasPump } from "react-icons/fa6";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCogs, FaTachometerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CarCardProps {
  id: string;
  name: string;
  model: string;
  brand: string;
  fuelType: string;
  transmission: string;
  topSpeed: string;
  isCurrentlyRented: boolean;
  image: string;
  price: string;
  speed: string;
  horsepower: string;
  features: { text: string }[];
  gearbox: string;
  acceleration: string;
  isAdmin?: boolean;
  onDeleteCar?: (id: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  name,
  model,
  brand,
  image,
  price,
  fuelType,
  transmission,
  topSpeed,
  isCurrentlyRented,
  isAdmin = false,
  onDeleteCar,
  features,
}) => {
  const router = useRouter();

  const handleCarClick = () => {
    router.push(`/car/${id}`);
  };

  const handleDeleteCar = () => {
    if (onDeleteCar) {
      onDeleteCar(id);
    }
  };

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-48 bg-gray-200">
        {image && image.length > 0 ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover cursor-pointer"
            onClick={handleCarClick}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaCar size={48} className="text-gray-400" />
          </div>
        )}

        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
            isCurrentlyRented
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-green-100 text-green-800 border border-green-200"
          }`}
        >
          {isCurrentlyRented ? "Rented" : "Available"}
        </div>
      </div>

      <div className="flex justify-between items-start mb-3 px-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 truncate">{name}</h3>
          <p className="text-sm text-gray-500">
            {brand} {model}
          </p>
        </div>
        <div className="text-right ml-2">
          <p className="font-bold text-lg text-blue-600">${price}</p>
          <p className="text-xs text-gray-500">per day</p>
        </div>
      </div>

      {features && (
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs px-4">
          <div className="flex items-center gap-1">
            <FaGasPump className="text-gray-400" />
            <span className="text-gray-600">{fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaCogs className="text-gray-400" />
            <span className="text-gray-600">{transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaTachometerAlt className="text-gray-400" />
            <span className="text-gray-600">{topSpeed}km/h</span>
          </div>
        </div>
      )}

      {features && features.length > 0 && (
        <div className="mb-4 px-4">
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {feature.text}
              </span>
            ))}
            {features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{features.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      {isAdmin && (
        <div className="flex gap-2 px-4 py-2">
          <button
            onClick={handleCarClick}
            className="cursor-pointer flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
          >
            <FaEye size={12} />
            View
          </button>
          <button
            onClick={handleDeleteCar}
            className="cursor-pointer flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm"
          >
            <FaTrash size={12} />
            Delete
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default CarCard;
