import { Collection, supabase } from "@/lib";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return Response.json({ message: "No uid" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from(Collection.SCHOOLS)
    .select("*")
    .eq("uid", uid);

  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }

  return Response.json(data);
}
