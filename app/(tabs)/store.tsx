import MainHeader from "@/components/header/MainHeader";
import CategoryPicker from "@/components/page/store/CategoryPicker";
import StoreFigureCard from "@/components/page/store/StoreFigureCard";
import PageTitle from "@/components/title/PageTitle";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function TabTwoScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    console.log("Selected Category", selectedCategory);
  }, [selectedCategory]);
  return (
    <View className="w-full h-full bg-black flex justify-start items-center">
      {/* Header */}
      <View className="w-full h-[11%] flex-row justify-center">
        <MainHeader />
      </View>

      {/* Title */}
      <View className="w-full h-[11%] flex items-center">
        <PageTitle title={"Store"} subTitle={"Choose your motivator"} />
      </View>

      {/* Category Picker */}
      <View className="w-full h-[6%] pl-[5%] py-[2%]">
        <CategoryPicker
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </View>

      {/* Content */}
      <View className="w-[92%] h-full pt-3 flex-row justify-between">
        <StoreFigureCard name="Napoleon Bonaparte" desc="Emperor" />
        <StoreFigureCard name="Napoleon Bonaparte" desc="Emperor" />
      </View>
    </View>
  );
}
