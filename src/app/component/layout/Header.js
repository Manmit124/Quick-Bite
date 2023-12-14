"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Ghost } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Dropdown from "./Dropdown";


const Header = () => {
  const session = useSession();
  console.log(session.user);
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  let userImage = userData?.image;

 
  return (
    <div className="m-auto   flex-wrap flex justify-between gap-3 w-full  items-center  shadow p-4 mt-0">
      <Link className="  text-primary font-semibold text-2xl" href={"/"}>
        Cafe
      </Link>

      <div className="flex  items-center gap-8 font-semibold ">
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/#about"}>About</Link>
        <Link href={"/#contact"}>Contact</Link>

        {status === "authenticated" && (
         <>
          <Dropdown/>
         </>
        )}
        {status === "unauthenticated" && (
          <>
            <Button variant={"ghost"}>
              <Link href={"/register"}>Register</Link>
            </Button>
            <Button>
              <Link href={"/login"}>Login</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
