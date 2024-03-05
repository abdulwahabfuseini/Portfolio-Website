"use client";

import { useEffect, useState } from "react";
import HeadTitle from "../../HeadTitle";
import ReviewForm from "./ReviewForm";
import { Drawer } from "@material-tailwind/react";
import { FaPlus, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Comment } from "@/utils/Types";

const Testimonial = () => {
  const [openLeft, setOpenLeft] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<Comment[]>([]);

  const openDrawerLeft = () => setOpenLeft(true);
  const closeDrawerLeft = () => setOpenLeft(false);

  useEffect(() => {
    const getComment = async () => {
      setLoading(true);
      const res = await fetch("/api/comment", {
        cache: "no-store",
        method: "GET"
      });

      if (res.ok) {
        router.refresh();
      }

      const client = await res.json();
      console.log("🚀 ~ file: page.jsx:33 ~ getComment ~ client:", client);
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
      <HeadTitle title="Testimonial" text="Clients" />
      <div className="">
        <div className="py-10">
          <header className="text-3xl capitalize">
            What my clients say about me
          </header>
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
                  {Array.isArray(records) && records.length > 0 ? (
                    records.map((comment, index) => (
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
                    ))
                  ) : (
                    <p>No comments available</p>
                  )}
                </div>
              </Swiper>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={openDrawerLeft}
            className="flex items-center gap-2 p-2 text-lg font-bold text-center border-2 rounded-lg light-background"
          >
            <span>Add Testimonial</span>
            <FaPlus className="bg-white p-1.5 w-8 h-8 rounded-full text-blue-600" />
          </button>
          <Drawer
            placeholder={null}
            placement="left"
            open={openLeft}
            onClose={closeDrawerLeft}
            className="grid items-center shadow-xl p-4 bg-main shadow-blue-500/10 justify-normal"
          >
            <ReviewForm />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
