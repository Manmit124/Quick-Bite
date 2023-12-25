import Image from "next/image";
import React from "react";
import { cartProductprice } from "../Authprovider";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

const CartProduct = ({ product, onRemove,index }) => {
  return (
    <div className=" flex items-center gap-4 border-4 py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product.image} alt="Product" />
      </div>
      <div className="grow">
        <h3 className="font-semibold">{product.name}</h3>
        {product.size && (
          <div className="text-sm">
            Size:<span>{product.size.name}</span>
          </div>
        )}
        {product.extras?.length > 0 && (
          <div className=" text-sm text-gray-50">
            {product.extras.map((extra) => (
              <div key={extra.name}>
                {extra.name} ${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className=" text-lg font-semibold">${cartProductprice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <Button type="button" onClick={() => onRemove(index)} className="p-2">
            <Trash />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
