"use client";
import { SetAction } from "@/@types/component";
import { useEffect, useState } from "react";

export default function useDebounce(
  value: string,
  delay: number = 500
): [string, SetAction<string>] {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return [debouncedValue, setDebouncedValue];
}
