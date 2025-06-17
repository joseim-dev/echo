import { Text, View } from "react-native";

export default function StatBar({
  name,
  number,
  bgColor = "#7765EC",
  borderColor = "#483D90",
}: {
  name: string;
  number: number; // 1 ~ 5
  bgColor?: string;
  borderColor?: string;
}) {
  const max = 5;
  const clamped = Math.min(Math.max(number, 0), max); // 0~5로 제한
  const filledBlocks = Array(clamped).fill(true);
  const emptyBlocks = Array(max - clamped).fill(false);

  return (
    <View className="flex items-start w-full mb-5">
      <Text className="text-white text-md mb-1">{name}</Text>
      <View
        className="w-full h-[16px] rounded-xl overflow-hidden flex-row"
        style={{
          borderColor: borderColor,
          borderWidth: 1.4,
        }}
      >
        {[...filledBlocks, ...emptyBlocks].map((filled, index) => (
          <View
            key={index}
            className="flex-1 h-full"
            style={{
              backgroundColor: filled ? bgColor : "transparent",
              borderRightWidth: index < max - 1 ? 1.5 : 0,
              borderRightColor: borderColor,
            }}
          />
        ))}
      </View>
    </View>
  );
}
