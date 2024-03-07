"use client";

import { useState } from "react";
import HeadTitle from "../../HeadTitle";
import ReviewForm from "./ReviewForm";
import { Drawer } from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";
import Reviews from "./Reviews";

const Testimonial = () => {
  const [openLeft, setOpenLeft] = useState(false);

  const openDrawerLeft = () => setOpenLeft(true);
  const closeDrawerLeft = () => setOpenLeft(false);

  return (
    <div className="max-w-7xl mx-auto px-">
      <HeadTitle title="Testimonial" text="Clients" />
      <div>
        <Reviews />
        <div>
          <button
            onClick={openDrawerLeft}
            className="flex items-center gap-2 p-2 text-lg font-bold text-center border-2 rounded-lg light-background"
          >
            <span>Add Testimonial</span>
            <FaPlus className="bg-white p-1.5 w-8 h-8 rounded-full text-blue-600" />
          </button>
          <Drawer
            placeholder={null}
            placement="left"
            open={openLeft}
            onClose={closeDrawerLeft}
            className="grid items-center z-50 shadow-xl p-3 bg-main shadow-blue-500/10 justify-normal"
          >
            {/* <IconButton placeholder={null}>
              <AiOutlineClose className="w-8 h-8 absolute top-6 right-6" />
            </IconButton> */}
            <ReviewForm />
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
