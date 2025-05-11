"use client";
import { LINKS } from "@/common/constants/Globals/Links";
import { registerSchema } from "@/common/validation/schemas/auth";
import { SignOptionsWrapper } from "@/components/common/Login/SignOptionsWrapper";
import { CustomButton } from "@/components/common/UI/Buttons/CustomButton";
import { Checkbox } from "@/components/common/UI/Inputs/Checkbox";
import { Input } from "@/components/common/UI/Inputs/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaCarSide } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { userRegister } from "@/common/api/auth/auth";
import { AxiosError } from "axios";
import { useState } from "react";
import { AuthErrors } from "@/common/constants/api/errors/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const { mutate: signUp, isPending } = useMutation({
    mutationKey: ["signUp"],
    mutationFn: userRegister,
    onError: (error: AxiosError<{ message: string }>) => {
      setErrorMessage(
        AuthErrors[error.response?.data?.message as keyof typeof AuthErrors] ||
          "Failed to register"
      );
    },
    onSuccess: () => {
      router.push(LINKS.LOGIN);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    signUp(data);
  };

  return (
    <SignOptionsWrapper>
      <div className="flex items-center justify-center gap-3 sm:gap-5 flex-col px-4 sm:px-0">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <FaCarSide className="size-[1.5rem] sm:size-[2rem]" />
          <p className="text-2xl sm:text-3xl font-semibold">LuxDrive</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-xl sm:text-2xl">Create an account</p>
          <p className="text-gray-500 text-sm sm:text-base text-center">
            Join us to start your luxury driving experience
          </p>
        </div>
      </div>
      <form
        className="flex flex-col rounded-lg w-full gap-y-[1rem] sm:gap-y-[1.5rem] px-4 sm:px-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="fullName"
          label="Full Name"
          type="text"
          error={errors.fullName?.message}
          {...register("fullName")}
          placeholder="Enter your full name"
        />

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

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          placeholder="Confirm your password"
        />

        <div className="flex justify-between items-center">
          <Checkbox
            id="agree"
            error={errors.agree?.message}
            {...register("agree")}
            label={
              <>
                I agree to the{" "}
                <span className="text-gray-900 hover:underline inline cursor-pointer">
                  Terms and Conditions
                </span>{" "}
                and{" "}
                <span className="text-gray-900 hover:underline inline cursor-pointer">
                  Privacy Policy
                </span>
              </>
            }
          />
        </div>
        <CustomButton
          disabled={isPending}
          variant="primary"
          className="w-full h-[2.8rem] sm:h-[3.2rem] text-sm sm:text-base"
          type="submit"
        >
          Register
        </CustomButton>
      </form>
      <div className="flex items-center justify-center gap-x-1 text-sm sm:text-base">
        <p className="text-gray-600">Already have an account?</p>
        <Link
          href={LINKS.LOGIN}
          className="text-gray-900 cursor-pointer hover:underline font-semibold"
        >
          Sign in
        </Link>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm sm:text-base">{errorMessage}</p>
      )}
    </SignOptionsWrapper>
  );
}
