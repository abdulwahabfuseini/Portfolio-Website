"use client";

import { useState } from "react";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { navigate } from "../../assets/navigation";
import { VscChevronRight } from "react-icons/vsc";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { Drawer } from "antd";

const MobileNav = () => {
  const [openNav, setOpenNav] = useState(false);

  const openDrawer = () => setOpenNav(true);
  const closeDrawer = () => setOpenNav(false);

  return (
    <div className="flex lg:hidden">
      <button onClick={openDrawer} className="">
        {openNav ? (
          <AiOutlineClose className="w-8 h-8" />
        ) : (
          <HiMiniBars3BottomRight className="w-8 h-8 " />
        )}
      </button>
      <motion.div
        initial="hidden"
        whileInView={"show"}
        variants={fadeIn("up", 2.5)}
      >
        <Drawer
          closable={false}
          placement="bottom"
          open={openNav}
          height={280}
          onClose={closeDrawer}
          className="z-50 transition-all ease-in rounded-t-xl text-black"
        >
          {navigate.map((navLink) => (
            <li
              key={navLink.id}
              className="font-semibold cursor-pointer list-none -m-4 py-2"
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
    </div>
  );
};

export default MobileNav;
