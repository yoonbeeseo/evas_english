import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

const Spinner = (props: React.ComponentProps<"svg">) => {
  return (
    <CgSpinner
      {...props}
      className={twMerge("animate-spin", props?.className)}
    />
  );
};

export default Spinner;
