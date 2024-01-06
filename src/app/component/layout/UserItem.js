// components/UserItem.js
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserItem = React.memo(({ user, onDeleteClick }) => (
  <div key={user._id} className="bg-lime-300 max-w-2xl w-full p-4 my-2 rounded-md cursor-pointer hover:bg-lime-500 transition duration-300 shadow-lg hover:scale-105 justify-between flex" variant="outline">
    <div className="flex">
      <span className="text-gray-800 font-medium hover:text-lg italic">
        {user.name}
      </span>
      <span className="text-gray-800 font-medium hover:text-lg gap-2 pl-3 opacity-50 truncate">
        {user.email}
      </span>
    </div>
    <div className="flex gap-2 flex-col lg:flex-row">
      <Link href={`/users/${user._id}`}>
        <Edit className="hover:text-blue-500" />
      </Link>
      <Trash2 onClick={() => onDeleteClick(user._id)} className="hover:text-red-500" />
    </div>
  </div>
));

export default UserItem;
