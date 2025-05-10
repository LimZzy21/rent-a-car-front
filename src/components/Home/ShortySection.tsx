import { ToolsList } from "@/common/constants/Home/ShortySection";
import Image from "next/image";
import shortsy from "@/assets/Home/Images/Shotsy/Shorstsy.webp";

export const ShortySection = () => {
  return (
    <section className="flex justify-center flex-col items-center   bg-gray-100 py-10">
      <h1 className="lg:text-4xl text-2xl ">Rent a Car — Create Shorty! </h1>
      <p className="lg:text-xl text-sm w-[80%] text-center">
        Share your luxury driving experience with the world
      </p>
      <div className="flex justify-around w-full mt-[1rem]">
        <div className="lg:space-y-7 space-y-4 pb-[5%] flex flex-col justify-center  ms-[5%]">
          {ToolsList.map((el) => (
            <div className="flex gap-2 " key={el.title}>
              <div className=" lg:p-[1rem] rounded-4xl p-[.8rem]  bg-black  h-fit my-auto  flex items-center justify-center ">
                <el.src
                  color="white"
                  className="lg:size-[2.2rem] sm:size-[1.2rem] size-[0.8rem]"
                />
              </div>
              <div>
                <h4 className="text-black lg:text-2xl sm:text-md text-base">
                  {el.title}
                </h4>
                <p className="lg:text-lg text-gray-700 sm:text-sm  text-sm">
                  {el.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Image src={shortsy} alt="shorty" />
        </div>
      </div>
    </section>
  );
};
