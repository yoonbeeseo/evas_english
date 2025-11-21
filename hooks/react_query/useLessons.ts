import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useLessons({
  uid,
  initialData,
}: {
  uid?: string | string[];
  initialData?: any[];
}) {
  const queryKey = ["lesson", uid];
  const queryClient = useQueryClient();
  const caching = () => queryClient.invalidateQueries({ queryKey });
  const { data, error, isPending } = useQuery({
    queryKey,
    queryFn: async (): Promise<Lesson[]> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lesson?uid=${uid}`
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.mesage);
      }
      return data ?? [];
    },
    initialData,
  });

  const mutation = useMutation({
    mutationFn: async ({
      method,
      payload,
    }: MutationFuncProps<LessonPayload, Lesson>) => {
      let url = process.env.NEXT_PUBLIC_API_URL + "/lesson";
      const surfix = `?uid=${uid}`;
      if (method === "DELETE") {
        url = url + "/" + payload + surfix;
      } else if (method === "POST") {
        url = url + surfix;
      } else {
        // @ts-expect-error: payload has id as lesson
        url = url + "/" + payload.id + surfix;
      }
      const res = await fetch(url, {
        method,
        body: method !== "DELETE" ? JSON.stringify(payload) : undefined,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.mesage);
      }
      return { method, data };
    },
    onSuccess: ({ method, data }) => {
      console.log("lesson method:", method, { data });
      caching();
    },
    onError(err) {
      console.log({ err });
    },
  });

  const onPOST = async (payload: LessonPayload) =>
    await mutation.mutateAsync({ method: "POST", payload });
  const onPATCH = async (payload: LessonPayload) =>
    await mutation.mutateAsync({ method: "PATCH", payload });
  const onPUT = async (payload: LessonPayload) =>
    await mutation.mutateAsync({ method: "PUT", payload });
  const onDELETE = async (payload: string | number) =>
    await mutation.mutateAsync({ method: "DELETE", payload });

  return {
    onPOST,
    onPATCH,
    onDELETE,
    data,
    isPending,
    error,
    onPUT,
  };
}
