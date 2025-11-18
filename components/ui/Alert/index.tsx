"use client";
import { useModal } from "@/hooks";
import useAlertStore, { AlertButton } from "./useAlertStore";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const Alert = () => {
  const { buttons, message, state, title, hideAlert } = useAlertStore();
  const { Modal, Container } = useModal();

  const Button = useCallback(
    ({ text, onClick, primary, warning }: AlertButton) => {
      return (
        <button
          type="button"
          onClick={() => {
            if (onClick) {
              onClick();
            }
            hideAlert();
          }}
          className={twMerge(
            "bg-transparent flex-1",
            primary
              ? "hover:text-blue-500"
              : warning
              ? "text-red-300 hover:text-red-500"
              : ""
          )}
        >
          {text ?? "확인"}
        </button>
      );
    },
    [hideAlert]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window) {
      const fn = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          return hideAlert();
        }
        if (e.key === "Enter") {
          hideAlert();
          if (buttons.length === 0) {
            return;
          }
          if (buttons.length > 0) {
            if (buttons[0]?.onClick) {
              buttons[0].onClick();
            }
          }
        }
      };
      window.addEventListener("keydown", fn);
      return () => {
        window.removeEventListener("keydown", fn);
      };
    }
  }, [hideAlert, buttons]);

  return (
    state && (
      <>
        <Modal state={state} handler={hideAlert}>
          <Container className="min-w-50 max-w-100 p-0">
            {title && <p className="font-bold">{title}</p>}
            <p className="text-center leading-6 p-5">{message}</p>
            <div className="border-t border-gray-200 row">
              {buttons.length === 0
                ? Button({ primary: true })
                : buttons.map((button, i) => <Button key={i} {...button} />)}
            </div>
          </Container>
        </Modal>
      </>
    )
  );
};

export default Alert;

export { useAlertStore };
