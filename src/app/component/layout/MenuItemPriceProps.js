"use client";

import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const MenuItemPriceProps = ({ name, addLabel, props, setprops }) => {
  function addProps() {
    setprops((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }
  const onInputChange = (field, value) => {
    setprops((prevprops) => ({
      ...prevprops,
      [field]: value,
    }));
  };

  function editProps(e, index, prop) {
    const newValue = e.target.value;
    setprops((prevprops) => {
      const newprops = [...prevprops];
      newprops[index][prop] = newValue;
      return newprops;
    });
  }
  function removeProps(indexToRemove) {
    setprops((prev) => prev.filter((v, index) => index !== indexToRemove));
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" className="bg-white mt-3">
            <span>
              {" "}
              <Plus />
            </span>
            {addLabel} <span>({props?.length})</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          {props.length > 0 &&
            props.map((Props, index) => (
              <div className="grid gap-4 scroll-m-0">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{name}</h4>
                </div>
                <div className="">
                  <div className="grid gap-2 items-end">
                    <div className="flex gap-2 items-center">
                      <Label>Name</Label>
                      <Input
                        type="text"
                        placeholder="size name"
                        value={Props.name}
                        onChange={(e) => editProps(e, index, "name")}
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <Label>Extra Price</Label>
                      <Input
                        type="text"
                        placeholder="Extra Price"
                        value={Props.price}
                        onChange={(e) => editProps(e, index, "price")}
                      />
                      <Button
                        type="button"
                        onClick={() => removeProps(index)}
                        className=" mr-0 ml-0 items-end px-2 py-2  hover:bg-red-500"
                      >
                        {" "}
                        <Trash2 className=" hover:" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <Button
            onClick={addProps}
            type="button"
            variant="outline"
            className="bg-white mt-3"
          >
            {addLabel}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MenuItemPriceProps;
