"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { PriceProps } from "@/utils/Types";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-3 h-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

const PricingCard = ({ title, amount, service }: PriceProps) => {
  const router = useRouter();

  return (
    <div>
      <Card
        placeholder={null}
        color="gray"
        variant="gradient"
        className="w-full p-8 bg-glass"
      >
        <CardHeader
          placeholder={null}
          floated={false}
          shadow={false}
          color="transparent"
          className="pb-8 m-0 mb-8 text-center border-b rounded-none border-white/10"
        >
          <Typography
            placeholder={null}
            variant="h1"
            color="white"
            className="font-bold text-lg uppercase"
          >
            {title}
          </Typography>
          <Typography
            placeholder={null}
            variant="h1"
            color="white"
            className="flex justify-center gap-1 mt-6 font-normal text-7xl"
          >
            <span className="mt-2 text-4xl">$</span>
            {amount} <span className="self-end text-4xl">/ hr</span>
          </Typography>
        </CardHeader>
        <CardBody placeholder={null} className="p-0">
          <ul className="flex flex-col gap-4">
            {service.map((item, index) => (
              <li key={index} className="flex items-center gap-4">
                <span className="p-1 border rounded-full border-white/20 bg-white/20">
                  <CheckIcon />
                </span>
                <Typography placeholder={null} className="font-normal">
                  {item.plan}
                </Typography>
              </li>
            ))}
          </ul>
        </CardBody>
        <CardFooter placeholder={null} className="p-0 mt-12">
          <Button
            placeholder={null}
            onClick={() => router.push("/contact")}
            size="lg"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100 text-black font-semibold text-lg p-2 bg-white"
            ripple={false}
            fullWidth={true}
          >
            Contact Me
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingCard;
