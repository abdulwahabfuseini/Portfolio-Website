import { ChooseProps } from "@/utils/Types";
import Image from "next/image";
import React from "react";

const ChooseCard = ({ title, icon, desc }: ChooseProps) => {
  return (
    <div className="bg-glass rounded-lg hover:rounded-none py-3 px-2.5 border border-main hover:border-l-4 hover:transition-all hover:ease-linear hover:border-l-blue-700 hover:bg-blue-50 hover:text-black cursor-pointer">
      <div className="flex items-center gap-3 flex-wrap">
        <div className=" p-3 
          rounded-full 
          bg-blue-500/10 dark:bg-blue-400/10
          text-blue-600 dark:text-blue-400
          transition-colors duration-300
          flex-shrink-0">
<Image
          src={`/SVG/${icon}`}
          alt=""
          loading="eager"
          width={40}
          height={40}
          quality={100}
          className=" object-contain"
        />
        </div>
        
        <h1 className="text-lg font-semibold Text">{title}</h1>
      </div>
      <p className="py-2">{desc}</p>
    </div>
  );
};

export default ChooseCard;
