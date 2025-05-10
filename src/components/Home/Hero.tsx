import Image from "next/image";
import heroImg from "@/assets/Home/Images/Hero/ferrari.webp";
import { DarkFilter } from "../common/UI/Filters/DarkFilter";
import { CustomButton } from "../common/UI/Buttons/CustomButton";

export const HomeHero = () => {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <DarkFilter />
      <Image
        src={heroImg}
        alt="hero"
        className="object-cover"
        fill
        sizes="150vw"
        priority
      />
      <div className="absolute inset-0 flex justify-center  z-50 flex-col lg:gap-[1.7rem] gap-[1rem] lg:ps-[7%] ps-[5%] lg:pb-[7%] pb-[14%]">
        <h1 className="text-white lg:text-5xl text-3xl font-bold">
          Experience Luxury on Wheels
        </h1>
        <p className="text-white lg:text-xl text-md font-semibold">
          Rent premium sports cars for your next adventure
        </p>
        <div>
          <CustomButton variant="secondary" size="large">
            Browse Cars
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
