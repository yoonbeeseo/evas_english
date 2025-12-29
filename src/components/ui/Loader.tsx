import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

interface Props {
  message?: string;
  container?: string;
  spinner?: string;
  messageClassName?: string;
}

export default function Loader({
  message,
  container,
  messageClassName,
  spinner,
}: Props) {
  return (
    <div
      className={twMerge("h-dvh flex-center animate-pulse gap-2", container)}
    >
      <Spinner className={twMerge("text-4xl ", spinner)} />
      <p className={twMerge("", messageClassName)}>{message ?? "Loading..."}</p>
    </div>
  );
}
