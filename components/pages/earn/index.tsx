"use client";
import { tasksState } from "@/states/user-state";
import { Cached } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import IndividualTask from "../tasks/elements/indiviual-task";

const EarnComponent = () => {
  const [tasksData, setTasksData] = useRecoilState<any>(tasksState);
  const [loading, setLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Array<any>>(tasksData.tasks);
  const [error, setError] = useState<boolean>(false);

  const fetchTasks = async () => {
    console.log(tasksData);
    if (tasksData.game_tasks.length == 0) {
      try {
        const response = await fetch(`/api/fetch/tasks`);

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const { data, error } = await response.json();

        if (error) {
          throw new Error("Unable to fetch data from API route");
        }
        setTasks(data);
        setTasksData((prevState: any) => ({
          ...prevState,
          ["game_tasks"]: data,
        }));
      } catch (error) {
        console.log("MiniStat Error: ", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60dvh] flex-col gap-4">
        <div className="text-center">Oops Something went wrong</div>

        <button
          className="btn btn-warning btn-sm"
          onClick={() => window.location.reload()}
        >
          Reload
          <Cached />
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 text-white">
      <div className="text-center my-5">
        <h1 className="text-xl">
          <img
            src="https://png.pngtree.com/png-clipart/20230804/original/pngtree-dollar-gold-coins-image-png-image_9418049.png"
            alt="Dollar Coin"
            className="w-12 mx-auto"
          />
          Earn Points
        </h1>

        <p className="text-sm">Earn Extra Points by completing tasks</p>
      </div>

      {loading ? (
        <div className="mx-auto text-center">
          <progress className="progress w-56"></progress>
        </div>
      ) : (
        <>
          {tasks.map((task) => (
            <IndividualTask task={task} key={task.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default EarnComponent;
