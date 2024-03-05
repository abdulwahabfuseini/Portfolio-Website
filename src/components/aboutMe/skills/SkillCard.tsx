"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SkillProps } from "@/utils/Types";

const SkillCard = ({ icon, index }: SkillProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.4;

  return (
    <div>
      <motion.div
        ref={ref}
        initial="hidden"
        variants={imageVariants}
        animate={inView ? "visible" : "hidden"}
        custom={index}
        transition={{ delay: index * animationDelay, repeat: Infinity,  duration: 1 }}
        className="py-3 cursor-pointer"
      >
        <Image
          src={`/images/${icon}`}
          alt="skill"
          width={83}
          height={100}
          className="object-contain h-14"
          draggable="false"
        />
      </motion.div>
    </div>
  );
};

export default SkillCard;
