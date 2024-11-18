"use client";

import React from "react";
import Image from "next/image";
import Social from "../home/Social";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { ContactInfo } from "@/assets/Data";

const Address = () => {
  return (
    <div className="w-full py-3 shadow-xl md:py-6">
      <motion.div
        initial="hidden"
        whileInView={"show"}
        variants={fadeIn("left", 0.4)}
        className=""
      >
        <h4 className="mb-4 text-xl">CONTACT INFORMATION</h4>
        <div className="flex flex-wrap font-mono w-full gap-x-9">
          {ContactInfo.map((info) => (
            <div
              key={info.id}
              className="flex items-center mb-4 lg:mb-8 gap-x-3 sm:gap-x-4"
            >
              <div className="relative object-contain w-12 h-12 rounded-full light-background md:w-20 md:h-20">
                <Image
                  src={`/SVG/${info?.icon}`}
                  alt=""
                  fill
                  className="object-contain p-2 shadow-xl md:p-4"
                />
              </div>
              <div>
                <p className="text-lg">{info?.title}</p>
                <a
                  className="font-semibold text-gray-400 "
                  href="mailto:abdulwahabfuseini78@gmail.com"
                >
                  {info?.email}
                </a>
                <a
                  className="font-semibold text-gray-400"
                  href="tel:+233245264999"
                >
                  {info?.phone}
                </a>
                <p className="font-semibold text-gray-400">{info?.address}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <Social />
    </div>
  );
};

export default Address;
