"use client";

import { useEffect, useState } from "react";
import { PortFolio } from "./Data";
import ProjectCard from "./ProjectCard";
import HeadTitle from "../HeadTitle";
import { motion } from "framer-motion";
import { slideInFromBottom } from "@/utils/motion";

const Project = () => {
  const [toggleTab, setToggleTab] = useState(1);
  const [loading, setLoading] = useState(false);

  const toggleButton = (index: number) => {
    setLoading(true);
    setToggleTab(index);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [loading]);

  return (
    <div className="w-full h-full px-4 py-10 mx-auto max-w-7xl">
      <HeadTitle title="latest Projects" text="Portfolio" />
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid max-w-6xl mx-auto place-items-center"
      >
        <div className="grid grid-cols-2 gap-3 p-1 sm:grid-cols-4 sm:bg-glass">
          <button
            onClick={() => toggleButton(1)}
            className={
              toggleTab === 1
                ? "light-background transition-all ease-linear font-semibold ring-white text-white  text-xl shadow-lg ring-2 sm:ring-0 py-2 sm:py-1.5 px-2"
                : "bg-glass sm:bg-transparent  py-2 sm:py-1.5 px-2 text-lg"
            }
          >
            All Projects
          </button>
          <button
            onClick={() => toggleButton(2)}
            className={
              toggleTab === 2
                ? "light-background transition-all ease-linear font-semibold ring-white text-white  text-xl shadow-lg ring-2 sm:ring-0 py-2 sm:py-1.5 px-2"
                : "bg-glass sm:bg-transparent  py-2 sm:py-1.5 px-2 text-lg"
            }
          >
            Web Apps
          </button>
          <button
            onClick={() => toggleButton(3)}
            className={
              toggleTab === 3
                ? "light-background transition-all ease-linear font-semibold ring-white text-white  text-xl shadow-lg ring-2 sm:ring-0 py-2 sm:py-1.5 px-2"
                : "bg-glass sm:bg-transparent  py-2 sm:py-1.5 px-2 text-lg"
            }
          >
            E-commerce
          </button>
          <button
            onClick={() => toggleButton(4)}
            className={
              toggleTab === 4
                ? "light-background transition-all ease-linear font-semibold ring-white text-white  text-lg shadow-lg ring-2 sm:ring-0 py-2 sm:py-1.5 px-2"
                : "bg-glass sm:bg-transparent  py-2 sm:py-1.5 px-2 text-lg"
            }
          >
            Clone-Website
          </button>
        </div>
        <div className="w-full">
          {loading ? (
            <h1 className="h-screen py-10 text-xl">Please Wait ...</h1>
          ) : (
            <div>
              <motion.div variants={slideInFromBottom(0.6)} className="w-full">
                {toggleTab === 1 && (
                  <div className="grid w-full gap-3 py-10 grid-auto-fit-lg">
                    {PortFolio.map((project) => (
                      <ProjectCard
                        key={project.id}
                        link={project.link}
                        code={project.code}
                        imgUrl={project.imgUrl}
                        connect={project.connect}
                        projectName={project.projectName}
                        tools={project.tools}
                        desc={project.desc}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
              <motion.div variants={slideInFromBottom(0.6)} className="w-full">
                {toggleTab === 2 && (
                  <div className="grid w-full gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
                    {PortFolio.slice(2, 5).map((project) => (
                      <ProjectCard
                        key={project.id}
                        link={project.link}
                        code={project.code}
                        imgUrl={project.imgUrl}
                        connect={project.connect}
                        projectName={project.projectName}
                        tools={project.tools}
                        desc={project.desc}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
              <motion.div variants={slideInFromBottom(0.6)} className="w-full">
                {toggleTab === 3 && (
                  <div className="grid w-full gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
                    {PortFolio.slice(5, 8).map((project) => (
                      <ProjectCard
                        key={project.id}
                        link={project.link}
                        code={project.code}
                        imgUrl={project.imgUrl}
                        connect={project.connect}
                        projectName={project.projectName}
                        tools={project.tools}
                        desc={project.desc}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
              <motion.div variants={slideInFromBottom(0.6)} className="w-full">
                {toggleTab === 4 && (
                  <div className="grid w-full gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3 ">
                    {PortFolio.slice(0, 2).map((project) => (
                      <ProjectCard
                        key={project.id}
                        link={project.link}
                        code={project.code}
                        imgUrl={project.imgUrl}
                        connect={project.connect}
                        projectName={project.projectName}
                        tools={project.tools}
                        desc={project.desc}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Project;
