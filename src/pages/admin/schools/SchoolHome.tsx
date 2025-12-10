import { useSchools } from "../../../providers/rq";
import { schoolSorts } from "../../../lib";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const SchoolHome = ({ user, bizinfo }: AuthContext) => {
  const { data, isPending } = useSchools(user, bizinfo?.id);
  const [target, setTarget] = useState<null | SchoolSort>(null);
  const [schools, setSchools] = useState(data ?? []);
  useEffect(() => {
    const items: School[] = [];
    data?.map((item) => {
      if (target) {
        if (item.sort === target) {
          items.push(item);
        }
        return;
      }
      items.push(item);
    });

    setSchools(items);
  }, [data, target]);

  return (
    <div className="p-4 gap-2">
      <h1>학교 목록</h1>
      <ul className="flex flex-wrap gap-1">
        <li>
          <button
            onClick={() => setTarget(null)}
            className={twMerge(
              "label p-1 bg-white rounded-full border",
              !target && "bg-primary text-white"
            )}
          >
            전체
          </button>
        </li>
        {schoolSorts.map((sort) => (
          <li key={sort}>
            <button
              onClick={() => setTarget((prev) => (prev === sort ? null : sort))}
              className={twMerge(
                "label p-1 bg-white rounded-full border",
                target === sort && "bg-primary text-white"
              )}
            >
              {sort}
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {schools.map((school) => (
          <li key={school.id}>
            {school.name} - {school.sort}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolHome;
