import { FaMoneyBillTransfer } from "react-icons/fa6";
import { PiGasPump, PiGearSixLight } from "react-icons/pi";

interface RentalDetailsProps {
  fuelType: string;
  transmission: string;
  totalPrice: number;
}

export const RentalDetails = ({
  fuelType,
  transmission,
  totalPrice,
}: RentalDetailsProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center lg:flex-row lg:items-center gap-2 sm:gap-4 lg:gap-4 text-sm text-gray-600">
      <span className="flex items-center gap-2">
        <PiGasPump size={20} className="sm:size-[22px] lg:size-[22px]" /> {fuelType}
      </span>
      <span className="flex items-center gap-2">
        <PiGearSixLight size={20} className="sm:size-[22px] lg:size-[22px]" />
        {transmission}
      </span>
      <span className="flex items-center gap-2">
        <FaMoneyBillTransfer size={20} className="sm:size-[22px] lg:size-[22px]" />
        $ {totalPrice}
      </span>
    </div>
  );
}; 