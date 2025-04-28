import Image from "next/image";
import React from "react";

const ProjectRequest = () => {
  return (
    <div className="grid place-content-center place-items-center text-center">
      <Image
        src="/gif/check.gif"
        alt="verification"
        width={200}
        height={200}
        unoptimized
      />
      <div className=" capitalize">
        <h1 className="pb-2 font-semibold text-lg">
         Thanks for your request, i will get back to you as soon as possible. 
        </h1>
      </div>
    </div>
  );
};

export default ProjectRequest;
