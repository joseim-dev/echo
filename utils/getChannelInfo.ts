import { FiguresInfo } from "@/constants/Figures";
import { FigureInfo } from "@/types/type";

export default function getChannelInfo({
  id,
}: {
  id: string;
}): FigureInfo | undefined {
  const figureInfo = FiguresInfo.find((item) => item.id === id);
  return figureInfo;
}
