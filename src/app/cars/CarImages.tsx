import Image from "next/image";     
import { Car } from "@/common/api/car/types";

export const CarImages = ({car, currentShowImage, setCurrentShowImage}: {car: Car, currentShowImage: string | null, setCurrentShowImage: (image: string) => void}) => {
    return (
        <div className="w-full lg:w-[90%] space-y-2">
        <div className="bg-gray-200 rounded-lg w-full aspect-square flex items-center justify-center h-[70vh] ">
          {car.images && car.images.length > 0 ? (
            <Image
              src={currentShowImage || car.images[0]}
              alt={car.name}
              className="object-cover w-full h-full rounded-lg"
              width={800}
              height={600}
            />
          ) : (
            <span className="text-gray-400">Main Car Image</span>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {car.images && car.images.length > 0
            ? car.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center cursor-pointer
                  hover:filter hover:grayscale-75 transition-all duration-300"
                  onClick={() => setCurrentShowImage(image)}
                >
                  <Image
                    src={image}
                    alt={`${car.name} view ${index + 1}`}
                    className="object-cover w-full h-full rounded-lg"
                    width={200}
                    height={200}
                  />
                </div>
              ))
            : [1, 2, 3, 4].map((view) => (
                <div
                  key={view}
                  className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center"
                >
                  <span className="text-gray-400 text-sm">View {view}</span>
                </div>
              ))}
        </div>
      </div>
    )
}
