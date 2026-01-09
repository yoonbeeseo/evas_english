import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useAtuh } from "../../../providers/contexts/Auth.use";
import { parentRef } from "../../../lib";
import { Spinner } from "../../../components/ui";
import ParentForm from "./ParentForm";

const ParentDetail = () => {
  const { parent_id } = useParams();

  const { user } = useAtuh();
  const { data, isPending, error } = useQuery({
    queryKey: [parent_id, user?.uid],
    queryFn: async () => {
      if (!user) {
        throw new Error("Only Users!");
      }
      const snap = await parentRef(user?.uid!).doc(parent_id).get();

      const data = { ...snap.data(), id: snap.id };

      return data as Parent;
    },
  });

  console.log({ data });
  return (
    <div>
      {isPending ? (
        <Spinner />
      ) : error ? (
        <h1>Error:{error.message}</h1>
      ) : (
        <div>
          <ParentForm payload={data} />
        </div>
      )}
    </div>
  );
};

export default ParentDetail;
