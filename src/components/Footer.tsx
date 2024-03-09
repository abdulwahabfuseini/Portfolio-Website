"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const Footer = () => {
  return (
    <div>
      <motion.div  initial="hidden" whileInView={"show"}  variants={fadeIn("bottom", 0.8)} className="w-full px-4 py-6 border-t-2 bg-glass">
        <div className="flex flex-wrap justify-between mx-auto sm:px-2 sm:items-center max-w-7xl gap-y-4">
          <p className="gap-3 text-xl leading-10 sm:flex">
            &copy; 2024 All Right Reserved <br className="sm:hidden" />{" "}
            <span className="hidden sm:block">|</span> FUSEINI ABDUL WAHAB
          </p>
          <div className="flex flex-col gap-4 text-lg sm:text-xl sm:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src="/SVG/call.png"
                alt="skill"
                width={20}
                height={10}
                className="object-contain"
              />
              <a href="tel:+233 24 526 4999">+233 24 526 4999</a>
            </div>
            <span className="hidden sm:block">|</span>
            <div className="flex items-center gap-2">
              <Image
                src="/SVG/gmail.png"
                alt="skill"
                width={20}
                height={10}
                className="object-contain"
              />
              <a href="mailto:abdulwahabfuseini78@gmail.com">
                abdulwahabfuseini78@gmail.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;
