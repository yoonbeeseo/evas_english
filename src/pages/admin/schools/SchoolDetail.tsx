import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useAtuh } from "../../../providers/contexts/Auth.use";
import { schoolRef } from "../../../lib";
import { Spinner } from "../../../components/ui";
import SchoolForm from "./SchoolForm";
import { IoChevronBack } from "react-icons/io5";

const SchoolDetail = () => {
  const { school_id } = useParams();
  const { user } = useAtuh();
  const { data, isPending, error } = useQuery({
    queryFn: async (): Promise<School> => {
      if (!user) {
        throw new Error("user only");
      }
      const doc = await schoolRef(user?.uid).doc(school_id).get();
      const data = { ...(doc.data() as School), id: doc.id };

      return data;
    },
    queryKey: [user?.uid, school_id],
  });

  const navi = useNavigate();
  return (
    <>
      <header className="border-b bg-white h-15 flex items-center">
        <button
          className="items-center px-2 gap-2 text-xl font-black bg-transparent"
          onClick={() => navi(-1)}
          disabled={isPending}
        >
          <IoChevronBack /> {isPending ? <Spinner /> : data?.name}
        </button>
      </header>
      {!isPending &&
        (error ? (
          <p>{error.message}</p>
        ) : (
          <div className="mt-4">
            <SchoolForm isStudent={false} payload={data} />
          </div>
        ))}
    </>
  );
};

export default SchoolDetail;
