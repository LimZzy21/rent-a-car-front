"use client";

import { LINKS } from "@/common/constants/Globals/Links";
import Link from "next/link";
import { CustomButton } from "../common/UI/Buttons/CustomButton";
import { usePathname } from "next/navigation";
import { getUserProfile } from "@/common/api/users/profile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { MiniProfile } from "./MiniProfile";
import { signOut } from "@/common/utils/singOut";

export const SingUp = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === LINKS.LOGIN || pathname === LINKS.REGISTER;
  const queryClient = useQueryClient();

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const handleSignOut = () => {
    signOut();
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    queryClient.setQueryData(["userProfile"], null);
  };

  useEffect(() => {}, [userProfile]);

  return (
    <div className="flex items-center flex-row pb-5 md:pb-0 border-t-1 w-full justify-center pt-5 md:pt-0 border-yellow-400 md:border-0 md:w-auto ">
      {userProfile ? (
        <MiniProfile userProfile={userProfile} onSignOut={handleSignOut} />
      ) : !isLoginPage ? (
        <div className="flex items-center gap-x-2">
          <Link href={LINKS.LOGIN}>
            <CustomButton variant="text">Login</CustomButton>
          </Link>
          <Link href={LINKS.REGISTER}>
            <CustomButton variant="primary">Register</CustomButton>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-x-2">
          <Link href={LINKS.HOME}>
            <CustomButton variant="primary">Back to Home</CustomButton>
          </Link>
        </div>
      )}
    </div>
  );
};
