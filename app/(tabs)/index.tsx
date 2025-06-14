import MainHeader from "@/components/header/MainHeader";
import QuoteListItem from "@/components/page/home/QuoteListItem";
import PageTitle from "@/components/title/PageTitle";
import { FlatList, ImageSourcePropType, View } from "react-native";

export default function HomeScreen() {
  type QuoteItem = {
    id: string;
    name: string;
    content: string;
    img: ImageSourcePropType;
  };

  const quoteData: QuoteItem[] = [
    {
      id: "1",
      name: "Napoleon Bonaparte",
      content: "Hello my friend, nice to meet you!",
      img: require("@/assets/images/figures/history-napoleon.png"),
    },
    {
      id: "2",
      name: "Van Gogh",
      content: "Don't give up. Life is yours. Grit is all that matters.",
      img: require("@/assets/images/figures/art-van-gogh.png"),
    },
    {
      id: "3",
      name: "Apostle-Paul",
      content: "Imagination is more important than knowledge.",
      img: require("@/assets/images/figures/religion-apostle-paul.png"),
    },
    {
      id: "4",
      name: "Marie Curie",
      content: "Nothing in life is to be feared, it is only to be understood.",
      img: require("@/assets/images/figures/art-van-gogh.png"),
    },
    {
      id: "5",
      name: "Leonardo da Vinci",
      content: "Simplicity is the ultimate sophistication.",
      img: require("@/assets/images/figures/art-van-gogh.png"),
    },
  ];

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
          data={quoteData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuoteListItem
              name={item.name}
              content={item.content}
              img={item.img}
            />
          )}
          contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
        />
      </View>
    </View>
  );
}
