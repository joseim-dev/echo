import getChannelInfo from "@/utils/getChannelInfo";
import { ImageBackground } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

export default function QuoteListItem({
  id,
  onPress,
}: {
  id: string;
  onPress: () => void;
}) {
  const blurhash = "UMF?@5kDPXt4odaxf,jFObaxnNWCWrjaoya}";
  const channelInfo = getChannelInfo({ id });

  return (
    <View className="w-[92%] h-[90px]  flex-row border-b-[1px] border-[#282828]">
      <View className="w-[22%]  h-full flex justify-center items-start ">
        <TouchableOpacity
          activeOpacity={0.75}
          className="h-[64%] aspect-square rounded-full overflow-hidden"
          onPress={onPress}
        >
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
              transform: [{ scale: 1.05 }],
            }}
            source={channelInfo?.imgUrl}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="w-[78%] flex  h-fit justify-center pl-2"
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View className="w-full h-[45%] flex-row items-end">
          <Text className="text-white font-[Medium] text-lg">
            {channelInfo?.name}{" "}
          </Text>
          <View className="w-[10px] h-[50%] flex justify-start items-center">
            <View className="w-[7px] h-[5px] rounded-full bg-[#7765EC]" />
          </View>
        </View>
        <View className="w-full h-[55%] ">
          <Text
            className=" font-[Medium] text-md text-[#606060]"
            numberOfLines={2}
          >
            hello{" "}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
