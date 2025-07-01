import { ChannelAddRewardedAdId } from "@/constants/AdIds";
import React, { useEffect } from "react";
import { useRewardedAd } from "react-native-google-mobile-ads";
import { AdContext } from "./AdContext";

export const AdProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isLoaded: isAdLoaded,
    isClosed: isAdClosed,
    error: adError,
    load: loadAd,
    show: showAd,
    isEarnedReward: isEarnedReward,
  } = useRewardedAd(ChannelAddRewardedAdId, {
    requestNonPersonalizedAdsOnly: true,
  });

  // 광고 최초 로드
  useEffect(() => {
    loadAd();
  }, [loadAd]);

  // 광고가 닫히거나 실패하면 자동 재로드
  useEffect(() => {
    if (isAdClosed) {
      loadAd();
    }
  }, [isAdClosed, loadAd]);

  return (
    <AdContext.Provider
      value={{
        isAdLoaded,
        showAd,
        adError,
        isAdClosed,
        loadAd,
        isEarnedReward,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};
