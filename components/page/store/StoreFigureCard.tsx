import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

export default function StoreFigureCard({
  name,
  desc,
}: {
  name: string;
  desc: string;
}) {
  const blurhash = "UMF?@5kDPXt4odaxf,jFObaxnNWCWrjaoya}";
  return (
    <View className="w-[48%]">
      <Image
        style={{
          width: "100%",
          aspectRatio: 1,
          overflow: "hidden", // 테두리 밖 이미지 잘림 방지
        }}
        source={require("@/assets/images/figures/art-van-gogh.png")}
        placeholder={{ blurhash }}
        contentFit="cover" // 또는 "contain" 필요에 따라 변경
        transition={1000}
      />
      <Text className="font-semibold text-white text-lg mt-2">{name}</Text>
      <Text className="font-semibold text-[#828282] text-md">{desc}</Text>
    </View>
  );
}
