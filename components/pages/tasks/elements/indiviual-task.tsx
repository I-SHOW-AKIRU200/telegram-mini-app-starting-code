import { updatePoints } from "@/lib/database/update-data";
import { GameData, UserData } from "@/lib/types/user-types";
import { gameState, tasksState, userState } from "@/states/user-state";
import {
  CheckCircle,
  InsertLink,
  Telegram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { useState } from "react";
import { useRecoilState } from "recoil";

const IndividualTask = ({ task }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userData] = useRecoilState<UserData>(userState);
  const [gameData, setGameData] = useRecoilState<GameData>(gameState);
  const [tasksData, setTasksData] = useRecoilState<any>(tasksState);

  const updateUserPoints = async (newPoints: number) => {
    try {
      const response = await updatePoints(newPoints, userData.firebase_id);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyTask = async (task: any) => {
    setLoading(true);

    try {
      const response = await fetch("/api/tasks-confirmation/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: task, telegramId: userData.telegram_id }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const { isMember, error } = await response.json();

      if (error) {
        throw new Error("Unable to complete confirmation");
      }

      // now we need to update the points
      setGameData((prevState) => {
        const updatedPoints = (prevState.usersPoints || 0) + (task.points || 0);
        const newboostXg = (prevState.boostXG || 0) + 0.1;
        const newprofitPerHour =
          (prevState.profitPerHour || 0) + (task.points || 0);

        updateUserPoints(updatedPoints);

        return {
          ...prevState,
          profitPerHour: newprofitPerHour,
          boostXG: newboostXg,
          usersPoints: updatedPoints,
        };
      });

      alert("Tasks completed");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(task.id);
  console.log(tasksData.tasks);
  const isTaskCompleted = tasksData.tasks.includes(task.id);

  console.log(isTaskCompleted);

  return (
    <>
      <div
        className="flex flex-row p-2 gap-3 bg-gray-800 rounded-lg mb-5"
        key={task.id}
      >
        <span className="flex-3">
          <img
            src="https://png.pngtree.com/png-clipart/20230804/original/pngtree-dollar-gold-coins-image-png-image_9418049.png"
            alt="Dollar Coin"
            className="w-8 mx-auto"
          />

          <div className="text-sm italic font-bold">+ {task.points}</div>
        </span>

        <span className="flex-1 my-auto">
          <h1 className="text-md font-light line-clamp-1">
            {task.title}

            {task.type == "r1" && <YouTube className="text-red-600" />}
            {task.type == "r2" && <Twitter className="text-blue-600" />}
            {task.type == "r3" && <Telegram className="text-blue-600" />}
          </h1>
          <a
            href={task.link}
            className="underline text-sm text-blue-400 truncate hover:cursor-pointer"
          >
            <InsertLink />{" "}
            {typeof task.link === "string" ? task.link.substring(0, 20) : ""}
          </a>
        </span>

        <span className="flex-3 my-auto">
          <button
            className={`btn btn-sm ${
              isTaskCompleted ? "btn-success" : "btn-active"
            }`}
            onClick={() => !isTaskCompleted && verifyTask(task)}
            disabled={isTaskCompleted}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <CheckCircle />
            )}
            {isTaskCompleted ? "Already completed" : "Done"}
          </button>
        </span>
      </div>
    </>
  );
};

export default IndividualTask;
