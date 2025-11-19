import { Collection, supabase } from "@/lib";
import { NextRequest } from "next/server";

const ref = supabase.from(Collection.LESSONS);

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return Response.json({ messge: "No uid" }, { status: 401 });
  }
  const { id } = await params;
  if (!id) {
    return Response.json({ message: "No lesson id" }, { status: 402 });
  }

  const { data, error } = await ref.select("*").match({ uid, id }).single();

  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }

  return Response.json(data);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return Response.json({ messge: "No uid" }, { status: 401 });
  }
  const { id } = await params;
  if (!id) {
    return Response.json({ message: "No lesson id" }, { status: 402 });
  }
  const payload = (await req.json()) as LessonPayload;

  const { data, error } = await ref
    .update({ ...payload, updated_at: new Date() })
    .match({ uid, id })
    .select("*")
    .single();

  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }
  return Response.json(data);
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return Response.json({ messge: "No uid" }, { status: 401 });
  }
  const { id } = await params;
  if (!id) {
    return Response.json({ message: "No lesson id" }, { status: 402 });
  }
  const { error } = await ref.delete().match({ uid, id });
  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }
  return Response.json({ success: true });
};
