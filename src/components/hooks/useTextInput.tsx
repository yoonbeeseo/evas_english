import { useCallback, useId, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Payload<T> {
  state?: [T, React.Dispatch<React.SetStateAction<T>>];
  value?: string;
  validator?: (value: string) => string | null;
  target?: keyof T;
}

interface Props {
  onChangeText:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  id?: string;
}

interface TextInputProps extends React.ComponentProps<"input">, Props {
  label?: string;
  message?: string | null;
}

export default function useTextInput<T = any>(payload?: Payload<T>) {
  const [value, setValue] = useState(
    payload?.state && payload?.target
      ? payload.state[0][payload?.target]
      : payload?.value ?? ""
  );
  const [isTyping, setIsTyping] = useState(false);

  const ref = useRef<HTMLInputElement | null>(null);
  const focus = useCallback(
    () => setTimeout(() => ref.current?.focus(), 100),
    []
  );

  const scrollTo = useCallback(
    () =>
      setTimeout(
        () => ref.current?.scrollIntoView({ behavior: "smooth" }),
        100
      ),
    []
  );

  const id = useId();
  const message = useMemo(() => {
    if (payload?.validator) {
      return payload.validator(value as string);
    }
    if ((value as string).length === 0) {
      return "아무것도 입력되지 않았습니다.";
    }
    return null;
  }, [payload, value]);

  console.log(value);

  const props = useMemo<Props>(
    () => ({
      value:
        payload?.state && payload?.target
          ? payload?.state[0][payload?.target]
          : value,
      onChangeText:
        payload?.state && payload?.target && payload.state[1]
          ? (val: string) => {
              payload?.state?.[1]((prev) => ({
                ...prev,
                [payload?.target as keyof T]: val,
              }));
              setValue(val);
            }
          : setValue,
      id,
      message,
    }),
    [value, setValue, id, message, payload]
  );

  const TextInput = useCallback(
    ({ label, message, onChangeText, ...props }: TextInputProps) => (
      <div className="gap-1">
        {label && (
          <label htmlFor={props?.id} className="label">
            {label}
            {props?.required && <span className="message ml-1">*필수입력</span>}
          </label>
        )}
        <input
          {...props}
          ref={ref}
          type={props?.type ?? "text"}
          className={twMerge("input", props?.className)}
          onChange={(e) => {
            const val = e.target.value;
            if (props?.onChange) {
              props.onChange(e);
            }
            onChangeText(val);
          }}
          onFocus={(e) => {
            if (props?.onFocus) {
              props.onFocus(e);
            }
            setIsTyping(true);
          }}
          onBlur={(e) => {
            if (props?.onBlur) {
              props.onBlur(e);
            }
            setIsTyping(false);
          }}
          value={props?.value}
        />
        {message && (props?.required ? true : isTyping) && (
          <label htmlFor={props?.id} className="label message">
            {message}
          </label>
        )}
      </div>
    ),
    []
  );

  return {
    TextInput,
    props,
    focus,
    value,
    scrollTo,
    ref,
    message,
  };
}
