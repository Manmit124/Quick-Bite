"use client";
import { Input } from "@/app/component/ui/input";
import { Label } from "@/app/component/ui/label";
import React, { useState, useEffect } from "react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm }),
        });

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Error fetching search results");
        }
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    const delaySearch = setTimeout(() => {
      fetchData();
    }, 300); // Adjust the delay time as needed

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  return (
    <div  className=" max-w-xl  items-center justify-center relative  ">
      <Input
      className=" bg-white"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {searchResults.map((result) => (

          <div key={result._id} className=" w-full bg-white text-slate-500">
          
            <Label>{result.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
