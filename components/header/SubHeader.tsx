import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function SubHeader() {
  const router = useRouter();
  return (
    <View className="w-[92%] flex-row justify-between items-end  h-full pb-2">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" color={"#ffffff"} size={28} />
      </TouchableOpacity>
    </View>
  );
}
