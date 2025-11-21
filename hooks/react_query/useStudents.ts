import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useStudents(
  uid?: string,
  initialData?: {
    students?: Student[];
    lessons?: Lesson[];
    schools?: School[];
    parents?: Parent[];
  }
) {
  const queryClient = useQueryClient();
  const queryKey = ["students", uid];
  const { data, isPending, error } = useQuery({
    queryKey,
    queryFn: async (): Promise<Student[]> => {
      if (!uid) {
        throw new Error("No Uid!");
      }
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/student?uid=" + uid
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return data ?? [];
    },
    enabled: !uid,
    initialData: initialData?.students,
  });

  const mutation = useMutation({
    mutationFn: async ({ method, payload }: MutationFuncProps<Student>) => {
      if (!uid) {
        throw new Error("No uid");
      }
      let url = process.env.NEXT_PUBLIC_API_URL + "/student";
      if (method !== "POST") {
        url = url + "/" + payload.id + "?uid=" + uid;
      } else {
        url = url + "?uid=" + uid;
      }

      const res = await fetch(url, {
        method,
        body: method === "DELETE" ? undefined : JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, method };
    },
    onSuccess: ({ data, method }) => {
      console.log("Student", method, "success", { data });
      queryClient.invalidateQueries({ queryKey });
    },
    onError(err) {
      console.log({ err });
    },
  });

  const onPOST = async (payload: StudentPayload) =>
    await mutation.mutateAsync({ method: "POST", payload });
  const onPUT = async (payload: Student) =>
    await mutation.mutateAsync({ method: "PUT", payload });
  const onPATCH = async (payload: Student) =>
    await mutation.mutateAsync({ method: "PATCH", payload });
  const onDELETE = async (payload: string) =>
    await mutation.mutateAsync({ method: "DELETE", payload });

  return {
    data,
    isPending,
    error,
    onPOST,
    onPUT,
    onPATCH,
    onDELETE,
  };
}
