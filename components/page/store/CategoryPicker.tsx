import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function CategoryPicker({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {
  const category = {
    all: { id: 1, title: "All" },
    art: { id: 2, title: "Art" },
    philosophy: { id: 3, title: "Philosophy" },
    religion: { id: 4, title: "Religion" },
    war: { id: 5, title: "War" },
    nobelPrize: { id: 6, title: "Nobel Prize" },
    music: { id: 7, title: "Grammy" },
    pulitzer: { id: 8, title: "Pulitzer" },
  };

  return (
    <View className="w-full h-full">
      <ScrollView className="w-full h-full" horizontal={true}>
        {Object.entries(category).map(([key, item]) => {
          const isSelected = selectedCategory === key;
          return (
            <Pressable
              key={item.id}
              onPress={() => setSelectedCategory(key)}
              className={`px-3 h-fit w-fit border-2 border-[#483D90] justify-center rounded-lg mr-[6px] ${
                isSelected ? "bg-[#7765EC]" : "bg-transparent"
              }`}
            >
              <Text className="font-[Medium] text-white">{item.title}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
