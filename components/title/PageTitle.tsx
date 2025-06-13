import { Text, View } from "react-native";

export default function PageTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  return (
    <View className="w-[92%] flex justify-end h-full pb-2">
      <Text className="font-[medium]  text-lg text-[#838383] mb-2">
        {subTitle}
      </Text>

      <Text className="font-[Bold] text-white text-5xl">{title}</Text>
    </View>
  );
}
