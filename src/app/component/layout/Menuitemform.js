import ImageUploader from "@/app/lib/Imageupload";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Menuitemform = ({ onSubmit, menuItem, setImageUrl }) => {
  const [image, setimage] = useState(menuItem?.image || "");
  const [name, setname] = useState(menuItem?.name || "");

  const [description, setdescription] = useState(menuItem?.description || " ");

  const [basePrice, setbasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setsizes] = useState([]);
  function addSize() {
    setsizes((oldSize) => {
      return [...oldSize, { name: "", price: 0 }];
    });
  }
  const onInputChange = (field, value) => {
    setsizes((prevSizes) => ({
      ...prevSizes,
      [field]: value,
    }));
  };

  function editSize(e, index, prop) {
    const newValue = e.target.value;
    setsizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }
  return (
    <div>
      <form
        className="  "
        onSubmit={(e) => onSubmit(e, { image, name, description, basePrice })}
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
            <Label>Base Price</Label>
            <Input
              type="text"
              value={basePrice}
              onChange={(e) => setbasePrice(e.target.value)}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button type="button" variant="outline" className="bg-white">
                  Add items size
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                {sizes.length > 0 &&
                  sizes.map((size, index) => (
                    <div className="grid gap-4 scroll-m-0">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Add the name and price of item
                        </h4>
                      </div>
                      <div className="">
                        <div className="grid gap-2 items-end">
                          <div className="flex gap-2 items-center">
                            <Label>Size Name</Label>
                            <Input
                              type="text"
                              placeholder="size name"
                              value={size.name}
                              onChange={(e) => editSize(e, index, "name")}
                            />
                          </div>
                          <div className="flex gap-2 items-center">
                            <Label>Extra Price</Label>
                            <Input
                              type="text"
                              placeholder="Extra Price"
                              value={size.price}
                              onChange={(e) => editSize(e, index, "price")}
                            />
                              <Button className=" mr-0 ml-0 items-end ">X</Button>
                          </div>
                         
                        </div>
                      
                      </div>
                    </div>
                  ))}
                <Button
                  onClick={addSize}
                  type="button"
                  variant="outline"
                  className="bg-white mt-3"
                >
                  Add to Menu-items
                </Button>
              </PopoverContent>
            </Popover>
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
