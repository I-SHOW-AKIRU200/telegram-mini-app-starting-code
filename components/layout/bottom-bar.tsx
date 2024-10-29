"use client";

import {
  AccountCircle,
  Diversity3,
  MonetizationOn,
  RocketLaunch,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl bg-[#272a2f] flex justify-around items-center z-50 rounded-3xl text-xs border border-[#00ff00] shadow-xl shadow-[#00ff00]">
        <Link
          href="/"
          className={`text-center text-[#85827d] w-1/5 m-1 p-2 rounded-2xl ${
            pathname === "/" ? "bg-[#1d2025] py-2" : ""
          }`}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/bmc-min-app.appspot.com/o/...utils%2Fstages%2FIMG_2169.PNG?alt=media&token=08cfbf75-0000-4307-90e9-f2ee1007c447"
            alt="Exchange"
            className="w-8 h-8 mx-auto rounded-full"
          />
          <p className="mt-1">Earn</p>
        </Link>

        <Link
          href="/earn"
          className={`text-center text-[#85827d] w-1/5 ${
            pathname === "/earn" ? "bg-[#1d2025] rounded-2xl py-2" : ""
          }`}
        >
          <MonetizationOn />
          <p className="mt-1">Tasks</p>
        </Link>

        <Link
          href="/rankings"
          className={`text-center text-[#85827d] w-1/5 ${
            pathname === "/rankings" ? "bg-[#1d2025] rounded-2xl py-2" : ""
          }`}
        >
          <Diversity3 className="text-green-500" />
          <p className="mt-1 text-green-500">Rankings </p>
        </Link>

        <Link
          href="/airdrop"
          className={`text-center text-[#85827d] w-1/5 ${
            pathname === "/airdrop" ? "bg-[#1d2025] rounded-2xl py-2" : ""
          }`}
        >
          <RocketLaunch />
          <p className="mt-1">Airdrop</p>
        </Link>

        <Link
          href="/dashboard"
          className={`text-center text-[#85827d] w-1/5 ${
            pathname === "/dashboard" ? "bg-[#1d2025] rounded-2xl py-2" : ""
          }`}
        >
          <AccountCircle className="text-blue-400" />
          <p className="mt-1 text-blue-400">Profile</p>
        </Link>
      </div>
    </>
  );
};

export default BottomBar;
