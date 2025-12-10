import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { schoolRef } from "../../lib";

const message = "Access Granted to Only Admin Users!";
export default function useSchools(user: null | User, bizinfo_id: string) {
  const queryClient = useQueryClient();
  const queryKey = useMemo(
    () => [user?.uid, "schools", bizinfo_id],
    [user, bizinfo_id]
  );

  const data = useQuery({
    queryKey,
    queryFn: async (): Promise<School[]> => {
      if (!user) {
        throw new Error(message);
      }

      const snap = bizinfo_id
        ? await schoolRef(user.uid).where("bizinfo_id", "==", bizinfo_id).get()
        : await schoolRef(user.uid).get();

      const schools = snap.docs.map((doc) => ({
        ...(doc.data() as School),
        id: doc.id,
      }));

      console.log({ schools });
      return schools;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({
      payload,
      method,
    }: MutationFunc<
      School | SchoolPayload | string | PatchProps<SchoolPayload>
    >) => {
      if (!user) {
        throw new Error(message);
      }
      try {
        switch (method) {
          case "POST":
            await schoolRef(user?.uid).add({
              ...(payload as SchoolPayload),
              created_at: new Date(),
              updated_ad: new Date(),
              bizinfo_id: bizinfo_id ?? null,
            });
            return;
          case "PATCH":
            const { id, target, value } = payload as PatchProps<SchoolPayload>;
            await schoolRef(user?.uid)
              .doc(id)
              .update({ [target]: value, updated_at: new Date() });
            return;
          case "PUT":
            const { id: schoolId, ...newSchool } = payload as School;
            await schoolRef(user?.uid)
              .doc(schoolId)
              .update({ ...newSchool, updated_at: new Date() });
            return;
          case "DELETE":
            await schoolRef(user?.uid)
              .doc(payload as string)
              .delete();
            return;
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    onError: (err) => {
      return err;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const createSchool = async (payload: SchoolPayload) =>
    await mutation.mutateAsync({ payload, method: "POST" });
  const patchSchool = async (payload: PatchProps<SchoolPayload>) =>
    await mutation.mutateAsync({ payload, method: "PATCH" });
  const replaceSchool = async (payload: School) =>
    await mutation.mutateAsync({ payload, method: "PUT" });
  const deleteSchool = async (payload: string) =>
    await mutation.mutateAsync({ payload, method: "DELETE" });

  return {
    ...data,
    createSchool,
    patchSchool,
    replaceSchool,
    deleteSchool,
    queryKey,
    mutation,
    queryClient,
  };
}
