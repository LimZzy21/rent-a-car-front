import { FaStar } from "react-icons/fa";
import { reviews } from "@/common/constants/Home/Reviews";
import Image from "next/image";
export const CustomerReviews = () => {
  return (
    <section className="py-15 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl pb-10">Customer Reviews</h2>
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-5">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white p-6 rounded-lg shadow-sm w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] mb-5"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 mr-4">
                  <Image
                    src={review.src}
                    alt={review.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-xl">{review.name}</h3>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <FaStar color="gold" key={index} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-xl">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
