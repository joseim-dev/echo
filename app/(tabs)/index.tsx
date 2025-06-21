import MainHeader from "@/components/header/MainHeader";
import QuoteModal from "@/components/modal/QuoteModal";
import QuoteListItem from "@/components/page/home/QuoteListItem";
import PageTitle from "@/components/title/PageTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, ImageSourcePropType, View } from "react-native";

export default function HomeScreen() {
  type QuoteItem = {
    id: string;
    name: string;
    content: string;
    img: ImageSourcePropType;
  };
  const [FiguresList, setFiguresList] = useState();
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    const fetchMyQuotes = async () => {
      try {
        const saved = await AsyncStorage.getItem("myQuotes");

        if (saved) {
          const parsed = JSON.parse(saved);
          setFiguresList(parsed);
        } else {
          console.log("📦 No data found in myQuotes.");
        }
      } catch (error) {
        console.error("❌ Error loading myQuotes:", error);
      }
    };

    fetchMyQuotes();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
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
      <View className="w-full h-full pt-1 flex items-center">
        <FlatList
          data={FiguresList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuoteListItem
              id={item.id}
              onPress={() => {
                setModalVisible(true);
                setSelectedId(item.id);
              }}
            />
          )}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 300, // footer 공간 확보
          }}
        />
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
