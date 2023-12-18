"use client"
// import React, { useState } from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AlignJustify, CircleEllipsisIcon } from "lucide-react";
import { useState } from "react";
import Editcategory from "./Editcategory";

const Categorycard = ({ key,c, }) => {
    const [showedit, setshowedit] = useState(false);
  return (
    <>
      <div key={key} className="mb-2 ">
        <Card  className="h-10 w-60 max-w-xl ">
          <div className="justify-between flex ml-8 mr-2 ">
            <div>
              <h1 className="mt-2">{c.name}</h1>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                  <AlignJustify  className="h-4 w-4" />
                  <span className="sr-only">Open</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={()=>setshowedit(true)}> 
                   
                      Edit
                 
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                  
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>

      </div>
      {/* {
    showedit&&(

        <Editcategory/>
    )
    
} */}
    </>
  );
};

export default Categorycard;
