"use client";
import Categorycard from "@/app/component/layout/Categorycard";
import Editcategory from "@/app/component/layout/Editcategory";
import { Button } from "@/app/component/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/component/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/component/ui/dropdown-menu";
import { Input } from "@/app/component/ui/input";
import { Label } from "@/app/component/ui/label";
import { toast } from "@/app/component/ui/use-toast";
import userprofile from "@/app/hook/userprofile";
import {
  CircleEllipsisIcon,
  ShieldEllipsisIcon,
  ThermometerIcon,
} from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";
import { toast as hottoast } from "react-hot-toast";

const page = () => {
  const [newcategoryname, setnewcategoryname] = useState("");
  const [Categories, setCategories] = useState();
  const [editCategory, seteditCategory] = useState(null);

  const { loading: ProfileLoading, data: profileData } = userprofile();

  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  const handleNewCategory = async (e) => {
    e.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: newcategoryname };
      if (editCategory) {
        data._id = editCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editCategory ? "PUT" : " POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setnewcategoryname("");
      fetchCategories();
      seteditCategory(null)
      if (response.ok) {
        toast({
          title: editCategory
            ? "You category is Updated successfully"
            : "New Category is created successfully",
          variant: "outline",
        });
        resolve();
      } else {
        reject();
      }
    });
  };

  if (ProfileLoading) {
    return "loadin bhai loading";
  }

  return (
    <div className="mt-5 ">
      <div className="py-5 mx-auto text-center flex flex-col items-center ">
        <h1 className="text-3xl font-bold  text-gray-900 sm:text-6xl">
          Categories
        </h1>
      </div>
      <form className=" max-w-xl mx-auto  " onSubmit={handleNewCategory}>
        <div className="flex  gap-2 items-end">
          <div className="grow">
            <Label>
              {editCategory ? "Update category" : "New Category Name"}
              {editCategory && (
                <>
                  :<b> {editCategory.name}</b>
                </>
              )}
            </Label>
            <Input
              type="text"
              value={newcategoryname}
              onChange={(e) => setnewcategoryname(e.target.value)}
            />
          </div>
          <div>
            <Button type="Submit">{editCategory ? "Update" : "Create"}</Button>
          </div>
        </div>
      </form>
      <div className="py-5 mx-auto text-center flex flex-col items-center">
        {Categories?.length > 0 &&
          Categories.map((c) => (
            <Button
              onClick={() => {
                seteditCategory(c);
                setnewcategoryname(c.name);
              }}
              className="bg-slate-50"
              variant="outline"
            >
              <span>{c.name}</span>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default page;
