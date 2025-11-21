"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { IoChevronBack } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export const BackButton = (props: ComponentProps<"button">) => {
  const router = useRouter();

  return (
    <button
      {...props}
      className={twMerge("bg-transparent px-0 justify-start", props?.className)}
      onClick={props?.onClick ?? router.back}
      type="button"
    >
      <IoChevronBack />
      {props?.children}
    </button>
  );
};

export const LinkButton = ({
  href,
  ...props
}: ComponentProps<"a"> & { href: string }) => (
  <Link
    href={href}
    {...props}
    className={twMerge(
      "bg-transparent text-xs hover:text-blue-500",
      props?.className
    )}
  />
);
