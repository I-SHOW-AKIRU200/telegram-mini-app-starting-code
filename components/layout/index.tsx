"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
import dynamic from "next/dynamic"; // import dynamic from Next.js

// import WebApp from "@twa-dev/sdk";
import { gameState, tasksState, userState } from "@/states/user-state";
import { GameData, UserData, UserStatusResponse } from "@/lib/types/user-types";
import LoadingSpinnerBackground from "@/components/elements/loading-spinner-background";
import { ReactNode } from "react";
import TopBar from "./top-bar";
import BottomBar from "./bottom-bar";
import ErrorComponent from "../elements/error-component";

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  const [gameData, setGameData] = useRecoilState<GameData>(gameState);
  const [tasksData, setTasksData] = useRecoilState<any>(tasksState);

  const verifyUser = async (
    userId: number,
    first_name: string,
    last_name: string | undefined,
    username: string | undefined
  ) => {};

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;

    // fetch game details
    const fetchGameDetails = async (firebaseId: string) => {};

    // initialize user
    const initializeUser = async () => {};

    return () => {
      isMounted = false;
    };
  }, []);

  // set loading spinner

  // set error handler

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      <div className="mt-4 bg-[#00ff00] rounded-t-[48px] relative top-glow z-0 pt-1">
        <div className="flex flex-col min-h-[90dvh] bg-[#1d2025] rounded-t-[46px] py-5 flex-grow">
          {children}
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

// Wrap component with dynamic and disable SSR
export default dynamic(() => Promise.resolve(LayoutWrapper), { ssr: false });
