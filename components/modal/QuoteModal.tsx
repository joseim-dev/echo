import { Modal, View } from "react-native";

export default function QuoteModal({ modalVisible }: { modalVisible: true }) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View className="w-full h-full bg-gray-400 "></View>
    </Modal>
  );
}
