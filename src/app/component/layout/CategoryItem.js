import React from 'react'
import { Edit, Trash2 } from "lucide-react";
const CategoryItem = ({ category, onEdit, onDelete }) => {
  return (
    <div className="bg-slate-100 w-full p-4 my-2 rounded-md cursor-pointer hover:bg-slate-200 transition duration-300 shadow-lg hover:scale-105 justify-between flex">
    <span className="text-gray-800 font-medium hover:text-lg">{category.name}</span>
    <div className="flex gap-2">
      <Edit onClick={onEdit} className="hover:text-blue-500" />
      <Trash2 onClick={onDelete} className="hover:text-red-500" />
    </div>
  </div>
  )
}

export default CategoryItem
