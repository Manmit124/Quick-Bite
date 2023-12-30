"use client";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";


import Link from "next/link";
import ImageUploader from "@/app/lib/Imageupload";
import { Label } from "@/app/component/ui/label";
import { Input } from "@/app/component/ui/input";
import Addressinput from "@/app/component/layout/Addressinput";
import { Button } from "@/app/component/ui/button";
import { CardFooter } from "@/app/component/ui/card";
import { useToast } from "@/app/component/ui/use-toast";
import { Checkbox } from "@/app/component/ui/checkbox";
import userprofile from "@/app/hook/userprofile";

export default function page() {
  const [image, setimage] = useState(undefined);
  const [imagepercentage, setimagepercentage] = useState(0);
  const [formData, setformData] = useState({});
  console.log(imagepercentage);
  const [phone, setphone] = useState("");
  const [streetAddress, setstreetAddress] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const {data:loggedInUserData} = userprofile();
  const session = useSession();
  const { status } = session;
  const [username, setusername] = useState("");
  const { toast } = useToast();
  const userData = session.data?.user;
 const {id}=useParams();

  let userImage = userData?.image;
  const setImageUrl = (url) => {
    setformData((prevFormData) => ({ ...prevFormData, profilePicture: url }));
  };

  useEffect(() => {
    if (status === "authenticated") {
      setusername(session.data.user.name);
      fetch("/api/users").then((response) => {
        response.json().then((dato) => {
        const data=dato.find(e=>e._id===id)
          console.log(data);
          setphone(data.phone);
          setstreetAddress(data.streetAddress);
          setpostalCode(data.postalCode);
          setcity(data.city);
          setcountry(data.country);
          setisAdmin(data.admin);
          setusername(data.name)
        });
      });
    }
  }, [session, status]);
  // function of handling

  const hadleaddrresschange = (propName, value) => {
    if (propName === "phone") setphone(value);
    console.log(phone);
    if (propName === "streetAddress") setstreetAddress(value);
    console.log(streetAddress);
    if (propName === "postalCode") setpostalCode(value);

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
        streetAddress,
        phone,
        postalCode,
        city,
        country,
        _id:id,
        admin:isAdmin
      }),
    });
    if (response.ok) {
      return toast({
        title: "Users profile has been updated",
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
    return <h1>"Loading....."</h1>;
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
                  streetAddress,
                  postalCode,
                  city,
                  country,
                }}
                setadressProps={hadleaddrresschange}
              />
               {loggedInUserData.admin && (
             <div>
           
            <label className="p-2 inline-flex items-center gap-2 mb-2  " htmlFor="adminCb">
              <input
                id="adminCb" type="checkbox" className=" px-3 py-3" value={'1'}
                checked={isAdmin}
                onChange={ev => setisAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
                  )}
            </div>
          </div>
          <CardFooter className="justify-between flex mt-8">
            <Link href={"/users"}>
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
