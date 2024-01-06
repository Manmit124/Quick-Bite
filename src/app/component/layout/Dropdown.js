"use client"
import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import { Ghost } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu";
import { cn } from "@/app/utils/app";
const Dropdown = () => {
    const session = useSession();
    console.log(session.user);
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    let userImage = userData?.image;
  
  return (
    <>
    <DropdownMenu className="bg-transparent to-transparent">
      <DropdownMenuTrigger>
        <Image
          className=" rounded-2xl  object-cover    "
          src={userImage}
          width={40}
          height={40}
          alt="profile"
        
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center justify-start gap-2 p-2 mr-6 ">
          <div className="flex flex-col space-y-1 leading-none">
            {userData.name && (
              <p className="font-medium">{userData.name}</p>
            )}
            {userData.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {userData.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator className=" mb-2"/>
          <Link href={"/profile"} className=" cursor-pointer">
        <DropdownMenuItem className="cursor-pointer" >
          <span>
          Profile

          </span>
          
        </DropdownMenuItem>
          </Link>
        <DropdownMenuSeparator className=" mb-2"/>
        <DropdownMenuItem
        
        className="cursor-pointer pt-1"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            });
          }}
        >
        

          Logout
       
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
  )
}

export default Dropdown
