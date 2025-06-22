import {
  getTodaysQuoteById,
  isTodaysQuoteRead,
  removeFigureFromMyQuotes,
} from "@/storage/myQuotesStorage";
import getChannelInfo from "@/utils/getChannelInfo";
import { useFocusEffect } from "@react-navigation/native";
import { ImageBackground } from "expo-image";
import { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function QuoteListItem({
  id,
  onPress,
  modalVisible,
  update,
}: {
  id: string;
  onPress: () => void;
  update: () => void;

  modalVisible: boolean;
}) {
  const [quote, setQuote] = useState<string | null>(null);
  const [isRead, setIsRead] = useState<boolean>(false);

  const blurhash = "UMF?@5kDPXt4odaxf,jFObaxnNWCWrjaoya}";
  const channelInfo = getChannelInfo({ id });

  useFocusEffect(
    useCallback(() => {
      const fetchQuote = async () => {
        const entry = await getTodaysQuoteById(id);
        setQuote(entry?.text ?? "");
        const data = await isTodaysQuoteRead(id);
        setIsRead(data);
      };
      fetchQuote();
    }, [id, modalVisible])
  );

  const onLongPress = () => {
    removeFigureFromMyQuotes(id, update); // ✅ 콜백 전달
  };

  return (
    <View className="w-[95%] h-[90px] flex-row border-b-[1px] border-[#282828]">
      <View className="w-[22%] h-full flex justify-center items-start">
        <TouchableOpacity
          activeOpacity={0.75}
          className="h-[64%] aspect-square rounded-full overflow-hidden"
          onPress={onPress}
          onLongPress={onLongPress}
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
        className="w-[78%] flex h-fit justify-center pl-2"
        activeOpacity={0.7}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <View className="w-full h-[45%] flex-row items-end">
          <Text className="text-white font-[Medium] text-lg">
            {channelInfo?.name}
          </Text>

          <View className="w-[10px] h-[50%] flex justify-start items-center">
            {isRead ? (
              <View />
            ) : (
              <View className="w-[7px] aspect-square rounded-full bg-[#7765EC] ml-3" />
            )}
          </View>
        </View>
        <View className="w-full h-[55%]">
          <Text
            className="font-[Medium] text-md text-[#606060]"
            numberOfLines={2}
          >
            {quote || "No quote for today."}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
