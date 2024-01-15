"use client";
import UserItem from "@/app/component/layout/UserItem";
import Userprofile from "@/app/hook/userprofile";

import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { loading, data } = Userprofile();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const fetchedUsers = await response?.json();
    setUsers(fetchedUsers);
  };

  // const handleDeleteClick = async (userId) => {
  //   if(typeof window !== 'undefined'){

  //     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  //     if (confirmDelete) {
  //       const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });
  //       if (response.ok) {
  //         fetchUsers();
  //       } else {
  //         alert("Failed to delete user");
  //       }
  //     }
  //   }
  // };
  const handleDeleteClick = async (userId) => {
    if (typeof window !== "undefined") {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        try {
          const response = await fetch(`/api/users/${userId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            // User deleted successfully, fetch updated user list
            await fetchUsers();
          } else {
            // Failed to delete user, handle error
            const errorData = await response.json();
            alert(`Failed to delete user: ${errorData.message}`);
          }
        } catch (error) {
          // Network or other unexpected error, handle gracefully
          console.error("Error deleting user:", error);
          alert("An unexpected error occurred while deleting user.");
        }
      }
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mt-5 p-2">
      <div className="py-5 mx-auto text-center flex flex-col items-center ">
        <h1 className="text-3xl font-bold sm:text-6xl my-3">Hellow Users</h1>
        {users &&
          users?.map((user) => (
            <UserItem
              key={user?._id}
              user={user}
              onDeleteClick={handleDeleteClick}
            />
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
export const dynamic = "force-dynamic";
