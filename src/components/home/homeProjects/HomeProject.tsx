"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import HeadTitle from "@/components/HeadTitle";
import Card from "./Card";
import { ProjectData } from "@/components/project/Data";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const DISPLAY_LIMIT = 6;

const HomeProjects = () => {
  const router = useRouter();
  const displayedProjects = ProjectData.slice(0, DISPLAY_LIMIT);

  return (
    <section id="latest-projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeadTitle title="LATEST PROJECTS" text="Portfolio" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {displayedProjects.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView={"show"}
              // Staggered animation for a professional reveal
              variants={fadeIn("up", index * 0.1)}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card
                id={item.id}
                projectName={item.projectName}
                imgUrl={item.imgUrl}
                link={item.link}
              />
            </motion.div>
          ))}

          {/* View All Projects Button - Designed as a prominent CTA card */}
          <motion.button
            initial="hidden"
            whileInView={"show"}
            // Match the last card's animation delay
            variants={fadeIn("up", (displayedProjects.length - 1) * 0.1 + 0.1)}
            viewport={{ once: true, amount: 0.2 }}
            onClick={() => router.push("/projects")}
            className="
              flex flex-col items-center justify-center 
              p-6 
              bg-blue-600 dark:bg-blue-700 
              text-white 
              rounded-xl 
              shadow-lg hover:shadow-xl 
              transition-all duration-300 ease-in-out
              group 
              transform hover:scale-[1.02]
              min-h-[200px] sm:min-h-full
            "
          >
            <h3 className="text-2xl font-bold mb-3">View All Projects</h3>
            <p className="text-lg mb-4 opacity-90">
              Explore the complete portfolio
            </p>

            <FaArrowRightLong
              className="
                w-10 h-10 
                p-2 
                bg-white/20 dark:bg-white/10 
                rounded-full 
                transition-all duration-300
                group-hover:scale-110 group-hover:bg-white/30
              "
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HomeProjects;
