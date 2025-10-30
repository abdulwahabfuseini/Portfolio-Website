"use client";

import { ServiceProps } from "@/utils/Types";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = ({ id, title, gif, desc }: ServiceProps) => {
  const imageLoadingPlaceholder = (
    <div className="w-full h-48 sm:h-52 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
      <span className="text-gray-500 dark:text-gray-400">Loading GIF...</span>
    </div>
  );

  return (
    <Link
      href={`/services/${title.toLowerCase().replace(/\s/g, "-")}`}
      passHref
    >
      <div
        className="
          group 
          relative 
          overflow-hidden 
          rounded-xl 
          shadow-lg hover:shadow-2xl 
          bg-glass 
          border border-gray-600 dark:border-gray-700
          transition-all duration-300 ease-in-out
          transform hover:-translate-y-1 hover:border-blue-500
          cursor-pointer
        "
      >
        <span className="absolute top-0 right-0 z-10 px-3 py-1 bg-blue-600 text-white rounded-bl-lg font-bold text-sm">
          {id.toString().padStart(2, "0")}
        </span>

        {/* Image/GIF Section */}
        <div className="relative w-full h-48 sm:h-52 bg-gray-50overflow-hidden">
          <Image
            src={`/gif/${gif}`}
            alt={`${title} service illustration`}
            fill
            loading="lazy"
            unoptimized
            draggable="false"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-6 text-center">
          {/* Title */}
          <h3 className="pb-2 text-xl font-bold text-white dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </h3>
          <p className="text-sm text-white dark:text-gray-300 line-clamp-3 leading-relaxed">
            {desc}
          </p>

          {/* Read More Link/Indicator */}
          <div className="mt-4 inline-block text-blue-600  font-semibold text-sm transition-colors duration-300">
            Read More &rarr;
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
