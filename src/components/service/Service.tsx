"use client"

import ServiceCard from "./ServiceCard";
import { groupedServiceData } from "./Data";
import HeadTitle from "../HeadTitle";
import Need from "../Need";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const Service = () => {
  // Define category titles for display 
  const categoryTitles = {
    frontend: "Frontend Development",
    backend: "Backend & Optimization",
    database: "Database Management",
    cloud: "Cloud & Hosting Services",
  };

  return (
    <div>
      <HeadTitle title="WHAT I DO" text=" Services" />
      <Need />

      {Object.entries(groupedServiceData).map(([categoryKey, services]) => (
        <div key={categoryKey} className="my-4">
          <h2 className="text-2xl font-semibold mb-1 capitalize">
            {categoryTitles[categoryKey as keyof typeof categoryTitles] || categoryKey}
          </h2>
          <div className="grid w-full gap-4 py-4 sm:grid-auto-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-3 lg:grid-cols-4">
            {services.map((item, index) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn("up", index * 0.1)} 
              >
                 <ServiceCard
                    id={item.id}
                    title={item.title}
                    gif={item.gif}
                    // icon={item.icon} // Temporarily commented out until ServiceCard accepts it
                    desc={item.desc}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Service;