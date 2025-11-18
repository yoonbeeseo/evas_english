import { Collection, supabase } from "@/lib";
import { NextRequest } from "next/server";

const ref = supabase.from(Collection.SCHOOLS);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const uid = req.nextUrl.searchParams.get("uid");
  const { id } = await params;
  if (!uid) {
    return Response.json({ message: "No uid" }, { status: 401 });
  }
  if (!id) {
    return Response.json({ message: "No school id" }, { status: 401 });
  }

  const { data, error } = await ref.select("*").match({ uid, id }).single();
  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }
  return Response.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: number | string }> }
) {
  const uid = req.nextUrl.searchParams.get("uid");
  const { id } = await params;
  if (!uid) {
    return Response.json({ message: "No uid" }, { status: 401 });
  }
  const payload = (await req.json()) as SchoolPayload;

  const { data, error } = await ref
    .update({ ...payload, uid })
    .match({ uid, id })
    .select("*")
    .single();

  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }

  return Response.json(data);
}
