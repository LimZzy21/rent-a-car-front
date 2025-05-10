import { LINKS } from "@/common/constants/Globals/Links";
import Link from "next/link";
import { CustomButton } from "../common/UI/Buttons/CustomButton";

export const SingUp = () => {
  return (
    <div className="flex items-center flex-row pb-5 md:pb-0 border-t-1 w-full justify-center pt-5 md:pt-0 border-yellow-400 md:border-0 md:w-auto ">
      <Link href={LINKS.LOGIN}>
        <CustomButton variant="text">Login</CustomButton>
      </Link>
      <Link href={LINKS.REGISTER}>
        <CustomButton variant="primary">Register</CustomButton>
      </Link>
    </div>
  );
};
