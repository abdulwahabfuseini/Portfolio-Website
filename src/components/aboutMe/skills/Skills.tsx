import { skill } from "@/assets/Data";
import SkillCard from "./SkillCard";

const Skills = () => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl">Languages and Tools</h1>
      <div className="flex flex-wrap items-center justify-center w-full py-10 lg:px-14 gap-x-2">
        {skill.map((skill, index) => (
          <SkillCard key={index} icon={skill?.icon} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
