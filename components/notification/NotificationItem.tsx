import useLocalNotifications from "@/hooks/useLocalNotifications";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

// Props 타입 정의
interface NotificationItemProps {
  date: number;
  title: string;
  body: string;
  id: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  date,
  title,
  body,
  id,
}) => {
  const { readNotificationById } = useLocalNotifications();

  const timestampInMilliseconds = date * 1000;
  const finalDate = new Date(timestampInMilliseconds);
  const month = finalDate.getMonth() + 1;
  const day = finalDate.getDate();
  const hour = finalDate.getHours();
  const minute = finalDate.getMinutes();
  const [read, setRead] = React.useState(false);

  return (
    <Pressable
      onPress={() => {
        readNotificationById(id);
        setRead(true);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 0.2,
          borderBottomColor: "gray",
          height: 80,
          width: "100%",
        }}
      >
        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {read ? (
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 32, height: 32 }}
            />
          ) : (
            <Image
              source={require("@/assets/images/icon.png")}
              style={{ width: 32, height: 32 }}
            />
          )}
        </View>

        <View style={{ height: 35, width: "60%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 14,
              marginBottom: 1,
              color: "white",
            }}
          >
            {title}
          </Text>
          <Text style={{ fontSize: 12, color: "white" }}>{body}</Text>
        </View>

        <View
          style={{
            height: 35,
            width: "20%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 15,
          }}
        >
          <Text style={{ fontSize: 10, color: "gray" }}>
            {month}/{day}/{hour}:{minute}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default NotificationItem;
