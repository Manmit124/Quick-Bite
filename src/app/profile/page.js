"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { Input } from "../component/ui/input";
import { Label } from "../component/ui/label";
import Addressinput from "../component/layout/Addressinput";
import { Button } from "../component/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../component/ui/card";

const page = () => {
  const session = useSession();
  const { status } = session;

  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  let userImage = userData?.image;
  if (status === "loading") {
    return "Loading.....";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <Card>
      <section className="mt-8">
        <div className="py-5 mx-auto text-center flex flex-col items-center ">
          <h1 className="text-3xl font-bold  text-gray-900 sm:text-6xl">
            <CardTitle>Profile</CardTitle>{" "}
          </h1>
        </div>

        <form className=" max-w-xl mx-auto  ">
          <div className="flex gap-2 ">
            <div className="  flex-col p-2 mb-0 rounded-lg  ">
              <Image
                src={userImage}
                height={100}
                width={100}
                className="  object-cover bg-gray-500 border-gray-500 mb-2"
              />
              <Button variant="outline" >Change photo</Button>
            </div>
            <div className="grow">
            <div className="mb-4">

              <Label className="block text-gray-700 mb-2">First and Last Name</Label>
              <Input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">

              <Label className="block text-gray-700 mt-2 mb-2">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300  rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
              <Addressinput />
            </div>
          </div>
          <CardFooter className="justify-between flex mt-8">
            <Button>Cancel</Button>
            <Button variant="destructive">Submit</Button>
          </CardFooter>
        </form>
      </section>
    </Card>
  );
};

export default page;
