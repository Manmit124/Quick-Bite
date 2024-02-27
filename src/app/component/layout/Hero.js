import React from "react";

import Link from "next/link";
import Snow from "./Snow";

const Hero = () => {
  return (
    <>
    <Snow/>
    
      <div className="mx-auto  max-w-7xl flex-1  items-center  justify-center relative">
        <div className="mt-40 items-center justify-between sm:mt-32 md:flex">
          <div className=" ">
            <div className=" mb-0 mt-0">
              <h1 className="  mt-0 bg-gradient-to-br from-black to-neutral-600 bg-clip-text text-center text-4xl font-bold  text-transparent dark:bg-gradient-to-r dark:from-white dark:to-neutral-800 sm:text-left sm:text-5xl md:max-w-2xl  xl:text-7xl/none ">
                Every Delicious food in the house
              </h1>

              <div className="px-4 text-neutral-600 lg:px-0 sm:p-5  ">
                <p className="mt-6  max-w-xl text-center sm:text-left">
                  Build, test and, and send transactional emails at scale.
                  Resend provides the best developer experience helping you
                  reach users instead of spam folders{" "}
                </p>
                <div className="mt-4 flex gap-2">
                  <h1 className=" text-2xl  ">Just go and Checkout</h1>
                  <Link
                    className=" text-white text-3xl   animate-in"
                    href={"/menu"}
                  >
                    Menu{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <video
              // src={require("../../../../public/cube.mp4")}
              autoPlay
              loop
              muted
              className="hidden aspect-square bg-transparent md:block"
            >

              <source
               src={"/cube.mp4"}
               type="video/mp4"
               />
            </video>
          </div>
        </div>
      </div>
      <div className="  absolute bottom-2   mt-10  w-full   justify-center   text-center lg:text-left  ">
        <div className=" mx-auto max-w-7xl ">
          <div className=" flex items-center justify-center gap-x-3 md:justify-start  ">
            {/* <Github size={20} className="text-neutral-500" />
            <Twitter size={20} className="text-neutral-500" />
            <Linkedin size={20} className="text-neutral-500" /> */}
          </div>

          <div className="mt-3 flex flex-col items-center justify-between text-neutral-500 md:flex-row">
            <p>
              3442 Market Street #39485 <br /> New york, NY 23072
            </p>
            <div className="flex gap-x-4 font-semibold">
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
            </div>
          </div>
        </div>
      </div>
    </>
    // </MaxWidthWrapper>
  );
};

export default Hero;
