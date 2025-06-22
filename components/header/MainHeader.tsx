import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Notifications from "expo-notifications";
import { Notification as ExpoNotification } from "expo-notifications";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react"; // useEffect와 useRef 추가
import { AppState, AppStateStatus, TouchableOpacity, View } from "react-native"; // AppState 추가

export default function MainHeader() {
  const [notifications, setNotifications] = useState<ExpoNotification[]>([]);
  const appState = useRef(AppState.currentState); // AppState의 현재 상태를 저장할 ref

  const fetchDeliveredNotifications = useCallback(async () => {
    const deliveredNotifications =
      await Notifications.getPresentedNotificationsAsync();
    setNotifications(deliveredNotifications);
    console.log("Delivered Notifications:", deliveredNotifications);
  }, []);

  // useFocusEffect는 화면에 포커스가 올 때마다 실행됩니다. (초기 로드 및 다른 화면에서 돌아올 때)
  useFocusEffect(
    useCallback(() => {
      fetchDeliveredNotifications();
      return () => {
        // 클린업 작업
      };
    }, [fetchDeliveredNotifications])
  );

  // AppState 변화를 감지하여 백그라운드에서 포그라운드로 돌아왔을 때 알림을 다시 확인합니다.
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("App has come to the foreground!");
          fetchDeliveredNotifications(); // 앱이 포그라운드로 돌아오면 알림을 다시 가져옵니다.
        }
        appState.current = nextAppState; // 현재 앱 상태 업데이트
      }
    );

    return () => {
      subscription.remove(); // 컴포넌트 언마운트 시 리스너 제거
    };
  }, [fetchDeliveredNotifications]); // fetchDeliveredNotifications가 변경될 때만 useEffect 재실행

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
          {notifications.length > 0 ? ( // 알림이 1개 이상일 때만 true
            <View className="flex-row">
              <Ionicons name="notifications" size={24} color="#ffffff" />
              <View className="w-[6px] aspect-square bg-red-500 rounded-full absolute right-[4px]" />
            </View>
          ) : (
            <Ionicons name="notifications-outline" size={24} color="#ffffff" />
          )}
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
