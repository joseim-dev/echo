import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function MainHeader() {
  return (
    <View className="w-[92%] flex-row justify-between items-end h-full pb-2">
      <Text className="font-[Bold] text-2xl text-white">Echo</Text>
      <Ionicons name="notifications-outline" size={24} color="#ffffff" />
    </View>
  );
}
