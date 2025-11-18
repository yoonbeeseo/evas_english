import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSchools = ({ queryKey }: { queryKey: any[]; uid: string }) => {
  const queryClient = useQueryClient();

  const caching = () => queryClient.invalidateQueries({ queryKey });

  const mutation = useMutation({
    mutationFn: async ({
      method,
      payload,
    }: {
      method: ActionMethod;
      payload: string | number | SchoolPayload;
    }) => {
      let url = `http://localhost:3000/api/v1/school?uid=${uid}`;
      if (
        (method === "DELETE" && typeof payload === "string") ||
        typeof payload === "number"
      ) {
        url = url + "/" + payload;
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
    await mutation.mutateAsync({ method: "CREATE", payload });

  const onUpdate = async (payload: SchoolPayload) =>
    await mutation.mutateAsync({ method: "UPDATE", payload });

  return {
    onDelete,
    onCreate,
    onUpdate,
  };
};

export default useSchools;
