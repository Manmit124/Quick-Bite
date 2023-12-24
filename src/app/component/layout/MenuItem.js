"use client";
import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "../Authprovider";
import toast from "react-hot-toast";
import Cardo from "./Card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

const MenuItem = (menuItem) => {
  // console.log(image)
  const {
    image,
    name,
    description,
    category,
    basePrice,
    sizes,
    extraIngredients,
  } = menuItem;
  const { addToCart } = useContext(CartContext);
  const [showPopup, setshowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  function handleAddToCartButtonClick() {
    if (sizes.length === 0 && extraIngredients.length === 0) {
      addToCart(menuItem);
      toast.success("Added to cart");
    } else {
      setshowPopup(true);
    }
  }
  let selectedPrice = Number(basePrice);
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing]);
    } else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extraThing.name);
      });
    }
  }
  

  return (
   
    <>
      {showPopup && (
        <div
          onClick={() => setshowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 border"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 border p-2 rounded-lg max-w-xl"
          >
            <div
              className="overflow-y-scroll p-2 no-scrollbar"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center gap-2  cursor-pointer p-4 border rounded-md mb-1"
                    >
                      <input
                        type="radio"
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        name="size"
                        className="p-2 cursor-pointer "
                      />
                      {size.name} ${Number(basePrice) + Number(size.price)}
                      
                    </label>
                    
                  ))}
                </div>
              )}
              {extraIngredients?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  {extraIngredients.map((extraThing) => (
                    <label
                      key={extraThing._id}
                      className="flex items-center gap-2 p-4 border rounded-md mb-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        onChange={(ev) => handleExtraThingClick(ev, extraThing)}
                        checked={selectedExtras
                          .map((e) => e._id)
                          .includes(extraThing._id)}
                        name={extraThing.name}
                        className=" cursor-pointer"
                      />
                      {extraThing.name} +${Number(extraThing.price)}
                    </label>
                  ))}
                </div>
              )}
              <div className="flex justify-between">


              <Button variant="destructive" onClick={() => setshowPopup(false)}>
                Cancel
              </Button>
              <Badge>Total Price={selectedPrice}</Badge>
             <Button>Pay </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Cardo onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};

export default MenuItem;
