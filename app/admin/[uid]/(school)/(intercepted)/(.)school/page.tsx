"use client";
import { useAuth } from "@/contexts/react/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useMemo } from "react";
import { useSchools } from "@/hooks/react_query";
import Spinner from "@/components/ui/Spinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SchoolItem from "../../SchoolItem";
import AddSchoolButton from "../../school/AddSchoolButton";

const InterceptedSchoolPage = () => {
  const { user } = useAuth();
  const queryKey = useMemo(() => ["school", user?.uid], [user]);
  const { data, isPending, error } = useQuery({
    initialData: user?.schools,
    queryKey,
    queryFn: async (): Promise<School[]> => {
      if (!user) {
        return [];
      }
      const res = await fetch(
        `http://localhost:3000/api/v1/school?uid=${user.uid}`
      );
      const schools = await res.json();
      if (!res.ok) {
        throw new Error(schools.message);
      }
      return schools ?? [];
    },
  });

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
          ) : data?.length === 0 ? (
            <Link href={pathname + "/modal"}>Click here to add school</Link>
          ) : (
            data?.map((school, index) => (
              <Fragment key={school.id}>
                <SchoolItem key={school.id} {...school} />
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

export default InterceptedSchoolPage;
