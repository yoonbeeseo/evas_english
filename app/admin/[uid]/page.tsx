import Link from "next/link";
import { ComponentProps } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import Main from "./(admin)/Main";

const AdminPage = async ({ params }: { params: Promise<{ uid: string }> }) => {
  const { uid } = await params;

  const res = await fetch(`http://localhost:3000/api/v1/admin?uid=${uid}`);
  const data = await res.json();

  const pathname = `http://localhost:3000/admin/${uid}`;

  const items = [
    { data: data.students, href: "student", title: "원생관리" },
    { data: data.parents, href: "parent", title: "학부모관리" },
    { data: data.lessons, href: "lesson", title: "클래스관리" },
    { data: data.schools, href: "school", title: "학교관리" },
  ];

  return (
    <div className="h-dvh">
      <header className="flex items-center border-b-gray-200 border-b">
        <Link
          href={`http://localhost:3000/api/v1/admin?uid=${data.uid}`}
          className="flex-1 justify-start font-black text-xl hover:text-blue-500 bg-transparent"
        >
          {data.name}
        </Link>
        <button className="size-12 bg-transparent hover:bg-gray-100">
          <AiOutlineMenu />
        </button>
      </header>
      <div className="flex-1 p-5 gap-4">
        <h1>안녕하세요 {data.ceo} 원장님!</h1>
        <Main data={data} pathname={pathname} />
      </div>
    </div>
  );
};

export default AdminPage;
