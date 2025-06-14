import { ImageBackground } from "expo-image";
import {
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function QuoteListItem({
  name,
  content,
  imgUrl,
}: {
  name: string;
  content: string;
  imgUrl: ImageSourcePropType;
}) {
  const blurhash = "UMF?@5kDPXt4odaxf,jFObaxnNWCWrjaoya}";

  return (
    <View className="w-[92%] h-[90px]  flex-row border-b-[1px] border-[#282828]">
      <View className="w-[22%]  h-full flex justify-center items-start ">
        <TouchableOpacity
          activeOpacity={0.75}
          className="h-[64%] aspect-square rounded-full overflow-hidden"
        >
          <ImageBackground
            style={{
              width: "100%",
              height: "100%",
              transform: [{ scale: 1.05 }],
            }}
            source={imgUrl}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="w-[78%] flex  h-fit justify-center pl-2"
        activeOpacity={0.7}
      >
        <View className="w-full h-[45%] flex-row items-end">
          <Text className="text-white font-[Medium] text-lg">{name} </Text>
          <View className="w-[10px] h-[50%] flex justify-start items-center">
            <View className="w-[7px] h-[5px] rounded-full bg-[#7765EC]" />
          </View>
        </View>
        <View className="w-full h-[55%] ">
          <Text
            className=" font-[Medium] text-md text-[#606060]"
            numberOfLines={2}
          >
            {content}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
