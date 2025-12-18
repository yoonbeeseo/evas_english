import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { IoCheckmark } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface Payload {
  state?: boolean;
}

interface SwitchProps extends Payload, PropsWithChildren {
  message?: string;
  onClick: Func;
  id: string;
  required?: boolean;
  onSubmitEditing?: Func;
  isCheckbox?: boolean;
}

const useSwitch = (payload?: Payload) => {
  const [state, setState] = useState(payload?.state ?? false);
  const turnOn = useCallback(() => setState(false), []);
  const turnOff = useCallback(() => setState(true), []);
  const handler = useCallback(() => setState((prev) => !prev), []);

  const id = useId();
  const props = useMemo(
    () => ({ state, id, onClick: handler }),
    [state, id, handler]
  );

  const ref = useRef<HTMLDivElement>(null);
  const focus = useCallback(() => ref.current?.focus(), []);

  const Switch = useCallback(
    ({
      message,
      state,
      onClick,
      id,
      required,
      children,
      onSubmitEditing,
      isCheckbox,
    }: SwitchProps) => {
      return (
        <div
          className="flex-row justify-between focus:border focus:rounded focus:p-1 gap-2"
          ref={ref}
        >
          <label htmlFor={id} className="label flex-1">
            {children ?? message ?? "need message here"}
            {required && <span className="label text-Red ml-1">*필수입력</span>}
          </label>
          <button
            type="button"
            id={id}
            onClick={() => {
              onClick();
              if (onSubmitEditing) {
                onSubmitEditing();
              }
            }}
            className={twMerge(
              !isCheckbox
                ? "border rounded-full size-6 w-9 items-center transition-all"
                : "size-6 flex-center",
              state && "bg-primary"
            )}
          >
            {!isCheckbox ? (
              <span
                className={twMerge(
                  "border size-4 rounded-full bg-white transition-all ml-1",
                  state && "ml-3.5"
                )}
              />
            ) : (
              <IoCheckmark
                className={twMerge(state ? "text-white" : "text-Gray")}
              />
            )}
          </button>
        </div>
      );
    },
    []
  );

  return {
    Switch,
    props,
    turnOn,
    turnOff,
    handler,
    state,
    focus,
  };
};

export default useSwitch;
