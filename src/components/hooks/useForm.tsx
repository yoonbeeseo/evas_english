import { useCallback, useTransition, type ComponentProps } from "react";
import { Spinner } from "../ui";
import { twMerge } from "tailwind-merge";

export default function useForm() {
  const [isPending, handler] = useTransition();
  const Form = useCallback(
    ({ ...props }: ComponentProps<"form">) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (props?.onSubmit) {
            props.onSubmit(e);
          }
        }}
        className={twMerge("flex flex-col", props?.className)}
      >
        {isPending && <Spinner />}
        {props?.children ?? "Need Content"}
      </form>
    ),
    [isPending]
  );

  return { Form, isPending, handler };
}
