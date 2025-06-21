// FiguresInfo 및 QuotesData는 이미 제공된 구조를 사용합니다.
// 예시로 다시 정의합니다. 실제 앱에서는 import해서 사용하세요.
export interface FigureInfo {
  category: string;
  name: string;
  title: string;
  id: string;
  desc: string;
  imgUrl: any; // React Native의 require() 결과 타입
}

export interface QuotesData {
  [key: string]: string[];
}

// 명언 앱을 위한 새로운 타입 정의
export interface MyQuoteEntry {
  date: string; // "YYYY-MM-DD" 형식의 날짜
  quote: string; // 해당 날짜에 보여진 명언
}

export interface MyFigureData {
  figureInfo: FigureInfo; // FiguresInfo 배열의 각 객체 (유명인사 정보)
  quotesShown: MyQuoteEntry[]; // 해당 유명인사의 명언들이 날짜별로 저장될 배열
}

export type MyQuotesStorage = {
  [figureId: string]: MyFigureData;
};
