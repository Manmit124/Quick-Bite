import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

import Addtocartbutton from "./Addtocartbutton";

const Cardo = React.memo(({ onAddToCart, ...item }) => {
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
            loading="lazy"
          />
          <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white">
            New Arrival
          </div>
        </CardHeader>
        <CardContent className="p-2 ">
          <CardTitle className="text-xl font-semibold mb-2 text-white">
            {name}
          </CardTitle>

          <div className=" items-center justify-start flex">
            <p className=" text-lg font-semibold block  text-white    leading-normal text-muted-foreground  sm:leading-7 ">
              ${basePrice}
            </p>
            <span  className="text-sm font-semibold block   leading-normal text-muted-foreground  mr-2 line-through">
              $699
            </span>
          </div>
        </CardContent>
        <CardFooter className=" flex items-center justify-center rounded-md border border-transparent  mb-0 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 py-0">
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
});
Cardo.displayName='Cardo';
export default Cardo;
