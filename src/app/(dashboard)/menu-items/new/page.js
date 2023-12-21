"use client";
import Menuitemform from "@/app/component/layout/Menuitemform";
import { Button } from "@/app/component/ui/button";
import { Input } from "@/app/component/ui/input";
import { Label } from "@/app/component/ui/label";
import { toast } from "@/app/component/ui/use-toast";
import userprofile from "@/app/hook/userprofile";
import ImageUploader from "@/app/lib/Imageupload";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast as hottoast } from "react-hot-toast";
const NewMenuItems = () => {
  const { loading, data } = userprofile();
  const [image, setimage] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [basePrice, setbasePrice] = useState("");
  const [formData, setformData] = useState({});
  const [redirecttoItem, setredirecttoItem] = useState(false);

  const handleFormSubmit = async (e,data) => {
    e.preventDefault();
  console.log(data)
  data = { ...data,image: formData.profilePicture };
    // const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      console.log(response)
      if (response.ok) {
        // resolve();
         setredirecttoItem(true);
        toast({
          title: "Menu Item added successfully",
          variant: "outline",
        });
      } else {
        // reject();
        toast({
          title: "Error aaya bro ",
          variant: "destructive",
        });
      }
    }
    // });
    // await hottoast.promise(savingPromise, {
    //   loading: "Saving this tasty item..",
    //   // success:"saved successfully",
    //   error: "Error",
    // });
    // setredirecttoItem(true);
  // };
  if (redirecttoItem) {
    return redirect("/menu-items");
  }
  const setImageUrl = (url) => {
    setformData((prevFormData) => ({ ...prevFormData, profilePicture: url }));
  };

  if (loading) {
    return "Loading user info";
  }
  if (!data.admin) {
    return "Not an admin";
  }
  return (
    <div>
      <div className="mt-5 ">
        <div className="py-5 mx-auto text-center flex flex-col items-center ">
          <h1 className="text-3xl font-bold  text-gray-900 sm:text-6xl">
            Menu-Items
          </h1>
        </div>
        <div className="max-w-xl mx-auto ">
          {/* <form className="  " onSubmit={handleFormSubmit}>
            <div className="grid items-start gap-4">
              <ImageUploader
                image={image}
                setimage={setimage}
                setImageUrl={setImageUrl}
              />
            </div>
            <div className="flex  gap-2 items-end">
              <div className="grow">
                <Label>Item Name</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
                <Label>Desciption</Label>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
                <Label>Base Price</Label>
                <Input
                  type="text"
                  value={basePrice}
                  onChange={(e) => setbasePrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex  justify-between mt-5 ">
              <Button variant="destructive">
                <Link href={"/menu-items"}>Go Back</Link>
              </Button>
              <Button type="Submit">Submit</Button>
            </div>
          </form> */}
          <Menuitemform menuItem={null} onSubmit={handleFormSubmit} setImageUrl={setImageUrl}/>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default NewMenuItems;
