import { useCallback, useId, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Payload {
  state?: boolean;
}

interface SwitchProps extends Payload {
  message?: string;
  onClick: Func;
  id: string;
  required?: boolean;
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

  const Switch = useCallback(
    ({ message, state, onClick, id, required }: SwitchProps) => {
      return (
        <div className="flex-row items-center justify-between">
          <label htmlFor={id} className="label">
            {message ?? "need message here"}
            {required && <span className="label text-Red ml-1">*필수입력</span>}
          </label>
          <button
            type="button"
            id={id}
            onClick={onClick}
            className={twMerge(
              "border rounded-full size-6 w-9 items-center transition-all",
              state && "bg-primary"
            )}
          >
            <span
              className={twMerge(
                "border size-4 rounded-full bg-white transition-all ml-1",
                state && "ml-3.5"
              )}
            />
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
  };
};

export default useSwitch;
