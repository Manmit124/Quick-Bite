"use client";
import { Button, buttonVariants } from "@/app/component/ui/button";
import { Input } from "@/app/component/ui/input";
import { Label } from "@/app/component/ui/label";
import { toast } from "@/app/component/ui/use-toast";
import userprofile from "@/app/hook/userprofile";
import { cn } from "@/app/utils/app";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const { loading, data } = userprofile();
  const [menuItems, setmenuItems] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((menuitems) => {
      setmenuItems(menuitems);
    });
  });

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
        </div>
        <div>
          {menuItems?.length > 0 &&
            menuItems.map(item => (

            <div>{item.name}</div>)

            )
          }
            
        </div>
      </div>
    </div>
  );
};

export default page;
