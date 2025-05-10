import vehicle from "@/assets/Home/Images/FeatureVehicles/Ferrari F8 Tributo.webp";
import Image from "next/image";
import { CustomButton } from "../common/UI/Buttons/CustomButton";

export const FeatureVehicle = () => {
  return (
    <section className="container mx-auto py-10">
      <h4 className="text-4xl ">Feature Vehicles</h4>
      <div className="flex flex-col md:flex-row justify-around w-full mt-[4rem] gap-y-4">
        <div className="w-[90%] mx-auto md:mx-0 md:w-auto">
          <Image
            src={vehicle}
            alt="Ferrari F8 Tributo"
            className="lg:w-[26rem] md:w-[14rem] w-full rounded-md"
          />
          <div className="py-2.5">
            <h5 className="text-xl">Ferrari F8 Tribuno</h5>
            <p className="text-gray-500">$1.200/day</p>
          </div>
          <CustomButton className="w-full lg:py-4 font-semibold">
            Book Now
          </CustomButton>
        </div>
        <div className="w-[90%] mx-auto md:mx-0 md:w-auto">
          <Image
            src={vehicle}
            alt="Ferrari F8 Tributo"
            className="lg:w-[26rem] md:w-[14rem]  rounded-md"
          />
          <div className="py-2.5">
            <h5 className="text-xl">Ferrari F8 Tribuno</h5>
            <p className="text-gray-500">$1.200/day</p>
          </div>
          <CustomButton className="w-full lg:py-4 font-semibold">
            Book Now
          </CustomButton>
        </div>
        <div className="w-[90%] mx-auto md:mx-0 md:w-auto">
          <Image
            src={vehicle}
            alt="Ferrari F8 Tributo"
            className="lg:w-[26rem] md:w-[14rem]  rounded-md"
          />
          <div className="py-2.5">
            <h5 className="text-xl">Ferrari F8 Tribuno</h5>
            <p className="text-gray-500">$1.200/day</p>
          </div>
          <CustomButton className="w-full lg:py-4 font-semibold">
            Book Now
          </CustomButton>
        </div>
      </div>
    </section>
  );
};
