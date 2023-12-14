"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import piza from "../../../../public/pizza.png";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

const Hero = () => {
  const words = ['Pizza', 'Samosa', 'momos', 'Dosa', 'Magi']; // Updated array
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalTime, setIntervalTime] = useState(10000); 

  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate to the next word
      setCurrentIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 2000); // Interval time in milliseconds (e.g., 2000 for 2 seconds)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [words]);

  const increaseSpeed = () => {
    // Decrease interval time to increase speed
    const newIntervalTime = Math.max(500, intervalTime - 1000); // Minimum interval time of 500 milliseconds
    setIntervalTime(newIntervalTime);
  };

  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
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
        {/* <div className="absolute left-0 right-0 w-full justify-start">
    <div className="absolute left-0    text-left -z-10">
    <Image  className=' sm:hidden lg:visible' src={'/pizza.png'} alt="pizza" width={500} height={189}/>
    </div>
    <div className="absolute  right-0 -z-10">
    <Image src={'/pizza.png'} alt="pizza" width={109} height={189}/>
    </div>
   </div> */}
      </div>
    </MaxWidthWrapper>
  );
};

export default Hero;
