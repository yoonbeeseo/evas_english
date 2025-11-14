import { Collection, supabase } from "@/lib";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const { uid } = await params;
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
    .eq("uid", uid)
    .single();

  if (error) {
    return Response.json({ message: error.message }, { status: 501 });
  }

  return Response.json(data);
}
