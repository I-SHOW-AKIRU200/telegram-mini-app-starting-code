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

  const fetchTasks = async () => {};

  useEffect(() => {}, []);

  return <div className="px-4 text-white"></div>;
};

export default EarnComponent;
