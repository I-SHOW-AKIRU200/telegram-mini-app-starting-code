"use client";
import { GameData, UserData } from "@/lib/types/user-types";
import { gameState, userState } from "@/states/user-state";
import { useRecoilState } from "recoil";
import AdvertSlider from "@/components/elements/advert-slider";
import { useEffect, useState } from "react";
import {
  fetchReferredUsersNo,
  updateReferralId,
} from "@/lib/database/fetch-user";
import ReferralLinkComponent from "./elements/referral-link";
import { useSearchParams } from "next/navigation";

const DashboardComponent = () => {
  const [gameData] = useRecoilState<GameData>(gameState);
  const [userData] = useRecoilState<UserData>(userState);
  const [usersReferred, setUsersReferred] = useState<number>(1);
  const searchParams = useSearchParams();

  const fetchReferredUsers = async () => {};

  useEffect(() => {}, []);

  return (
    <div className="text-white px-2">
      {/* Advert Image  */}
      <AdvertSlider />
    </div>
  );
};

export default DashboardComponent;
