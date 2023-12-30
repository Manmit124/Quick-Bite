import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

const Addressinput = ({ addressProps, setadressProps,disabled=false }) => {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  return (
    <>
      <div className="mb-4">
        <Label className="block leading-normal text-muted-foreground  sm:leading-7 mb-2">Phone</Label>
        <Input
        disabled={disabled}
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setadressProps("phone", e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <Label className="block leading-normal text-muted-foreground  sm:leading-7 mb-2">Street Address</Label>
        <Input
        disabled={disabled}
          type="text"
          placeholder="Enter your street address"
          value={streetAddress}
          onChange={(e) => setadressProps("streetAddress", e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <Label className="block leading-normal text-muted-foreground  sm:leading-7 mb-2">Postal Code</Label>
          <Input
            disabled={disabled}
            placeholder="Enter your postal code"
            value={postalCode}
            onChange={(e) => setadressProps("postalCode", e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <Label className="block leading-normal text-muted-foreground  sm:leading-7 mb-2">City</Label>
          <Input
            disabled={disabled}
          value={city}
            onChange={(e) => setadressProps('city', e.target.value)}
            placeholder="Enter your city"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="mb-4">
        <Label className="block leading-normal text-muted-foreground  sm:leading-7 mb-2">Country</Label>
        {/* <Input
         value={country}
          onChange={(e) => setadressProps('country', e.target.value)}
          placeholder="Enter your country"
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
        /> */}
        <Select   disabled={disabled}>
        <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={country} />
      </SelectTrigger>
      <SelectContent>
      <SelectGroup>
          <SelectLabel>select country</SelectLabel>
          <SelectItem value="India" onClick={() => setadressProps('country', 'India')}>
                India
              </SelectItem>
              <SelectItem value="Bangladesh" onClick={() => setadressProps('country', 'Bangladesh')}>
                Bangladesh
              </SelectItem>
              <SelectItem value="USA" onClick={() => setadressProps('country', 'USA')}>
                USA
              </SelectItem>
              <SelectItem value="Nepal" onClick={() => setadressProps('country', 'Nepal')}>
                Nepal
              </SelectItem>
              <SelectItem value="Japan" onClick={() => setadressProps('country', 'Japan')}>
                Japan
              </SelectItem>
        </SelectGroup>
      </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default Addressinput;
