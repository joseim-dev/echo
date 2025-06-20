import { Image } from "expo-image";
import { useEffect, useRef } from "react";
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
}: {
  modalVisible: boolean;
  onClose: () => void;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1600,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [modalVisible]);

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View className="w-full h-full bg-[#101010] flex justify-start items-center ">
        <View className="w-full flex justify-end items-center h-[15%] ">
          <View className=" h-[60px] aspect-square rounded-full overflow-hidden border-gray-800 border-2">
            <Image
              style={{
                height: "100%",
                aspectRatio: 1,
                overflow: "hidden", // 테두리 밖 이미지 잘림 방지
                transform: [{ scale: 1.05 }],
              }}
              source={require("@/assets/images/figures/music-kanye.png")}
              contentFit="cover" // 또는 "contain" 필요에 따라 변경
              transition={1000}
            />
          </View>
        </View>
        <View className="w-[90%] h-[70%] flex justify-center">
          <ScrollView contentContainerClassName="flex-1 justify-center">
            <Animated.Text
              style={{ opacity: fadeAnim }}
              className="text-gray-200 font-[QuoteMedium] text-[24px] text-center"
            >
              Believe in yourself! {"\n"}
              {"\n"}Have faith in your abilities!
            </Animated.Text>

            <Animated.Text
              style={{ opacity: fadeAnim }}
              className="text-gray-200 font-[QuoteRegular] text-[18px] mt-10 text-center"
            >
              - Kanye West -
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
