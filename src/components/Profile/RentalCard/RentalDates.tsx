import { FaRegCalendarCheck } from "react-icons/fa6";

interface RentalDatesProps {
  rentedFrom: string;
  rentedTo: string;
}

export const RentalDates = ({ rentedFrom, rentedTo }: RentalDatesProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="text-sm sm:text-md lg:text-md text-gray-600 mb-2 flex items-center gap-2">
      <FaRegCalendarCheck size={16} className="sm:size-[18px] lg:size-[18px] flex-shrink-0" /> 
      <span className="break-words">
        {formatDate(rentedFrom)} - {formatDate(rentedTo)}
      </span>
    </div>
  );
}; 