"use client";

import { useRouter } from "next/navigation";
import { Comment } from "@/utils/Types";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { reviews } from "@/assets/Data";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [prevEl, setPrevtEl] = useState<HTMLButtonElement | null>(null);
  const [records, setRecords] = useState<Comment[]>([]);

  useEffect(() => {
    const getComment = async () => {
      setLoading(true);
      const res = await fetch("/api/comment", {
        cache: "no-store",
        method: "GET",
      });

      if (res.ok) {
        router.refresh();
      }

      const client = await res.json();

      console.log("API Response:", client);

      setRecords(client);

      setTimeout(() => {
        setLoading(false);
      }, 80);
    };
    getComment();
  }, [router]);

  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between pr-10">
        <header className="text-3xl capitalize">
          What my clients say about me
        </header>
        <div className=" hidden sm:flex items-center gap-6">
          <button ref={(node) => setPrevtEl(node)} className="light-background">
            <FaChevronLeft className="w-8 h-8 p-2 text-lg font-bold text-white rounded-full sm:w-10 sm:h-10" />
          </button>
          <button ref={(node) => setNextEl(node)} className="light-background">
            <FaChevronRight className="w-8 h-8 p-2 text-lg font-bold text-white rounded-full sm:w-10 sm:h-10 " />
          </button>
        </div>
      </div>
      <Swiper
        pagination={{ clickable: true }}
        navigation={{ nextEl, prevEl }}
        modules={[Autoplay, Navigation]}
        spaceBetween={18}
        loop={true}
        speed={3000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 1.2,
          },
          600: {
            slidesPerView: 1.4,
          },
          768: {
            slidesPerView: 1.8,
          },
          1024: {
            slidesPerView: 2.8,
          },
        }}
        className="w-full mt-10 mb-14"
      >
        <div>
          {reviews.map((review) => {
            return (
              <SwiperSlide key={review.id}>
                <ReviewCard
                  fullName={review.fullName}
                  email={review.email}
                  occupation={review.occupation}
                  description={review.description}
                />
              </SwiperSlide>
            );
          })}
          {/* {records.map((comment) => (
                <SwiperSlide key={comment._id} className="mt-6">
                  <div className="relative">
                    <FaQuoteLeft className="absolute top-0 text-3xl text-gray-400 left-3" />
                    <div className="z-20 grid gap-2 p-3 place-items-center">
                      <Image
                        width={80}
                        height={80}
                        src="/SVG/wave.png"
                        alt="logo"
                        className="object-contain rounded-full"
                      />
                      <h1 className="text-lg font-semibold text-green-600 capitalize">
                        {comment?.fullName}
                      </h1>
                      <h1 className="text-lg font-semibold text-green-600 capitalize">
                        {comment?.email}
                      </h1>
                      <p>{comment?.description}</p>
                    </div>
                    <FaQuoteRight className="absolute bottom-0 text-3xl text-gray-400 right-3" />
                  </div>
                </SwiperSlide>
              ))} */}
        </div>
      </Swiper>
    </div>
  );
};

export default Reviews;
