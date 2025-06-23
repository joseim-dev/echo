import { createContext, useContext } from "react";

type AdContextType = {
  isAdLoaded: boolean;
  showAd: () => void;
  adError: Error | undefined;
  isAdClosed: boolean;
  loadAd: () => void;
};

export const AdContext = createContext<AdContextType | null>(null);

export const useAd = () => {
  const context = useContext(AdContext);
  if (!context) throw new Error("useAd must be used within AdProvider");
  return context;
};
