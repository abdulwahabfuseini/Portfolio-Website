import Button from "../../Button";
import BackAccordion from "./BackAccordion";

const Background = () => {
  return (
    <div className="px-2">
      <BackAccordion />
      <div className="flex gap-3 mb-5">
        <button className="px-4 py-2 my-5 text-xl text-main bg-white shadow-lg font-semibold rounded-lg hover:text-background hover:scale-95">
          <a href="ABDUL WAHAB FUSEINI RESUME.pdf" target="_blank" rel="resume">
            Download CV
          </a>
        </button>
        <Button url="/contact" text="Hire Me" />
      </div>
    </div>
  );
};

export default Background;
