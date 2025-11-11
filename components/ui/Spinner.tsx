import { ComponentProps } from "react";
import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

const Spinner = (props: ComponentProps<"svg">) => {
  return (
    <CgSpinner
      {...props}
      className={twMerge(
        "text-2xl animate-spin text-blue-500",
        props?.className
      )}
    />
  );
};

export default Spinner;
