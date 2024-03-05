import HeadTitle from "@/components/HeadTitle";
import React from "react";
import { ProjectPlan } from "../Data";
import PricingCard from "./PricingCard";

const Pricing = () => {
  return (
    <div className="py-14">
      <HeadTitle title="Project Plan" text=" Pricing" />
      <div className="max-w-5xl mx-auto">
        <div className="grid w-full gap-3 py-6 sm:grid-auto-fit-lg sm:place-content-center">
          {ProjectPlan.map((price) => (
            <PricingCard key={price.id} title={price.title} amount={price?.amount} service={price.service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
