import { CustomButton } from "../../common/UI/Buttons/CustomButton";

interface RentalActionsProps {
  onViewDetails: () => void;
}

export const RentalActions = ({ onViewDetails }: RentalActionsProps) => {
  return (
    <div className="mt-3 flex justify-center sm:justify-end lg:justify-end">
      <CustomButton
        variant="primary"
        size="small"
        className="font-semibold w-full sm:w-auto lg:w-auto"
        onClick={onViewDetails}
      >
        View Details
      </CustomButton>
    </div>
  );
}; 