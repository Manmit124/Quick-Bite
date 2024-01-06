import ImageUploader from "@/app/lib/Imageupload";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import MenuItemPriceProps from "./MenuItemPriceProps";

const Menuitemform = ({ onSubmit, menuItem, setImageUrl }) => {
  const [image, setimage] = useState(menuItem?.image || "");
  const [name, setname] = useState(menuItem?.name || "");

  const [description, setdescription] = useState(menuItem?.description || " ");
  const [basePrice, setbasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setsizes] = useState(menuItem?.sizes || []);
  const [extraIngredients, setextraIngredients] = useState(
    menuItem?.extraIngredients || []
  );
  const [categories, setcategories] = useState([]);
  const [category, setcategory] = useState(menuItem?.category || "");
  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setcategories(categories);
      });
    });
  }, []);

  return (
    <div>
      <form
        className="  "
        onSubmit={(e) =>
          onSubmit(e, {
            image,
            name,
            description,
            basePrice,
            sizes,
            extraIngredients,
            category
          })
        }
      >
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
            <div className="flex flex-col gap-2 my-2 ">

         
            <Label className=" max-w-sm">Category</Label>
          
            <select className=" border  p-2 rounded-md bg-black" value={category} onChange={ev => setcategory(ev.target.value)}>
            {categories?.length > 0 && categories.map(c => (
              <option className=" p-2 hover:bg-white hover:text-black  " key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
            <Label>Base Price</Label>
            <Input
              type="text"
              value={basePrice}
              onChange={(e) => setbasePrice(e.target.value)}
            />
               </div>
            <MenuItemPriceProps
              name={"Sizes"}
              addLabel={"Add item Size"}
              props={sizes}
              setprops={setsizes}
            />
            <MenuItemPriceProps
              name={"Extra Ingredients"}
              addLabel={"Add ingredients prices"}
              props={extraIngredients}
              setprops={setextraIngredients}
            />
          </div>
        </div>
        <div className="flex  justify-between mt-5 ">
          <Button type="button" variant="destructive">
            <Link href={"/menu-items"}>Go Back</Link>
          </Button>
          <Button type="Submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default Menuitemform;
