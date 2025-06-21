import SubHeader from "@/components/header/SubHeader";
import NotificationItem from "@/components/notification/NotificationItem";
import PageTitle2 from "@/components/title/PageTitle2";
import useLocalNotifications from "@/hooks/useLocalNotifications";
import * as Notifications from "expo-notifications";
import { Notification as ExpoNotification } from "expo-notifications"; // 타입 임포트 및 별칭 사용
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

export default function Notification() {
  const [notifications, setNotifications] = useState<ExpoNotification[]>([]); // 별칭을 사용한 타입 지정

  async function fetchDeliveredNotifications() {
    const deliveredNotifications =
      await Notifications.getPresentedNotificationsAsync();
    // console.log(deliveredNotifications);
    setNotifications(deliveredNotifications);
  }

  const { readAllNotifications } = useLocalNotifications();

  useEffect(() => {
    fetchDeliveredNotifications();
    readAllNotifications();
  }, []);

  return (
    <View className="w-full h-full bg-black">
      <View className="w-full h-[11%] flex-row justify-center">
        <SubHeader />
      </View>

      <View className="w-full h-[7%] flex items-center justify-end">
        <PageTitle2 title="Notifications" />
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.request.identifier}
        renderItem={({ item }) => (
          <NotificationItem
            title={item.request.content.title || "No Title"}
            body={item.request.content.body || "No Body"}
            date={item.date}
            id={item.request.identifier}
          />
        )}
        style={{ width: "100%", marginTop: 4 }}
      />
    </View>
  );
}
