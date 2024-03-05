"use client";

import React, { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { navigate } from "@/assets/navigation";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      return window.scrollY > 50 ? setSticky(true) : setSticky(false);
    });
  });
  return (
    <div className="w-full">
      <nav
        aria-label="navbar"
        className={`${
          sticky
            ? "fixed top-0 h-16 shadow-lg shadow-indigo-500/20  z-50 bg-background w-full text-white bg-black lg:px-[8vw]"
            : "my-4 mx-3 max-w-5xl lg:mx-auto transition-all ease-in bg-glass rounded-xl"
        } flex items-center justify-between  px-3 sm:px-8 py-2.5 sm:py-3 shadow-xl`}
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
              className="text-xl cursor-pointer sm:text-2xl hover:text-blue-700 hover:scale-y-105 hover:ease-in-out"
            >
              <Link href={navLink.path}>{navLink.display}</Link>
            </li>
          ))}
        </ul>
        <MobileNav />
      </nav>
    </div>
  );
};

export default Navbar;
