import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AdProvider } from "@/contexts/AdContext/AdProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PostHogProvider } from "posthog-react-native";
import { useEffect } from "react";
import mobileAds from "react-native-google-mobile-ads";

export default function RootLayout() {
  useEffect(() => {
    mobileAds()
      .initialize()
      .then(() => {
        console.log("AdMob 초기화 완료");
      });
  }, []);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Thin: require("../assets/fonts/Montserrat-Thin.ttf"),
    ExtraLight: require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    Light: require("../assets/fonts/Montserrat-Light.ttf"),
    Regular: require("../assets/fonts/Montserrat-Regular.ttf"),
    Medium: require("../assets/fonts/Montserrat-Medium.ttf"),
    SemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    Bold: require("../assets/fonts/Montserrat-Bold.ttf"),
    ExtraBold: require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    Black: require("../assets/fonts/Montserrat-Black.ttf"),
    QuoteRegular: require("../assets/fonts/Lora-Regular.ttf"),
    QuoteMedium: require("../assets/fonts/Lora-Medium.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PostHogProvider
      apiKey="phc_6it7ht8RBq9N6TvoDSeRTSMazrZ3KeqSxQXz3CWQqYV"
      options={{
        host: "https://us.i.posthog.com",
      }}
    >
      <AdProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen
              name="notification"
              options={{ headerShown: false }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </AdProvider>
    </PostHogProvider>
  );
}
