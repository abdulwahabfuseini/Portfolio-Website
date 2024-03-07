
import type { Metadata } from "next";
import AboutMe from "@/components/aboutMe/AboutMe";
import Testimonial from "@/components/aboutMe/testimonial/Testimonial";

export const metadata: Metadata = {
  title: "PortFolio | About Me",
  description: "ABOUT FUSEINI ABDUL WAHAB",
};

const About = () => {
  return (
    <div className="grid h-full px-3 mx-auto sm:px-5 lg:px-8 max-w-7xl w-full bg-red-700">
      <AboutMe />
      <Testimonial />
    </div>
  );
};

export default About;
