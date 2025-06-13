import { Text, TouchableOpacity, View } from "react-native";

export default function QuoteListItem({
  name,
  content,
}: {
  name: string;
  content: string;
}) {
  return (
    <View className="w-[92%] h-[90px]  flex-row border-b-[1px] border-[#282828]">
      <View className="w-[22%]  h-full flex justify-center items-center ">
        <TouchableOpacity
          activeOpacity={0.75}
          className="h-[66%] aspect-square bg-teal-900 rounded-full"
        />
      </View>
      <TouchableOpacity
        className="w-[78%] flex  h-fit justify-center pl-2"
        activeOpacity={0.7}
      >
        <View className="w-full h-[45%] justify-end">
          <Text className="text-white font-[Medium] text-lg">{name} </Text>
        </View>
        <View className="w-full h-[55%] ">
          <Text
            className=" font-[Medium] text-md text-[#606060]"
            numberOfLines={2}
          >
            {content}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
