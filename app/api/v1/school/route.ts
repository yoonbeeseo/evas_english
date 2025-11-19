import { Collection, supabase } from "@/lib";
import { NextRequest } from "next/server";

const ref = supabase.from(Collection.SCHOOLS);

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return Response.json({ message: "No uid" }, { status: 401 });
  }

  console.log({ uid }, typeof uid);
  const { data, error } = await ref.select("*").eq("uid", uid);
  if (error) {
    console.log(error.message);
    return Response.json({ message: error.message }, { status: 501 });
  }

  return Response.json(data);
}

export async function POST(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return Response.json({ message: "No uid" }, { status: 401 });
  }
  const payload = (await req.json()) as SchoolPayload;

  const { data, error } = await ref
    .insert({ ...payload, uid })
    .select("*")
    .single();

  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }

  return Response.json(data);
}
