import { ComponentProps, useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface ModalProps extends ComponentProps<"div"> {
  state: boolean;
  handler: () => void;
}
const useModal = () => {
  const [state, setState] = useState(false);
  const handler = useCallback(() => setState((prev) => !prev), []);

  const props = useMemo<ModalProps>(
    () => ({ state, handler }),
    [state, handler]
  );

  const Modal = useCallback(
    ({ state, handler, ...props }: ModalProps) =>
      !state ? null : (
        <div
          {...props}
          className={twMerge(
            "fixed top-0 left-0 w-full h-dvh justify-center items-center",
            props?.className
          )}
        >
          <button
            type="button"
            onClick={handler}
            className={twMerge(
              "absolute top-0 left-0 size-full bg-black/20 backdrop-blur-[2px]"
            )}
          />
          {props?.children}
        </div>
      ),
    []
  );

  const Container = useCallback(
    (props: ComponentProps<"div">) => (
      <div
        {...props}
        className={twMerge(
          "border relative bg-white p-5 rounded-xl border-gray-200 shadow",
          props?.className
        )}
      />
    ),
    []
  );

  return { Modal, props, handler, Container };
};

export default useModal;
