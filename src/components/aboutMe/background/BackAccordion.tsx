"use client"

import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const BackAccordion: React.FC = () => {
  const [open, setOpen] = useState<number>(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <div className="py-3">
      <Accordion placeholder={null} open={open === 1} className="mb-2 rounded-lg">
        <AccordionHeader
        placeholder={null}
          onClick={() => handleOpen(1)}
          className={`bg-main px-3 w-full transition-colors fx items-center justify-between ${
            open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <div className="flex items-center justify-between w-full text-xl">
            <h1>Profile</h1>
            <button>{open === 1 ? <FaChevronUp /> : <FaChevronDown />}</button>
          </div>
        </AccordionHeader>
        <AccordionBody className="px-3 text-lg font-normal text-white bg-main">
          A highly skilled and creative web developer in designing and
          building interactive and user-friendly websites and web applications.
          I am passionate about staying up-to-date with the latest web
          technologies and trends to deliver innovative and high-quality
          projects. My dedication to clean code, performance optimization, and
          excellent user experiences sets me apart in the field. I thrive in
          collaborative environments, where I can contribute my technical
          expertise to deliver innovative digital solutions
        </AccordionBody>
      </Accordion>
      <Accordion placeholder={null} open={open === 2} className="mb-2 rounded-lg">
        <AccordionHeader placeholder={null}
          onClick={() => handleOpen(2)}
          className={`bg-main px-3 transition-colors ${
            open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <div className="flex items-center justify-between w-full text-xl">
            <h1>Objectives</h1>
            <button>{open === 2 ? <FaChevronUp /> : <FaChevronDown />}</button>
          </div>
        </AccordionHeader>
        <AccordionBody className="px-3 text-lg font-normal text-white bg-main">
          As a frontend developer, my objective is to learn and grow in a
          dynamic development environment. I aim to use my expertise in HTML,
          CSS, JavaScript to create exceptional user interfaces while gaining
          hands-on experience with modern web frameworks and tools. My goal is
          to become a proficient web developer collaborating with a talented
          team to create user-friendly, visually appealing, and efficient
          websites and web applications.
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default BackAccordion;
