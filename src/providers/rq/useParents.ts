import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { parentRef } from "../../lib";

export default function useParents(user: User | null, bizinfo_id: string) {
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => [], [user, bizinfo_id]);
  const data = useQuery({
    queryKey,
    queryFn: async (): Promise<Parent[]> => {
      if (!user) {
        throw new Error("Only Users!");
      }
      const snap = await parentRef(user.uid)
        .where("bizinfo_ids", "array-contains", bizinfo_id)
        .get();
      const data = snap.docs.map((doc) => ({
        ...(doc.data() as Parent),
        id: doc.id,
      }));
      console.log("parents:", data);
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({
      payload,
      method,
    }: MutationFunc<Parent | ParentPayload | string>) => {
      if (!user) {
        throw new Error("Only Users!");
      }
      const ref = parentRef(user.uid);

      switch (method) {
        case "POST":
          await ref.add({
            ...(payload as Parent),
            created_at: new Date(),
            updated_at: new Date(),
          });
          return;

        case "PUT":
          await ref
            .doc((payload as Parent).id)
            .update({ ...(payload as Parent), updated_at: new Date() });
          return;

        case "DELETE":
          await ref.doc(payload as string).delete();
          return;
      }
    },
    onError(err) {
      console.log(err.message);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const createParent = async (payload: ParentPayload) =>
    await mutation.mutateAsync({ payload, method: "POST" });
  const replaceParent = async (payload: Parent) =>
    await mutation.mutateAsync({ payload, method: "PUT" });
  const deleteParent = async (payload: string) =>
    await mutation.mutateAsync({ payload, method: "DELETE" });

  return { ...data, queryClient, createParent, replaceParent, deleteParent };
}
