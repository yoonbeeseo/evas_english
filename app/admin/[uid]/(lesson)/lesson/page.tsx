import LessonComponent from "../LessonComponent";

const LessonPage = async ({ params }: { params: Promise<{ uid: string }> }) => {
  let isPending = true;
  const { uid } = await params;
  const res = await fetch(process.env.API_URL + "/lesson?uid=" + uid);
  const data = await res.json();
  isPending = false;
  if (!res.ok) {
    return <h1>{data.message}</h1>;
  }
  return (
    <LessonComponent
      data={data}
      error={data?.message ?? null}
      uid={uid}
      isPending={isPending}
    />
  );
};

export default LessonPage;

// http://localhost:3000/admin/0caf7f7e-be64-4e50-a513-caf493989cf0/admin/0caf7f7e-be64-4e50-a513-caf493989cf0/lesson/modal
