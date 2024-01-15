"use client";
import MenuItemcard from "@/app/component/layout/MenuItemcard";
import {  buttonVariants } from "@/app/component/ui/button";
import { Skeleton } from "@/app/component/ui/skeleton";
import Userprofile from "@/app/hook/userprofile";

import { cn } from "@/app/utils/app";
import Link from "next/link";
import { useEffect, useState } from "react";

const MenuItems = () => {
  const { loading, data } = Userprofile();
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
    return <Skeleton className="w-[100px] h-[20px] rounded-full"/>
  }
  if (!data.admin) {
    return <h1>&lqduo;admin nh hai.....&rdquo;</h1>;
  }

  return (
    <div>
      <div className="mt-5 ">
        <div className="py-5 mx-auto text-center flex flex-col items-center ">
          <h1 className="text-3xl  font-bold   sm:text-6xl">
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
          <div className="mt-8 grid gap-4   grid-cols-2 lg:grid-cols-4  flex-col ">
            {menuItems?.length > 0 &&
              menuItems.map((item) => (
                <MenuItemcard key={item._id} id={item._id} name={item.name} image={item.image} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;



