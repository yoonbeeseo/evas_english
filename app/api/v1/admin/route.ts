import { AdminUser } from "@/contexts/zustand";
import { Collection, supabase } from "@/lib";
import { NextRequest } from "next/server";

export interface AdminLoginProps {
  id: string;
  pw: string;
}

const user: AdminUser = {
  name: "에바즈 영어 전문 학원",
  ceo: "안찬선",
  regi: "6129422897",
  emails: ["dexteryoon@icloud.com"],
  tels: ["01075910173"],
  address: null,
  subjects: ["영어"],
  uid: "",
};

export async function POST(req: Request) {
  const { id, pw } = (await req.json()) as AdminLoginProps;

  if (id !== process.env.ADMIN_ID) {
    return Response.json({ message: "관리자가 아닙니다." }, { status: 401 });
  }

  if (pw !== process.env.ADMIN_PW) {
    return Response.json({ message: "비밀번호가 틀립니다." }, { status: 401 });
  }
  const { data, error } = await supabase
    .from(Collection.USERS)
    .select("*")
    .eq("uid", process.env.ADMIN_UID)
    .single();

  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }
  return Response.json(data);
}

export async function GET(req: NextRequest) {
  const user_id = req.nextUrl.searchParams.get("uid");

  if (!user_id) {
    return Response.json({ message: "No user id" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from(Collection.USERS)
    .select(
      `
      *,
      students!students_uid_fkey(*),
      parents(*),
      schools(*),
      lessons(*)
        `
    )
    .eq("uid", user_id)
    .single();

  console.log(data, error);
  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }

  return Response.json(data);
}
