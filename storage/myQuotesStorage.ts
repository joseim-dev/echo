import { QuotesData } from "@/constants/Quotes";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getDateAfterDays(baseDate: Date, days: number): string {
  const newDate = new Date(baseDate);
  newDate.setDate(baseDate.getDate() + days);
  return formatDate(newDate);
}

export async function addFigureToMyQuotes(id: string): Promise<void> {
  try {
    const saved = await AsyncStorage.getItem("myQuotes");
    const myQuotes: MyQuotes = saved ? JSON.parse(saved) : [];

    if (myQuotes.find((item) => item.id === id)) {
      console.warn(`Figure with ID "${id}" is already added.`);
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
  } catch (error) {
    console.error("❌ Error saving myQuotes:", error);
  }
}

export async function getTodaysQuotes(targetDateStr?: string): Promise<{
  [id: string]: QuoteEntry;
}> {
  try {
    const saved = await AsyncStorage.getItem("myQuotes");
    if (!saved) return {};

    const myQuotes: MyQuotes = JSON.parse(saved);
    const targetDate = targetDateStr ? new Date(targetDateStr) : new Date();
    const dateStr = formatDate(targetDate);

    const result: { [id: string]: QuoteEntry } = {};

    for (const item of myQuotes) {
      const entry = item.quotesByDate[dateStr];
      if (entry) {
        result[item.id] = entry;
      }
    }

    return result;
  } catch (error) {
    console.error("❌ Error loading quotes:", error);
    return {};
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
