import { Text, View } from "react-native";

export default function PageTitle2({ title }: { title: string }) {
  return (
    <View className="w-[92%] flex justify-end h-full pb-2">
      <Text className="font-[Bold] text-white text-4xl">{title}</Text>
    </View>
  );
}
