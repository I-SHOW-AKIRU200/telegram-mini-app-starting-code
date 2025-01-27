"use client";
import { fetchBanners } from "@/lib/database/fetch-user";
import { bannerState } from "@/states/banner-state";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useRecoilState } from "recoil";

interface Banner {
  logo: string;
  link: string;
}

const AdvertSlider = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [banners, setBanners] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const [bannerData, setBannerData] = useRecoilState<any>(bannerState);

  const fetchData = async () => {};

  useEffect(() => {}, []);

  if (error) return;

  if (loading)
    return (
      <div className="w-full px-3">
        <div className="skeleton h-[70px] w-full"></div>
      </div>
    );

  return (
    <div className="px-3 rounded-xl ">
      <Marquee
        direction="right"
        speed={50}
        pauseOnHover
        className="rounded-xl"
      ></Marquee>

      <div className="text-center">
        <a className="underline text-blue-500 mx-auto text-[9px]">
          Advertise with us
        </a>
      </div>
    </div>
  );
};

export default AdvertSlider;
