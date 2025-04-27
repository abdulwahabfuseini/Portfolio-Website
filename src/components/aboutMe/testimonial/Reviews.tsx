"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Rate, Typography } from "antd";
import { FaQuoteRight } from "react-icons/fa";
import { useReviews } from "@/context/ReviewContext";

// Helper function to extract rating number
const getRatingValue = (rateString: string | number | undefined): number => {
  if (typeof rateString === "number") {
    return rateString;
  }
  if (typeof rateString === "string") {
    // Extracts the first number found
    const match = rateString.match(/^(\d+(\.\d+)?)/);
    if (match && match[1]) {
      const num = parseFloat(match[1]);
      return isNaN(num) ? 0 : num; // Return 0 if parsing fails
    }
  }
  return 0; // Default to 0 if input is invalid or undefined
};

const Reviews = () => {
  const { reviews, isLoading, fetchReviews } = useReviews();

  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);

  return (
    <div className="pt-4">
      {" "}
      <div className="flex items-center justify-between pr-4 md:pr-10 mb-6">
        {" "}
        <header className="text-2xl md:text-3xl capitalize font-semibold">
          {" "}
          What Clients Say
        </header>
        <div className="hidden sm:flex items-center gap-4">
          {" "}
          <button
            ref={setPrevEl}
            className="light-background p-2 rounded-full hover:opacity-80 transition-opacity"
          >
            <FaChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            ref={setNextEl}
            className="light-background p-2 rounded-full hover:opacity-80 transition-opacity"
          >
            <FaChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            
            <p className="text-xl text-gray-600 animate-pulse">
              Loading Reviews...
            </p>
          </div>
        ) : reviews.length > 0 ? (
          <Swiper
            navigation={{ nextEl, prevEl }}
            modules={[Autoplay, Navigation]}
            loop={true}
            speed={1500}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.1, spaceBetween: 7 },
              640: { slidesPerView: 1.5, spaceBetween: 8 },
              768: { slidesPerView: 2.2, spaceBetween: 8 },
              1024: { slidesPerView: 2.8, spaceBetween: 8 },
              1280: { slidesPerView: 3.5, spaceBetween: 10 },
            }}
            className="mt-4 mb-14"
          >
            {reviews.map((review) => (
              <SwiperSlide
                key={review.id}
                className="bg-glass p-3 shadow-lg rounded-lg border border-gray-200/50"
              >
                <div className="relative grid gap-2">
                  {" "}
                  <FaQuoteRight className="text-3xl text-green-500/80 -top-2 right-3 absolute opacity-70" />{" "}
                  <h2 className="text-xl font-bold text-white capitalize">
                    {review.fullName}
                  </h2>
                  <h3 className="text-base font-medium text-green-700 capitalize">
                    {review.occupation}
                  </h3>
                  <Typography.Paragraph
                    className="text-sm text-white mt-1 mb-2 min-h-[60px]"
                    ellipsis={{ rows: 3, expandable: false, symbol: "..." }}
                  >
                    {review.description}
                  </Typography.Paragraph>
                  <div className="mt-auto pt-2 border-t border-green-200/60">
                    {" "}
                    <Rate
                      value={getRatingValue(review.rate)}
                      allowHalf
                      disabled
                      className="custom-rate text-lg text-yellow-500"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // Message when loading is done but no reviews found
          <div className="flex justify-center items-center h-40">
            <p className="text-lg text-center text-gray-500">
              No reviews found. Be the first to leave one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
