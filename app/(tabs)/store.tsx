import MainHeader from "@/components/header/MainHeader";
import StoreFigureCard from "@/components/page/store/StoreFigureCard";
import PageTitle from "@/components/title/PageTitle";
import { View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="w-full h-full  bg-black  flex justify-start items-center">
      {/* Header */}
      <View className="w-full h-[11%] flex-row justify-center">
        <MainHeader />
      </View>

      {/* Title */}
      <View className="w-full h-[11%] flex items-center">
        <PageTitle title={"Store"} subTitle={"Choose your motivator"} />
      </View>

      {/* Content */}
      <View className="w-[92%] h-full pt-1 flex-row justify-between ">
        <StoreFigureCard name="Napoleon Bonaparte" desc="Emporror" />
        <StoreFigureCard name="Napoleon Bonaparte" desc="Emporror" />
      </View>
    </View>
  );
}
