"use client";

import { twMerge } from "tailwind-merge";
import { useTextStore } from "./useTextStore";

const Textarea = () => {
  const { texts, insertText, isPending, handlePendingState, hasDataReady } =
    useTextStore();

  return (
    <section className="flex flex-col gap-1 m-4">
      <label htmlFor="text_area" className="text-gray-500 text-xs font-bold">
        Your Texts
      </label>
      <textarea
        id="text_area"
        value={texts ?? ""}
        onChange={(e) => {
          insertText(e.target.value);
        }}
        className={twMerge(
          "border resize-none rounded p-2 bg-gray-50 border-gray-200 focus:border-blue-500 outline-none focus:bg-transparent min-h-[30vh]",
          hasDataReady && "min-h-0 max-h-25"
        )}
      />
      <button
        className="border-0 rounded bg-blue-500 text-white h-12 mt-2 cursor-pointer hover:opacity-80 active:opacity-50 active:scale-99 transition-all disabled:opacity-50"
        disabled={isPending}
        onClick={handlePendingState}
      >
        {isPending
          ? "Extracting text-data..."
          : hasDataReady
          ? "Done!"
          : "Transform"}
      </button>
    </section>
  );
};
export default Textarea;
