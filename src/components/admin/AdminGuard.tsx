"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/common/api/users/profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LINKS } from "@/common/constants/Globals/Links";

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const router = useRouter();
  
  const { data: userProfile, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (error || !userProfile) {
        router.push(LINKS.LOGIN);
        return;
      }
      
      if (userProfile.role !== "ADMIN") {
        router.push(LINKS.HOME);
        return;
      }
    }
  }, [userProfile, isLoading, error, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Checking access rights...</p>
        </div>
      </div>
    );
  }

  if (error || !userProfile || userProfile.role !== 'ADMIN') {
    return null; 
  }

  return <>{children}</>;
}; 