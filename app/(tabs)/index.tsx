import MainHeader from "@/components/header/MainHeader";
import QuoteModal from "@/components/modal/QuoteModal";
import QuoteListItem from "@/components/page/home/QuoteListItem";
import PageTitle from "@/components/title/PageTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { useCallback, useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  type QuoteItem = {
    id: string;
    name: string;
    content: string;
    img: ImageSourcePropType;
  };
  const [FiguresList, setFiguresList] = useState<QuoteItem[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchMyQuotes = async () => {
        try {
          const saved = await AsyncStorage.getItem("myQuotes");

          if (saved) {
            const parsed = JSON.parse(saved);
            const reversed = parsed.reverse(); // 배열 순서 뒤집기
            setFiguresList(reversed);
            console.log(FiguresList);
          } else {
            console.log("📦 No data found in myQuotes.");
          }
        } catch (error) {
          console.error("❌ Error loading myQuotes:", error);
        }
      };

      fetchMyQuotes();
    }, [update, FiguresList]) // update 값이 바뀌거나 화면이 포커스될 때 실행됨
  );

  return (
    <View className="w-full h-full  bg-black  flex justify-start items-center">
      {/* Header */}
      <View className="w-full h-[11%] flex-row justify-center">
        <MainHeader />
      </View>

      {/* Title */}
      <View className="w-full h-[11%] flex items-center">
        <PageTitle title={"Quotes"} subTitle={"Today's Words of Wisdom"} />
      </View>

      {/* Content */}
      <View className="w-full h-[78%] pt-1 flex items-center">
        {FiguresList.length === 0 ? (
          // 명언이 하나도 없을 때
          <View className="w-full h-full flex justify-start items-center px-6 ">
            <ScrollView>
              <View className="flex items-center pt-[50px]">
                <Image
                  source={require("@/assets/images/icon.png")}
                  style={{ width: 140, height: 90 }}
                />

                <Text className="text-white text-xl font-semibold mt-4 mb-2">
                  No Channel added yet
                </Text>

                <Text className="text-[#999] text-sm text-center leading-5">
                  Start by adding a channel{"\n"}
                  in the store page.
                </Text>
              </View>
            </ScrollView>
          </View>
        ) : (
          // 명언 목록 있을 때
          <FlatList
            data={FiguresList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <QuoteListItem
                id={item.id}
                modalVisible={modalVisible}
                onPress={() => {
                  setModalVisible(true);
                  setSelectedId(item.id);
                }}
                update={() => setUpdate((prev) => prev + 1)}
              />
            )}
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 200,
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <QuoteModal
        modalVisible={modalVisible}
        id={selectedId}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
}
