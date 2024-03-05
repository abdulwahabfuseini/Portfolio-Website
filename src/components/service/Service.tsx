"use client"

import ServiceCard from "./ServiceCard";
import { serviceData } from "./Data";
import HeadTitle from "../HeadTitle";
import Need from "../Need";
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/utils/motion";

const Service = () => {
  return (
    <div >
       <HeadTitle title="WHAT I DO" text=" Services" />
       <Need />
      <motion.div initial="hidden" animate="visible" className="grid w-full gap-3 py-8 sm:grid-auto-fit-lg">
        {serviceData.map((item) => (
          <motion.div variants={slideInFromLeft(1)} key={item.id}>
            <ServiceCard  id={item.id} title={item.title} gif={item.gif} desc={item.desc} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Service;
