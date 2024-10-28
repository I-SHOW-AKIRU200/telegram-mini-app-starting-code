"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import WebApp from "@twa-dev/sdk";
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
  ) => {
    try {
      const response = await fetch("/api/users/user-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, first_name, last_name, username }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const { userExists, message }: UserStatusResponse = await response.json();

      if (!userExists) {
        throw new Error("Unable to find or create user");
      }

      return userExists;
    } catch (error) {
      console.error("Error verifying user:", error);
      setError("Failed to verify user");
      return null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchGameDetails = async (firebaseId: string) => {
      try {
        const response = await fetch("/api/fetch/user-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firebaseId }),
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const { data, error } = await response.json();

        if (error) {
          throw new Error("Unable to fetch user game details");
        }

        // set game data
        setGameData({
          pointsToAdd: 11,
          profitPerHour: 5000,
          usersPoints: data.points,
          levelIndex: 0,
          boostXG: data.boostXG,
          referredUserId: data.referredUserId,
        });

        setTasksData({
          tasks: data.tasksCompletedIds,
          tasksCompleted: data.taskCompleted,
        });
      } catch (error: any) {
        console.log(error);
        setError(error);
      }
    };

    const initializeUser = async () => {
      try {
        const user = WebApp.initDataUnsafe?.user;

        if (!user) throw new Error("Unable to fetch user data from Telegram");

        if (isMounted) {
          const firebaseUserId = await verifyUser(
            user.id,
            user.first_name,
            user.last_name,
            user.username
          );

          if (!firebaseUserId) {
            throw new Error("User not found in the system");
            return;
          }

          await fetchGameDetails(firebaseUserId);

          setUserData({
            telegram_id: user.id,
            telegram_username: user.username ?? null,
            first_name: user.first_name ?? null,
            last_name: user.last_name ?? null,
            is_premium: user.is_premium ?? null,
            firebase_id: firebaseUserId,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Error during user initialization:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      }
    };

     initializeUser();

    // setLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinnerBackground />;
  }

  if (error || !userData.telegram_id) {
    return <ErrorComponent />;
  }

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

export default LayoutWrapper;
