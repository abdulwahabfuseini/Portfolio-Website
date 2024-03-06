"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/utils/motion";
import { HeadProps } from "@/utils/Types";

const HeadTitle = ({ title, text }: HeadProps) => {
  return (
    <motion.div initial="hidden" animate="visible" className="relative pb-6">
      <motion.div variants={slideInFromLeft(1.5)}>
      <div  className="flex items-center gap-1 sm:gap-2">
        <Image src="/SVG/bullet.png" alt="" width={30} height={10} />
        <h2 className="text-2xl font-semibold uppercase lg:text-3xl animate__rubberBand">
          {title}
        </h2>
      </div>
      <h3 className="text-5xl uppercase lg:text-6xl animateText">
        <span>{text}</span>
      </h3>
      </motion.div>
    </motion.div>
  );
};

export default HeadTitle;
