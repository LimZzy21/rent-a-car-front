"use client";
import { LINKS } from "@/common/constants/Globals/Links";
import { loginSchema } from "@/common/validation/schemas/auth";
import { SignOptionsWrapper } from "@/components/common/Login/SignOptionsWrapper";
import { CustomButton } from "@/components/common/UI/Buttons/CustomButton";
import { Checkbox } from "@/components/common/UI/Inputs/Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/common/UI/Inputs/Input";
import Link from "next/link";
import { FaCarSide } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin } from "@/common/api/auth/auth";
import { useState } from "react";
import { AxiosError } from "axios";
import { AuthErrors } from "@/common/constants/api/errors/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const { mutate: login, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: userLogin,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.setQueryData(["userProfile"], null);
      router.push(LINKS.HOME);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setErrorMessage(
        AuthErrors[error.response?.data?.message as keyof typeof AuthErrors] ||
          "Failed to login"
      );
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data);
  };

  return (
    <SignOptionsWrapper>
      <div className="flex items-center justify-center gap-3 sm:gap-5 flex-col px-4 sm:px-0">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <FaCarSide className="size-[1.5rem] sm:size-[2rem]" />
          <p className="text-2xl sm:text-3xl font-semibold">LuxDrive</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-xl sm:text-2xl">Welcome back!</p>
          <p className="text-gray-500 text-sm sm:text-base text-center">
            Please enter your details to sign in
          </p>
        </div>
      </div>
      <form
        className="flex flex-col rounded-lg w-full gap-y-[1rem] sm:gap-y-[1.5rem] px-4 sm:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="email"
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
          placeholder="Enter your email"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password")}
          placeholder="Enter your password"
        />
        <div className="flex justify-between items-center flex-wrap gap-y-2">
          <Checkbox id="remember" label="Remember me" />
          <p className="text-gray-600 cursor-pointer hover:underline hover:text-gray-900 text-xs sm:text-base">
            Forgot password?
          </p>
        </div>
        <CustomButton
          variant="primary"
          className="w-full h-[2.8rem] sm:h-[3.2rem] text-sm sm:text-base"
          type="submit"
          isLoading={isPending}
        >
          Login
        </CustomButton>
      </form>
      {errorMessage && (
        <p className="text-red-500 text-sm sm:text-base">{errorMessage}</p>
      )}
      <div className="flex items-center justify-center gap-x-1 text-sm sm:text-base">
        <p className="text-gray-600">Don&apos;t have an account?</p>
        <Link
          href={LINKS.REGISTER}
          className="text-gray-900 cursor-pointer hover:underline font-semibold"
        >
          Sign up
        </Link>
      </div>
    </SignOptionsWrapper>
  );
}
