"use client";
import { userState } from "@/states/user-state";
import React from "react";
import { useRecoilState } from "recoil";
import { UserData } from "@/lib/types/user-types";

const GameScreenComponent = () => {
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  console.log("goat", userData);
  console.log("goat");
  return <div>fishes</div>;
};

export default GameScreenComponent;
