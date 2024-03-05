import Button from "../../Button";
import Social from "../../home/Social";
import BackAccordion from "./BackAccordion";

const Background = () => {
  return (
    <div className="px-2">
      <BackAccordion />
      <div className="flex gap-5 mb-5">
        <button className="px-4 py-2 my-5 text-xl text-white bg-green-400 rounded-lg hover:text-background hover:scale-95">
          <a href="FUSEINI ABDUL WAHAB RESUME.pdf" target="_blank" rel="resume">
            Download Cv
          </a>
        </button>
        <Button url="/contact" text="Hire Me" />
      </div>
      {/* <Social /> */}
    </div>
  );
};

export default Background;
