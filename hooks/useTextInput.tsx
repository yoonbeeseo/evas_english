"use client";
import { SetAction } from "@/@types/component";
import {
  ComponentProps,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

export interface TextInputBaseProps {
  focused: boolean;
  setFocused: SetAction<boolean>;
  value: string;
  onChangeText: (value: string) => void;
  alwaysDisplayMessage?: boolean;
  message: string | null;
}

export interface TextInputProps
  extends Omit<ComponentProps<"input">, "value">,
    TextInputBaseProps {
  label?: string;
  pw?: boolean;
}

const useTextInput = (payload?: {
  value?: string;
  validator?: (value: string) => string | null;
}) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(payload?.value ?? "");
  const message = useMemo(() => {
    if (payload?.validator) {
      return payload.validator(value);
    }
    if (value.length === 0) {
      return "아무것도 입력되지 않았습니다.";
    }
    return null;
  }, [value, payload]);

  const ref = useRef<HTMLInputElement>(null);
  const focus = useCallback(
    () => setTimeout(() => ref.current?.focus(), 100),
    []
  );
  const scrollIntoView = useCallback(
    () =>
      setTimeout(
        () => ref.current?.scrollIntoView({ behavior: "smooth" }),
        100
      ),
    []
  );

  const TextInput = useCallback(
    ({
      label,
      focused,
      setFocused,
      onChangeText,
      alwaysDisplayMessage,
      message,
      pw,
      ...props
    }: TextInputProps) => (
      <div className="gap-1">
        {label && (
          <label
            htmlFor={props?.id}
            className={twMerge("text-xs text-gray-500")}
          >
            {label}
            {props?.required && (
              <span className="text-blue-500 font-bold">{` *필수`}</span>
            )}
          </label>
        )}
        <input
          {...props}
          type={props?.type ?? (pw ? "password" : "text")}
          ref={ref}
          className={twMerge(
            "outline-none border border-gray-200 px-2 h-12 rounded focus:caret-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-transparent"
          )}
          onChange={(e) => onChangeText(e.target.value)}
          onFocus={(e) => {
            if (props?.onFocus) {
              return props.onFocus(e);
            }
            setFocused(true);
          }}
          onBlur={(e) => {
            if (props?.onBlur) {
              return props.onBlur(e);
            }
            setFocused(false);
          }}
          placeholder={props?.placeholder ?? "이곳에 입력하세요."}
        />
        {message && (alwaysDisplayMessage || focused) && (
          <label
            htmlFor={props?.id}
            className={twMerge("text-xs text-red-500")}
          >
            {message}
          </label>
        )}
      </div>
    ),
    []
  );

  const id = useId();
  const props = useMemo<TextInputBaseProps>(
    () => ({ value, onChangeText: setValue, focused, setFocused, id, message }),
    [value, setValue, focused, setFocused, id, message]
  );

  return {
    TextInput,
    focused,
    setFocused,
    value,
    setValue,
    props,
    focus,
    scrollIntoView,
    ref,
  };
};

export default useTextInput;
