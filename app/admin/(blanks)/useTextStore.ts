import { create } from "zustand";

export interface TextData {
  text: string;
  index: number;
}
interface Props {
  texts: string | null;
  insertText: (texts: string) => void;
  data: TextData[];
  isPending: boolean;
  handlePendingState: () => void;
  hasDataReady: boolean;
}

export const useTextStore = create<Props>()((set) => ({
  texts: null,
  insertText: (texts) =>
    set({
      texts,
      data: texts
        .replaceAll(". ", ".")
        .replaceAll(".", ". ")
        .split(" ")
        .map((text, index) => ({ text, index })),
      hasDataReady: false,
    }),
  data: [],
  isPending: false,
  handlePendingState: () => {
    set({ isPending: true });
    console.log("processing...");
    setTimeout(() => set({ isPending: false, hasDataReady: true }), 1000);
  },
  hasDataReady: false,
}));
