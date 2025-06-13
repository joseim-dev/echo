import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#7765EC",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
            backgroundColor: "black",
          },
          default: { backgroundColor: "black" },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={27} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "store",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="bag-handle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
