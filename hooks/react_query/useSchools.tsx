import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useSchools = ({ queryKey, uid }: { queryKey: any[]; uid: string }) => {
  const { data, isPending, error } = useQuery({
    queryKey,
    queryFn: async (): Promise<School[]> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/school?uid=${uid}`
      );

      const schools = await res.json();
      if (!res.ok) {
        throw new Error(schools.message);
      }
      return schools ?? [];
    },
  });

  const queryClient = useQueryClient();

  const caching = () => queryClient.invalidateQueries({ queryKey });

  const mutation = useMutation({
    mutationFn: async ({
      method,
      payload,
    }: MutationFuncProps<SchoolPayload, School>) => {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/school`;
      if (
        (method === "DELETE" && typeof payload === "string") ||
        typeof payload === "number"
      ) {
        url = url + "/" + payload + `?uid=${uid}`;
      } else if (method !== "POST") {
        url = `${url}/${(payload as School).id}?uid=${uid}`;
      } else {
        url = url + `?uid=${uid}`;
      }

      const res = await fetch(url, {
        body: method !== "DELETE" ? JSON.stringify(payload) : undefined,
        method,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return data;
    },
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      console.log("success");
      caching();
    },
  });

  const onDelete = async (payload: number | string) =>
    await mutation.mutateAsync({ method: "DELETE", payload });

  const onCreate = async (payload: SchoolPayload) =>
    await mutation.mutateAsync({ method: "POST", payload });

  const onUpdate = async (payload: School) =>
    await mutation.mutateAsync({ method: "PUT", payload });

  const onPatch = async (payload: School) =>
    await mutation.mutateAsync({ method: "PATCH", payload });

  return {
    onDelete,
    onCreate,
    onUpdate,
    onPatch,
    isPending,
    error,
    data,
  };
};

export default useSchools;
