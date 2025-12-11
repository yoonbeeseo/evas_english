import { useParents } from "../../../providers/rq";
import { Link } from "react-router";
import { IoAdd, IoSearchOutline, IoTrashOutline } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import { Spinner } from "../../../components/ui";
import { useState } from "react";

const ParentHome = ({ user, bizinfo }: AuthContext) => {
  const { data, isPending, error, deleteParent } = useParents(
    user,
    bizinfo?.id!
  );
  const [parents, setParents] = useState(data ?? []);
  return (
    <div className="p-4 gap-2">
      <div className="flex-row justify-between items-center">
        <h1>학교 목록</h1>
        <Link
          to={"new"}
          className="border bg-primary text-white flex-center p-1 px-2 rounded-full"
        >
          <IoAdd />
          추가
        </Link>
      </div>
      <ul className="flex flex-wrap gap-1 items-center">
        <li>
          <button
            // onClick={() => setTarget(null)}
            className={twMerge(
              "label p-1 bg-white rounded-full border"
              //   !target && "bg-primary text-white"
            )}
          >
            전체
          </button>
        </li>
        {isPending ? (
          <Spinner />
        ) : (
          [].map((sort) => (
            <li key={sort}>
              <button
                onClick={
                  () => {}
                  //   setTarget((prev) => (prev === sort ? null : sort))
                }
                className={twMerge(
                  "label p-1 bg-white rounded-full border"
                  //   target === sort && "bg-primary text-white"
                )}
              >
                {sort}
              </button>
            </li>
          ))
        )}
      </ul>
      <ul className="container rounded border p-0">
        {isPending ? (
          <div className="flex-center py-10 animate-pulse">
            <Spinner />
          </div>
        ) : parents.length > 0 ? (
          parents.map((parent, index) => (
            <li key={parent.id} className={twMerge(index !== 0 && "border-t")}>
              <div className="flex-row pl-2 hover:bg-gray-50">
                <Link
                  className="gap-1 items-center flex-1 bg-transparent py-1"
                  to={parent.id}
                >
                  <span className="label bg-primary text-white rounded p-0.5 px-1">
                    {parent.title}
                  </span>
                  {parent.name}
                </Link>
                <div className="flex-row">
                  <button className="icon icon-s w-6">
                    <IoSearchOutline />
                  </button>
                  <button
                    className="icon icon-s"
                    onClick={async () => {
                      if (confirm(`${parent.name}을(를) 삭제하시겠습니까?`)) {
                        await deleteParent(parent.id);
                        alert("삭제되었습니다.");
                      }
                    }}
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <Link to="new" className="py-5 flex-center label">
            추가된 학부모가 없습니다.
          </Link>
        )}
      </ul>
    </div>
  );
};

export default ParentHome;
