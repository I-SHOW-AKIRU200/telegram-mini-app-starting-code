"use client";
import { GameData, UserData } from "@/lib/types/user-types";
import { gameState, userState } from "@/states/user-state";
import { useRecoilState } from "recoil";
import AdvertSlider from "@/components/elements/advert-slider";
import { useEffect, useState } from "react";
import { fetchReferredUsersNo, updateReferralId } from "@/lib/database/fetch-user";
import ReferralLinkComponent from "./elements/referral-link";
import { useSearchParams } from "next/navigation";

const DashboardComponent = () => {
  const [gameData] = useRecoilState<GameData>(gameState);
  const [userData] = useRecoilState<UserData>(userState);
  const [usersReferred, setUsersReferred] = useState<number>(1);
  const searchParams = useSearchParams();

  const fetchReferredUsers = async () => {
    try {
      const number: number = await fetchReferredUsersNo(userData.firebase_id);
      setUsersReferred(number);
    } catch (error) {
      console.log("Error in fetching referral number: ", error);
    }
  };

  useEffect(() => {
    fetchReferredUsers();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const handleReferral = async () => {
      try {
        const referralId = searchParams.get("referralId");
        if (!referralId || !userData?.firebase_id || !isMounted) return;

        const response = await updateReferralId(
          referralId,
          userData.firebase_id
        );
        if (isMounted) {
          console.log("Referral update response:", response);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error storing referral ID:", error);
        }
      }
    };

    handleReferral();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array with cleanup

  return (
    <div className="text-white px-2">
      {/* Advert Image  */}
      <AdvertSlider />

      <div className="flex flex-col gap-4 mx-5 mt-2">
        <div className="stats shadow flex-1">
          <div className="stat">
            <div className="stat-title">Total Points Earned</div>
            <div className="stat-value">{gameData.usersPoints}</div>
            <div className="stat-desc">Earn by completing tasks</div>
          </div>
        </div>
        <div className="stats shadow flex-1">
          <div className="stat">
            <div className="stat-title">Users Referred</div>
            <div className="stat-value">{usersReferred}</div>
            <div className="stat-desc">Share Game with friends</div>
          </div>
        </div>
      </div>

      <div className="py-5"></div>
      <ReferralLinkComponent referralId={userData.firebase_id} />

      {/* <div className="text-center my-5">
        <h1 className="text-xl">
          <img
            src="https://png.pngtree.com/png-clipart/20230804/original/pngtree-dollar-gold-coins-image-png-image_9418049.png"
            alt="Dollar Coin"
            className="w-12 mx-auto"
          />
          Earn Points
        </h1>

        <p className="text-sm">
          Earn Extra Points by referring your friends
          <br />
          and giving them ur ID
        </p>
      </div>

      <SetReferral /> */}
    </div>
  );
};

export default DashboardComponent;
