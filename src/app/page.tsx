import type { Metadata } from "next";
import AboutMe from "@/components/aboutMe/AboutMe";
import Hero from "@/components/home/Hero";
import HomeProject from "@/components/home/homeProjects/HomeProject";
import Choose from "@/components/home/choose/Choose";

export const metadata: Metadata = {
  title: "Portfolio | FUSEINI ABDUL WAHAB",
  description: "Welcome to my portfolio",
};

export default function Home() {
  return (
    <div className="grid w-full h-full px-3 pt-8 pb-20 mx-auto sm:px-5 max-w-7xl overflow-x-hidden">
      <Hero />
      <AboutMe />
      <Choose />
      <HomeProject />
    </div>
  );
}
