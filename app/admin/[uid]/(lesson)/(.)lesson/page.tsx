"use client";

import Spinner from "@/components/ui/Spinner";
import useLessons from "@/hooks/react_query/useLessons";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import LessonItem from "../LessonItem";
import AddLessonButton from "../AddLessonButton";

const InterceptedLessonPage = () => {
  const { uid } = useParams();
  const { data, error, isPending } = useLessons({ uid });
  const pathname = usePathname();

  return (
    <div className="container">
      <div className="row items-center">
        <h1 className="flex-1">InterceptedSchoolPage</h1>
        <AddLessonButton />
      </div>
      {isPending ? (
        <Spinner />
      ) : (
        <ul>
          {error ? (
            <p>{error.message}</p>
          ) : data?.length === 0 ? (
            <Link href={pathname + "/modal"}>Click here to add school</Link>
          ) : (
            data?.map((school, index) => (
              <Fragment key={school.id}>
                <LessonItem key={school.id} {...school} />
                {index < data.length - 1 && data.length > 1 && (
                  <div className="line" />
                )}
              </Fragment>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default InterceptedLessonPage;
