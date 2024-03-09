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
import { Rate, Typography } from "antd";
import { FaQuoteRight } from "react-icons/fa";

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
      }, 100);
    };
    getComment();
  }, [router]);

  return (
    <div>
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
      <div>
        {loading ? (
          <h1 className="text-xl mt-4 mb-24">Please Wait ...</h1>
        ) : (
          <Swiper
            navigation={{ nextEl, prevEl }}
            modules={[Autoplay, Navigation]}
            spaceBetween={10}
            loop={true}
            speed={3000}
            autoplay={{ delay: 9000, disableOnInteraction: false }}
            breakpoints={{
              0: {
                slidesPerView: 1.05,
              },
              400: {
                slidesPerView: 1.23,
              },
              600: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 1.8,
              },
              1024: {
                slidesPerView: 2.8,
              },
            }}
            className="mt-10 mb-14"
          >
            <div>
              {records.map((review, index) => {
                const { fullName, email, occupation, description } = review;
                return (
                  <SwiperSlide key={index} className="bg-glass p-4 shadow-lg">
                    <div className="relative grid ">
                      <h1 className="text-xl font-bold">{fullName}</h1>
                      <h1 className="Text">{email}</h1>
                      <FaQuoteRight className="text-3xl -top-1.5 right-3 absolute " />
                      <Typography.Paragraph
                        className="text-base text-white py-2"
                        ellipsis={{
                          rows: 3,
                          expandable: true,
                          symbol: "Read More",
                        }}
                      >
                        {description}
                      </Typography.Paragraph>
                      <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold  capitalize">
                          {occupation}
                        </h1>
                        <Rate defaultValue={5} allowHalf className="text-sm" />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </div>
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Reviews;
