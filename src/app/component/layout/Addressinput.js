import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const Addressinput = () => {
  return (
   <>
     <div className="mb-4">
        <Label className="block text-gray-700 mb-2">Phone</Label>
        <Input type="tel" placeholder="Enter your phone number" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <Label className="block text-gray-700 mb-2">Street Address</Label>
        <Input type="text" placeholder="Enter your street address" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <Label className="block text-gray-700 mb-2">Postal Code</Label>
          <Input placeholder="Enter your postal code" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <Label className="block text-gray-700 mb-2">City</Label>
          <Input placeholder="Enter your city" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
      </div>
      <div className="mb-4">
        <Label className="block text-gray-700 mb-2">Country</Label>
        <Input placeholder="Enter your country" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500" />
      </div>
   </>
  )
}

export default Addressinput
