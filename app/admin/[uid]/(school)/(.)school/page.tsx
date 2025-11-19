"use client";
import { useAuth } from "@/contexts/react/AuthProvider";
import { Fragment } from "react";
import Spinner from "@/components/ui/Spinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SchoolItem from "../SchoolItem";
import AddSchoolButton from "../school/AddSchoolButton";
import { useSchools } from "@/hooks/react_query";

const InterceptedSchoolPage = () => {
  const { user } = useAuth();
  const {
    data: schools,
    isPending,
    error,
  } = useSchools({ queryKey: ["school"], uid: user?.uid as string });
  const pathname = usePathname();
  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <div className="row items-center">
        <h1 className="flex-1">InterceptedSchoolPage</h1>
        <AddSchoolButton />
      </div>
      {isPending ? (
        <Spinner />
      ) : (
        <ul>
          {error ? (
            <p>{error.message}</p>
          ) : schools?.length === 0 ? (
            <Link href={pathname + "/modal"}>Click here to add school</Link>
          ) : (
            schools?.map((school, index) => (
              <Fragment key={school.id}>
                <SchoolItem key={school.id} {...school} />
                {index < schools.length - 1 && schools.length > 1 && (
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

export default InterceptedSchoolPage;
