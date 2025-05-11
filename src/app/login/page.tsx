import { LINKS } from "@/common/constants/Globals/Links";
import { SignOptionsWrapper } from "@/components/common/Login/SignOptionsWrapper";
import { CustomButton } from "@/components/common/UI/Buttons/CustomButton";
import Link from "next/link";
import { FaCarSide } from "react-icons/fa";

export default function LoginPage() {
  return (
    <SignOptionsWrapper>
      <div className="flex items-center justify-center gap-5 flex-col">
        <div className="flex  items-center justify-center gap-3 ">
          <FaCarSide className="size-[2rem]" />
          <p className="text-3xl font-semibold">LuxDrive</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-2xl">Welcome back!</p>
          <p className="text-gray-500">Please enter your details to sign in</p>
        </div>
      </div>
      <form className="flex flex-col  rounded-lg w-full gap-y-[1.5rem]">
        <div className="flex flex-col gap-y-[0.5rem]">
          <label htmlFor="email" className="text-gray-500">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="border-2 border-gray-300 rounded-md p-3 placeholder-gray-400"
          />
        </div>
        <div className="flex flex-col gap-y-[0.5rem]">
          <label htmlFor="password" className="text-gray-500">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="border-2 border-gray-300 rounded-md p-3 placeholder-gray-400"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-gray-900">
              Remember me
            </label>
          </div>
          <p className="text-gray-600 cursor-pointer hover:underline hover:text-gray-900">
            Forgot password?
          </p>
        </div>
        <CustomButton
          variant="primary"
          className="w-full lg:h-[3.2rem]"
          type="submit"
        >
          Login
        </CustomButton>
      </form>
      <div className="flex items-center justify-center gap-x-1 ">
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
