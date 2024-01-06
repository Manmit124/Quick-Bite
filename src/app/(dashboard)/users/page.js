"use client";
import UserItem from "@/app/component/layout/UserItem";
import userprofile from "@/app/hook/userprofile";
import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const { loading, data } = userprofile();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const fetchedUsers = await response.json();
    setUsers(fetchedUsers);
  };

  const handleDeleteClick = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const response = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      if (response.ok) {
        fetchUsers();
      } else {
        alert("Failed to delete user");
      }
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mt-5 p-2">
    <div className="py-5 mx-auto text-center flex flex-col items-center ">
        <h1 className="text-3xl font-bold sm:text-6xl my-3">
          Hellow Users
        </h1>
          {users?.map((user) => (
            <UserItem key={user._id} user={user} onDeleteClick={handleDeleteClick} />
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
