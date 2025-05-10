"use client";
import { CiMenuFries } from "react-icons/ci";
import { LinksToPages } from "./LinksToPages";
import { SingUp } from "./SingUp";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/common/hooks/useIsMobile";
import { Logo } from "./Logo";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  return (
    <header className="bg-white">
      <div className="flex justify-between shadow-md lg:px-[10%] px-[2%]">
        <Logo />

        {!isMobile && (
          <>
            <LinksToPages />
            <SingUp />
          </>
        )}

        <div className="flex items-center pe-[4%] md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="border p-1 rounded-lg border-zinc-400"
          >
            <CiMenuFries className="size-[1.5rem]" />
          </button>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
};

export default Header;
