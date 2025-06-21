import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect } from "react";

// 알림을 설정하고 관리하는 커스텀 훅
const useLocalNotifications = () => {
  const router = useRouter();

  // 알림 권한 요청 및 알림 핸들러 설정
  useEffect(() => {
    requestPermissions();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true, // Add this line
        shouldShowList: true, // Add this line
      }),
    });
  }, []);

  // 알림 권한 요청 함수
  const requestPermissions = async () => {
    try {
      const settings = await Notifications.getPermissionsAsync();
      if (!settings.granted) {
        await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
          },
        });
      }
    } catch (error) {
      console.error("Error requesting permissions:", error);
    }
  };

  // 즉시 알림 보내기 함수
  const triggerNotification = async (
    title = "로컬 알림",
    body = "이것은 로컬 푸시 알림입니다."
  ) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          badge: 1, // 뱃지 숫자 설정
          sound: "notification_sound_1.wav",
        },
        trigger: null,
      });
      updateBadgeCount(); // 뱃지 카운트 업데이트
    } catch (error) {
      console.error("Error triggering notification:", error);
    }
  };

  const triggerWeeklyNotification = async () => {};

  // 매일 정해진 시간에 예약 알림 보내기 함수
  // 매일 정해진 시간에 예약 알림 보내기 함수
  const triggerDailyNotification = async (
    title: string,
    body: string,
    hour: number,
    minute: number,
    planName: string
  ) => {
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          badge: 1, // 뱃지 숫자 설정
          data: { planName: planName, notificationType: "Daily" }, // 알림에 추가 데이터 전달
          sound: "notification_sound_1.wav",
        },
        trigger: {
          repeats: true,
          channelId: "default", // Add a channelId, highly recommended for Android

          hour,
          minute,
        },
      });
      updateBadgeCount(); // 뱃지 카운트 업데이트
      return notificationId; // Return the notification ID
    } catch (error) {
      console.error("Error scheduling notification:", error);
      return null; // Return null in case of an error
    }
  };

  // 알림 ID로 특정 알림 취소 함수
  const cancelScheduledNotificationById = async (id: string) => {
    try {
      // 예약된 알림 취소
      await Notifications.cancelScheduledNotificationAsync(id);
      updateBadgeCount(); // 뱃지 카운트 업데이트
    } catch (error) {
      console.error("Error canceling notification:", error);
    }
  };

  const readNotificationById = async (id: string) => {
    try {
      // 이미 발생한 알림을 취소
      await Notifications.dismissNotificationAsync(id);
      updateBadgeCount(); // 뱃지 카운트 업데이트
    } catch (error) {
      console.error("Error canceling notification:", error);
    }
  };

  // 모든 예약된 알림 취소 함수
  const readAllNotifications = async () => {
    try {
      await Notifications.dismissAllNotificationsAsync();
      updateBadgeCount(); // 뱃지 카운트 업데이트
    } catch (error) {
      console.error("Error canceling all notifications:", error);
    }
  };

  const updateBadgeCount = async () => {
    try {
      const notifications =
        await Notifications.getPresentedNotificationsAsync();
      await Notifications.setBadgeCountAsync(notifications.length); // 알림 수에 맞춰 뱃지 업데이트
    } catch (error) {
      console.error("Error updating badge count:", error);
    }
  };

  return {
    triggerNotification,
    triggerDailyNotification,
    triggerWeeklyNotification,
    readNotificationById,
    readAllNotifications,
    cancelScheduledNotificationById,
  };
};

export default useLocalNotifications;
