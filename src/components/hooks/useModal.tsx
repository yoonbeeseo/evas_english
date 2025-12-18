import { useCallback, useState, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const useModal = () => {
  const [visible, setVisible] = useState(false);
  const handler = useCallback(() => setVisible((prev) => !prev), []);
  const turnOff = useCallback(() => setVisible(false), []);
  const turnOn = useCallback(() => setVisible(true), []);

  interface ModalProps extends ComponentProps<"dialog"> {
    container?: string;
  }

  const Modal = useCallback(
    ({ container, ...props }: ModalProps) => (
      <dialog
        {...props}
        open={visible}
        className={twMerge(
          "w-full h-dvh fixed top-0 left-0 z-10 bg-black/10",
          props?.className
        )}
      >
        <span
          className="border absolute top-0 left-0 w-full h-full -z-1"
          onClick={turnOff}
        />
        <div className={twMerge("max-w-75 mx-auto mt-5 border", container)}>
          {props?.children ?? "need component"}
        </div>
      </dialog>
    ),
    [visible]
  );

  return {
    Modal,
    handler,
    turnOff,
    turnOn,
    visible,
  };
};

export default useModal;
