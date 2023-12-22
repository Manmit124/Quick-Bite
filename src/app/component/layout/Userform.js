"use client"
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Addressinput from "./Addressinput";
import { CardFooter } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import ImageUploader from "@/app/lib/Imageupload";

const Userform = ({ user,onSave,setImageUrl }) => {
  const [username, setusername] = useState(user?.name || "");
  const [image, setimage] = useState(user?.image || "");
  const [formData, setformData] = useState({});
  const [phone, setphone] = useState(user?.phone || "");
  const [streetAdress, setstreetAdress] = useState(user?.streetAdress || "");
  const [postalcode, setpostalcode] = useState(user?.postalCode || "");
  const [city, setcity] = useState(user?.city || "");
  const [country, setcountry] = useState(user?.country || "");
  const hadleaddrresschange = (propName, value) => {
    if (propName === "phone") setphone(value);
    console.log(phone);
    if (propName === "streetAdress") setstreetAdress(value);
    console.log(streetAdress);
    if (propName === "postalcode") setpostalcode(value);

    if (propName === "city") setcity(value);
    if (propName === "country") setcountry(value);
  };

  return (
    <div className="mt-8">
      <div className="py-5 mx-auto text-center flex flex-col items-center ">
        <h1 className="text-3xl font-bold  text-gray-900 sm:text-6xl">
          Profile
        </h1>
      </div>

      <form className=" max-w-xl mx-auto  " onSubmit={(e)=>onSave(e,{name:username,image,phone,streetAdress,postalcode,city,country

      })}>
        <div className="flex gap-2 ">
          <ImageUploader
            image={image}
            setImageUrl={setImageUrl}
            setimage={setimage}
          />
          <div className="grow">
            <div className="mb-4">
              <Label className="block text-gray-700 mb-2">
                First and Last Name
              </Label>
              <Input
                value={username}
                onChange={(e) => setusername(e.target.value)}
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700 mt-2 mb-2">Email</Label>
              <Input
                value={user?.email}
                disabled
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300  rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <Addressinput
              addressProps={{
                phone,
                streetAdress,
                postalcode,
                city,
                country,
              }}
              setadressProps={hadleaddrresschange}
            />
          </div>
        </div>
        <CardFooter className="justify-between flex mt-8">
          <Link href={"/"}>
            <Button>Cancel</Button>
          </Link>

          <Button variant="destructive" type="submit">
            Submit
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default Userform;
