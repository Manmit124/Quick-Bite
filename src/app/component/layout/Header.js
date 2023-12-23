"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Ghost, GhostIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import Snowfall from "react-snowfall";

const Header = () => {
  const session = useSession();
  console.log(session.user);
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  let userImage = userData?.image;
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    setMouseX(clientX - left);
    setMouseY(clientY - top);
  }

  return (
    <div
      style={{ "--mouse-x": mouseX, "--mouse-y": mouseY }}
      onMouseMove={onMouseMove}
      className="m-auto   flex-wrap flex justify-between gap-3 w-full  items-center  shadow p-4 mt-0  fixed " 
    >
    {/* <Snowfall color="gray" snowflakeCount={100}/> */}
      <Link className="  text-primary font-semibold text-2xl" href={"/"}>
        Cafe
      </Link>
      
      <div className=" flex items-center gap-8 font-semibold ">
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/#about"}>About</Link>
        <Link href={"/#contact"}>Contact</Link>

        {status === "authenticated" && (
          <>
            <Dropdown />
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
  //  <Supply/>
  );
};

export default Header;


 export const Supply=()=>{
  return (
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      {/* <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="h-8"
        alt="Flowbite Logo"
      /> */}
      <Image src={'/pizza'} height={40} width={40} alt="website logo"/>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Flowbite
      </span>
    </Link>
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {/* Add your user button and dropdown here */}
      {/* <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="user photo"
        />
      </button> */}
      {/* Dropdown menu */}
      {/* <div
        className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        id="user-dropdown"
      >
        Add your user dropdown content here */}
      {/* </div> */}
      <button
        data-collapse-toggle="navbar-user"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-user"
        aria-expanded="false"
      >
       <GhostIcon className=" sr-only"/>
      </button>
    </div>
    <div
      className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
      id="navbar-user"
    >
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {/* Add your navigation links here */}
        <li>
          <Link
            href="/"
            className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/menu"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Menu
          </Link>
        </li>
        <li>
          <Link
            href="/#about"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/#contact"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  </div>

</nav>


  )
}