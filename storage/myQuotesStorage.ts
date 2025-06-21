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
  quotesByDate: {
    [date: string]: QuoteEntry;
  };
};

type MyQuotes = QuoteItem[];

// 날짜를 로컬 기준 'YYYY-MM-DD' 문자열로 변환
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
    for (let i = 1; i <= 30; i++) {
      const dateKey = getDateAfterDays(today, i);
      quotesByDate[dateKey] = {
        text: quotes[i - 1],
        read: false,
      };
    }

    myQuotes.push({
      id,
      startDate: formatDate(today),
      quotesByDate,
    });

    await AsyncStorage.setItem("myQuotes", JSON.stringify(myQuotes));
    console.log(`✅ Figure "${id}" added successfully.`);
    Alert.alert("Added Successfully!");
    router.replace("/(tabs)");
  } catch (error) {
    console.error("❌ Error saving myQuotes:", error);
  }
}

// 특정 ID에 해당하는 인물의 오늘 명언 반환
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
  dateStr: string
): Promise<void> {
  try {
    const saved = await AsyncStorage.getItem("myQuotes");
    if (!saved) return;

    const myQuotes: MyQuotes = JSON.parse(saved);
    const target = myQuotes.find((item) => item.id === id);
    if (target && target.quotesByDate[dateStr]) {
      target.quotesByDate[dateStr].read = true;
      await AsyncStorage.setItem("myQuotes", JSON.stringify(myQuotes));
      console.log(`✅ Marked as read: ${id} - ${dateStr}`);
    }
  } catch (error) {
    console.error("❌ Error updating read status:", error);
  }
}
