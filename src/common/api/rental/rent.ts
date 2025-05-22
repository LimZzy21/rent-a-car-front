import axios from "axios";
import { RENTAL_API } from "@/common/constants/api/rentals";
import { Rental } from "./types";

export const getRentals = async (carId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${RENTAL_API.BASE}${RENTAL_API.GET_RENTALS}${carId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
  
export const createRental = async (rental: Rental) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${RENTAL_API.BASE}${RENTAL_API.CREATE_RENTAL}`,
    rental,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
