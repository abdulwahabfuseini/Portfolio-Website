"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Loading = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center flex-col gap-4 bg-black  bg-opacity-25">
          <Image
            src="/images/front2.gif"
            alt=""
            width={150}
            height={150}
            unoptimized
            draggable="false"
          />
          <h1 className="text-xl">Please Wait...</h1>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default Loading;
