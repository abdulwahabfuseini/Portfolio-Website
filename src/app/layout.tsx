import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import StarsCanvas from "@/components/Stars";
import Loading from "./loading";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Portfolio | FUSEINI ABDUL WAHAB",
  description: "Welcome to my portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <body className="relative w-full h-full text-white bg-black overflow-x-hidden">
        <div className="z-20">
          <StarsCanvas />
        </div>
        <div className="z-40 relative">
          <Loading>
            <Navbar />
            <div className="mb-16 md:mb-72  lg:mb-28">{children}</div>
            <Footer />
          </Loading>
        </div>
        <Analytics/>
        <SpeedInsights />
      </body>
    </html>
  );
}
