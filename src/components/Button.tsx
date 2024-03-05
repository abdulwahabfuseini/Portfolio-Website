import { ButtonProps } from "@/utils/Types";
import Link from "next/link";
import React from "react";

const Button = ({ url, text }: ButtonProps) => {
  return (
    <button>
      <Link href={url}>
        <button className="px-4 py-2 my-4 text-xl font-semibold text-white rounded-lg hover:bg-white hover:scale-95 light-background">
          {text}
        </button>
      </Link>
    </button>
  );
};

export default Button;
