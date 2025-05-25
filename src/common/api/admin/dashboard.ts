import axios from "axios";
import { ADMIN_API } from "@/common/constants/api/admin";
import { UserProfile } from "../users/types";
export interface DashboardData {
  totalCars: number;
  activeRentals: number;
  totalUsers: number;
  availableCars: number;
}

export const getDashboardData = async (): Promise<DashboardData> => {
  const token = localStorage.getItem("token");
  
  const response = await axios.get<DashboardData>(
    `${ADMIN_API.BASE}${ADMIN_API.DASHBOARD}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to get dashboard data");
  }

  return response.data;
};

export const getUsers = async (): Promise<UserProfile[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get<UserProfile[]>(
    `${ADMIN_API.BASE}${ADMIN_API.USERS}`,  
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to get users");
  }

  return response.data;
};  




