"use client";

import { AdminUser } from "@/contexts/zustand";
import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  pathname: string;
  data: AdminUser & {
    students: Student[];
    lessons: Lesson[];
    parents: Parent[];
    schools: School[];
  };
}
const Main = ({
  data: { students, schools, lessons, parents, ...user },
  pathname,
}: Props) => {
  const data = [
    { name: "원생관리", target: "명", data: students, href: "/student" },
    { name: "클래스관리", target: "반", data: lessons, href: "/lesson" },
    { name: "학교관리", target: "개", data: schools, href: "/school" },
    { name: "학부모관리", target: "명", data: parents, href: "/parent" },
  ];
  return (
    <>
      {data.map(({ name, target, data, href }) => (
        <Container key={name}>
          <div className="row items-center border-b pb-2 border-gray-200">
            <p className="flex-1">
              {name} {data.length}
              {target}
            </p>
            <Link
              href={`${pathname}${href}`}
              className="h-auto text-xs bg-transparent text-gray-500"
            >
              더보기
            </Link>
          </div>
          <div>section here</div>
        </Container>
      ))}
    </>
  );
};

function Container(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={twMerge(
        "border p-2 border-gray-200 rounded-xl bg-white hover:shadow",
        props?.className
      )}
    />
  );
}

export default Main;
