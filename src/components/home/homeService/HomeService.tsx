"use client";

import { motion } from "framer-motion";
import { slideInFromLeft } from "@/utils/motion";
import HeadTitle from "@/components/HeadTitle";
import Need from "@/components/Need";
import { serviceData } from "@/components/service/Data";
import HomeCard from "./HomeCard";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const HomeService = () => {
  const router = useRouter();

  return (
    <div>
      <HeadTitle title="WHAT I DO" text=" Services" />
      <Need />
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid w-full gap-3 py-8 sm:grid-auto-fit-lg"
      >
        {serviceData.slice(0, 3).map((item) => (
          <motion.div variants={slideInFromLeft(1)} key={item.id}>
            <HomeCard
              id={item.id}
              title={item.title}
              gif={item.gif}
              desc={item.desc}
            />
          </motion.div>
        ))}
        <button
          onClick={() => router.push("/services")}
          className=" py-5 light-background group text-lg font-semibold flex items-center gap-1 justify-center"
        >
          View all Services{" "}
          <span>
            <FaArrowRightLong className="w-16 h-10 p-2 rounded-full group-hover:scale-x-125 group-hover:transition-all" />
          </span>
        </button>
      </motion.div>
    </div>
  );
};

export default HomeService;
