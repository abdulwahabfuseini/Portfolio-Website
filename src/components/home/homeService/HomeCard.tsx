"use client";

import { ServiceProps } from "@/utils/Types";
import { Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const HomeCard = ({ id, title, gif, desc }: ServiceProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, [loading]);

  return (
    <div>
      {loading ? (
        <div className="cardloader"></div>
      ) : (
        <Link href={`/services/${title}`}>
          <div className="relative overflow-hidden rounded shadow-xl bg-glass">
            <div className="absolute z-20 flex items-center justify-center w-16 h-16 p-6 text-xl font-extrabold text-center rounded-full group -top-4 -right-4 light-background lg:hover:w-full lg:hover:h-full lg:hover:rounded-none lg:hover:top-0 lg:hover:right-0">
              <span className="mt-2 mr-3 lg:group-hover:hidden">
                {" "}
                {id}
              </span>
              <h1 className="hidden lg:group-hover:block">Click to Read More...</h1>
            </div>
            <div className="flex flex-col items-center ">
              <div className="relative w-full h-48 bg-gray-50 sm:h-52 group-hover:z-40 overflow-hidden">
                <Image
                  src={`/gif/${gif}`}
                  alt="service"
                  fill
                  unoptimized
                  draggable="false"
                  className="object-contain hover:scale-110"
                />
              </div>
              <div className="px-3 py-2.5">
                <h1 className="pb-2 text-xl font-bold text-center Text">
                  {title}
                </h1>
                <Typography.Paragraph
                  className="text-base text-white"
                  ellipsis={{
                    rows: 3,
                    expandable: true,
                    symbol: "Read More",
                  }}
                >
                  {desc}
                </Typography.Paragraph>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default HomeCard;
