"use client";

import { useEffect, useState, useMemo } from "react";
import { PortFolio } from "./Data";
import ProjectCard from "./ProjectCard";
import HeadTitle from "../HeadTitle";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import ProjectSkeleton from "./ProjectSkeleton";

// Define filter categories
const projectFilters = [
  { id: 1, name: "All Projects" },
  { id: 2, name: "Web Apps" },
  { id: 3, name: "E-commerce" },
  { id: 4, name: "Clone Websites" },
];

const Project = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Reverted filtering to use the array slicing,
  const filteredProjects = useMemo(() => {
    switch (activeTab) {
      case 1:
        return PortFolio; // All Projects
      case 2:
        return PortFolio.slice(2, 6); // Web Apps
      case 3:
        return PortFolio.slice(6, 10); // E-commerce
      case 4:
        return PortFolio.slice(0, 2); // Clone-Website
      default:
        return PortFolio;
    }
  }, [activeTab]);

  const handleTabChange = (index: number) => {
    if (index !== activeTab) {
      setIsLoading(true);
      setActiveTab(index);
    }
  };

  // Simulate loading transition after tab change
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, activeTab]);

  // Animation for the entire grid content to transition smoothly
  const gridVariants = {
    hidden: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  return (
    <section id="portfolio" className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeadTitle title="PROJECTS" text="Portfolio" />

        {/* Filter Buttons */}
        <motion.div
          initial="hidden"
          whileInView={"show"}
          variants={fadeIn("up", 0.1)}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-3 p-1 rounded-full bg-glass mx-auto max-w-fit shadow-inner mt-10 mb-16"
        >
          {projectFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleTabChange(filter.id)}
              className={`
                px-5 py-2 text-sm sm:text-base font-medium rounded-full 
                transition-all duration-300 ease-out 
                ${
                  activeTab === filter.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50 dark:shadow-none" // Active state
                    : "text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700" // Inactive state
                }
              `}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        <div className="w-full min-h-[400px]">
          {" "}
          {isLoading ? (
            <ProjectSkeleton />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={gridVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={fadeIn("up", index * 0.1)}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <ProjectCard
                      link={project.link}
                      code={project.code}
                      imgUrl={project.imgUrl}
                      connect={project.connect}
                      projectName={project.projectName}
                      tools={project.tools}
                      desc={project.desc}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

export default Project;
