import axios from "axios";
import { CAR_API } from "@/common/constants/api/car";
import { Car, ApiResponse, CarFilters } from "./types";
import { CreateCarFormData } from "@/common/validation/schemas/car";

export const getCars = async (
  page = 1,
  limit = 10
): Promise<ApiResponse<Car>> => {
  const response = await axios.get<ApiResponse<Car>>(
    `${CAR_API.BASE}${CAR_API.GET_CARS}?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getFilteredCars = async (
  filters: CarFilters = {}
): Promise<ApiResponse<Car>> => {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, value.toString());
    }
  });

  const response = await axios.get<ApiResponse<Car>>(
    `${CAR_API.BASE}${CAR_API.GET_FILTERED_CARS}?${queryParams.toString()}`
  );
  return response.data;
};

export const getCarById = async (id: string) => {
  const response = await axios.get<Car>(`${CAR_API.BASE}/${id}`);
  return response.data;
};

export const getSimilarCars = async (id: string): Promise<Car[]> => {
  const response = await axios.get<Car[]>(
    `${CAR_API.BASE}${CAR_API.GET_SIMILAR_CARS}/${id}`
  );
  return response.data;
};

export const createCar = async (data: CreateCarFormData) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("brand", data.brand);
  formData.append("model", data.model);
  formData.append("price", data.price.toString());
  formData.append("rating", data.rating.toString());

  formData.append("carDetails[fuelType]", data.carDetails.fuelType);
  formData.append("carDetails[transmission]", data.carDetails.transmission);
  formData.append("carDetails[mileage]", data.carDetails.mileage.toString());
  formData.append(
    "carDetails[engineSize]",
    data.carDetails.engineSize.toString()
  );
  formData.append(
    "carDetails[enginePower]",
    data.carDetails.enginePower.toString()
  );
  formData.append("carDetails[topSpeed]", data.carDetails.topSpeed.toString());
  formData.append(
    "carDetails[acceleration]",
    data.carDetails.acceleration.toString()
  );

  data.images.forEach((image) => {
    formData.append("images", image);
  });

  data.features.forEach((feature) => {
    formData.append("features", feature);
  });

  const response = await axios.post<Car>(
    `${CAR_API.BASE}${CAR_API.CREATE_CAR}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to create car");
  }

  return response.data;
};
