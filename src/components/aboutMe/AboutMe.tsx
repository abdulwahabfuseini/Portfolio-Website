"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Background from "./background/Background";
import Skills from "./skills/Skills";
import Education from "./education/Education";
import Experience from "./experience/Experience";
import HeadTitle from "../HeadTitle";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const AboutMe = () => {
  const [filter, setFilter] = useState("Skills");
  const [content, setContent] = useState(Skills);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (filter === "Background") {
      setContent(Background);
    }
    if (filter === "Skills") {
      setContent(Skills);
    }
    if (filter === "Education") {
      setContent(Education);
    }
    if (filter === "Experience") {
      setContent(Experience);
    }
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [filter]);

  return (
    <div className="pt-10 md:pt-16 pb-10">
      <HeadTitle title="Biography" text="About Me" />
      <motion.div
        initial="hidden"
        whileInView={"show"}
        variants={fadeIn("up", 0.3)}
        className="grid max-w-xl grid-cols-2 gap-3 px-6 mx-auto sm:grid-cols-4 sm:bg-glass place-content-center sm:p-1"
      >
        <button
          onClick={() => setFilter("Background")}
          className={
            filter === "Background"
              ? "light-background transition-all ease-linear font-semibold ring-white  text-xl  shadow-lg ring-2 sm:ring-0 py-2 sm:p-1.5"
              : "bg-glass sm:bg-transparent py-2 sm:p-1.5 text-lg"
          }
        >
          Biography
        </button>
        <button
          onClick={() => setFilter("Skills")}
          className={
            filter === "Skills"
              ? "light-background transition-all ease-linear font-semibold ring-white  text-xl shadow-lg ring-2 sm:ring-0 py-2 sm:p-1.5"
              : "bg-glass sm:bg-transparent py-2 sm:p-1.5 text-lg"
          }
        >
          Skills
        </button>
        <button
          onClick={() => setFilter("Education")}
          className={
            filter === "Education"
              ? "light-background transition-all ease-linear font-semibold ring-white  text-xl shadow-lg ring-2 sm:ring-0 py-2 sm:p-1.5"
              : "bg-glass sm:bg-transparent py-2 sm:p-1.5 text-lg"
          }
        >
          Education
        </button>
        <button
          onClick={() => setFilter("Experience")}
          className={
            filter === "Experience"
              ? "light-background transition-all ease-linear font-semibold ring-white  text-xl shadow-lg ring-2 sm:ring-0 py-2 sm:p-1.5"
              : "bg-glass sm:bg-transparent py-2 sm:p-1.5 text-lg"
          }
        >
          Experience
        </button>
      </motion.div>
      {loading ? (
        <h1 className="h-screen text-xl py-12 px-4">Please Wait ...</h1>
      ) : (
        <div className="flex flex-col-reverse items-center py-3 sm:py-0 sm:grid sm:grid-cols-3 sm:gap-x-8 lg:gap-x-14 ">
          <div className="col-span-1">
            {filter === "Background" && (
              <motion.div
                initial="hidden"
                whileInView={"show"}
                variants={fadeIn("left", 0.3)}
              >
                <Image
                  src="/SVG/profile.png"
                  alt=""
                  width={500}
                  height={500}
                  objectFit="contain"
                  quality={100}
                  draggable="false"
                />
              </motion.div>
            )}
            {filter === "Skills" && (
              <motion.div
                initial="hidden"
                whileInView={"show"}
                variants={fadeIn("left", 0.3)}
              >
                <Image
                  src="/SVG/programming.png"
                  alt=""
                  width={700}
                  height={700}
                  quality={100}
                  className="object-contain w-full bounce"
                  draggable="false"
                />
              </motion.div>
            )}
            {filter === "Education" && (
              <motion.div
                initial="hidden"
                whileInView={"show"}
                variants={fadeIn("left", 0.3)}
              >
                <Image
                  src="/SVG/student.png"
                  alt=""
                  width={260}
                  height={600}
                  quality={100}
                  className="object-contain"
                  draggable="false"
                />
              </motion.div>
            )}
            {filter === "Experience" && (
              <motion.div
                initial="hidden"
                whileInView={"show"}
                variants={fadeIn("left", 0.3)}
              >
                <Image
                  src="/SVG/experience.png"
                  alt=""
                  width={800}
                  height={800}
                  quality={100}
                  className="object-contain"
                  draggable="false"
                />
              </motion.div>
            )}
          </div>
          <div className="w-full h-full py-6 sm:col-span-2">
            <motion.div
              initial="hidden"
              whileInView={"show"}
              variants={fadeIn("up", 0.4)}
            >
              {content}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
