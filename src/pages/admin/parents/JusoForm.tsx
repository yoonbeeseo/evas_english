import { useEffect, useState } from "react";
import { useForm, useTextInput } from "../../../components/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";

const JusoForm = () => {
  const Keyword = useTextInput({ value: "원둔산6길 8-2" });
  const value = useDebouncedValue(Keyword.value);

  const { Form, handler } = useForm();

  const {} = useInfiniteQuery({
    initialPageParam: 1,
    getNextPageParam: () => {
      return undefined;
    },
    queryKey: [value, "juso"],
    queryFn: async ({ pageParam }): Promise<JusoAddress[]> => {
      const url = `${import.meta.env.VITE_JUSO_URL}?keyword=${value}&confmKey=${
        import.meta.env.VITE_JUSO_KEY
      }&currentPage=${pageParam}&countPerPage=20`;
      const res = await fetch(url);
      const data = (await res.json()) as FetchJusoResult;

      const { common, juso } = data.results;

      console.log({ common, juso });
      if (common.errorCode !== "1") {
      }
      return [];
    },
  });
  return (
    <Form className="bg-white">
      <div className="flex-row border overflow-hidden">
        <div className="flex-1">
          <Keyword.TextInput
            {...Keyword.props}
            className="h-12 rounded-none border-primary"
          />
        </div>
        <button className="primary size-12 flex-center text-xl rounded-none">
          <IoSearchOutline />
        </button>
      </div>
      <div className="border">
        <label></label>
      </div>
    </Form>
  );
};

export default JusoForm;

function useDebouncedValue(payload: string, time: number = 300) {
  const [value, setValue] = useState(payload);
  useEffect(() => {
    const fn = () =>
      setTimeout(() => {
        {
          setValue(payload);
        }
      }, time);
    fn();
    return () => {
      fn();
    };
  }, [time, payload]);

  return value;
}
