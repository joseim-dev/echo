import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  ImageSourcePropType,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// @ts-ignore
// import ProgressBar from "react-native-animated-progress";

import { useAd } from "@/contexts/AdContext/AdContext";
import { addFigureToMyQuotes } from "@/storage/myQuotesStorage";
import { useEffect } from "react";

export default function ChannelModal({
  name,
  imgUrl,
  desc,
  modalVisible,
  id,
  onClose,
}: {
  name: string;
  desc: string;
  imgUrl: ImageSourcePropType;
  modalVisible: boolean;
  id: string;
  onClose: () => void;
}) {
  const { isAdLoaded, showAd, adError, isAdClosed, loadAd } = useAd();

  const handlePress = () => {
    if (isAdLoaded) {
      showAd();
    } else {
      loadAd;
      addFigureToMyQuotes(id);
      onClose();
    }
  };

  useEffect(() => {
    if (isAdClosed) {
      loadAd;
      addFigureToMyQuotes(id);
      onClose();
    }
  }, [isAdClosed]);
  return (
    <Modal
      animationType="fade"
      //   transparent={true}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      {/* 전체 배경 (투명한 오버레이) */}
      <View className="w-full h-full bg-[#101010] bg-opacity-80 justify-center items-center">
        {/* 모달 내용 (작은 박스) */}
        <View className="w-full h-[90%] p-3 bg-[#101010] rounded-xl">
          <View className="w-full h-[5%]  flex items-end justify-center">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" color={"#ffffff"} size={28} />
            </TouchableOpacity>
          </View>

          <View className="w-full h-[85%] flex justify-center items-center  ">
            <View className="w-full h-[42%]  flex items-center justify-center">
              <View className=" h-[88%] aspect-square rounded-full overflow-hidden border-[#767676] border-2">
                <Image
                  style={{
                    height: "100%",
                    aspectRatio: 1,
                    overflow: "hidden", // 테두리 밖 이미지 잘림 방지
                    transform: [{ scale: 1.05 }],
                    borderWidth: 4,

                    borderColor: "#787878",
                  }}
                  source={imgUrl}
                  contentFit="cover" // 또는 "contain" 필요에 따라 변경
                  transition={1000}
                />
              </View>
            </View>
            <View className="w-[95%] h-[30%]  flex items-center mt-4">
              <Text className="text-white font-[QuoteMedium] text-2xl">
                {name}
              </Text>
              <Text className="text-gray-200 font-[QuoteRegular] text-xl mt-9 text-justify">
                {desc}
              </Text>
            </View>
          </View>
          {/* <View className="w-full h-[42%] flex items-center">
            <View className="flex items-start w-[90%] ">
              <ScrollView className="w-full h-full">
                <Text className="text-gray-200 font-medium text-lg mb-8">
                  {desc}
                </Text>

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
                  bgColor="#68E043"
                  borderColor="#5A903D"
                />

                <StatBar
                  name="Artistic"
                  number={1}
                  bgColor="#CDCDCD"
                  borderColor="#959595"
                />
              </ScrollView>
            </View>
          </View> */}
          <View className="w-full h-[10%] flex items-center justify-end">
            <TouchableOpacity
              className="w-[82%] bg-[#7765EC] h-[44px] rounded-full  mb-[2%] flex justify-center items-center"
              activeOpacity={0.8}
              onPress={handlePress}
            >
              <Text className="text-white font-[Medium] text-[18px]">
                Add him/her (Ad)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
