"use client";
import { AdminComponent } from "@/components/ui/feature";
import { IoAdd } from "react-icons/io5";
import LessonItem from "./LessonItem";
import Spinner from "@/components/ui/Spinner";
import useLessons from "@/hooks/react_query/useLessons";

interface Props {
  uid: string;
  error: null | Error;
  isPending: boolean;
  data: Lesson[];
}

const LessonComponent = ({ data, error, isPending, uid }: Props) => {
  const { data: lessons } = useLessons({ uid, initialData: data });
  return (
    <AdminComponent>
      <div className="row">
        <AdminComponent.Back className="flex-1">
          <b>클래스관리</b> {data.length}개의 클래스
        </AdminComponent.Back>
        <AdminComponent.Link href="lesson/modal">
          클래스 추가하기
          <IoAdd className="text-lg" />
        </AdminComponent.Link>
      </div>
      <AdminComponent>
        {isPending ? (
          <Spinner />
        ) : error ? (
          <h1>{error.message}</h1>
        ) : !data || data?.length === 0 ? (
          <AdminComponent.Link href="lesson/modal">
            Click here to add school
          </AdminComponent.Link>
        ) : (
          <AdminComponent.List
            data={lessons}
            Component={(props) => <LessonItem {...props} uid={uid} />}
            withLine
          />
        )}
      </AdminComponent>
    </AdminComponent>
  );
};
export default LessonComponent;
