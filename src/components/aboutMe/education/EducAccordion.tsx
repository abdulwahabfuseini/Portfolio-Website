"use client";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const EducAccordion = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <div className="py-3">
      <Accordion placeholder={null} open={open === 1} className="mb-2 rounded-lg ">
        <AccordionHeader placeholder={null}
          onClick={() => handleOpen(1)}
          className={`bg-main px-3 w-full transition-colors fx items-center justify-between ${
            open === 1 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <div className="flex items-center justify-between w-full text-xl">
            <div className="flex items-center gap-x-4 sm:gap-x-6">
              <Image
                src="/SVG/calendar.png"
                alt=""
                width={40}
                height={30}
                draggable="false"
              />
              <p className="text-lg">2018 - 2021</p>
            </div>
            <button>{open === 1 ? <FaChevronUp /> : <FaChevronDown />}</button>
          </div>
        </AccordionHeader>
        <AccordionBody className="px-3 text-lg font-normal bg-glass shadow-inner text-white">
          <div className="flex items-center py-2 gap-x-3 sm:gap-x-6">
            <Image
              src="/SVG/school.png"
              alt=""
              width={40}
              height={30}
              draggable="false"
            />
            <p className="text-lg">KUMASI TECHNICAL UNIVERSITY</p>
          </div>
          <div className="flex items-center gap-x-3 sm:gap-x-6 border-t pt-2">
            <Image
              src="/SVG/certificate.png"
              alt=""
              width={40}
              height={30}
              draggable="false"
            />
            <p className="text-lg">HND ACCOUNTING WITH COMPUTING</p>
          </div>
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
            <div className="flex items-center gap-x-4 sm:gap-x-6">
              <Image
                src="/SVG/calendar.png"
                alt=""
                width={40}
                height={30}
                draggable="false"
              />
              <p className="text-lg">2015 - 2018</p>
            </div>
            <button>{open === 2 ? <FaChevronUp /> : <FaChevronDown />}</button>
          </div>
        </AccordionHeader>
        <AccordionBody className="px-3 text-lg font-normal bg-glass shadow-inner text-white">
          <div className="flex items-center py-2 gap-x-3 sm:gap-x-6">
            <Image
              src="/SVG/school.png"
              alt=""
              width={40}
              height={30}
              draggable="false"
            />
            <p className="text-lg">TAKORADI SENIOR HIGH SCHOOL</p>
          </div>
          <div className="flex items-center gap-x-3 sm:gap-x-6 border-t pt-2">
            <Image
              src="/SVG/certificate.png"
              alt=""
              width={40}
              height={30}
              draggable="false"
            />
            <p className="text-lg">
              West Africa Senior School Certificate Examination (WASSCE)
            </p>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion placeholder={null} open={open === 3} className="mb-2 rounded-lg">
        <AccordionHeader placeholder={null}
          onClick={() => handleOpen(3)}
          className={`bg-main px-3 transition-colors ${
            open === 3 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          <div className="flex items-center justify-between w-full text-xl">
            <div className="flex items-center gap-x-4 sm:gap-x-6">
              <Image
                src="/SVG/calendar.png"
                alt=""
                width={40}
                height={30}
                draggable="false"
              />
              <p className="text-lg">2012 - 2015</p>
            </div>
            <button>{open === 2 ? <FaChevronUp /> : <FaChevronDown />}</button>
          </div>
        </AccordionHeader>
        <AccordionBody className="px-3 text-lg font-normal bg-glass shadow-inner text-white">
          <div className="flex items-center py-2 gap-x-3 sm:gap-x-6">
            <Image
              src="/SVG/school.png"
              alt=""
              width={40}
              height={30}
              draggable="false"
            />
            <p className="text-lg">GOD FIRST PREPARATORY & JHS</p>
          </div>
          <div className="flex items-center gap-x-3 sm:gap-x-6 border-t pt-2">
            <Image
              src="/SVG/certificate.png"
              alt=""
              width={40}
              height={30}
              draggable="false"
            />
            <p className="text-lg">
              Basic Education Certificate Examination (B.E.C.E)
            </p>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
};

export default EducAccordion;
