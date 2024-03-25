"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import HeadTitle from "@/components/HeadTitle";
import Card from "./Card";
import { ProjectData } from "@/components/project/Data";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const HomeProjects = () => {
  const router = useRouter();

  return (
    <div className="py-20">
      <HeadTitle title="Latest Projects" text=" Portfolio" />
      <div className="grid w-full gap-3 py-8 sm:grid-auto-fit-xl">
        {ProjectData.map((item) => (
          <motion.div
            initial="hidden"
            whileInView={"show"}
            variants={fadeIn("up", 0.4)}
            key={item.id}
          >
            <Card
              id={item.id}
              projectName={item.projectName}
              imgUrl={item.imgUrl}
              link={item.link}
            />
          </motion.div>
        ))}
        <motion.button
          initial="hidden"
          whileInView={"show"}
          variants={fadeIn("up", 0.4)}
          onClick={() => router.push("/projects")}
          className=" py-5 light-background group text-xl font-semibold flex items-center gap-2 justify-center"
        >
          View all Projects{" "}
          <span>
            <FaArrowRightLong className="w-8 h-8  rounded-full group-hover:scale-x-125 group-hover:transition-all" />
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default HomeProjects;
