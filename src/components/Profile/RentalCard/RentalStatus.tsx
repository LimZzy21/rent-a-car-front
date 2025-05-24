interface RentalStatusProps {
  status: string;
}

export const RentalStatus = ({ status }: RentalStatusProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "NOW_RENTED":
        return "bg-green-500 text-white";
      case "RETURNED":
        return "bg-red-500 text-white";
      case "PENDING":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "NOW_RENTED":
        return "Now I have it";
      case "RETURNED":
        return "Returned";
      case "PENDING":
        return "Pending";
      default:
        return status;
    }
  };

  return {
    styles: getStatusStyles(status),
    text: getStatusText(status),
  };
}; 