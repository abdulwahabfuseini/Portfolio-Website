"use client";

import HeadTitle from "@/components/HeadTitle";
import React from "react";
import { ProjectPlan } from "../Data";
import PricingCard from "./PricingCard";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const Pricing = () => {
  return (
    <div className="py-14">
      <HeadTitle title="Project Plan" text=" Pricing" />
      <div className="max-w-5xl mx-auto">
        <div className="grid w-full gap-3 py-6 sm:grid-auto-fit-lg sm:place-content-center">
          {ProjectPlan.map((price) => (
            <motion.div
              initial="hidden"
              whileInView={"show"}
              variants={fadeIn("left", 0.4)}
              key={price.id}
            >
              <PricingCard
                title={price.title}
                amount={price?.amount}
                service={price.service}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
