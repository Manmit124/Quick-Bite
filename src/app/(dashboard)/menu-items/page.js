"use client";
import { Button, buttonVariants } from "@/app/component/ui/button";
import { Input } from "@/app/component/ui/input";
import { Label } from "@/app/component/ui/label";
import { toast } from "@/app/component/ui/use-toast";
import userprofile from "@/app/hook/userprofile";
import { cn } from "@/app/utils/app";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const { loading, data } = userprofile();
  const [menuItems, setmenuItems] = useState([]);

  function fetchMenuItems() {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuitems) => {
        setmenuItems(menuitems);
      });
    });
  }
  useEffect(() => {
    fetchMenuItems();
  }, []);

  if (loading) {
    return "Loading is ifo";
  }
  if (!data.admin) {
    return "Not an Admin";
  }

  return (
    <div>
      <div className="mt-5 ">
        <div className="py-5 mx-auto text-center flex flex-col items-center ">
          <h1 className="text-3xl font-bold  text-gray-900 sm:text-6xl">
            Menu-Items
          </h1>
          <div className="mt-8 ">
            <Link
              className={cn(buttonVariants("outline"))}
              href={"/menu-items/new"}
            >
              Create new menu items
            </Link>
          </div>
          <div className="mt-8 grid gap-4 grid-cols-4  flex-col ">
            {menuItems?.length > 0 &&
              menuItems.map((item) => (
      
                  <div key={item.id} className="max-w-xl mx-auto pl-10 pr-10  bg-slate-500 rounded-lg">
                    <Link href={'/menu-items/edit/'+item._id} className="w-full  text-white py-2 px-4 rounded focus:outline-none  transition duration-300 ">
                    <div className="relative w-24 h-24">
                    <Image src={item.image} alt="imag of menu-items" height={100} width={100}/>

                    </div>
                      {item.name}
                    </Link>
                  </div>
              
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
