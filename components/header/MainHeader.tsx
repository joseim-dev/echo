import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function MainHeader() {
  return (
    <View className="w-[92%] flex-row justify-between items-end h-full pb-2">
      <Text className="font-[Bold] text-2xl text-white">Echo</Text>
      <View className="w-fit h-fit flex-row gap-4">
        <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        <Ionicons name="settings-outline" size={24} color="#ffffff" />
      </View>
    </View>
  );
}
