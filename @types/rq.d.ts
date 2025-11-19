type ActionMethod = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";

interface MutationFuncProps<T1, T2 = any> {
  method: ActionMethod;
  payload: string | number | T1 | T2;
}
