export function getNotificationMessage(date = new Date()) {
  const hour = date.getHours();

  if (hour >= 6 && hour < 9) {
    return {
      title: "Good morning!",
      subtitle: "Let’s start the day with some inspiration.",
    };
  } else if (hour >= 9 && hour < 12) {
    return {
      title: "Fuel you day",
      subtitle:
        "Your motivators are waiting. Boost your morning with some wisdom.",
    };
  } else if (hour >= 12 && hour < 13) {
    return {
      title: "Lunch break vibes?",
      subtitle: "Take a breather and enjoy a quick quote.",
    };
  } else if (hour >= 13 && hour < 17) {
    return {
      title: "Afternoon slump?",
      subtitle: "A little wisdom to power through your day.",
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      title: "Winding down?",
      subtitle: "Reflect on your day with a quick read.",
    };
  } else if (hour >= 21 && hour < 24) {
    return {
      title: "How was your day?",
      subtitle:
        "Reflect your day with us. Prepare for tommorrow with some inspiration.",
    };
  } else {
    // 0시~6시
    return {
      title: "Can’t sleep?",
      subtitle: "Here’s something calm for the late hours.",
    };
  }
}
