import { useState, type ReactNode } from "react";
import { Spinner } from "../../components/ui";
import { useAtuh } from "../../providers/contexts/Auth.use";
import { useLessons, useSchools } from "../../providers/rq";
import { twMerge } from "tailwind-merge";
import { IoAdd, IoBusinessOutline, IoEaselOutline } from "react-icons/io5";
import { Link } from "react-router";

const AdminHome = () => {
  const { user } = useAtuh();

  const [target, setTarget] = useState<null | Bizinfo>(
    user?.bizinfos[0] ?? null
  );

  const School = useSchools(user, target?.id!);
  const Lesson = useLessons(user, target?.id!);

  return (
    <div className="p-4 gap-2">
      <div className="flex-row gap-1">
        {user?.bizinfos.map((bizinfo) => (
          <button
            onClick={() => setTarget(bizinfo)}
            key={bizinfo.id}
            className={twMerge(
              "label border p-1 bg-white",
              target?.id === bizinfo.id && "bg-primary text-white"
            )}
          >
            {bizinfo.name}
          </button>
        ))}
      </div>
      {target && (
        <div className="container rounded border">
          <h1>{target.name}</h1>
          <div className="gap-1">
            <p className="label">
              {target.address.roadAddrPart1}, {target.address.rest}
            </p>
            <p>{target.ceo} 원장님</p>
          </div>
        </div>
      )}
      <Section
        bizinfo_id={target?.id!}
        isPending={School.isPending}
        data={
          School.data
            ? [
                ...School.data,
                ...School.data,
                ...School.data,
                ...School.data,
                ...School.data,
              ]
            : []
        }
        title="학교목록"
        message="Add School"
        Component={({ item, index }: MapItemProps<School>) => (
          <button className="admin">
            <IoBusinessOutline />
            <p>{item.name}</p>
          </button>
        )}
        to="schools"
      />
      <Section
        bizinfo_id={target?.id!}
        isPending={Lesson.isPending}
        data={
          Lesson.data
            ? [
                ...Lesson.data,
                ...Lesson.data,
                ...Lesson.data,
                ...Lesson.data,
                ...Lesson.data,
              ]
            : []
        }
        title="클래스목록"
        message="Add Lesson"
        Component={({ item, index }: MapItemProps<Lesson>) => (
          <button className="admin">
            <IoEaselOutline />
            <p>{item.name}</p>
          </button>
        )}
        to="lessons"
      />
    </div>
  );
};

export default AdminHome;

interface SectionProps {
  isPending: boolean;
  data: any[];
  title: string;
  Component: PropsFunc<{ item: any; index: number }, ReactNode>;
  message?: string;
  to: string;
  bizinfo_id: string;
}
function Section({
  data,
  isPending,
  title,
  Component,
  message,
  to,
  bizinfo_id,
}: SectionProps) {
  return (
    <div className="container border">
      <div className="flex-row items-center border-b pb-1">
        <button className="flex-1 bg-transparent font-bold text-xl gap-2 items-center">
          <span>{title}</span>
          {data.length}
        </button>
        <Link
          className="bg-transparent label"
          to={`${to}?bizinfo_id=${bizinfo_id}`}
        >
          더보기
        </Link>
      </div>
      <ul className="flex gap-2 overflow-x-auto">
        {isPending ? (
          <div className="relative">
            <Spinner className="blank_spinner" />
            <div className="blank h-12" />
          </div>
        ) : data.length > 0 ? (
          data.map((item, index) => (
            <Component key={index} item={item} index={index} />
          ))
        ) : (
          <Link
            className="h-12 flex-center label gap-1 flex-1"
            to={`${to}/new?bizinfo_id=${bizinfo_id}`}
          >
            <IoAdd />
            {message ?? "No data"}
          </Link>
        )}
      </ul>
    </div>
  );
}
