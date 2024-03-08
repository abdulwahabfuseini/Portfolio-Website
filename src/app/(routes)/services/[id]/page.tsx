"use client";

import { serviceData } from "@/components/service/Data";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { TbChevronLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";

const SingleService = ({ params }: any) => {
  const title = decodeURIComponent(params.id).replace(/-/g, " ");
  const data = serviceData.find(
    (data) => data.title.toLowerCase() === title.toLowerCase()
  );

  const router = useRouter();

  return (
    <div className="grid max-w-6xl px-4 py-6 mx-auto md:py-14 sm:px-6 place-items-start gap-y-5">
      <button
        onClick={() => router.push("/services")}
        type="button"
        className=" p-1 font-semibold text-center  mx-2 light-background rounded-full"
      >
        <TbChevronLeft className="w-8 h-8" />
      </button>

      <div className="grid py-6 lg:grid-cols-3 gap-y-6 gap-x-10 place-items-center">
        <motion.div
          initial="hidden"
          whileInView={"show"}
          variants={fadeIn("left", 0.4)}
          className="order-2 col-span-1"
        >
          <Image
            src={`/SVG/${data?.icon}`}
            alt="service"
            width={800}
            height={30}
            className=" object-contain h-64 sm:h-96"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView={"show"}
          variants={fadeIn("right", 0.5)}
          className="text-lg sm:text-xl lg:col-span-2 lg:order-2 break-word order-1"
        >
          <h1 className="pb-3 text-2xl uppercase  font-semibold sm:text-4xl">
            {data?.title}
          </h1>
          <p>{data?.desc1}</p>
          <p className="py-5">{data?.desc2}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleService;
