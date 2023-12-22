"use client";
import { Button } from "@/app/component/ui/button";
import { Input } from "@/app/component/ui/input";
import { Label } from "@/app/component/ui/label";
import { toast } from "@/app/component/ui/use-toast";
import { toast as hottoast } from "react-hot-toast";
import userprofile from "@/app/hook/userprofile";
import { Edit, Trash2 } from "lucide-react";

import { useEffect, useState } from "react";
import DeleteButton from "@/app/lib/DeleteButton";

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
        method: editCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setnewcategoryname("");
      fetchCategories();
      seteditCategory(null);
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
  async function handleDeleteClick(_id) {
    const newPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
        toast({
          title: "Category deleted successfully",
          variant: "outline",
        });
      } else {
        reject();
        toast({
          title: "kuch to gadbad hai bhai",
          variant: "destructive",
        });
      }
    });

    await hottoast.promise(newPromise, {
      loading: "Deleting, just wait...",
    });
    fetchCategories();
  }

  if (ProfileLoading) {
    return <h1>"Loading....."</h1>;
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
          <div className="flex gap-2">
            <Button type="Submit">{editCategory ? "Update" : "Create"}</Button>
            <Button type="button" onClick={()=>{
              seteditCategory(null);
              setnewcategoryname('')
            
            }} variant="destructive">Cancel</Button>
          </div>
        </div>
      </form>
      <div className="py-5 mx-auto max-w-xl flex flex-col items-center">
        {Categories?.length > 0 &&
          Categories.map((c) => (
            <div
              key={c._id}
              className="bg-slate-100 w-full p-4 my-2 rounded-md cursor-pointer hover:bg-slate-200 transition duration-300  shadow-lg hover:scale-105 justify-between flex"
              variant="outline"
            >
              <span
                className="text-gray-800 font-medium hover:text-lg
               "
              >
                {c.name}
              </span>
              <div className="flex gap-2 ">
                <Edit
                  onClick={() => {
                    seteditCategory(c);
                    setnewcategoryname(c.name);
                  }}
                  className="hover:text-blue-500"
                />
                <Trash2
                  onClick={() => handleDeleteClick(c._id)}
                  className=" hover:text-red-500"
                />
                {/* <DeleteButton  Label={<Trash2/>} onDelete={()=>handleDeleteClick(c._id)}/> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default page;
