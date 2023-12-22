"use client";
import userprofile from "@/app/hook/userprofile";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [users, setusers] = useState();
  const { loading, data } = userprofile();
  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        setusers(users);
      });
    });
  }, []);
  if (loading) {
    return <h1>"Loading....."</h1>;
  }

  return (
    <div className="mt-5 ">
      <div className="py-5 mx-auto text-center flex flex-col items-center ">
        <h1 className="text-3xl font-bold  text-gray-900 sm:text-6xl">
          Hellow Users
        </h1>
        {/* <div className="py-5 mx-auto max-w-xl flex flex-col items-center"> */}

        {users?.length > 0 &&
          users.map((c) => (
            <div
              key={c._id}
              className="bg-slate-100 max-w-2xl w-full p-4 my-2 rounded-md cursor-pointer hover:bg-slate-200 transition duration-300  shadow-lg hover:scale-105 justify-between flex"
              variant="outline"
            >
              <div>
                {!!c.name && (
                  <span className="text-gray-800 font-medium hover:text-lg italic ">
                    {c.name}
                  </span>
                )}
                {!c.name && (
                  <span className="text-gray-800 font-medium hover:text-lg ">
                    {c.name}
                  </span>
                )}
                <span className="text-gray-800 font-medium hover:text-lg gap-2 pl-3  opacity-50" >
                    {c.email}
                  </span>
              </div>
              <div className="flex gap-2 ">
              <Link href={'/users/'+c._id}>

                <Edit
                  // onClick={() => {
                  //   seteditCategory(c);
                  //   setnewcategoryname(c.name);
                  // }}
                  className="hover:text-blue-500"
                />
              </Link>
                <Trash2
                  // onClick={() => handleDeleteClick(c._id)}
                  className=" hover:text-red-500"
                />{" "}
              </div>
            </div>
          ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default page;
