import SubHeader from "@/components/header/SubHeader";
import PageTitle2 from "@/components/title/PageTitle2";
import { View } from "react-native";

export default function notification() {
  return (
    <View className="w-full h-full bg-black flex items-center">
      <View className="w-full h-[11%] flex-row justify-center">
        <SubHeader />
      </View>

      <View className="w-full h-[7%] flex items-center justify-end">
        <PageTitle2 title="Notification" />
      </View>
    </View>
  );
}
