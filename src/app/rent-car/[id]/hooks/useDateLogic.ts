import { parseISO, startOfDay, isSameDay, isAfter, isBefore } from "date-fns";
import { Rental } from "../types/rental";

interface UseDateLogicProps {
  rentals: Rental[] | undefined;
}

export const useDateLogic = ({ rentals }: UseDateLogicProps) => {
  const isDateDisabled = (date: Date): boolean => {
    if (!rentals) return false;
    
    const inputDate = startOfDay(date);
    
    return (rentals as Rental[]).some((rental: Rental) => {
      const start = startOfDay(parseISO(rental.rentedFrom));
      const end = startOfDay(parseISO(rental.rentedTo));
      
      return isSameDay(inputDate, start) || 
             isSameDay(inputDate, end) || 
             (isAfter(inputDate, start) && isBefore(inputDate, end));
    });
  };

  return {
    isDateDisabled,
  };
}; 