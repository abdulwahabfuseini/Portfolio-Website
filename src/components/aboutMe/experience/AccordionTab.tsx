"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const AccordionTab = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <div className="py-3">
      <Accordion
        placeholder={null}
        open={open === 1}
        className="mb-2 rounded-lg "
      >
        <AccordionHeader
          placeholder={null}
          onClick={() => handleOpen(1)}
          className={`bg-main px-3 sm:px-5 w-full transition-colors justify-between ${
            open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-4 w-full">
            <div className="flex text-lg flex-col text-left items-start">
              MOVING HEALTH - ACCRA, GHANA
              <p className="text-sm">ROLE: FULL-STACK DEVELOPER</p>
              <p className="text-sm">APRIL, 2024 - TO DATE</p>
            </div>
            <button className="text-xl">
              {open === 1 ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </AccordionHeader>
        <AccordionBody className=" text-base font-normal bg-glass px-1.5">
          <ul className="px-5 py-2 text-white list-disc sm:px-8 grid gap-2">
            <li>
              Developed and enhanced the Ambulance Telemetry Dashboard using
              Next.js and PostgreSQL to integrate real-time ambulance telemetry
              data.
            </li>
            <li>
              Focused on security, scalability, and efficiency of backend
              services.
            </li>
            <li>
              Collaborated with UX/UI designers on intuitive, responsive user
              interfaces.
            </li>
            <li>Participated in the full software development lifecycle.</li>
            <li>
              Collaborated with the company’s teams to design, develop, and
              maintain responsive web applications that meet user requirements
              and Organizational goals.
            </li>
          </ul>
        </AccordionBody>
      </Accordion>
      <Accordion
        placeholder={null}
        open={open === 2}
        className="mb-2 rounded-lg "
      >
        <AccordionHeader
          placeholder={null}
          onClick={() => handleOpen(2)}
          className={`bg-main px-3 sm:px-5 w-full transition-colors justify-between ${
            open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-4 w-full">
            <div className="flex text-lg flex-col text-left items-start">
              WEBDRAFT IT SOLUTION - KUMASI, GHANA
              <p className="text-sm">ROLE: INTERN</p>
              <p className="text-sm">FEBRUARY, 2023 - SEPTEMBER, 2023</p>
            </div>
            <button className="text-xl">
              {open === 2 ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </AccordionHeader>
        <AccordionBody className=" text-base font-normal bg-glass px-1.5">
          <ul className="px-5 py-2 text-white list-disc sm:px-8 grid gap-2">
            <li>
              Championed responsive design principles, guaranteeing a seamless
              experience for users across various devices, including desktop,
              tablet, and mobile.
            </li>
            <li>
              Utilized a tech stack that includes HTML, CSS, JavaScript, React,
              and MongoDb to build interactive and performant user interfaces.
            </li>
            <li>
              Developed user interfaces with modern JavaScript frameworks, CSS3
              and HTML5, which improved user satisfaction by 33%
            </li>
            <li>
              Worked closely with the development team to ensure all features
              were implemented correctly and met project requirements.
            </li>
            <li>
              Collaborated with the company’s teams to design, develop, and
              maintain responsive web applications that meet user requirements
              and business goals.
            </li>
          </ul>
        </AccordionBody>
      </Accordion>
      <Accordion
        placeholder={null}
        open={open === 3}
        className="mb-2 rounded-lg"
      >
        <AccordionHeader
          placeholder={null}
          onClick={() => handleOpen(3)}
          className={`bg-main px-3 sm:px-5 transition-colors ${
            open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <div className="flex items-start justify-between w-full gap-4">
            <div className="flex text-lg flex-col text-left items-start">
              AVENTLE TECHNOLOGIES – KUMASI, GHANA
              <p className="text-sm">ROLE: FREELANCER</p>
              <p className="text-sm">AUGUST, 2022 - DECEMBER, 2022</p>
            </div>
            <button className="text-xl">
              {open === 3 ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </AccordionHeader>
        <AccordionBody className=" px-1.5 text-base font-normal bg-glass">
          <ul className="px-5 py-2  text-white list-disc sm:px-8 grid gap-2">
            <li>
              Collaborated with UX/UI designers to turn wireframes and mockups
              into responsive, pixel-perfect designs.
            </li>
            <li>
              Translating design concepts into code using HTML, CSS, and
              JavaScript.
            </li>
            <li>
              Ensuring that websites and applications display and function
              correctly on various devices and screen sizes (desktop, tablet,
              mobile).
            </li>
            <li>
              Implementing techniques to enhance website loading speed and
              overall performance.
            </li>
            <li>
              Using version control systems like Git to collaborate on projects
              and track changes to code.
            </li>
          </ul>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default AccordionTab;
