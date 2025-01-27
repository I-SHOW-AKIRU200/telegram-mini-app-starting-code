"use client";

import { fetchTopUsers } from "@/lib/database/fetch-user";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  points: number;
}

const Rankings = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {};

  useEffect(() => {}, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">No users found</div>
      </div>
    );
  }

  return <div className="mx-3 my-6"></div>;
};

export default Rankings;
