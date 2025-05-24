import Image from "next/image";

interface RentalImageProps {
  image: string;
  carName: string;
}

export const RentalImage = ({ image, carName }: RentalImageProps) => {
  return (
    <div className="w-full h-48 sm:w-40 sm:h-32 lg:w-40 lg:h-32 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
      {image ? (
        <Image
          width={500}
          height={500}
          src={image}
          alt={carName}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <span className="text-gray-500 text-sm">Car Image Preview</span>
      )}
    </div>
  );
}; 