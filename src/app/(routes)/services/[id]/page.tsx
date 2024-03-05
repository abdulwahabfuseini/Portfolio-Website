import { serviceData } from "@/components/service/Data";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PortFolio | Service",
  description: "WHAT I CAN DO",
};

const SingleService = ({ params }: any) => {
  const title = decodeURIComponent(params.id).replace(/-/g, " ");
  const data = serviceData.find(
    (data) => data.title.toLowerCase() === title.toLowerCase()
  );
  return (
    <div className="grid max-w-6xl px-3 py-8 mx-auto md:py-16 sm:px-6 place-items-center gap-y-5">
      <div className="grid py-6 lg:grid-cols-3 gap-y-6 gap-x-10 place-items-center">
        <Image
          src={`/SVG/${data?.icon}`}
          alt="service"
          width={600}
          height={30}
          className="order-2 object-contain col-span-1 h-60 sm:h-80"
        />
        <div className="text-lg sm:text-xl lg:col-span-2 lg:order-2 break-word">
          <h1 className="pb-3 text-2xl font-semibold sm:text-4xl">
            {data?.title}
          </h1>
          <p>{data?.desc1}</p>
          <p className="py-5">{data?.desc2}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleService;
