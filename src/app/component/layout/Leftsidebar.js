"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

import { useParams, usePathname, useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
import dynamic from "next/dynamic";

const Bottombar = dynamic(() => import('./Bottombar'), { ssr: false });

const Leftsidebar = ({ props }) => {
const router=usePathname();

  const session = useSession();
  const { status } = session;
  const [isAdmin, setisAdmin] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
         

          setisAdmin(data.admin);
        });
      });
    }
  }, [session, status]);

  const [activeLink, setActiveLink] = useState(null);
  const [isMenuActive, setActive] = useState(false);


  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  function toggleActive() {
    if (window.innerWidth < 1100) {
      if (isMenuActive) {
        setActive(false);
      } else {
        setActive(true);
      }
    }
  }

  const searchRef = useRef(null);

  const handleClickOutside = (event) => {
    // Check if the click was inside the search component or its children
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      // Clicked outside the search component, close it
      setshowsearch(false);
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    document.body.className = isMenuActive ? "overflow-hidden" : "";
  }, [isMenuActive]);
  useEffect(() => {
    // Get the current route path without query parameters
    const currentPath = router;
    

    // Check if the current path matches any of the links
    const isProfileActive = currentPath === '/profile';
    const isCategoriesActive = currentPath === '/categories';
    const isMenuItemsActive = currentPath === '/menu-items';
    const isUsersActive = currentPath === '/users';
    const isOrdersActive = currentPath === '/orders';
    const isMessageActive = currentPath === '/message';

    // Set the active link based on the current route
    if (isProfileActive) {
      setActiveLink('/profile');
    } else if (isCategoriesActive) {
      setActiveLink('/categories');
    } else if (isMenuItemsActive) {
      setActiveLink('/menu-items');
    } else if (isUsersActive) {
      setActiveLink('/users');
    } else if (isOrdersActive) {
      setActiveLink('/orders');
    } else if (isMessageActive) {
      setActiveLink('/message');
    } else {
      setActiveLink(null);
    }
   
  });
 
  return (
    <>
    <Bottombar isMenuActive={isMenuActive} toggleActive={toggleActive}/>
    <div className="p-6 w-1/2 h-screen bg-white fixed top-0 -left-96 lg:left-0 lg:w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200 shadow lg:block hidden">
        <div className="flex flex-col justify-start item-center">
          <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
            <Link href={"/profile"}>Dashboard</Link>
          </h1>
          <div className="my-4 border-b border-gray-100 pb-4">
                <Link passHref href={"/profile"}>
            <div className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-black hover:text-white p-2 rounded-md group cursor-pointer ${activeLink === '/profile' ? 'shadow-lg bg-black text-white' : 'text-gray-800 group-hover:text-white font-semibold'}`}>
              <h3 className="text-base">
                  <span>Profile</span>
              </h3>
            </div>
                </Link>
            {isAdmin && (
              <>
                    <Link href={"/categories"}>
                <div className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:text-white hover:bg-black p-2 rounded-md group cursor-pointer ${activeLink === '/categories' ? 'shadow-lg bg-black text-white' : 'text-gray-800 group-hover:text-white font-semibold'}`}>
                  <h3 className="text-base">
                    Categories
                    
                  </h3>
                </div>
                    </Link>
                    <Link href={"/menu-items"}>
                <div className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:text-white hover:bg-black p-2 rounded-md group cursor-pointer ${activeLink === '/menu-items' ? 'shadow-lg bg-black text-white' : 'text-gray-800 group-hover:text-white font-semibold'}`}>
                  <h3 className="text-base">
                    Menu-Items
                  </h3>
                </div>
                    </Link>
                    <Link href={"/users"}>
                <div className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:text-white hover:bg-black p-2 rounded-md group cursor-pointer ${activeLink === '/users' ? 'shadow-lg bg-black text-white' : 'text-gray-800 group-hover:text-white font-semibold'}`}>
                  <h3 className="text-base">
                    Users
                  </h3>
                </div>
                    </Link>
                    <Link href={"/orders"}>
                <div className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:text-white hover:bg-black p-2 rounded-md group cursor-pointer ${activeLink === '/orders' ? 'shadow-lg bg-black text-white' : 'text-gray-800 group-hover:text-white font-semibold'}`}>
                  <h3 className="text-base">
                    Orders
                  </h3>
                </div>
                    </Link>
              </>
            )}
                <Link href={"/message"}>
            <div className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:text-white hover:bg-black p-2 rounded-md group cursor-pointer ${activeLink === '/message' ? 'shadow-lg bg-black text-white' : 'text-gray-800 group-hover:text-white font-semibold'}`}>
              <h3 className="text-base">
                Message
              </h3>
            </div>
                </Link>
            <div className={`flex mb-2 justify-start items-center hover:text-white gap-4 pl-5 hover:bg-black p-2 rounded-md group cursor-pointer ${activeLink === '/integration' ? 'shadow-lg bg-black text-white' : 'text-gray-800 group-hover:text-white font-semibold'}`}>
              <h3 className="text-base">
              Integration</h3>

            </div>
          </div>
          <div className="my-4 border-b border-gray-100 pb-4">
            <div className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer ${activeLink === '/settings' ? 'shadow-lg bg-black text-white' : 'text-gray-800 group-hover:text-white font-semibold'}`}>
              <h3 className="text-base">Settings</h3>
            </div>
            <div className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer ${activeLink === '/more' ? 'shadow-lg bg-black text-white' : 'text-gray-800 group-hover:text-white font-semibold'}`}>
              <h3 className="text-base">More</h3>
            </div>
          </div>
          <div className="my-4 " >
          <LogoutButton/>
          </div>
          <div className=" "> 
            <Link href={"/"} >
              <Button>Home Page</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leftsidebar;
