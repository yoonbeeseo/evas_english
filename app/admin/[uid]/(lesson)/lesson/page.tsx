import { AdminComponent } from "@/components/ui/feature";
import { IoAdd } from "react-icons/io5";
import LessonItem from "../LessonItem";

const LessonPage = async ({ params }: { params: Promise<{ uid: string }> }) => {
  const { uid } = await params;
  const res = await fetch(process.env.API_URL + "/lesson?uid=" + uid);
  const data = await res.json();
  if (!res.ok) {
    return <h1>{data.message}</h1>;
  }
  return (
    <AdminComponent>
      <div className="row">
        <AdminComponent.Back className="flex-1">클래스관리</AdminComponent.Back>
        <AdminComponent.Link href="lesson/modal">
          클래스 추가하기
          <IoAdd className="text-lg" />
        </AdminComponent.Link>
      </div>
      <AdminComponent.List
        data={data}
        Component={(props) => <LessonItem {...props} uid={uid} />}
      />
    </AdminComponent>
  );
};

export default LessonPage;

// http://localhost:3000/admin/0caf7f7e-be64-4e50-a513-caf493989cf0/admin/0caf7f7e-be64-4e50-a513-caf493989cf0/lesson/modal
