/* eslint-disable react/no-unescaped-entities */

import type { Metadata } from "next";
import HeadTitle from "@/components/HeadTitle";
import Need from "@/components/Need";
import Address from "@/components/connect/Address";
import ContactForm from "@/components/connect/ContactForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "PortFolio | Contact Me",
  description: "GET IN TOUCH",
};

const Contact = () => {
  return (
    <div className="grid w-full h-full px-4 py-8 mx-auto md:py-14 max-w-7xl sm:px-5">
      <div className="flex justify-between items-center gap-y-8 gap-x-3 flex-col sm:flex-row">
        <div>
          <HeadTitle title="Contact Me" text="Contact" />
          <Need />
          <p className="pt-4 text-lg capitalize">
            Connect with me Let's build a professional{" "}
            <br className="hidden sm:block" /> Website or Web Application for
            your business.
          </p>
        </div>
        <Image
          src="/SVG/contact.png"
          alt=""
          width={280}
          height={280}
          quality={100}
          className="object-contain bounce"
          draggable="false"
        />
      </div>
      <div className="grid w-full py-10 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        <div className="w-full sm:col-span-1 lg:col-span-2">
          <Address />
        </div>
        <div className="w-full lg:col-span-1">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
