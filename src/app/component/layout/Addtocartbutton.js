import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
const Addtocartbutton = ({ sizes, onClick, basePrice,image,extraIngredients }) => {
  
  return (
    <Button
      className=" hover:bg-blue-700  rounded-lg mb-0 py-0 px-14 gap-2"
      onClick={onClick}
      type="button"
    >
      {sizes?.length > 0 ? (
        <>
          <span className="flex gap-2">
            <ShoppingCart className=" animate-bounce" /> From ${basePrice}
          </span>
        </>
      ) : (
        <>
          <span className="flex gap-2">
           
         
            <ShoppingCart className=" animate-bounce" /> Add to Cart
          </span>
        </>
      )}
    </Button>
  );
};

export default Addtocartbutton;
