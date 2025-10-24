"use client";
import { Fragment, useEffect, useState } from "react";
import { TextData, useTextStore } from "./useTextStore";
import { twMerge } from "tailwind-merge";
import { IoCheckmark, IoCopy, IoTrashBin } from "react-icons/io5";

const TransformedData = () => {
  const { data } = useTextStore();
  const [selectedText, setSelectedText] = useState<TextData[]>([]);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000);
    }
  }, [copied]);
  return (
    <section>
      <div className="flex gap-2 justify-end mx-4 mb-2">
        <button
          className="size-10 rounded border border-gray-200 text-gray-500 cursor-pointer flex justify-center items-center"
          onClick={() => {
            if (
              selectedText.length > 0 &&
              data.length === selectedText.length
            ) {
              return setSelectedText([]);
            }
            setSelectedText(data);
          }}
        >
          {selectedText.length > 0 && data.length === selectedText.length ? (
            <IoTrashBin />
          ) : (
            "All"
          )}
        </button>
        <button
          className="size-10 rounded border border-gray-200 cursor-pointer flex justify-center items-center text-gray-500"
          onClick={() => {
            const html = data
              .map(({ index, text }, i) => {
                const isUnderlined = selectedText.some(
                  (t) => t.index === index
                );
                const next = data[i + 1];
                const nextIsUnderlined =
                  next && selectedText.some((t) => t.index === next.index);

                if (isUnderlined) {
                  return `
          <span style="margin-right: 4px;">&nbsp;&nbsp;</span>
          <u style="text-decoration: underline; text-underline-offset: 3px; margin-right: 4px;">
           &nbsp;&nbsp;${text}&nbsp;&nbsp;
          </u>
          ${
            !nextIsUnderlined
              ? '<span style="margin-right: 6px;">&nbsp;</span>'
              : ""
          }
        `;
                }

                return `<span style="margin-right: 6px;">&nbsp;${text}&nbsp;</span>`;
              })
              .join("");

            const htmlContent = `
    <div style="font-size:15px; line-height:160%;">
      ${html}
    </div>
  `;
            const blob = new Blob([htmlContent], { type: "text/html" });
            navigator.clipboard.write([
              new ClipboardItem({ "text/html": blob }),
            ]);
            setCopied(true);
          }}
        >
          {copied ? <IoCheckmark /> : <IoCopy />}
        </button>
      </div>

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
