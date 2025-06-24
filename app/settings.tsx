import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import SubHeader from "@/components/header/SubHeader";
import PageTitle2 from "@/components/title/PageTitle2";
import useLocalNotifications from "@/hooks/useLocalNotifications";
import { getScheduleNotifications } from "@/utils/getScheduledNotifications";

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [notifications, setNotifications] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const { triggerDailyNotification, cancelScheduledNotificationById } =
    useLocalNotifications();
  const handleRequestPermission = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    if (existingStatus !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();

      if (newStatus === "granted") {
        // ✅ 처음 허용한 경우 → 9시, 22시 알림 등록
        await triggerDailyNotification(
          "You're motivators are waiting.",
          "Start your day with motivation",
          9,
          0
        );
        await triggerDailyNotification(
          "You're motivators are waiting.",
          "Finish your day with motivation",
          22,
          0
        );
        setRefreshKey((prev) => prev + 1); // 목록 갱신
      }
    }
  };

  useEffect(() => {
    handleRequestPermission();
  }, []);

  const handleAddNotification = async () => {
    await triggerDailyNotification(
      "Check your daily motivation",
      "Don't miss a thing!",
      time.getHours(),
      time.getMinutes()
    );
    setModalVisible(false);
    setRefreshKey((prev) => prev + 1);
  };

  const handleDelete = async (id: string) => {
    await cancelScheduledNotificationById(id);
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const loadNotifications = async () => {
      const scheduled = await getScheduleNotifications();
      setNotifications(scheduled);
    };
    loadNotifications();
  }, [refreshKey]);

  return (
    <View className="w-full h-full bg-black flex items-center">
      {/* Header */}
      <View className="w-full h-[11%] flex-row justify-center">
        <SubHeader />
      </View>

      {/* Title */}
      <View className="w-full h-[7%] flex items-center justify-end">
        <PageTitle2 title="Settings" />
      </View>

      {/* Notification section */}
      <View className="w-full h-fit flex-row items-center justify-between px-[4%] mt-6 ">
        <Text className="text-[#b9b9b9] text-[26px] font-[regular]">
          Notifications
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={24} color={"#ffffff"} />
        </TouchableOpacity>
      </View>

      {/* Scheduled notifications */}
      <View className="w-full px-[4%] mt-8 gap-3 h-[70%] ">
        {notifications.length === 0 && (
          <Text className="text-gray-500 text-base text-center">
            No scheduled notifications.
          </Text>
        )}
        <View className="w-full h-full ">
          <ScrollView>
            {notifications.map((item) => {
              const id = item.identifier;
              const hour = item.trigger.dateComponents.hour ?? 0;
              const minute = item.trigger.dateComponents.minute ?? 0;
              const formatted = `${String(hour).padStart(2, "0")}:${String(
                minute
              ).padStart(2, "0")}`;

              return (
                <View
                  key={id}
                  className="w-full flex-row items-center justify-between bg-[#1c1c1c] rounded-xl px-3 py-4"
                >
                  <Text className="text-white text-[30px]">{formatted}</Text>
                  <TouchableOpacity onPress={() => handleDelete(id)}>
                    <Ionicons name="trash-outline" size={22} color="white" />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Notification modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View className="flex-1 justify-center items-center bg-black/80 px-5">
          <View className="w-full bg-[#1e1e1e] rounded-xl p-5">
            <Text className="text-white mb-2 text-xl font-[Medium]">
              Set a time
            </Text>

            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                if (selectedDate) setTime(selectedDate);
              }}
              textColor="white"
            />

            <View className="flex-row justify-between mt-5">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-600 rounded-md px-6 py-3"
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddNotification}
                className="bg-[#7765EC] rounded-md px-6 py-3"
              >
                <Text className="text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
