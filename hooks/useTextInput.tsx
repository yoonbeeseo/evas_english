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
  container?: ComponentProps<"div">;
}

function useTextInput<TargetType = string>(payload?: {
  value?: string;
  validator?: (value: string) => string | null;
  state?: [TargetType, SetAction<TargetType>];
  target?: keyof TargetType;
}) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(
    payload?.state && payload?.target
      ? (payload.state[0][payload.target] as string)
      : payload?.value ?? ""
  );
  const message = useMemo(() => {
    if (payload?.validator) {
      return payload.validator(
        payload?.state && payload?.target
          ? (payload.state[0][payload.target] as string)
          : value
      );
    }
    if (
      payload?.state && payload?.target
        ? (payload.state[0][payload.target] as string)?.length === 0
        : value?.length === 0
    ) {
      return "아무것도 선택되지 않았습니다.";
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
      container,
      ...props
    }: TextInputProps) => (
      <div {...container} className={twMerge("gap-1", container?.className)}>
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
    () => ({
      value:
        payload?.state && payload?.target
          ? (payload.state[0][payload.target] as string)
          : value,
      onChangeText:
        payload?.state && payload?.target
          ? (value: string) =>
              payload?.state &&
              payload?.target &&
              payload?.state[1]((prev) => ({
                ...prev,
                [payload.target as keyof TargetType]: value,
              }))
          : setValue,
      focused,
      setFocused,
      id,
      message,
    }),
    [value, setValue, focused, setFocused, id, message, payload]
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
    message,
  };
}

export default useTextInput;
