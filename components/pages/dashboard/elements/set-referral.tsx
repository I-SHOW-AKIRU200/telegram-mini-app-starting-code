"use client";

import { updateReferralId } from "@/lib/database/fetch-user";
import { GameData, UserData } from "@/lib/types/user-types";
import { gameState, userState } from "@/states/user-state";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

const SetReferral = () => {
  const [referralId, setReferralId] = useState<string>();
  const [userData] = useRecoilState<UserData>(userState);
  const [gameData, setGameData] = useRecoilState<GameData>(gameState);
  const [isCopied, setIsCopied] = useState(false);

  const submitId = async () => {
    if (!referralId) return;

    let firebaseId = userData.firebase_id;

    let response = await updateReferralId(referralId, firebaseId);

    if (!response) {
      alert("Referral Id not found");
      return;
    }

    setGameData((prevState) => ({
      ...prevState,
      ["referredUserId"]: referralId,
    }));

    alert("Referral Id updated");
  };

  if (gameData.referredUserId) {

  const handleCopy = () => {
    if (userData.firebase_id) {
      // Ensure it's not null
      navigator.clipboard.writeText(userData.firebase_id);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Hide notification after 2 seconds
    } else {
      console.error("No Firebase ID to copy");
    }
  };


    return (
      <div className="text-center mx-5">
        Refer other users with your Reference ID:
        <br />
        <span
          onClick={handleCopy}
          className="cursor-pointer text-blue-500 underline"
        >
          {userData.firebase_id}
        </span>
        {isCopied && (
          <div className="text-green-500 text-sm mt-2">
            Copied to clipboard!
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-3 flex flex-col justify-center">
      <label className="input input-bordered flex items-center gap-2">
        ID:
        <input
          type="text"
          className="grow"
          placeholder="Referral ID"
          onChange={(event) => setReferralId(event.target.value.trim())}
        />
      </label>

      <br />

      <button onClick={submitId} className="btn btn-info btn-sm">
        Connect
      </button>
    </div>
  );
};

export default SetReferral;
