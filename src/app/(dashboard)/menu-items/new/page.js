"use client";
import Menuitemform from "@/app/component/layout/Menuitemform";
import { toast } from "@/app/component/ui/use-toast";
import Userprofile from "@/app/hook/userprofile";

import { redirect } from "next/navigation";
import React, { useState } from "react";
const NewMenuItems = () => {
  const { loading, data } = Userprofile();
 
  const [formData, setformData] = useState({});
  const [redirecttoItem, setredirecttoItem] = useState(false);

  const handleFormSubmit = async (e,data) => {
    e.preventDefault();

  data = { ...data,image: formData.profilePicture };
    // const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

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
  
  if (redirecttoItem) {
    return redirect("/menu-items");
  }
  const setImageUrl = (url) => {
    setformData((prevFormData) => ({ ...prevFormData, profilePicture: url }));
  };

  if (loading) {
    return <h1>&ldquo;Loading.....&rdquo;</h1>;
  }
  if (!data.admin) {
    return <h1>&ldquo;admin nh hai bhai.....&rdquo;</h1>;
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
        
          <Menuitemform menuItem={null} onSubmit={handleFormSubmit} setImageUrl={setImageUrl}/>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default NewMenuItems;
