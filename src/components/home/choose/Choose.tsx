"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import HeadTitle from "@/components/HeadTitle";
import React from "react";
import { ChooseData } from "../../service/Data";
import ChooseCard from "./ChooseCard";

const Choose = () => {
  return (
    <div className="py-8">
      <HeadTitle title="WHY CHOOSE ME" text="reasons" />
      <motion.h1
        initial="hidden"
        whileInView={"show"}
        variants={fadeIn("down", 0.5)}
        className="text-lg"
      >
        Why you should choose me as a frontend web developer:
      </motion.h1>
      <div className="py-4 grid sm:grid-auto-fit-xl">
        {ChooseData.map((choose) => (
          <motion.div  initial="hidden" whileInView={"show"}  variants={fadeIn("left", 0.4)} key={choose.id}>
            <ChooseCard
              id={choose.id}
              title={choose.title}
              icon={choose.icon}
              desc={choose.desc}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Choose;
