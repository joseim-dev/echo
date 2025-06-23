// constants/adIds.ts

import { Platform } from "react-native";
import { TestIds } from "react-native-google-mobile-ads";

export const ChannelAddRewardedAdId = __DEV__
  ? TestIds.REWARDED
  : Platform.OS === "ios"
    ? "ca-app-pub-7270360511167481~2820892385"
    : "ca-app-pub-7270360511167481~8815455094";

export const AppOpenAdId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS === "ios"
    ? "ca-app-pub-7270360511167481~2820892385"
    : "ca-app-pub-7270360511167481~8815455094";
