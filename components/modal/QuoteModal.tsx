import { Image } from "expo-image";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function QuoteModal({
  modalVisible,
  onClose,
}: {
  modalVisible: boolean;
  onClose: () => void;
}) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View className="w-full h-full bg-[#101010] flex justify-center items-center">
        <View className="w-[90%] h-fit bg-black rounded-xl border-2 border-[#483D90] py-5">
          <View className="w-full flex justify-center items-center h-[50px]">
            <View className=" h-full aspect-square rounded-full overflow-hidden border-gray-800 border-2">
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

          <View className="w-full h-fit  flex justify-center items-center py-10 px-5">
            <Text className="text-white font-[QuoteRegular] text-[18px] text-center">
              Hello this is kanye. This is a test quote. Ya'll gonna miss me
              like how you miss the old me
            </Text>

            <Text className="text-white font-[QuoteRegular] text-[18px] mt-8 ">
              - Kanye West -
            </Text>
          </View>

          <TouchableOpacity
            onPress={onClose}
            className="h-[50px] w-full justify-center items-center "
          >
            <Text className="text-gray-400 font-[Regular] text-xl mt-4">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
