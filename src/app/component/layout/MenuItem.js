import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";

const MenuItem = () => {
  return (
    <div className="m-auto  items-center">
      <Card className=" cursor-pointer hover:shadow-lg  transition-shadow ">
        <div className=" items-center">
          <Image
            className="item-center ml-7"
            src={"/pizza.png"}
            alt="pizza"
            width={120}
            height={189}
          />

          <CardHeader>
            <CardTitle>perepery pizza</CardTitle>
            <CardDescription>lorem ja;dlkfjadfja</CardDescription>
          </CardHeader>
          <CardContent>
           <Button className="bg-blue-700">Order</Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default MenuItem;
