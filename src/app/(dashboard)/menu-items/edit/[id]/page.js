"use client";
import Menuitemform from "@/app/component/layout/Menuitemform";

import { toast } from "@/app/component/ui/use-toast";
import userprofile from "@/app/hook/userprofile";
import DeleteButton from "@/app/lib/DeleteButton";

import { redirect, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast as hottoast } from "react-hot-toast";
const NewMenuItems = () => {
  const { id } = useParams();
  const [menuItem, setmenuItem] = useState(null);

  const { loading, data } = userprofile();

  const [formData, setformData] = useState({});
  const [redirecttoItem, setredirecttoItem] = useState(false);
  // useEffect(() => {
  //   fetch("/api/menu-items").then((res) => {
  //     res.json().then((items) => {
  //       const item = items.find((i) => i._id === id);

  //       setmenuItem(item);
  //     });
  //   });
  // }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch("/api/menu-items");
        const items = await res.json();
        const item = items.find((i) => i._id === id);
        setmenuItem(item);
      } catch (error) {
        console.error("Error fetching menu items", error);
      }
    };

    fetchMenuItems();
  }, [id]);

  const handleFormSubmit = async (e, data) => {
    e.preventDefault();

    data = { ...data, _id: id, image: formData.profilePicture };

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
        toast({
          title: "Menu Item Edited successfully",
          variant: "outline",
        });
      } else {
        reject();
        toast({
          title: "Error aaya bro ",
          variant: "destructive",
        });
      }
    });
    await hottoast.promise(savingPromise, {
      loading: "Saving this tasty item..",
      // success:"saved successfully",
      error: "Error",
    });
    setredirecttoItem(true);
  };
  const handleDelete = async (id) => {
    const Response = await fetch("/api/menu-items?_id=" + id, {
      method: "DELETE",
    });
    if (Response.ok) {
      toast({
        title: "Menu_items deleted successfully",
        variant: "outline",
      });
    }
    setredirecttoItem(true);
  };
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
          <h1 className="text-3xl font-bold   sm:text-6xl">Menu-Items</h1>
        </div>
        <div className="max-w-xl mx-auto ">
          <Menuitemform
            menuItem={menuItem}
            setImageUrl={setImageUrl}
            onSubmit={handleFormSubmit}
          />
          {/* <Button type="button" onClick={() => handleDelete(id)}>
            Delete this menu Item
          </Button> */}

          <div className="mt-4">
            <DeleteButton
              Label={"Menu Item"}
              onDelete={() => handleDelete(id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMenuItems;
