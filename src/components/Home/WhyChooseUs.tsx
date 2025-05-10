import { ammentiesData } from "@/common/constants/Home/WhyChooseUs";

export const WhyChooseUs = () => {
  return (
    <section className="py-10 px-4 lg:px-10 flex items-center justify-center flex-col">
      <h4 className="text-3xl text-black font-bold mb-8">Why Choose Us?</h4>
      <div className="flex flex-wrap justify-center w-full gap-y-8">
        {ammentiesData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 text-center w-[45%] lg:w-[22%] mx-2"
          >
            {<item.src className="size-[2.5rem]" color="orange" />}
            <h4 className="text-xl lg:text-2xl font-semibold">{item.title}</h4>
            <p className="text-sm lg:text-base lg:w-[65%]">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
