"use client";
import { GameData, UserData } from "@/lib/types/user-types";
import { atom } from "recoil";

// export const userState = atom<UserData>({
//   key: "userData",
//   default: {
//     telegram_id: null,
//     telegram_username: null,
//     first_name: null,
//     last_name: null,
//     is_premium: null,
//     firebase_id: null,
//     loading: false,
//   },
// });

// export const gameState = atom<GameData>({
//   key: "gameData",
//   default: {
//     pointsToAdd: 11,
//     profitPerHour: 5000,
//     usersPoints: 0,
//     levelIndex: 0,
//     boostXG: 1,
//     referredUserId: "",
//   },
// });

// export const tasksState = atom<any>({
//   key: "tasksData",
//   default: {
//     game_tasks: [],
//     tasks: [],
//     tasksCompeleted: 0,
//   },
// });

export const userState = atom<UserData>({
  key: "userData",
  default: {
    telegram_id: 622872171,
    telegram_username: "YT_coder",
    first_name: null,
    last_name: null,
    is_premium: true,
    firebase_id: "N9yXovN5ewoafY9PEkK0",
    loading: false,
  },
});

export const gameState = atom<GameData>({
  key: "gameData",
  default: {
    pointsToAdd: 11,
    profitPerHour: 5000,
    usersPoints: 0,
    levelIndex: 0,
    boostXG: 1,
    referredUserId: "",
  },
});

export const tasksState = atom<any>({
  key: "tasksData",
  default: {
    game_tasks: [],
    tasks: ["BhQ05TcRaXboirkVnYRe", "hcoTHVGjMOe0BJz00YzF"],
    tasksCompeleted: 0,
  },
});
