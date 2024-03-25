import { ChooseProps } from "@/utils/Types";
import Image from "next/image";
import React from "react";

const ChooseCard = ({ title, icon, desc }: ChooseProps) => {
  return (
    <div className="bg-glass py-3 px-2.5 border border-main hover:border-l-4 hover:transition-all hover:ease-linear hover:border-l-blue-700 hover:bg-blue-50 hover:text-black cursor-pointer">
      <div className="flex items-center gap-3 flex-wrap">
        <Image
          src={`/SVG/${icon}`}
          alt=""
          loading="eager"
          width={50}
          height={50}
          quality={100}
          className=" object-contain"
        />
        <h1 className="text-lg font-semibold Text">{title}</h1>
      </div>
      <p className="py-2">{desc}</p>
    </div>
  );
};

export default ChooseCard;
