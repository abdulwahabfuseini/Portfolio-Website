import Hire from "@/components/hire/Hire";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PortFolio | Hire Me",
    description: "I am here to help your business or organisation to build a professional web applications",
  };
  
const HireMe = () => {
  return (
    <div className="grid w-full h-full px-4 py-10 mx-auto sm:px-6 md:py-10 max-w-7xl">
      <Hire />
     </div>
  )
}

export default HireMe