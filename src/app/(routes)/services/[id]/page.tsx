"use client";

import { serviceData } from "@/components/service/Data";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { TbChevronLeft } from "react-icons/tb";
import { useRouter } from "next/navigation";

interface SingleServiceProps {
  params: {
    id: string;
  };
}

const SingleService = ({ params }: SingleServiceProps) => {
  const router = useRouter();

  const slug = params.id;
  const title = decodeURIComponent(slug).replace(/-/g, " ");

  const data = serviceData.find(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );

  // 2. Handle missing data professionally
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] ">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Service Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The requested service could not be located.
        </p>
        <button
          onClick={() => router.push("/services")}
          className="px-6 py-3 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
        >
          Go Back to Services
        </button>
      </div>
    );
  }

  return (
    <section className="py-5 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={() => router.push("/services")}
          type="button"
          aria-label="Go back to services"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="
            flex items-center gap-1 
            p-2 mb-8 md:mb-12 
            text-blue-600 dark:text-blue-400 
            bg-blue-50 dark:bg-gray-800 
            rounded-full 
            hover:bg-blue-100 dark:hover:bg-gray-700 
            transition-colors duration-200
            shadow-md
          "
        >
          <TbChevronLeft className="w-6 h-6" />
          <span className="font-semibold text-base pr-2">Back to Services</span>
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-y-10 lg:gap-x-16 items-start">
          <motion.div
            initial="hidden"
            whileInView={"show"}
            variants={fadeIn("right", 0.2)}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <h1
              className="
              pb-4 mb-4 
              text-4xl md:text-5xl 
              uppercase font-extrabold 
              text-white
              border-b border-gray-200 
            "
            >
              {data.title}
            </h1>
            <p
              className="
              text-lg md:text-xl 
              text-white
              mb-6 
              leading-relaxed
            "
            >
              {data.desc1}
            </p>
            <p
              className="
              text-lg md:text-xl 
              text-white
              leading-relaxed
            "
            >
              {data.desc2}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView={"show"}
            variants={fadeIn("left", 0.4)}
            viewport={{ once: true, amount: 0.2 }}
            className="order-1 lg:order-2 w-full lg:sticky lg:top-8"
          >
            <div className="relative w-full h-64 sm:h-96 bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
              <Image
                src={`/SVG/${data.icon}`}
                alt={`${data.title} illustration`}
                layout="fill"
                objectFit="contain"
                className="transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SingleService;
