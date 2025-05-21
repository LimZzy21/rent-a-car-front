"use client";
import { FaRoad } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { SlSpeedometer } from "react-icons/sl";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CarFeature {
  text: string;
}

interface CarCardProps {
  id: string;
  name: string;
  model: string;
  brand: string;
  image: string;
  price: string;
  speed: string;
  horsepower: string;
  features: CarFeature[];
  gearbox: string;
  acceleration: string;
}

const CarCard: React.FC<CarCardProps> = ({
  id,
  name,
  model,
  brand,
  image,
  price,
  speed,
  horsepower,
  features,
  gearbox,
  acceleration,
}) => {
  const router = useRouter();

  return (
    <div className="rounded-lg overflow-hidden bg-white flex flex-col h-full ">
      <div className="bg-gray-300 h-[35vh] flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          width={700}
          height={700}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => router.push(`/car/${id}`)}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow border rounded-b-lg border-gray-300">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">
            {name} {model} {brand}
          </h3>
          <p className="font-medium">${price}/day</p>
        </div>
        <div className="flex gap-4 mb-3">
          <div className="flex items-center gap-1">
            <span className="text-sm inline-flex items-center gap-1">
              <SlSpeedometer />
              {speed} km/h
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm inline-flex items-center gap-1">
              <FaRoad />
              {horsepower} HP
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm inline-flex items-center gap-1">
              <FaRoad />
              {gearbox}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm inline-flex items-center gap-1">
              <FaRoad />
              {acceleration}s
            </span>
          </div>
        </div>
        <div className="mb-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-1">
                <MdDone className="text-green-500" />
                <span className="text-sm text-gray-600">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="w-full bg-black text-white py-2 rounded mt-auto">
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
