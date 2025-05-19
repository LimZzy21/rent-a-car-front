import axios from "axios";
import { CAR_API } from "@/common/constants/api/car";
import { Car, ApiResponse } from "./types";

export const getCars = async (page = 1, limit = 10): Promise<ApiResponse<Car>> => {
  const response = await axios.get<ApiResponse<Car>>(`${CAR_API.BASE}${CAR_API.GET_CARS}?page=${page}&limit=${limit}`);
  return response.data;
};

export const getCarById = async (id: string): Promise<Car> => {
  const response = await axios.get<Car>(`${CAR_API.BASE}${CAR_API.GET_CAR_BY_ID}/${id}`);
  return response.data;
};



