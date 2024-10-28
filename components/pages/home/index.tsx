"use client";

import { GameData } from "@/lib/types/user-types";
import { gameState, tasksState } from "@/states/user-state";
import { useState } from "react";
import { useRecoilState } from "recoil";
import AdvertSlider from "@/components/elements/advert-slider";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TaskIcon from "@mui/icons-material/Task";
import { levelImages } from "@/lib/validations/levels";

const HomeComponent = () => {
  const [gameData, setGameData] = useRecoilState<GameData>(gameState);
  const [tasksData, setTasksData] = useRecoilState<any>(tasksState);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  const pointsToAdd = gameData.pointsToAdd;
  const profitPerHour = gameData.profitPerHour;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = "";
    }, 100);

    setGameData((prevState) => ({
      ...prevState,
      ["usersPoints"]: gameData.usersPoints + gameData.pointsToAdd,
    }));
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id != id));
  };

  return (
    <>
      <AdvertSlider />

      <div className="px-4 mt-2 flex justify-center">
        <div className="px-4 flex items-center space-x-2 rounded-xl shadow-lg shadow-green-800">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/020/696/236/small/3d-glossy-dollar-coin-golden-reflective-dollar-coin-3d-illustration-png.png"
            alt="Dollar Coin"
            className="w-10 h-10"
          />

          <p className="text-2xl text-white font-mono">
            {gameData.usersPoints.toLocaleString()}
          </p>
        </div>
      </div>

      {/* <div className="px-4 mt-4 flex justify-center">
        <div
          className="w-40 h-40 p-4 rounded-full circle-outer"
          onClick={handleCardClick}
        >
          <div className="w-full h-full rounded-full circle-inner">
            <img
              src={levelImages[gameData.levelIndex]}
              alt="Main Character"
              className="w-40 h-40 rounded-full"
            />
          </div>
        </div>
      </div> */}

      <div
        className="w-[90%] h-full px-2 rounded-full mx-auto"
        onClick={handleCardClick}
      >
        <img
          src={levelImages[gameData.levelIndex]}
          alt="Main Character"
          className="w-full h-full rounded-full mx-auto"
        />
      </div>

      <div className="flex flex-row gap-3 px-2">
        <div className="flex flex-col text-center shadow-sm shadow-green-700 w-1/3 rounded-xl my-auto text-sm py-2">
          <span className="text-orange-400">Earn per tap</span>
          <span className="text-white">
            <MonetizationOnIcon className="text-sm text-orange-400" />
            {gameData.pointsToAdd}
          </span>
        </div>
        <div className="flex flex-col text-center shadow-sm shadow-green-700 w-1/3 rounded-xl my-auto text-sm py-2">
          <span className="text-blue-400 text-[10px]">Tasks Completed</span>
          <span className="text-white">
            <TaskIcon className="text-blue-400" />
            {tasksData.tasksCompleted}
          </span>
        </div>
        <div className="flex flex-col text-center shadow-sm shadow-green-700 w-1/3 rounded-xl my-auto text-sm py-2">
          <span className="text-sm text-purple-400">Boost XG</span>
          <span className="text-white">x{gameData.boostXG}</span>
        </div>
      </div>

      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-white pointer-events-none overflow-hidden"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))}
    </>
  );
};

export default HomeComponent;
