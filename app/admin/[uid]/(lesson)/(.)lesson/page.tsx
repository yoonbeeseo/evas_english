"use client";

import useLessons from "@/hooks/react_query/useLessons";
import { useParams } from "next/navigation";
import LessonComponent from "../LessonComponent";

const InterceptedLessonPage = () => {
  const { uid } = useParams();
  const { data, error, isPending } = useLessons({ uid });
  return (
    <LessonComponent
      data={data ?? []}
      error={error}
      isPending={isPending}
      uid={uid as string}
    />
  );
};

export default InterceptedLessonPage;
