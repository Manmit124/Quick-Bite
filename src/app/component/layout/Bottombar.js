"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";


const Bottombar = ({ isMenuActive, toggleActive }) => {
  const { data: userProfile, status: sessionStatus } = useSession();
  const [isAdmin, setisAdmin] = useState(false);
  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (sessionStatus === "authenticated") {
        try {
          const response = await fetch("/api/profile");
          const data = await response.json();
          setisAdmin(data.admin);
        } catch (error) {
          console.error("Error fetching admin status:", error);
        }
      }
    };

    fetchAdminStatus();
  }, [sessionStatus]);
  
  const navLinks = [
  
    ["Profile", "/profile"],
    ...(isAdmin
      ? [
          ["Categories", "/categories"],
          ["Menu-Items", "/menu-items"],
          ["Users", "/users"],
          ["Orders", "/orders"],
        ]
      : []),
    ["Message", "/message"],
    ["Home", "/"], // Replace 'null' with the actual path if needed
  ];

  return (
    <header className={"relative inset-x-0 top-0 z-50    "}>
      <div className="mx-auto max-w-screen-xl px-6 md:px-10">
        <div className="flex items-center  justify-between">
          <div className="flex">
            <a href="/profile" className="group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-700 lg:hidden">
                Dashboard
              </div>
            </a>
          </div>
          <div className=" flex">
            <button
              type="button"
              className="flex items-center justify-center p-2 opacity-60 lg:hidden "
            >
              <div
                className="flex items-center justify-center p-2 opacity-60"
                onClick={toggleActive}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="1em"
                  height="1em"
                  className="inline-flex shrink-0 text-3xl"
                >
                  {isMenuActive ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="4" y1="8" x2="20" y2="8"></line>
                      <line x1="4" y1="16" x2="20" y2="16"></line>
                    </>
                  )}
                </svg>
              </div>
            </button>
          </div>
          <nav
            className={`duration-500 absolute inset-x-0 top-full z-10 mt-px flex-col p-6 pb-24 bg-zinc-950 shadow-2xl flex transition-[opacity] ${
              isMenuActive ? "opacity-100" : "opacity-0 pointer-events-none z-0"
            }`}
          >
            <div className="flex flex-col mt-6 divide-y divide-white/5 border-y border-y-white/5 ">
              {navLinks.map(([title, path], index) => (
                <a
                  className="flex items-center gap-2 py-4 font-display text-lg font-medium  text-slate-500 hover:text-white"
                  key={index}
                  href={path}
                  onClick={toggleActive}
                >
                  {title}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Bottombar;
