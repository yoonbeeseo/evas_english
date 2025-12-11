import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type Dispatch,
  type SetStateAction,
} from "react";
import { twMerge } from "tailwind-merge";

interface Payload<T> {
  state?: [T, Dispatch<SetStateAction<T>>];
  value?: string;
  validator?: (value: string) => string | null;
  target?: keyof T;
}

interface Props {
  onChangeText: Dispatch<SetStateAction<string>> | ((value: string) => void);
  id?: string;
}

interface SelectProps extends Omit<ComponentProps<"select">, "value">, Props {
  label?: string;
  message?: string | null;
  data: string[];
  placeholder?: string;
  onSubmitEditing?: Func;
}

export default function useDexylect<T = any>(payload?: Payload<T>) {
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const focusSelect = useCallback(
    () => setTimeout(() => selectRef.current?.focus(), 100),
    []
  );
  const scrollToSelect = useCallback(
    () =>
      setTimeout(
        () => selectRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      ),
    []
  );
  const showPicker = useCallback(
    () => setTimeout(() => selectRef.current?.showPicker(), 100),
    []
  );

  const Select = useCallback(
    ({
      data,
      label,
      message,
      onChangeText,
      placeholder,
      onSubmitEditing,
      ...props
    }: SelectProps) => (
      <div className="gap-1">
        {label && (
          <label onClick={showPicker} htmlFor={props?.id} className="label">
            {label}
          </label>
        )}
        <select
          {...props}
          ref={selectRef}
          onChange={(e) => {
            const val = e.target.value;
            if (props?.onChange) {
              props.onChange(e);
            }
            // const found = data.find((item) => item.text === val);
            // if (found) {
            //   onChangeText(found as any);
            // }
            onChangeText(val);
            if (onSubmitEditing) {
              setTimeout(onSubmitEditing, 100);
            }
          }}
          className={twMerge("input px-1", props?.className)}
        >
          <option value="">{placeholder ?? "Select an option"}</option>
          {data?.map((item, index) => (
            // <option value={item.text} key={index}>
            //   {item.text}
            // </option>
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        {message && (
          <label
            htmlFor={props?.id}
            onClick={showPicker}
            className="label message"
          >
            {message}
          </label>
        )}
      </div>
    ),
    [showPicker]
  );
  const [value, setValue] = useState<string>(
    payload?.state && payload?.target
      ? (payload?.state[0][payload.target as keyof T] as string)
      : payload?.value ?? ""
  );
  const message = useMemo(() => {
    if (payload?.validator) {
      return payload.validator(value);
    }
    if (value.length === 0) {
      return "아무것도 선택되지 않았습니다.";
    }
    return null;
  }, [value, payload]);
  const id = useId();
  const props = useMemo(
    () => ({
      id,
      value:
        payload?.state && payload?.target
          ? payload?.state[0][payload.target]
          : value,
      onChangeText:
        payload?.state && payload?.target
          ? (val: string) => {
              payload?.state?.[1]((prev) => ({
                ...prev,
                [payload?.target as keyof T]: val,
              }));
              setValue(val);
            }
          : setValue,
      message,
    }),
    [id, value, setValue, message, payload]
  );

  return {
    props,
    selectRef,
    focusSelect,
    scrollToSelect,
    Select,
    message,
    value,
    showPicker,
  };
}
