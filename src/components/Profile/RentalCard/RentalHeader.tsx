import { CustomButton } from "../../common/UI/Buttons/CustomButton";
import { RentalStatus } from "./RentalStatus";

interface RentalHeaderProps {
  carName: string;
  carBrand: string;
  carModel: string;
  status: string;
  onStatusUpdate: (status: string) => void;
}

export const RentalHeader = ({
  carName,
  carBrand,
  carModel,
  status,
  onStatusUpdate,
}: RentalHeaderProps) => {
  const statusInfo = RentalStatus({ status });

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between lg:flex-row lg:items-start lg:justify-between gap-2 sm:gap-0 lg:gap-0 mb-2">
      <h3 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-900 leading-tight">
        {carName} {carBrand} {carModel}
      </h3>
      <CustomButton
        variant="secondary"
        onClick={() => onStatusUpdate(status)}
        size="small"
        className={`px-2 py-1 rounded-full text-xs font-medium self-start sm:self-auto lg:self-auto ${statusInfo.styles}`}
      >
        {statusInfo.text}
      </CustomButton>
    </div>
  );
}; 