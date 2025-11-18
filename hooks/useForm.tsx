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
        className={twMerge(
          "relative gap-2 max-w-[400px] mx-auto w-full flex flex-col",
          props?.className
        )}
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

  const SubmitArea = useCallback(
    (props: ComponentProps<"div">) => (
      <div {...props} className={twMerge("row mt-2 gap-2", props?.className)} />
    ),
    []
  );

  const CancelButton = useCallback(
    (props: ComponentProps<"button">) => (
      <button
        {...props}
        className={twMerge("rounded disabled:opacity-50", props?.className)}
        type="button"
        disabled={props?.disabled ?? isPending}
      >
        {(props?.disabled ?? isPending) && <Spinner />}
        {props?.children}
      </button>
    ),
    [isPending]
  );
  return { handler, isPending, Form, SubmitButton, SubmitArea, CancelButton };
};

export default useForm;
