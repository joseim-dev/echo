// constants/adIds.ts

import { Platform } from "react-native";
import { TestIds } from "react-native-google-mobile-ads";

export const ChannelAddRewardedAdId = __DEV__
  ? TestIds.REWARDED
  : Platform.OS === "ios"
    ? "ca-app-pub-7270360511167481/7893233589"
    : "ca-app-pub-7270360511167481/5267070243";

export const AppOpenAdId = __DEV__
  ? TestIds.APP_OPEN
  : Platform.OS === "ios"
    ? "ca-app-pub-7270360511167481/7049821559"
    : "ca-app-pub-7270360511167481/5822168668";
