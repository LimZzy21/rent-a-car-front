import { LINKS } from "@/common/constants/Globals/Links";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/Header/icons/logo_header.svg";

export const Logo = () => {
  return (
    <div className=" ">
      <Link
        href={`${LINKS.HOME}`}
        className="flex xl:gap-[1.5rem] gap-[1.5rem] items-center "
      >
        <Image src={logo} alt="logo" className="lg:size-[5rem] size-[5rem]  " />
        <h1 className="2xl:text-[1.6rem]">LuxDrive</h1>
      </Link>
    </div>
  );
};
