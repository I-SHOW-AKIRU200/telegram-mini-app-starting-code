"use client";
import { useEffect, useState } from "react";

const Rankings = () => {
  const [users, setUsers] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTopUsers = async () => {
    const response = await fetchTopUsers();
    setUsers(response);
    setLoading(false);
  };

  useEffect(() => {}, []);

  return <div className="mx-3">Ranking of all top 20 users</div>;
};

export default Rankings;
