"use client";

import { Typewriter } from "react-simple-typewriter";

const Need = () => {
  return (
    <div>
      <p className="text-2xl font-semibold">
        Nead a{" "}
        <span className="Text">
          <Typewriter
            words={["Website ...", "Web Developer ...", "Web App ..."]}
            loop={Infinity}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={90}
          />
        </span>
      </p>
    </div>
  );
};

export default Need;
