import { useMutation, useQuery } from "@tanstack/react-query";
import { studentRef } from "../../lib";

export default function useStudents(user: User, bizinfo?: Bizinfo) {
  const queryKey = ["students", user.uid, bizinfo?.id];
  const data = useQuery({
    queryKey,
    queryFn: async () => {
      if (!user || !bizinfo) {
        throw new Error("no user");
      }
      const snap = await studentRef(user?.uid)
        .where("bizinfo_ids", "array-contains", bizinfo.id)
        .get();
      if (!snap) {
        throw new Error("no data");
      }
      const students = snap.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Student)
      );

      return students;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({
      method,
      payload,
    }: MutationFunc<
      Student | StudentPayload | string | PatchProps<StudentPayload>
    >) => {
      if (!user || !bizinfo) {
        throw new Error("no user");
      }

      try {
        if (method === "POST") {
          const data = await studentRef(user.uid).add({
            ...(payload as StudentPayload),
            created_at: new Date(),
            updated_at: new Date(),
          });

          return data;
        } else if (method === "PUT") {
          const data = await studentRef(user.uid)
            .doc((payload as Student).id)
            .set({ ...(payload as Student), updated_at: new Date() });

          return data;
        } else if (method === "PATCH") {
          const { id, target, value } = payload as PatchProps<StudentPayload>;

          const data = await studentRef(user.uid)
            .doc(id)
            .update({ [target]: value, updated_at: new Date() });

          return data;
        } else if (method === "DELETE") {
          const data = await studentRef(user.uid)
            .doc(payload as string)
            .delete();
          return data;
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  });

  return { ...data };
}
