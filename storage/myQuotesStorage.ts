import { QuotesData } from "@/constants/Quotes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

type QuoteEntry = {
  text: string;
  read: boolean;
};

type QuoteItem = {
  id: string;
  startDate: string;
  number: number; // ✅ 추가됨
  quotesByDate: {
    [date: string]: QuoteEntry;
  };
};

type MyQuotes = QuoteItem[];

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateAfterDays(baseDate: Date, days: number): string {
  const newDate = new Date(baseDate);
  newDate.setDate(baseDate.getDate() + days);
  return formatDate(newDate);
}

const router = useRouter();

export async function addFigureToMyQuotes(id: string): Promise<void> {
  try {
    const saved = await AsyncStorage.getItem("myQuotes");
    const myQuotes: MyQuotes = saved ? JSON.parse(saved) : [];

    if (myQuotes.find((item) => item.id === id)) {
      console.log(`Figure with ID "${id}" is already added.`);
      Alert.alert("This channel is already added.");
      return;
    }

    const today = new Date();
    const quotes = QuotesData[id];
    if (!quotes || quotes.length < 30) {
      console.error("명언이 부족하거나 ID가 존재하지 않습니다.");
      return;
    }

    const quotesByDate: { [date: string]: QuoteEntry } = {};
    for (let i = 0; i <= 30; i++) {
      const dateKey = getDateAfterDays(today, i);
      quotesByDate[dateKey] = {
        text: quotes[i],
        read: false,
      };
    }

    const nextNumber = myQuotes.length + 1;

    myQuotes.push({
      id,
      startDate: formatDate(today),
      number: nextNumber, // ✅ 순서 지정
      quotesByDate,
    });

    await AsyncStorage.setItem("myQuotes", JSON.stringify(myQuotes));
    console.log(`✅ Figure "${id}" added successfully.`);
    router.replace("/(tabs)");
  } catch (error) {
    console.error("❌ Error saving myQuotes:", error);
  }
}

export async function getTodaysQuoteById(
  id: string
): Promise<QuoteEntry | null> {
  try {
    const saved = await AsyncStorage.getItem("myQuotes");
    if (!saved) return null;

    const myQuotes: MyQuotes = JSON.parse(saved);

    const today = new Date();
    const dateStr = formatDate(today);

    const targetItem = myQuotes.find((item) => item.id === id);

    if (targetItem) {
      const entry = targetItem.quotesByDate[dateStr];
      return entry ?? null;
    }

    return null;
  } catch (error) {
    console.error("❌ Error loading quote by id:", error);
    return null;
  }
}

export async function markQuoteAsRead(
  id: string,
  dateStr?: string
): Promise<void> {
  try {
    const saved = await AsyncStorage.getItem("myQuotes");
    if (!saved) return;

    const myQuotes: MyQuotes = JSON.parse(saved);
    const target = myQuotes.find((item) => item.id === id);
    if (!target) return;

    const today = dateStr ?? formatDate(new Date());

    if (target.quotesByDate[today]) {
      target.quotesByDate[today].read = true;
      await AsyncStorage.setItem("myQuotes", JSON.stringify(myQuotes));
      console.log(`✅ Marked as read: ${id} - ${today}`);
    } else {
      console.warn(`⚠️ No quote entry found for: ${id} - ${today}`);
    }
  } catch (error) {
    console.error("❌ Error updating read status:", error);
  }
}

export async function isTodaysQuoteRead(id: string): Promise<boolean> {
  try {
    const saved = await AsyncStorage.getItem("myQuotes");
    if (!saved) return false;

    const myQuotes: MyQuotes = JSON.parse(saved);
    const today = formatDate(new Date());

    const target = myQuotes.find((item) => item.id === id);
    if (!target) return false;

    const todayEntry = target.quotesByDate[today];
    return todayEntry?.read === true;
  } catch (error) {
    console.error("❌ Error checking read status:", error);
    return false;
  }
}

export async function removeFigureFromMyQuotes(
  id: string,
  onSuccess?: () => void
): Promise<void> {
  Alert.alert(
    "Confirm Deletion",
    "Are you sure you want to remove this channel?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          try {
            const saved = await AsyncStorage.getItem("myQuotes");
            if (!saved) return;

            const myQuotes: MyQuotes = JSON.parse(saved);

            const removedIndex = myQuotes.findIndex((item) => item.id === id);
            if (removedIndex === -1) return;

            const updatedQuotes = myQuotes
              .filter((item) => item.id !== id)
              .map((item, index) => ({
                ...item,
                number: index + 1, // ✅ 번호 재정렬
              }));

            await AsyncStorage.setItem(
              "myQuotes",
              JSON.stringify(updatedQuotes)
            );
            console.log(`🗑️ Removed figure with ID "${id}" from storage.`);
            Alert.alert("Removed Successfully!");

            if (onSuccess) onSuccess();
          } catch (error) {
            console.error("❌ Error removing figure from myQuotes:", error);
          }
        },
      },
    ],
    { cancelable: true }
  );
}
