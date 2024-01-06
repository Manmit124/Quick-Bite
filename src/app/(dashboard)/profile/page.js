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
import { Checkbox } from "@/app/component/ui/checkbox";
import userprofile from "@/app/hook/userprofile";
const fetchUserProfile = async (setters) => {
  try {
    const response = await fetch("/api/profile");
    if (response.ok) {
      const data = await response.json();
      setters.forEach(({ state, setter, key }) => setter(data[key] || state));
    } else {
      console.error('Error fetching updated profile data:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error fetching updated profile data:', error);
  }
};


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

  let userImage = userData?.image;
  const setImageUrl = (url) => {
    setformData((prevFormData) => ({ ...prevFormData, profilePicture: url }));
  };

  //  useEffect(() => {
  //    if (status === "authenticated") {
  //      setusername(session.data.user.name);
  //      fetch("/api/profile").then((response) => {
  //       response.json().then((data) => {
  //          console.log(data);
  //         setphone(data.phone);
  //         setstreetAddress(data.streetAddress);
  //          setpostalCode(data.postalCode);
  //        setcity(data.city);
  //          setcountry(data.country);
  //        setisAdmin(data.admin);
  //      });
  //      });
  //    }
  //  }, [session, status]);
 
  // const fetchUserProfile = async () => {
  //   try {
  //     const response = await fetch("/api/profile");
  //     if (response.ok) {
  //       const data = await response.json();
  //       setphone(data.phone);
  //       setstreetAddress(data.streetAddress);
  //       setpostalCode(data.postalCode);
  //       setcity(data.city);
  //       setcountry(data.country);
  //       setisAdmin(data.admin);
  //     } else {
  //       console.error('Error fetching updated profile data:', response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching updated profile data:', error);
  //   }
  // };
  
  useEffect(() => {
    if (status === "authenticated") {
      setusername(session.data.user.name);
      fetchUserProfile([
        { state: phone, setter: setphone, key: "phone" },
        { state: streetAddress, setter: setstreetAddress, key: "streetAddress" },
        { state: postalCode, setter: setpostalCode, key: "postalCode" },
        { state: city, setter: setcity, key: "city" },
        { state: country, setter: setcountry, key: "country" },
        { state: isAdmin, setter: setisAdmin, key: "admin" },
      ]);
    }
  }, [session, status]);
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     setusername(session.data.user.name);
      
  //     fetchUserProfile(); // Initial fetch
  
  //     // Set up interval for subsequent fetches every 5 seconds
  //     const intervalId = setInterval(fetchUserProfile, 5000);
  
  //     // Cleanup the interval when the component unmounts or when dependencies change
  //     return () => clearInterval(intervalId);
  //   }
  // }, [session, status]);
  
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/profile");
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data);
  //         setisAdmin(data.admin);
  //       } else {
  //         console.error('Error fetching updated profile data:', response.status, response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching updated profile data:', error);
  //     }
  //   };

  //   if (status === "authenticated") {
  //     fetchData(); // Initial fetch

  //     // Set up interval for subsequent fetches every 5 seconds
  //     const intervalId = setInterval(fetchData, 5000);

  //     // Cleanup the interval when the component unmounts or when dependencies change
     
  //   }
  // }, );


  // const hadleaddrresschange = (propName, value) => {
  //   if (propName === "phone") setphone(value);
  //   console.log(phone);
  //   if (propName === "streetAddress") setstreetAddress(value);
  //   console.log(streetAddress);
  //   if (propName === "postalCode") setpostalCode(value);

  //   if (propName === "city") setcity(value);
  //   if (propName === "country") setcountry(value);
  // };
  
  const hadleaddrresschange = (propName, value) => {
    switch (propName) {
      case "phone":
        setphone(value);
        break;
      case "streetAddress":
        setstreetAddress(value);
        break;
      case "postalCode":
        setpostalCode(value);
        break;
      case "city":
        setcity(value);
        break;
      case "country":
        setcountry(value);
        break;
      default:
        break;
    }
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
        admin:isAdmin
      }),
    });
    if (response.ok) {
      setformData((prevFormData) => ({
        ...prevFormData,
        profilePicture: formData.profilePicture,
      }));
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
    return <h1>"Loading....."</h1>;
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <>
    <div className="no-scrollbar  mt-0 ">
      <div className="lg:mt-8 ">
        <div className="py-5 mx-auto text-center flex flex-col items-center font-medium ">
          <h1 className="text-3xl font-bold sm:text-6xl">
            Profile
          </h1>
        </div>

        <form className=" max-w-xl mx-auto  " onSubmit={handleProfilesubmit}>
          <div className="flex flex-col  lg:flex-row gap-2 ">
          <div className=" flex justify-center items-center lg:justify-start  lg:items-start ">

            <ImageUploader
              image={image}
              setImageUrl={setImageUrl}
              setimage={setimage}
            />
          </div>
            <div className="grow p-3">
              <div className="mb-4 ">
                <Label className="block mb-1  leading-normal text-muted-foreground  sm:leading-7">
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
                <Label className="block leading-normal text-muted-foreground  sm:leading-7 mt-2 mb-2">Email</Label>
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
          <CardFooter className="justify-between flex lg:mt-8">
            <Link href={"/"}>
              <Button>Cancel</Button>
            </Link>

            <Button variant="destructive" type="submit">
              Submit
            </Button>
          </CardFooter>
        </form>
      </div>
      </div>
    </>
  );
}
