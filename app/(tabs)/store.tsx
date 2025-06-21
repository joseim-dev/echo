import MainHeader from "@/components/header/MainHeader";
import ChannelModal from "@/components/modal/ChannelModal";
import CategoryPicker from "@/components/page/store/CategoryPicker";
import StoreFigureCard from "@/components/page/store/StoreFigureCard";
import PageTitle from "@/components/title/PageTitle";
import { FiguresInfo } from "@/constants/Figures";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, ImageSourcePropType, View } from "react-native";

const mockFigures = FiguresInfo;

export default function TabTwoScreen() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState<ImageSourcePropType>(
    require("@/assets/images/icon.png")
  ); // Initialize with undefined or null
  const [desc, setDesc] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    console.log("Selected Category", selectedCategory);
  }, [selectedCategory]);

  const mockFigures = useMemo(() => {
    if (selectedCategory === "all") return FiguresInfo;
    return FiguresInfo.filter(
      (item) =>
        item.category &&
        item.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

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
              desc={item.title}
              imgUrl={item.imgUrl}
              onPress={() => {
                setModalVisible(true);
                setDesc(item.desc);
                setImgUrl(item.imgUrl);
                setName(item.name);
                setId(item.id);
              }}
            />
          )}
          ListFooterComponent={<View className=" w-full h-[120px]" />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <ChannelModal
        modalVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        name={name}
        imgUrl={imgUrl}
        id={id}
        desc={desc}
      />
    </View>
  );
}
