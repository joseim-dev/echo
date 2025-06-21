import * as Notifications from "expo-notifications";

export async function getScheduleNotifications(planName?: string) {
  try {
    // 모든 예약된 알림을 가져옵니다.
    const scheduledNotifications =
      await Notifications.getAllScheduledNotificationsAsync();

    // console.log(scheduledNotifications);

    // planName이 없으면 모든 알림을 반환하고, 있으면 필터링된 알림을 반환합니다.
    if (!planName) {
      return scheduledNotifications;
    }

    // planName이 주어진 값과 일치하는 알림만 필터링합니다.
    const filteredNotifications = scheduledNotifications.filter(
      (notification) => notification.content?.data?.planName === planName
    );

    // 필터된 알림 데이터를 반환합니다.
    return filteredNotifications;
  } catch (error) {
    // 오류가 발생한 경우 예외 처리
    console.error("Failed to fetch scheduled notifications", error);
    return [];
  }
}
