import { LINKS } from "@/common/constants/Globals/Links";
import { SignOptionsWrapper } from "@/components/common/Login/SignOptionsWrapper";
import { CustomButton } from "@/components/common/UI/Buttons/CustomButton";
import { Checkbox } from "@/components/common/UI/Inputs/Checkbox";
import { Input } from "@/components/common/UI/Inputs/Input";
import Link from "next/link";
import { FaCarSide } from "react-icons/fa";

export default function RegisterPage() {
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
      <form className="flex flex-col rounded-lg w-full gap-y-[1rem] sm:gap-y-[1.5rem] px-4 sm:px-0">
        <Input
          id="name"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
        />

        <div className="flex justify-between items-center">
          <Checkbox
            id="agree"
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
    </SignOptionsWrapper>
  );
}
