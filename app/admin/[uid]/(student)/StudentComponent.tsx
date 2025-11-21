"use client";

import { AdminComponent } from "@/components/ui/feature";
import Spinner from "@/components/ui/Spinner";
import { useStudents } from "@/hooks/react_query";
import { IoAdd } from "react-icons/io5";
import StudentItem from "./StudentItem";

interface Props {
  students?: Student[];
  lessons?: Lesson[];
  schools?: School[];
  parents?: Parent[];
  isDone?: boolean;
  uid?: string;
}
const StudentComponent = ({
  isDone,
  lessons,
  parents,
  schools,
  students,
  uid: userId,
}: Props) => {
  const { data, error, isPending } = useStudents(userId, {
    lessons,
    schools,
    students,
    parents,
  });
  return (
    <AdminComponent>
      <div className="row">
        <AdminComponent.Back className="flex-1">
          <b>학생관리</b> {students ? students.length : 0}명의 학생
        </AdminComponent.Back>
        <AdminComponent.Link
          href="student/modal"
          className="text-xs hover:text-blue-500"
        >
          학생추가 <IoAdd className="text-lg" />
        </AdminComponent.Link>
      </div>
      {isPending ? (
        <Spinner />
      ) : error ? (
        <h1>Error: {error.message}</h1>
      ) : (
        <AdminComponent.List
          data={data}
          emptyMessage="추가된 학생이 없습니다."
          Component={(props) => <StudentItem {...props} uid={userId!} />}
          href="student/modal"
        />
      )}
    </AdminComponent>
  );
};

export default StudentComponent;
