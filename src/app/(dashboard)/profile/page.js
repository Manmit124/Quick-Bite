"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input } from "../../component/ui/input";
import { Label } from "../../component/ui/label";
import Addressinput from "../../component/layout/Addressinput";
import { Button } from "../../component/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../component/ui/card";
import { useToast } from "../../component/ui/use-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../config/firebase";
import Link from "next/link";
import ImageUploader from "@/app/lib/Imageupload";

export default function page() {
  const [image, setimage] = useState(undefined);
  const [imagepercentage, setimagepercentage] = useState(0);
  const [formData, setformData] = useState({});
  console.log(imagepercentage);
  const [phone, setphone] = useState("");
  const [streetAdress, setstreetAdress] = useState("");
  const [postalcode, setpostalcode] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const session = useSession();
  const { status } = session;
  const [username, setusername] = useState("");
  const { toast } = useToast();
  const userData = session.data?.user;

  let userImage = userData?.image;
  const setImageUrl = (url) => {
    setformData((prevFormData) => ({ ...prevFormData, profilePicture: url }));
  };

  useEffect(() => {
    if (status === "authenticated") {
      setusername(session.data.user.name);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          console.log(data);
          setphone(data.phone);
          setstreetAdress(data.streetAdress);
          setpostalcode(data.postalcode);
          setcity(data.city);
          setcountry(data.country);
          setisAdmin(data.admin);
        });
      });
    }
  }, [session, status]);
  // function of handling

  const hadleaddrresschange = (propName, value) => {
    if (propName === "phone") setphone(value);
    console.log(phone);
    if (propName === "streetAdress") setstreetAdress(value);
    console.log(streetAdress);
    if (propName === "postalcode") setpostalcode(value);

    if (propName === "city") setcity(value);
    if (propName === "country") setcountry(value);
  };
  const handleProfilesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
        image: formData.profilePicture,
        streetAdress,
        phone,
        postalcode,
        city,
        country,
      }),
    });
    if (response.ok) {
      return toast({
        title: "Your profile has been updated",
        variant: "outline",
      });
    } else {
      return toast({
        title: "Please try again buddy",
        variant: "destructive",
      });
    }
  };

  // image upload functionallity

  // status

  // useEffect(()=>{
  // if(status==="loading"){
  // }
  // if(status==="unauthenticated"){
  //   return redirect("/login");
  // }
  // },[status])

  if (status === "loading") {
    return <h1h1>"Loading....."</h1h1>;
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <>
      <div className="mt-8">
        <div className="py-5 mx-auto text-center flex flex-col items-center ">
          <h1 className="text-3xl font-bold  text-gray-900 sm:text-6xl">
            Profile
          </h1>
        </div>

        <form className=" max-w-xl mx-auto  " onSubmit={handleProfilesubmit}>
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
                  value={userData.email}
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
    </>
  );
}
