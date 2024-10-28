import { userState } from "@/states/user-state";
import React from "react";
import { useRecoilState } from "recoil";

const Dashboard = () => {
  const [userData, setUserData] = useRecoilState<any>(userState);
  console.log(userData);
  return <div>Dashboard</div>;
};

export default Dashboard;
