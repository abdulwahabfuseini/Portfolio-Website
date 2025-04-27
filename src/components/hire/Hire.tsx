import React from "react";
import HeadTitle from "../HeadTitle";
import HireForm from "./HireForm";

const Hire = () => {
  return (
    <div>
      <HeadTitle title="Need a Project?" text="Hire Me" />
      <div className="grid place-content-center place-items-center py-10 sm:py-0">
        <h1 className=" text-center text-xl sm:text-3xl capitalize pb-1 font-semibold">
          Got a project for me?
        </h1>
        <p className=" sm:text-lg text-center ">
          Share your project details with me, and let's collaborate to create
          something <br className=" hidden sm:block" />  exceptional for your company or business.
        </p>
      </div>
      <HireForm />
    </div>
  );
};

export default Hire;
