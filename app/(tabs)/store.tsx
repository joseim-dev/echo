import { View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="w-full h-full bg-red-500   flex justify-start items-center">
      {/* Header */}
      <View className="w-full h-[11%] bg-yellow-400"></View>

      {/* Title */}
      <View className="w-full h-[9%] bg-green-400"></View>

      {/* Content */}
      <View className="w-full h-full bg-purple-400"></View>
    </View>
  );
}
