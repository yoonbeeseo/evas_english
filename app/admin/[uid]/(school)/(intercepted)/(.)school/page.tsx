"use client";
import { useAuth } from "@/contexts/react/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useSchools } from "@/hooks/react_query";
import Spinner from "@/components/ui/Spinner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SchoolItem from "../../SchoolItem";

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
  const { onDelete, onCreate, onUpdate } = useSchools({ queryKey });

  const pathname = usePathname();
  if (!user) {
    return null;
  }

  return (
    <>
      <h1>InterceptedSchoolPage</h1>
      {isPending ? (
        <Spinner />
      ) : (
        <div>
          {error ? (
            <p>{error.message}</p>
          ) : data?.length === 0 ? (
            <Link href={pathname + "/modal"}>Click here to add school</Link>
          ) : (
            data?.map((school) => (
              <SchoolItem
                key={school.id}
                {...school}
                onDelete={async () => onDelete(school.id)}
              />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default InterceptedSchoolPage;
