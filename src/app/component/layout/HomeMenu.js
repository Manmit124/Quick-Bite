"use client";
import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

const HomeMenu = () => {
  const [bestsellers, setbestsellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuitems) => {
        setbestsellers(menuitems.slice(-3));
      });
    });
  }, []);
 
  return (
    <section className="container  mx-auto my-10">
      <h1 className=" bg-gradient-to-br from-black to-neutral-600 bg-clip-text text-center text-4xl font-bold  text-transparent dark:bg-gradient-to-r dark:from-white dark:to-neutral-800 sm:text-left sm:text-5xl md:max-w-2xl top-4 left-5  mt-0 py-3">
        Checkout our trendy
      </h1>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5 mt-10">
        {bestsellers?.length > 0 &&
          bestsellers.map((item,index) => 
          <div key={index}>

          <MenuItem  {...item}  />
          </div>
          
          )}
      </div>
    </section>
  );
};

export default HomeMenu;
