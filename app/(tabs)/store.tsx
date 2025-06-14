import MainHeader from "@/components/header/MainHeader";
import CategoryPicker from "@/components/page/store/CategoryPicker";
import StoreFigureCard from "@/components/page/store/StoreFigureCard";
import PageTitle from "@/components/title/PageTitle";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const mockFigures = [
  {
    id: "1",
    name: "Napoleon Bonaparte",
    desc: "Emperor",
    imgUrl: require("@/assets/images/figures/history-napoleon.png"),
  },
  {
    id: "2",
    name: "Kanye West",
    desc: "Physicist",
    imgUrl: require("@/assets/images/figures/music-kanye.png"),
  },
  {
    id: "3",
    name: "Van Gogh",
    desc: "Artist",
    imgUrl: require("@/assets/images/figures/art-van-gogh.png"),
  },
  {
    id: "4",
    name: "Marie Curie",
    desc: "Scientist",
    imgUrl: require("@/assets/images/figures/religion-apostle-paul.png"),
  },
  {
    id: "5",
    name: "Leonardo da Vinci",
    desc: "Polymath",
    imgUrl: require("@/assets/images/figures/history-napoleon.png"),
  },
];

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
      <View className="w-[92%] flex-1 pt-3">
        <FlatList
          data={mockFigures}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          renderItem={({ item }) => (
            <StoreFigureCard
              name={item.name}
              desc={item.desc}
              imgUrl={item.imgUrl}
            />
          )}
          ListFooterComponent={<View className=" w-full h-[120px]" />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
