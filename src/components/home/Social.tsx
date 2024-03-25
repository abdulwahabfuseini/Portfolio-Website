

import { connect } from "@/assets/Data";
import { Tooltip } from "antd";
import Image from "next/image";

const Social = () => {
  return (
    <div className="relative z-40 py-4 sm:py-0">
      <h1 className="z-40 pb-6 text-2xl">Connect With Me</h1>
      <div className="flex gap-x-2">
        {connect.map((socialMedia) => (
          <div key={socialMedia.id} >
            <Tooltip color={socialMedia?.color} title={socialMedia?.title} >
              <a href={socialMedia?.link} target="blank">
                <Image
                  width={40}
                  height={40}
                  className="p-1 rounded-lg bg-glass lg:hover:scale-110"
                  src={`/SVG/${socialMedia.icon}`}
                  alt="social"
                  draggable="false"
                />
              </a>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Social;
