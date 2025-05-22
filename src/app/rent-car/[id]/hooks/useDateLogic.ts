import { isWithinInterval, parseISO } from "date-fns";import { Rental } from "../types/rental";

interface UseDateLogicProps {
  rentals: Rental[] | undefined;
}

export const useDateLogic = ({ rentals }: UseDateLogicProps) => {
  const isDateDisabled = (date: Date): boolean => {
    if (!rentals) return false;
    return (rentals as Rental[]).some((rental: Rental) => {
      const start = parseISO(rental.rentedFrom);
      const end = parseISO(rental.rentedTo);
      return isWithinInterval(date, { start, end });
    });
  };

  return {
    isDateDisabled,
  };
}; 