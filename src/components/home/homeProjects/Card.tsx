import { CardProps } from "@/utils/Types";
import Image from "next/image";

const Card = ({ projectName, imgUrl, link }: CardProps) => {
  return (
    <div>
      <div className="relative group bg-glass p-2 sm:p-3">
        <Image
          width={800}
          height={800}
          src={`/images/${imgUrl}`}
          alt="project"
          quality={100}
          className="h-52 sm:h-56 rounded-xl object-cover"
          draggable="false"
        />
        <div className="absolute top-0 left-0 right-0 hidden w-full h-full py-20 bg-black bg-opacity-75 group-hover:block">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="grid gap-1 text-center cursor-pointer place-items-center"
          >
            <h1>{projectName}</h1>
            <span> {link}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
