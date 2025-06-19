import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function MainHeader() {
  const router = useRouter();
  return (
    <View className="w-[92%] flex-row justify-between items-end h-full pb-2">
      <Image
        style={{
          width: "11%",
          height: 32,
        }}
        source={require("@/assets/images/logo.png")}
        contentFit="contain"
      />
      <View className="w-fit h-fit flex-row gap-4">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.push("/notification");
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            router.push("/settings");
          }}
        >
          <Ionicons name="settings-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
