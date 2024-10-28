import { atom } from "recoil";

export const bannerState = atom<any>({
  key: "bannerData",
  default: {
    banner: null,
    loading: true,
  },
});
