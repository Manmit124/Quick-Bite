import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Addtocartbutton from "./Addtocartbutton";

const Cardo = ({ onAddToCart, ...item }) => {
  const { image, name, basePrice, sizes, extraIngredients } = item;
  return (
    <div className="container bg-transparent scale-100">
      <Card className="max-w-md  bg-transparent rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
        <CardHeader className="relative">
          <Image
            src={image}
            alt="Product image"
            width={300}
            height={200}
            className="object-cover h-40 w-full"
          />
          <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white">
            New Arrival
          </div>
        </CardHeader>
        <CardContent className="p-2 ">
          <CardTitle className="text-xl font-semibold mb-2 text-white">
            {name}
          </CardTitle>
          {/* <CardDescription className="text-gray-600 mb-2">
        Product Description goes here. Provide a brief overview of the product.
      </CardDescription> */}
          <div className=" items-center justify-start flex">
            <p className=" text-lg font-semibold block  text-white    leading-normal text-muted-foreground  sm:leading-7 ">
              ${basePrice}
            </p>
            <span class="text-sm font-semibold block   leading-normal text-muted-foreground  mr-2 line-through">
              $699
            </span>
          </div>
        </CardContent>
        <CardFooter className=" flex items-center justify-center rounded-md border border-transparent  mb-0 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 py-0">
          {/* <Button
            className=" hover:bg-blue-700  rounded-lg mb-0 py-0 px-14 gap-2"
            onClick={onAddToCart}
            type="button"
          >
            {sizes?.length > 0 || extraIngredients?.length > 0 ? (
              <>
              <ShoppingCart className=" animate-bounce" /> From ${basePrice}
              </>
            ) : (
              <>
                <ShoppingCart className=" animate-bounce" /> Add to Cart
              </>
            )}
          </Button> */}
          <Addtocartbutton 
          sizes={sizes}
          onClick={onAddToCart}
          basePrice={basePrice}
          image={image}
          extraIngredients={extraIngredients}


          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cardo;
