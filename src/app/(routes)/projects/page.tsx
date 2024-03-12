import Project from "@/components/project/Project";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PortFolio | Latest Projects",
    description: "EXPLORE MY LATEST PROJECT",
  };
  
const Projects = () => {
  return (
    <div className="grid w-full h-full px-4 py-10 mx-auto sm:px-6 md:py-16 max-w-7xl">
      <Project />
     </div>
  )
}

export default Projects