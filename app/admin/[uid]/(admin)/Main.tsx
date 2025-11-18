"use client";

import { AdminUser } from "@/contexts/zustand";
import Link from "next/link";
import { ComponentProps } from "react";
import {
  IoBusinessOutline,
  IoEaselOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
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
          <ul className="flex gap-2 overflow-x-auto">
            {data && data.length > 0 ? (
              data.map((item) => (
                <li key={item.id}>
                  <Link
                    className="flex-col size-12 bg-transparent hover:bg-gray-50 rounded gap-1"
                    href={pathname + href + "/" + item.id}
                  >
                    <div className="icon size-8 items-center justify-center text-gray-500">
                      {target === "명" ? (
                        <IoPersonCircleOutline />
                      ) : target.includes("클래스") ? (
                        <IoEaselOutline />
                      ) : (
                        <IoBusinessOutline />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate max-w-12">
                      {item.name}
                    </p>
                  </Link>
                </li>
              ))
            ) : (
              <>section here</>
            )}
          </ul>
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
