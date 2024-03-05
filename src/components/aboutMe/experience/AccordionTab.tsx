"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const AccordionTab = () => {
  const [open, setOpen] = useState(1);


  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <div className="py-3">
      <Accordion placeholder={null} open={open === 1} className="mb-2 rounded-lg ">
        <AccordionHeader placeholder={null}
          onClick={() => 
            handleOpen(1)
           
          }
          className={`bg-main px-3 w-full transition-colors fx items-center justify-between ${
            open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <div
            
            className="flex items-start justify-between w-full"
          >
            <div>
              WEBDRAFT IT SOLUTION - KUMASI, GHANA <br />
              <h4 className="text-base">ROLE: INTERN</h4>
              <h2 className="text-base">FEBRUARY, 2023 - SEPTEMBER, 2023</h2>
            </div>
            <button className="text-xl">
            <button>{open === 1 ? <FaChevronUp /> : < FaChevronDown />}</button>
            </button>
          </div>
        </AccordionHeader>
        <AccordionBody className=" text-base font-normal bg-main px-1.5">
          <ul className="px-5 py-3 leading-8 text-white list-disc sm:px-8">
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
      <Accordion placeholder={null} open={open === 2} className="mb-2 rounded-lg">
        <AccordionHeader placeholder={null}
           onClick={() => 
            handleOpen(2)
           
          }
          className={`bg-main px-3 transition-colors ${
            open === 2 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <div
            
            className="flex items-start justify-between w-full"
          >
            <div>
              AVENTLE TECHNOLOGIES – KUMASI, GHANA
              <h4 className="text-base">ROLE: FREELANCER</h4>
              <h2 className="text-base">AUGUST, 2022 - DECEMBER, 2022</h2>
            </div>
            <button>{open === 2 ? <FaChevronUp /> : < FaChevronDown />}</button>
          </div>
        </AccordionHeader>
        <AccordionBody className=" px-1.5 text-base font-normal bg-main">
          <ul className="px-5 py-3 leading-10 text-white list-disc sm:px-8">
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
