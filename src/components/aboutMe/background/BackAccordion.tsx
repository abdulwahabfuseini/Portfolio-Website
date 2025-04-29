"use client";

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
      <Accordion
        placeholder={null}
        open={open === 1}
        className="mb-2 rounded-lg"
      >
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
        <AccordionBody className="px-3 font-normal text-base bg-glass text-white">
          As a passionate Web Developer, I specialize in creating clean,
          responsive, and user-friendly websites that help businesses grow their
          online presence and drive results. With 3 years of experience in
          front-end and back-end development, I prioritize clean code, optimal
          performance, mobile responsiveness, and intuitive user experiences
          (UX). I believe in clear communication throughout the development
          process, ensuring your project is delivered on time and aligns
          perfectly with your vision. My tech stack includes: HTML, CSS,
          JavaScript, Typescript, React.js, Next.js, TailwindCSS, Node.js.
          Whether you need a new website, a redesign, or ongoing support, I
          deliver professional results with attention to detail and a
          client-first approach. <br />
         
         <p className="py-2.5"> 
          ✅ Custom Website Development <br />
          ✅ Front-End Development (React, Next.js, Typescript HTML, CSS, JS) <br />
          ✅ Back-End Development (Node.js, Databases) <br />
          ✅ Responsive Design (Mobile-Friendly) <br />
          ✅ Website Performance Optimization <br />
          ✅ Databases & ORMs <br />
          ✅ Rest API Integration <br />
          ✅ Cloud, DevOps & Hosting <br /> 
          </p>
          
          Let's connect — I'm always
          excited to collaborate on new projects! Feel free to message me here
          on LinkedIn or email me at abdulwahabfuseini78@gmail.com.
        </AccordionBody>
      </Accordion>
      <Accordion
        placeholder={null}
        open={open === 2}
        className="mb-2 rounded-lg"
      >
        <AccordionHeader
          placeholder={null}
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
        <AccordionBody className="px-3 text-base font-normal bg-glass text-white">
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
