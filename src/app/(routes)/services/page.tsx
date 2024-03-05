import Service from "@/components/service/Service";
import Pricing from "@/components/service/pricing/Pricing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortFolio | Services",
  description: "WHAT I CAN DO",
};

const Services = () => {
  return (
    <div className="grid w-full h-full px-4 py-10 mx-auto sm:px-6 md:py-16 max-w-7xl">
      <Service />
      <Pricing />
    </div>
  );
};

export default Services;
