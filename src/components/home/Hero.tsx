/* eslint-disable react/no-unescaped-entities */

"use client";

import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import Button from "../Button";
import Social from "./Social";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromBottom,
} from "@/utils/motion";

const Hero = () => {
  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid sm:grid-cols-2 gap-y-8 sm:place-content-center place-items-center"
      >
        <motion.div variants={slideInFromLeft(1)}>
          <div>
          <div className="flex items-center gap-3 pb-3">
            <h1 className="text-4xl">Hello</h1>
            <Image
              src="/SVG/wave.png"
              alt="hand"
              width={50}
              quality={100}
              objectFit="contain"
              height={20}
              draggable="false"
            />
          </div>
            <h3 className="text-2xl lg:text-3xl animateText">
              <span> I'm Fuseini Abdul Wahab,</span>
            </h3>
            <h4 className="text-2xl font-bold lg:text-4xl">
              A{" "}
              <Typewriter
                words={["FrontEnd Developer"]}
                loop={Infinity}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={90}
              />
            </h4>
          </div>
          <p className="w-full py-3 text-lg sm:text-xl sm:w-5/6 break-word">
            I've designed web applications with user experience at the
            forefront, ensuring seamless navigation and intuitive interactions
          </p>
          <div className="flex items-center gap-x-4">
            <Button url="/contact" text="Hire Me" />
            <Button url="/about" text="About Me" />
          </div>
        </motion.div>
        <motion.div variants={slideInFromRight(0.8)}>
          <Image
            src="/images/front2.gif"
            alt=""
            width={600}
            height={100}
            unoptimized
            draggable="false"
            className="z-20 bounce"
          />
        </motion.div>
      </motion.div>
      <motion.div variants={slideInFromBottom(1.6)}>
        <Social />
      </motion.div>
    </div>
  );
};

export default Hero;
