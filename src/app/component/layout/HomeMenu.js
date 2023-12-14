import Image from "next/image";
import React from "react";
import MenuItem from "./MenuItem";

const HomeMenu = () => {
  return (
    <section>
      {/* <div className="absolute left-0 right-0 w-full justify-start">
    <div className="absolute left-0   -top-[70px] text-left -z-10">
    <Image src={'/pizza.png'} alt="pizza" width={109} height={189}/>
    </div>
    <div className="absolute -top-[100px] right-0 -z-10">
    <Image src={'/pizza.png'} alt="pizza" width={109} height={189}/>
    </div>
   </div> */}
   <h1 className="  text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Checkout our trendy</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
};

export default HomeMenu;
