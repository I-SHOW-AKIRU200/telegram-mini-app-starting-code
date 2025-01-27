"use client";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Coins, CheckSquare, Zap, TrendingUp } from "lucide-react";
import { gameState, tasksState } from "@/states/user-state";
import { GameData } from "@/lib/types/user-types";
import { levelImages } from "@/lib/validations/levels";
import AdvertSlider from "@/components/elements/advert-slider";

const HomeComponent = () => {
  const [gameData, setGameData] = useRecoilState(gameState);
  const [tasksData, setTasksData] = useRecoilState(tasksState);
  const [clicks, setClicks] = useState([]);
  const [isGlowing, setIsGlowing] = useState(false);

  const handleCardClick = (e: any) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Add ripple effect
    setClicks([
      ...clicks,
      {
        id: Date.now(),
        x: e.pageX,
        y: e.pageY,
        value: gameData.pointsToAdd,
      },
    ]);

    // Add 3D rotation effect
    card.style.transform = `perspective(1000px) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = "";
    }, 100);

    // Update points
    setGameData((prev) => ({
      ...prev,
      usersPoints: prev.usersPoints + prev.pointsToAdd,
    }));

    // Trigger glow effect
    setIsGlowing(true);
    setTimeout(() => setIsGlowing(false), 300);
  };

  const handleAnimationEnd = (id: any) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  return (
    <>
      <AdvertSlider />

      {/* Points Display with Animation */}

      {/* Main Character Image with Glow Effect */}

      {/* Stats Cards with Animations */}

      {/* Floating Points Animation */}
      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-3xl font-bold text-yellow-300 pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: "float 1s ease-out, fade 1s ease-out",
            opacity: 0,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          +{click.value}
        </div>
      ))}

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-50px) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes fade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default HomeComponent;
