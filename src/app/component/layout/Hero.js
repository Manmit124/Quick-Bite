"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import piza from "../../../../public/pizza.png";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import Snowfall from "react-snowfall";

const Hero = () => {
  const words = ["Pizza", "Samosa", "momos", "Dosa", "Magi"]; // Updated array
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalTime, setIntervalTime] = useState(10000);

  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate to the next word
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Interval time in milliseconds (e.g., 2000 for 2 seconds)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [words]);

  const increaseSpeed = () => {
    // Decrease interval time to increase speed
    const newIntervalTime = Math.max(500, intervalTime - 1000); // Minimum interval time of 500 milliseconds
    setIntervalTime(newIntervalTime);
  };

  return (
    <>
      {/* // <MaxWidthWrapper> */}
      {/* <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl ">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Everything
          <br />
          is better
          <br />
          with a&nbsp;
          <span className="text-blue-600">{words[currentIndex]}</span>
        </h1>

        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Button>
            Order now
            <ArrowRight />
          </Button>
          <Button onClick={increaseSpeed} className="bg-red-50">
           Learn more
          </Button>
        </div>
        </div>  */}
        <Snowfall color="gray" snowflakeCount={100}/>
      <div className="mx-auto  max-w-7xl flex-1  items-center  justify-center relative">
        <div className="mt-40 items-center justify-between sm:mt-32 md:flex">
          <div className=" ">
            <div className=" mx-auto   flex h-7 w-fit items-center rounded-md bg-[#3a1703] px-2 sm:ml-0  ">
              <p className="text-sm text-[#f56324]">
                Currently in private beta
              </p>
            </div>

            <div className=" mb-0 mt-0">
              <h1 className=" mt-0 bg-gradient-to-br from-black to-neutral-600 bg-clip-text text-center text-4xl font-bold  text-transparent dark:bg-gradient-to-r dark:from-white dark:to-neutral-800 sm:text-left sm:text-5xl md:max-w-2xl  xl:text-7xl/none ">
                Every Delicious food in the house
              </h1>

              <div className="px-4 text-neutral-600 lg:px-0 ">
                <p className="mt-6 max-w-xl text-center sm:text-left">
                  Build, test and, and send transactional emails at scale.
                  Resend provides the best developer experience helping you
                  reach users instead of spam folders{" "}
                </p>
                <div className="mt-4">
                  <h1 className="text-center sm:text-left">
                    Press{" "}
                    <span className="rounded-md border border-neutral-600 bg-neutral-800  px-1 text-sm ">
                      A
                    </span>{" "}
                    to request access
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div>
          
            <video
              src={require("../../../../public/cube.mp4")}
              autoPlay
              loop
              muted
              className="hidden aspect-square bg-transparent md:block"
            />
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
