"use client";

import { useAuth } from "@/contexts/react/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const InterCeptedStudentPage = () => {
  const { user } = useAuth();
  // const { data, isPending } = useQuery({ initialData: user?.students})
  if (!user) {
    return null;
  }
  return (
    <div>
      InterCeptedStudentPage:{user.uid}
      <div>{user.students.length}</div>
    </div>
  );
};

export default InterCeptedStudentPage;
