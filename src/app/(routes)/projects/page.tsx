import Project from "@/components/project/Project";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PortFolio | Latest Projects",
    description: "EXPLORE MY LATEST PROJECT",
  };
  
const Projects = () => {
  return (
     <>
      <Project />
     </>
  )
}

export default Projects