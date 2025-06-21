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

  useEffect(() => {
    const fetchMyQuotes = async () => {
      try {
        const saved = await AsyncStorage.getItem("myQuotes");

        if (saved) {
          const parsed = JSON.parse(saved);
          setFiguresList(parsed);
          console.log("🧠 myQuotes from AsyncStorage:", parsed);
        } else {
          console.log("📦 No data found in myQuotes.");
        }
      } catch (error) {
        console.error("❌ Error loading myQuotes:", error);
      }
    };

    fetchMyQuotes();
  }, []);

  const quoteData: QuoteItem[] = [
    {
      id: "art-dali",
      name: "Napoleon Bonaparte",
      content: "Hello my friend, nice to meet you!",
      img: require("@/assets/images/figures/history-napoleon.png"),
    },
    {
      id: "art-dali",
      name: "Van Gogh",
      content: "Don't give up. Life is yours. Grit is all that matters.",
      img: require("@/assets/images/figures/art-van-gogh.png"),
    },
    {
      id: "art-dali",
      name: "Apostle-Paul",
      content: "Imagination is more important than knowledge.",
      img: require("@/assets/images/figures/religion-apostle-paul.png"),
    },
    {
      id: "art-dali",
      name: "Marie Curie",
      content: "Nothing in life is to be feared, it is only to be understood.",
      img: require("@/assets/images/figures/art-van-gogh.png"),
    },
    {
      id: "art-dali",
      name: "Leonardo da Vinci",
      content: "Simplicity is the ultimate sophistication.",
      img: require("@/assets/images/figures/art-van-gogh.png"),
    },
  ];

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
              }}
            />
          )}
          contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
        />
      </View>

      <QuoteModal
        modalVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
}
