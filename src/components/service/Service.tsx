"use client";

import ServiceCard from "./ServiceCard";
import { groupedServiceData } from "./Data";
import HeadTitle from "../HeadTitle";
import Need from "../Need";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const categoryTitles: { [key: string]: string } = {
  frontend: "Frontend Development",
  backend: "Backend & Optimization",
  database: "Database Management",
  cloud: "Cloud & Hosting Services",
};

const Service = () => {
  return (
    <section id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeadTitle title="WHAT I DO" text="Services" />
        <Need />

        {Object.entries(groupedServiceData).map(
          ([categoryKey, services], categoryIndex) => (
            <motion.div
              key={categoryKey}
              className="my-10 md:my-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeIn("up", 0.1 * categoryIndex)}
            >
              {/* Category Title */}
              <h2 className="text-xl md:text-3xl font-bold mb-6 tracking-tight text-white  border-b-2 border-blue-500 pb-2 capitalize">
                {categoryTitles[categoryKey] || categoryKey}
              </h2>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {services.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={fadeIn("up", index * 0.05 + 0.1)}
                  >
                    <ServiceCard
                      id={item.id}
                      title={item.title}
                      gif={item.gif}
                      desc={item.desc}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default Service;
