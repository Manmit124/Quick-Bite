"use client";
import { Button } from "@/app/component/ui/button";
import { Input } from "@/app/component/ui/input";
import { Label } from "@/app/component/ui/label";
import { toast } from "@/app/component/ui/use-toast";
import { toast as hottoast } from "react-hot-toast";
import { useEffect, useState } from "react";
import DeleteButton from "@/app/lib/DeleteButton";
import CategoryItem from "@/app/component/layout/CategoryItem";
import Userprofile from "@/app/hook/userprofile";

const Page = () => {
  const [newcategoryname, setnewcategoryname] = useState("");
  const [Categories, setCategories] = useState();
  const [editCategory, seteditCategory] = useState(null);

  const { loading: ProfileLoading, data: profileData } = Userprofile();

  useEffect(() => {
    async function fetchData() {
      await fetchCategories();
    }
    fetchData();
  }, []);
  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const categorieData = await res.json();
    setCategories(categorieData);
  }

  const handleNewCategory = async (e) => {
    e.preventDefault();

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

    seteditCategory(null);
    if (response.ok) {
      toast({
        title: editCategory
          ? "You category is Updated successfully"
          : "New Category is created successfully",
        variant: "outline",
      });
      await fetchCategories();
    } else {
      hottoast.error("Failed to create/update category");
    }
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
        await fetchCategories();
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
  }

  if (ProfileLoading) {
    return <h1>&ldquo;Loading.....&rdquo;</h1>;
  }

  return (
    <div className="lg:mt-5  p-3">
      <div className="py-5 mx-auto text-center flex flex-col items-center ">
        <h1 className="text-3xl font-bold   sm:text-6xl">
          Categories
        </h1>
      </div>
      <form className=" max-w-xl mx-auto  " onSubmit={handleNewCategory}>
        <div className="flex  gap-2 lg:items-center flex-col lg:flex-row  ">
          <div className="lg:grow">
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
              className="lg:mt-0 mt-1"
            />
          </div>
          <div className="flex gap-2 mb-2  ">
            <Button type="Submit">{editCategory ? "Update" : "Create"}</Button>
            <Button
              type="button"
              onClick={() => {
                seteditCategory(null);
                setnewcategoryname("");
              }}
              variant="destructive"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
      <div className=" lg:py-5 mx-auto max-w-xl flex flex-col items-center p-3">
        {Categories?.length > 0 &&
          Categories.map((c) => (
            <CategoryItem
              key={c._id}
              category={c}
              onEdit={() => {
                seteditCategory(c);
                setnewcategoryname(c.name);
              }}
              onDelete={() => handleDeleteClick(c._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Page;
