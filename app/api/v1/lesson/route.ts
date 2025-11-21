import { Collection, supabase } from "@/lib";
import { NextRequest } from "next/server";

const ref = supabase.from(Collection.LESSONS);

export const GET = async (req: NextRequest) => {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return Response.json({ message: "No uid" }, { status: 401 });
  }
  const { data, error } = await ref.select("*").eq("uid", uid);
  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }
  return Response.json(data);
};

export const POST = async (req: NextRequest) => {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return Response.json({ message: "No uid" }, { status: 401 });
  }
  const payload = (await req.json()) as LessonPayload;

  const { data, error } = await ref
    .insert({ ...payload, uid })
    .select("*")
    .single();
  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }
  return Response.json(data);
};

export const DELETE = async (req: NextRequest) => {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return Response.json({ message: "No uid" }, { status: 401 });
  }
  const { error } = await ref.delete().eq("uid", uid);
  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }
  return Response.json({ success: true });
};
