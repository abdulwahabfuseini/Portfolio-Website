import { ProjectProps } from "@/utils/Types";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaGithub } from "react-icons/fa";

const ProjectCard = ({ link, code, imgUrl, connect, projectName, desc, tools }: ProjectProps) => {
  return (
    <div>
      <div className="relative overflow-hidden  bg-glass p-2.5 rounded pb-3">
        <div className="flex items-center justify-between py-2">
          <Link href={link} target="_blank" className="flex items-center gap-1.5">
            <FaEye className="text-lg" />
            <p  className="text-sm">
              View Demo
            </p>
          </Link>
          <Link  href={code} target="_blank" className="flex items-center gap-1.5">
            <p className="text-sm">
              View Code
            </p>
            <FaGithub className="text-lg" />
          </Link>
        </div>
        <div className="relative group">
          <Image
            width={800}
            height={800}
            src={`/images/${imgUrl}`}
            alt="project"
            quality={100}
            className="h-52 sm:h-56 rounded-xl object-cover group-hover:rounded-none"
            draggable="false"
          />
          <div className="absolute top-0 left-0 right-0 hidden w-full h-full py-12 bg-black bg-opacity-75 group-hover:block">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="grid gap-1 text-center cursor-pointer place-items-center"
            >
              <Image
                width={50}
                height={50}
                src={`/images/${connect}`}
                loading="eager"
                alt="link"
                draggable="false"
              />
              <h1 className="text-lg">{projectName}</h1>
              <span> {link}</span>
            </a>
          </div>
        </div>
        <h1 className="py-2 text-xl text-center Text">{projectName}</h1>
        <p className="text-center">
          {desc}{" "}
          <div className="flex flex-wrap items-center justify-center gap-1 cursor-pointer pt-2">
            {tools.map((item, index: number) => (
              <p
                key={index}
                className="p-1 font-semibold rounded-md bg-glass"
              >
                {item.tool}
              </p>
            ))}
          </div>
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
