import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

type Props = React.ComponentProps<"button">;

const Button = ({ ...props }: Props) => {
  return <button {...props} />;
};
function Cancel({ ...props }: Props) {
  return (
    <button
      {...props}
      type={props?.type ?? "button"}
      className={twMerge("px-2 flex-center text-Gray", props?.className)}
    >
      {props?.children ?? "Cancel"}
    </button>
  );
}
function Submit({ ...props }: Props) {
  return (
    <button
      {...props}
      className={twMerge("submit disabled:opacity-80", props?.className)}
    >
      {props?.disabled && <Spinner className="mr-2 text-lg" />}
      {props.children ?? "Submit"}
    </button>
  );
}

Button.Submit = Submit;
Button.Cancel = Cancel;

export default Button;
