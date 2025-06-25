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
    sports: { id: 4, title: "Sports" },
    politics: { id: 5, title: "Politics" },
    literature: { id: 6, title: "Literature" },
    christianity: { id: 7, title: "Christianity" },
    science: { id: 8, title: "Science" },
    history: { id: 9, title: "History" },
  };

  return (
    <View className="w-full h-full">
      <ScrollView
        className="w-full h-full"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {Object.entries(category).map(([key, item]) => {
          const isSelected = selectedCategory === key;
          return (
            <Pressable
              key={item.id}
              onPress={() => setSelectedCategory(key)}
              className={`px-3 h-full w-fit border-2 border-[#483D90] items-center justify-center rounded-lg mr-[6px] ${
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
