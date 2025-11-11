"use client";

import Spinner from "@/components/ui/Spinner";
import { ComponentProps, useCallback, useTransition } from "react";
import { twMerge } from "tailwind-merge";

const useForm = () => {
  const [isPending, handler] = useTransition();
  const Form = useCallback(
    (props: ComponentProps<"form">) => (
      <form
        {...props}
        onSubmit={(e) => {
          e.preventDefault();
          if (props?.onSubmit) {
            props.onSubmit(e);
          }
        }}
        className="relative gap-2 max-w-[400px] mx-auto w-full flex flex-col"
      >
        {isPending && <Spinner className="mx-auto" />}
        {props?.children}
      </form>
    ),
    [isPending]
  );

  const SubmitButton = useCallback(
    (props: ComponentProps<"button">) => (
      <button
        {...props}
        type="submit"
        className={twMerge(
          "rounded bg-blue-500 text-white disabled:bg-blue-400",
          props?.className
        )}
        disabled={props?.disabled ?? isPending}
      >
        {(props.disabled ?? isPending) && <Spinner className="text-white" />}
        {props?.children ?? "Submit"}
      </button>
    ),
    [isPending]
  );
  return { handler, isPending, Form, SubmitButton };
};

export default useForm;
