"use client"

import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { navigate } from "@/assets/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      return window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  });

  return (
    <div  className="w-full">
      <motion.nav initial="hidden" whileInView={"show"}  variants={fadeIn("down", 1)}
        aria-label="navbar"
        className={`${
          sticky
            ? "fixed top-0 py-5 shadow-lg shadow-indigo-500/20  z-50 bg-background w-full text-white bg-black md:px-[8vw]"
            : "my-8 mx-3 sm:mx-16 max-w-4xl lg:mx-auto transition-all ease-in bg-glass rounded-xl  py-3 sm:py-3"
        } flex items-center justify-between px-3 sm:px-6 shadow-xl`}
      >
        <Link href="/">
          <p className="text-lg font-bold cursor-pointer sm:text-xl Text">
            FUSEINI ABDUL WAHAB
          </p>
        </Link>
        <ul className="items-center hidden lg:flex gap-x-8">
          {navigate.map((navLink) => (
            <li
              key={navLink.id}
              className="text-xl cursor-pointer hover:text-blue-700 hover:scale-y-105 hover:ease-in-out"
            >
              <Link href={navLink.path}>{navLink.display}</Link>
            </li>
          ))}
        </ul>
        <MobileNav />
      </motion.nav>
    </div>
  );
};

export default Navbar;
