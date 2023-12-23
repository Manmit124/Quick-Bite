"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const Leftsidebar = ({ props }) => {
  const session = useSession();
  const { status } = session;
  const [isAdmin, setisAdmin] = useState(false);
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          console.log(data);

          setisAdmin(data.admin);
        });
      });
    }
  }, [session, status]);

  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div>
      {/* <Disclosure as="nav">
      <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
        <GiHamburgerMenu
          className="block md:hidden h-6 w-6"
          aria-hidden="true"
        />
      </Disclosure.Button> */}
      <div className="p-6 w-1/2 h-screen bg-white  fixed top-0 -left-96 lg:left-0 lg:w-60    peer-focus:left-0 peer:transition ease-out delay-150 duration-200 shadow">
        <div className="flex flex-col justify-start item-center">
          <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
            <Link href={"/profile"}>Dashboard</Link>
          </h1>
          <div className=" my-4 border-b border-gray-100 pb-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              {/* <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " /> */}
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                <Link passHref href={"/profile"}>
                  <span>Profile</span>
                </Link>
              </h3>
            </div>
            {isAdmin && (
              <>
                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  {/* <CgProfile className="text-2xl text-gray-600 group-hover:text-white " /> */}
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    <Link href={"/categories"}>Categories</Link>
                  </h3>
                </div>
                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  {/* <FaRegComments className="text-2xl text-gray-600 group-hover:text-white " /> */}
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    <Link href={"/menu-items"}>Menu-Items</Link>
                  </h3>
                </div>
                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  {/* <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " /> */}
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    <Link href={"/users"}>Users</Link>
                  </h3>
                </div>
                <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  {/* <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " /> */}
                  <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                    <Link href={"/orders"}>Orders</Link>
                  </h3>
                </div>
              </>
            )}
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              {/* <BiMessageSquareDots className="text-2xl text-gray-600 group-hover:text-white " /> */}
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                <Link href={"/message"}>Message</Link>
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              {/* <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " /> */}
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Integration
              </h3>
            </div>
          </div>
          {/* setting  */}
          <div className=" my-4 border-b border-gray-100 pb-4">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              {/* <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " /> */}
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Settings
              </h3>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              {/* <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " /> */}
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                More
              </h3>
            </div>
          </div>
          {/* logout */}
          <div className=" my-4">
            <Button
              type="button"
              onClick={() => signOut()}
              className=" group-hover:text-white  "
            >
              Logout
            </Button>
           
          </div>
          <div>
          <Link href={"/"}>
              <Button>Home Page</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftsidebar;
