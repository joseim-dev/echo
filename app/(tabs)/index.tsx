import MainHeader from "@/components/header/MainHeader";
import QuoteListItem from "@/components/page/QuoteListItem";
import PageTitle from "@/components/title/PageTitle";
import { View } from "react-native";

export default function HomeScreen() {
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
        <QuoteListItem
          name={"Napoleon Bonaparte"}
          content={"Hello my freind nice to meet you!"}
        />
      </View>
    </View>
  );
}
