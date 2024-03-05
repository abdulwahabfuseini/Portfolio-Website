import Project from "@/components/project/Project";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PortFolio | Latest Projects",
    description: "LATEST PROJECT",
  };
  
const Portfolio = () => {
  return (
     <>
      <Project />
     </>
  )
}

export default Portfolio