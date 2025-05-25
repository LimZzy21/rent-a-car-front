import axios from "axios";
import { CAR_API } from "@/common/constants/api/car";


export const deleteCar = async (id: string) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${CAR_API.BASE}${CAR_API.DELETE_CAR}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to delete car");
    }

    return response.data;
};  