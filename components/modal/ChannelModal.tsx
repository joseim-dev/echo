import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import StatBar from "../ui/StatBar";
// @ts-ignore
// import ProgressBar from "react-native-animated-progress";

export default function ChannelModal({
  modalVisible,
  onClose,
}: {
  modalVisible: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      animationType="fade"
      //   transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      {/* 전체 배경 (투명한 오버레이) */}
      <View className="w-full h-full bg-[#010101] bg-opacity-80 justify-center items-center">
        {/* 모달 내용 (작은 박스) */}
        <View className="w-[90%] h-[76%] p-3 bg-black rounded-xl border-2 border-[#373737]">
          <View className="w-full h-[5%]  flex items-end justify-center">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" color={"#ffffff"} size={28} />
            </TouchableOpacity>
          </View>

          <View className="w-full h-[47%]  ">
            <View className="w-full h-[80%]  flex items-center justify-center">
              <View className=" h-[82%] aspect-square rounded-full overflow-hidden border-gray-800 border-2">
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
            <View className="w-full h-[18%]  flex items-center">
              <Text className="text-white font-[SemiBold] text-xl">
                Kanye West
              </Text>
            </View>
          </View>
          <View className="w-full h-[35%] flex items-center">
            <View className="flex items-start w-[90%] ">
              <ScrollView className="w-full h-full">
                <StatBar
                  name="Masculanity"
                  number={4}
                  bgColor="#7765EC"
                  borderColor="#483D90"
                />
                <StatBar
                  name="Intelligence"
                  number={2}
                  bgColor="#E04346"
                  borderColor="#903D3E"
                />

                <StatBar
                  name="Philosophical"
                  number={5}
                  bgColor="#7765EC"
                  borderColor="#483D90"
                />

                <StatBar
                  name="Artistic"
                  number={1}
                  bgColor="#7765EC"
                  borderColor="#483D90"
                />
              </ScrollView>
            </View>
          </View>
          <View className="w-full h-[13%] flex items-center justify-end">
            <TouchableOpacity
              className="w-[82%] bg-[#7765EC] h-[44px] rounded-full  mb-[2%] flex justify-center items-center"
              activeOpacity={0.8}
            >
              <Text className="text-white font-[Medium] text-[16px]">
                Add him/her (Ad)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
