import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSchools = ({ queryKey, uid }: { queryKey: any[]; uid: string }) => {
  const queryClient = useQueryClient();

  const caching = () => queryClient.invalidateQueries({ queryKey });

  const mutation = useMutation({
    mutationFn: async ({
      method,
      payload,
    }: {
      method: ActionMethod;
      payload: string | number | SchoolPayload | School;
    }) => {
      let url = `http://localhost:3000/api/v1/school?uid=${uid}`;
      if (
        (method === "DELETE" && typeof payload === "string") ||
        typeof payload === "number"
      ) {
        url = url + "/" + payload;
      } else if (method !== "POST") {
        url = `http://localhost:3000/api/v1/school/${
          (payload as School).id
        }?uid=${uid}`;
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
    await mutation.mutateAsync({ method: "PATCH", payload });
  const onPatch = async (payload: School) =>
    await mutation.mutateAsync({ method: "PATCH", payload });

  return {
    onDelete,
    onCreate,
    onUpdate,
    onPatch,
  };
};

export default useSchools;
