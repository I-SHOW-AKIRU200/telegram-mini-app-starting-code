"use client";

import { useEffect, useState } from "react";

import {
  calculateUserLevel,
  levelMinPoints,
  levelNames,
} from "@/lib/validations/levels";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InfoIcon from "@mui/icons-material/Info";
import SavingsIcon from "@mui/icons-material/Savings";

import { useRecoilState } from "recoil";
import { GameData, UserData } from "@/lib/types/user-types";
import { gameState, tasksState, userState } from "@/states/user-state";
import { RocketLaunch } from "@mui/icons-material";
import { updatePoints } from "@/lib/database/update-data";

const TopBar = () => {
  const [gameData, setGameData] = useRecoilState<GameData>(gameState);
  const [userData] = useRecoilState<UserData>(userState);
  const [tasksData, setTasksData] = useRecoilState<any>(tasksState);
  const points = gameData.usersPoints;
  const levelIndex = gameData.levelIndex;

  const updateUserPoints = async (newPoints: number) => {
    try {
      const response = await updatePoints(newPoints, userData.firebase_id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const profitPerHour = gameData.profitPerHour * gameData.boostXG;

    if (profitPerHour <= 0) return;
    if (userData.loading) return;

    const pointsPerTwoMinutes = Math.ceil(profitPerHour / 30);
   
    const interval = setInterval(() => {
      setGameData((prevState) => {
        const updatedPoints = prevState.usersPoints + pointsPerTwoMinutes;
        console.log(updatedPoints);

        updateUserPoints(updatedPoints);

        return {
          ...prevState,
          usersPoints: updatedPoints,
        };
      });
    }, 120000);

    return () => clearInterval(interval);
  }, [gameData.profitPerHour, gameData.boostXG, userData.loading]);

  useEffect(() => {
    const newLevelIndex = calculateUserLevel(points);
    setGameData((prevState) => ({
      ...prevState,
      ["levelIndex"]: newLevelIndex,
    }));
  }, [points]);

  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress =
      ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;

    return Math.min(progress, 100);
  };

  return (
    <div className="p-2 text-white">
      {/* Top Bar */}
      <div className="px-2 z-10">
        <div className="flex items-center space-x-2 pt-4">
          <div className="p-1 rounded-md bg-gray-800">
            <SavingsIcon />
          </div>
          <div>
            <p className="text-md font-medium">
              {userData.telegram_username} (CEO)
            </p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between space-x-4 mt-1">
        <div className="flex items=center w-1/2">
          <div className="w-full">
            <div className="flex justify-between">
              <p className="text-md">{levelNames[levelIndex]}</p>
              <p className="text-md">
                {levelIndex + 1}

                <span className="text-[#95908a]">/ {levelNames.length}</span>
              </p>
            </div>

            <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
              <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                <div
                  className="progress-gradient h-2 rounded-full"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center w-1/2 border-2 border-[#43433b] rounded-md px-2 py-[2px] bg-[#43433b]/[0.6] max-w-64">
          <span className="text-center">
            <RocketLaunch className="text-sm" />
            <br />
            <small>Boost</small>
          </span>

          <div className="flex-1 text-center space-y-1">
            <p className="text-xs text-[#85827d] font-medium">
              Profit per hour
            </p>

            <div className="flex items-center justify-center space-x-1">
              <MonetizationOnIcon />
              <p className="text-[9px]">
                +{gameData.profitPerHour}
              </p>
              <InfoIcon className="text-[#43433b]" />
            </div>
          </div>
        </div>
      </div>
      {/* End of Progress div */}
    </div>
  );
};

export default TopBar;
