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

interface SelectProps {
  data: (string | number)[];
  container?: ComponentProps<"div">;
}
interface SelectPayload extends ComponentProps<"select"> {
  focused: boolean;
  setFocused: SetAction<boolean>;
  onChangeText: (value: string) => void;
  alwaysDisplayMessage?: boolean;
  message: string | null;
  label?: string;
  onSubmitEditing?: () => void;
}

interface Payload<T> {
  value?: string;
  state?: [T, SetAction<T>];
  target?: keyof T;
  validator?: (value: string) => string | null;
}
export default function useSelect<T = string>(payload?: Payload<T>) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(
    payload?.state && payload?.target
      ? (payload.state[0][payload.target] as string)
      : payload?.value ?? ""
  );

  const focusSelect = useCallback(
    () =>
      setTimeout(() => {
        if (selectRef.current) {
          selectRef?.current?.focus();
          setTimeout(() => {
            selectRef?.current?.showPicker();
          }, 10);
          return;
        }
      }, 10),
    []
  );

  const id = useId();
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

  const props = useMemo<SelectPayload>(
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
                [payload.target as keyof T]: value,
              }))
          : setValue,
      focused,
      setFocused,
      id,
      message,
    }),
    [focused, setFocused, payload, id, message, value, setValue]
  );

  const Select = useCallback(
    ({
      data,
      focused,
      setFocused,
      onChangeText,
      alwaysDisplayMessage,
      message,
      label,
      onSubmitEditing,
      container,
      ...props
    }: SelectProps & SelectPayload) => (
      <div {...container}>
        {label && (
          <label
            htmlFor={props?.id}
            className="text-xs text-gray-500"
            onClick={focusSelect}
          >
            {label}
          </label>
        )}
        {/* <button
          className="border border-gray-200 rounded"
          onClick={focusSelect}
          type="button"
        > */}
        <div
          onClick={() => {
            if (!focused) {
              focusSelect();
            }
          }}
          className={twMerge(
            "cursor-pointer border border-gray-200 bg-gray-50 h-12 rounded pr-2",
            focused && "bg-transparent border-blue-500"
          )}
        >
          <select
            {...props}
            id={props?.id}
            ref={selectRef}
            className="outline-none cursor-pointer flex-1 pl-1"
            onFocus={(e) => {
              if (props?.onFocus) {
                props.onFocus(e);
              }
              setFocused(true);
            }}
            onBlur={(e) => {
              if (props?.onBlur) {
                props.onBlur(e);
              }
              setFocused(false);
            }}
            onChange={(e) => {
              if (props?.onChange) {
                props.onChange(e);
              }
              onChangeText(e.target.value);
              if (e.target.value.length > 0) {
                setTimeout(() => onSubmitEditing && onSubmitEditing(), 10);
              }
            }}
          >
            <option value="">선택</option>
            {data.map((option, index) => (
              <option key={index} onClick={() => setFocused(false)}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* </button> */}
        {message && (
          <label htmlFor={props?.id} className="text-xs text-red-500">
            {message}
          </label>
        )}
      </div>
    ),
    [focusSelect]
  );

  return { Select, selectRef, focusSelect, props, message };
}
