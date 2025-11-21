import { Collection, supabase } from "@/lib";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return Response.json({ message: "No Uid" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from(Collection.STUDENTS)
    .select("*")
    .eq("uid", uid);

  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }
  return Response.json(data);
};
