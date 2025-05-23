"use client";

import { useState } from "react";
import HeadTitle from "../../HeadTitle";
import ReviewForm from "./ReviewForm";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import Reviews from "./Reviews";
import { Drawer } from "antd";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

const Testimonial = () => {
  const [openReview, setOpenReview] = useState(false);
  const openDrawerReview = () => setOpenReview(true);
  const closeDrawerReview = () => setOpenReview(false);

  return (
    <div className="w-full my-8">
      <HeadTitle title="Testimonial" text="Clients" />
      <div>
        <motion.div
          initial="hidden"
          whileInView={"show"}
          variants={fadeIn("up", 0.8)}
        >
          <Reviews />
        </motion.div>
        <div>
          <motion.button
            initial="hidden"
            whileInView={"show"}
            variants={fadeIn("left", 0.5)}
            onClick={openDrawerReview}
            className="flex items-center gap-2 p-2 text-lg font-bold text-center border-2 rounded-lg light-background"
          >
            <span>Add Testimonial</span>
            <FaPlus className="bg-white p-1.5 w-8 h-8 rounded-full text-blue-600" />
          </motion.button>
          <Drawer
            closable={false}
            placement="left"
            open={openReview}
            style={{ position: "relative", background: "#1C1919" }}
            onClose={closeDrawerReview}
            className="z-40 shadow-xl relative"
          >
            <button
              onClick={closeDrawerReview}
              className="right-4 z-50 cursor-pointer absolute"
            >
              <AiOutlineClose className="bg-glass p-1.5 w-8 h-8 rounded-full" />
            </button>
            <ReviewForm closeDrawerReview={closeDrawerReview} />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
