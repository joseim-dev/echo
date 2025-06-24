import { getTodaysQuoteById, markQuoteAsRead } from "@/storage/myQuotesStorage";
import getChannelInfo from "@/utils/getChannelInfo";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function QuoteModal({
  modalVisible,
  onClose,
  id,
}: {
  modalVisible: boolean;
  onClose: () => void;
  id: string;
}) {
  const [quote, setQuote] = useState<string>("");
  const channelInfo = getChannelInfo({ id });

  useEffect(() => {
    const fetchQuote = async () => {
      const entry = await getTodaysQuoteById(id);
      setQuote(
        entry?.text ??
          `You've seen all quotes from ${channelInfo?.name}. Discover more motivators on the store page.
`
      );
    };
    fetchQuote();
    markQuoteAsRead(id);
  }, [id]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const formattedQuote = quote
    .split(". ")
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0)
    .map((sentence) => (sentence.endsWith(".") ? sentence : sentence + "."))
    .join("\n\n");

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [modalVisible]);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View className="w-full h-full bg-[#101010] flex justify-start items-center ">
        <View className="w-full flex justify-end items-center h-[17%] ">
          <View className=" h-[60px] aspect-square rounded-full overflow-hidden border-gray-800 border-2">
            <Image
              style={{
                height: "100%",
                aspectRatio: 1,
                overflow: "hidden", // 테두리 밖 이미지 잘림 방지
                transform: [{ scale: 1.05 }],
              }}
              source={channelInfo?.imgUrl}
              contentFit="cover" // 또는 "contain" 필요에 따라 변경
              transition={1000}
            />
          </View>
          <Text className="text-gray-200 font-[QuoteRegular] text-[12px]  text-center mt-[6px]">
            {channelInfo?.name}
          </Text>
        </View>
        <View className="w-[92%] h-[68%] flex justify-center">
          <ScrollView contentContainerClassName="flex-1 justify-center">
            <Animated.Text
              style={{ opacity: fadeAnim }}
              className="text-gray-200 font-[QuoteMedium] text-[23px] text-center leading-[34px]"
            >
              {formattedQuote}
            </Animated.Text>

            <Animated.Text
              style={{ opacity: fadeAnim }}
              className="text-gray-200 font-[QuoteRegular] text-[18px] mt-10 text-center"
            >
              - {channelInfo?.name} -
            </Animated.Text>
          </ScrollView>
        </View>

        <View className="w-full h-[15%] ">
          <TouchableOpacity
            onPress={onClose}
            className="h-[50px] w-full justify-center items-center "
          >
            <Text className="text-gray-300 font-[Regular] text-[20px] mt-4">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
