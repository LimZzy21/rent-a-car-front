import { AUTH_API } from "@/common/constants/api/auth";
import { loginSchema, registerSchema } from "@/common/validation/schemas/auth";
import { z } from "zod";
import axios from "axios";

export const userLogin = async (data: z.infer<typeof loginSchema>) => {
  const response = await axios.post(`${AUTH_API.BASE}${AUTH_API.LOGIN}`, data, {
    withCredentials: true,
  });

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to login");
  }

  localStorage.setItem("token", response.data.accessToken);

  return response.data;
};

export const userRegister = async ({
  confirmPassword,
  email,
  fullName,
  password,
}: z.infer<typeof registerSchema>) => {
  const response = await axios.post(
    `${AUTH_API.BASE}${AUTH_API.REGISTER}`,
    {
      confirmPassword,
      email,
      fullName,
      password,
    },
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200 && response.status !== 201) {
    throw new Error("Failed to register");
  }

  return response.data;
};
