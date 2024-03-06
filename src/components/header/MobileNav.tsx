"use client";

import { useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { navigate } from "../../assets/navigation";
import { VscChevronRight } from "react-icons/vsc";
import Link from "next/link";
import { Drawer } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { slideInFromBottom } from "@/utils/motion";

const MobileNav = () => {
  const [openNav, setOpenNav] = useState(false);


  const openDrawer = () => setOpenNav(true);
  const closeDrawer = () => setOpenNav(false);


  return (
    <motion.div initial="hidden" animate="visible" className="flex lg:hidden">
      <button onClick={openDrawer} className="">
        <HiMiniBars3BottomRight className="w-8 h-8 " />
      </button>
      <motion.div variants={slideInFromBottom(2.5)}>
      <Drawer
        placeholder={""}
        placement="bottom"
        open={openNav}
        onClose={closeDrawer}
        className="grid items-center z-50  rounded-t-xl pt-3 px-2 bg-white text-black shadow-2xl shadow-blue-500/10 justify-normal"
      >
        {navigate.map((navLink) => (
          <li
            key={navLink.id}
            className="font-semibold cursor-pointer list-none"
          >
            <Link
              href={navLink.path}
              onClick={() => setOpenNav(false)}
              className="flex items-center justify-between w-full px-4 border-b py-3 text-lg uppercase sm:text-xl"
            >
              <span className=" hover:text-blue-600">{navLink.display}</span>{" "}
              <span>
                <VscChevronRight />
              </span>
            </Link>
          </li>
        ))}
      </Drawer>
      </motion.div>
      
    </motion.div>
  );
};

export default MobileNav;


