"use client";
import { Fragment, useState } from "react";
import { TextData, useTextStore } from "./useTextStore";
import { twMerge } from "tailwind-merge";

const TransformedData = () => {
  const { data } = useTextStore();
  const [selectedText, setSelectedText] = useState<TextData[]>([]);
  return (
    <section>
      <button
        className="size-10 rounded border border-gray-200 m-4 float-right cursor-pointer"
        onClick={() => {
          const html = data
            .map(({ index, text }) => {
              if (selectedText.some((t) => t.index === index)) {
                return `<u style="text-decoration: underline;">&nbsp;&nbsp;${text}&nbsp;&nbsp;</u>`;
              }
              return text;
            })
            .join(" ");

          const blob = new Blob([html], { type: "text/html" });
          navigator.clipboard.write([new ClipboardItem({ "text/html": blob })]);
        }}
      >
        Copy
      </button>
      <div className="p-4 border mx-4 rounded border-gray-200 bg-gray-50 leading-8">
        {data?.map(({ text, index }) => {
          const selected = selectedText.some(
            (item) => item.text === text && item.index === index
          );
          return (
            <button
              key={index}
              onClick={() =>
                setSelectedText((prev) => {
                  if (selected) {
                    return prev.filter((item) => item.index !== index);
                  }
                  return [...prev, { text, index }];
                })
              }
              className={twMerge(
                "border rounded px-1 border-transparent cursor-pointer",
                selected && "border-gray-200 bg-white"
              )}
            >
              {selected ? (
                <u className="underline">&nbsp;&nbsp;{text}&nbsp;&nbsp;</u>
              ) : (
                text
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
export default TransformedData;
