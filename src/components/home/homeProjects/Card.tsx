import { CardProps } from "@/utils/Types";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

const Card = ({ projectName, imgUrl, link }: CardProps) => {
  return (
    <div className="relative group overflow-hidden">
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <div
          className="
          bg-glass
          rounded-xl 
          shadow-lg hover:shadow-2xl 
          border border-gray-500
          transition-all duration-300 ease-in-out
          transform hover:-translate-y-1
        "
        >
          {/* Image Block */}
          <div className="relative h-52 sm:h-56 overflow-hidden rounded-t-xl">
            <Image
              width={800}
              height={800}
              loading="eager"
              src={`/images/${imgUrl}`}
              alt={`${projectName} project screenshot`}
              quality={85}
              className="
                w-full h-full object-cover 
                transition-transform duration-500 
                group-hover:scale-105
              "
            />
            <div
              className="
              absolute inset-0 
              bg-black bg-opacity-40 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 
              flex items-center justify-center
            "
            >
              <span className="flex items-center gap-2 p-3 bg-blue-600 text-white rounded-full font-semibold shadow-xl">
                <FaEye className="w-5 h-5" />
                View Live
              </span>
            </div>
          </div>

          {/* Title Block */}
          <div className="p-4 text-center">
            <h3
              className="
              text-xl font-bold 
              text-white
              transition-colors duration-300
              group-hover:text-blue-600 dark:group-hover:text-blue-400
            "
            >
              {projectName}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
