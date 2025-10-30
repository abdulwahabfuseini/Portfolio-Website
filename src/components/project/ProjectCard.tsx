import { ProjectProps } from "@/utils/Types";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaGithub } from "react-icons/fa";

const ProjectCard = ({
  link,
  code,
  imgUrl,
  projectName,
  desc,
  tools,
}: ProjectProps) => {
  return (
    <div
      className="
      relative 
      bg-glass
      rounded-xl 
      overflow-hidden 
      shadow-xl hover:shadow-2xl 
      border border-gray-500
      transition-all duration-300 ease-in-out
    "
    >
      {/* Project Image */}
      <div className="relative overflow-hidden h-52 sm:h-64">
        <Image
          width={800}
          height={800}
          src={`/images/${imgUrl}`}
          alt={`${projectName} Project Screenshot`}
          quality={85}
          className="
            w-full h-full object-cover 
            transition-transform duration-500 ease-out 
            group-hover:scale-105
          "
        />

        {/* Hover Links Overlay */}
        <div
          className="
          absolute inset-0 
          bg-black bg-opacity-70 
          opacity-0 hover:opacity-100 
          transition-opacity duration-300 
          flex items-center justify-center gap-6
        "
        >
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 text-white bg-blue-600/80 hover:bg-blue-600 rounded-lg transition duration-200 text-sm font-semibold"
            aria-label={`View live demo of ${projectName}`}
          >
            <FaEye className="text-xl" />
            Live Demo
          </Link>
          <Link
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 text-white bg-gray-700/80 hover:bg-gray-700 rounded-lg transition duration-200 text-sm font-semibold"
            aria-label={`View code for ${projectName} on GitHub`}
          >
            <FaGithub className="text-xl" />
            View Code
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 md:p-6">
        <h3 className="text-xl font-bold text-white mb-2">{projectName}</h3>

        <p className="text-white dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {desc}
        </p>

        {/* Tools/Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          {tools.map((item, index: number) => (
            <span
              key={index}
              className="
                px-3 py-1 
                text-xs font-medium 
                text-blue-700 dark:text-blue-300 
                bg-blue-100 dark:bg-blue-900/40 
                rounded-full
              "
            >
              {item.tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
