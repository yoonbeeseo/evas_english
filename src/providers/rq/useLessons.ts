import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { lessonRef } from "../../lib";

export default function useLessons(user: User | null, bizinfo_id: string) {
  const queryClient = useQueryClient();
  const queryKey = useMemo(
    () => [user?.uid, "lessons", bizinfo_id],
    [bizinfo_id, user]
  );
  const mutation = useMutation({
    mutationFn: async ({
      payload,
      method,
    }: MutationFunc<Lesson | LessonPayload | string>) => {
      if (!user) {
        throw new Error("Only users!");
      }
      const ref = lessonRef(user.uid);
      switch (method) {
        case "POST":
          await ref.add({
            ...(payload as LessonPayload),
            created_at: new Date(),
            updated_at: new Date(),
            bizinfo_id: bizinfo_id ?? null,
          });
          return;
        case "PUT":
          await ref
            .doc((payload as Lesson)?.id)
            .update({ ...(payload as Lesson), updated_at: new Date() });
          return;

        case "DELETE":
          await ref.doc(payload as string).delete();
          return;
      }
    },
    onError: (err) => alert(err.message),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
  const data = useQuery({
    queryKey,
    queryFn: async (): Promise<Lesson[]> => {
      if (!user) {
        throw new Error("Only users!");
      }

      const snap = bizinfo_id
        ? await lessonRef(user?.uid).where("bizinfo_id", "==", bizinfo_id).get()
        : await lessonRef(user.uid).get();

      const data = snap.docs.map((doc) => ({
        ...(doc.data() as Lesson),
        id: doc.id,
      }));

      return data;
    },
  });

  const createLesson = async (payload: LessonPayload) =>
    await mutation.mutateAsync({ payload, method: "POST" });
  const replaceLesson = async (payload: Lesson) =>
    await mutation.mutateAsync({ payload, method: "PUT" });
  const deleteLesson = async (payload: string) =>
    await mutation.mutateAsync({ payload, method: "DELETE" });

  return {
    ...data,
    mutation,
    queryClient,
    createLesson,
    replaceLesson,
    deleteLesson,
  };
}
