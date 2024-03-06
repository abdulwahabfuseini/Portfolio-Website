"use client";

import { useRouter } from "next/navigation";
import { Comment } from "@/utils/Types";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Image from "next/image";

const Reviews = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    <div>
      <div className="py-6">
        {loading ? (
          "Please Wait..."
        ) : (
          <Swiper
            pagination={{ clickable: true }}
            spaceBetween={18}
            loop={true}
            speed={3000}
            modules={[Autoplay]}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              400: {
                slidesPerView: 1.1,
              },
              600: {
                slidesPerView: 1.4,
              },
              768: {
                slidesPerView: 1.8,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
          >
            <div>
              {records.map((comment, index) => (
                <SwiperSlide key={index} className="mt-6">
                  <div className="relative">
                    <FaQuoteLeft className="absolute top-0 text-3xl text-gray-400 left-3" />
                    <div className="z-20 grid gap-2 p-3 place-items-center">
                      <Image
                        width={80}
                        height={80}
                        src="/SVG/man.png"
                        alt="logo"
                        className="object-contain rounded-full"
                      />
                      <h1 className="text-lg font-semibold text-green-600 capitalize">
                        {comment?.fullName}
                      </h1>
                      <p>{comment?.description}</p>
                    </div>
                    <FaQuoteRight className="absolute bottom-0 text-3xl text-gray-400 right-3" />
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Reviews;
