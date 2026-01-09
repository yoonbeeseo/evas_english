import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useForm, useTextInput } from "../../../components/hooks";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  IoCheckmarkCircle,
  IoCheckmarkOutline,
  IoChevronDown,
  IoRefresh,
  IoSearchOutline,
} from "react-icons/io5";
import { Spinner } from "../../../components/ui";
import { twMerge } from "tailwind-merge";

export interface JusoFormProps {
  onSelectJuso: PropsFunc<JusoAddress>;
  closeFunc: Func;
}

const JusoForm = ({ onSelectJuso, closeFunc }: JusoFormProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const Keyword = useTextInput({ value: "원둔산6길 8-2" });
  const value = useDebouncedValue(Keyword.value);

  const { Form, handler } = useForm();

  const queryClient = useQueryClient();

  const queryKey = useMemo(() => [value, "juso"], [value]);

  interface Props {
    hasNextPage: boolean;
    currentPage: number;
    totalCount: number;
    data: Juso[];
  }

  const fetchFn = useCallback(
    async ({ pageParam }: { pageParam: number }): Promise<Props> => {
      console.log({ value });
      const url = `${import.meta.env.VITE_JUSO_URL}?keyword=${value}&confmKey=${
        import.meta.env.VITE_JUSO_KEY
      }&currentPage=${pageParam}&countPerPage=20&resultType=json`;
      const res = await fetch(url);
      const data = (await res.json()) as FetchJusoResult;

      const { common, juso } = data.results;

      if (common.errorCode === "1") {
        throw new Error(common.errorMessage);
      }
      const totalCount = parseInt(common.totalCount);

      setCurrentPage(pageParam);
      return {
        currentPage: parseInt(pageParam.toString()),
        data: juso,
        totalCount,
        hasNextPage: totalCount - currentPage * 20 > 0,
      };
    },
    [value]
  );
  const mutation = useMutation({
    mutationFn: async ({
      pageParam,
    }: {
      pageParam: number;
    }): Promise<Props> => {
      const data = await fetchFn({ pageParam });
      return data;
    },
    onError: (err) => console.log({ err }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const { isPending, fetchNextPage, data, error, hasNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      getNextPageParam: ({ hasNextPage, currentPage }: Props) => {
        return hasNextPage ? currentPage + 1 : undefined;
      },
      queryKey,
      queryFn: async ({ pageParam }): Promise<Props> => {
        const data = await fetchFn({ pageParam });
        return data;
      },
    });

  const [selectedJuso, setSelectedJuso] = useState<Juso | null>(null);
  const Rest = useTextInput();

  const Item = useCallback(
    ({ juso, isSelectedJuso }: { juso: Juso; isSelectedJuso?: boolean }) => (
      <li key={juso.bdMgtSn} className="text-sm flex">
        <button
          type="button"
          className={twMerge(
            "text-left text-ellipsis line-clamp-2 bg-transparent flex-1",
            isSelectedJuso && "text-primary"
          )}
          onClick={() => {
            setSelectedJuso((prev) => (prev ? null : juso));
            if (!isSelectedJuso) {
              return Rest.focus();
            }
          }}
        >
          <span className="bg-primary text-white text-xs p-1 rounded mr-1 py-0.5">
            {juso.zipNo}
          </span>
          {juso.roadAddrPart1}
        </button>
        {isSelectedJuso && (
          <IoCheckmarkCircle className="text-primary text-xl" />
        )}
      </li>
    ),
    [Rest]
  );

  const onSubmit = useCallback(() => {
    if (!selectedJuso) {
      handler(async () => {
        await mutation.mutateAsync({ pageParam: currentPage });
      });
      return;
    }
    if (Rest.message) {
      alert(Rest.message);
      return Rest.focus();
    }
    const payload: JusoAddress = { ...selectedJuso, rest: Rest.value };

    console.log(payload);
    onSelectJuso(payload);
    closeFunc();
  }, [handler, selectedJuso, Rest, onSelectJuso, closeFunc]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Form className="bg-white">
      <div className="flex-row border overflow-hidden">
        <div className="flex-1">
          {selectedJuso ? (
            <Rest.TextInput
              {...Rest.props}
              className="h-12 rounded-none border-primary"
              placeholder="나머지 상세 주소"
            />
          ) : (
            <Keyword.TextInput
              {...Keyword.props}
              className="h-12 rounded-none border-primary"
            />
          )}
        </div>
        {selectedJuso ? (
          <>
            <button
              className="size-12 flex-center text-xl rounded-none text-Gray"
              type="button"
            >
              <IoRefresh />
            </button>
            <button
              className="primary size-12 flex-center text-xl rounded-none"
              onClick={onSubmit}
            >
              <IoCheckmarkOutline />
            </button>
          </>
        ) : (
          <button
            className="primary size-12 flex-center text-xl rounded-none"
            disabled={isPending}
            onClick={onSubmit}
          >
            {isPending ? <Spinner /> : <IoSearchOutline />}
          </button>
        )}
      </div>
      <div className="">
        {isPending ? (
          <div className="p-5 items-center">
            <Spinner />
          </div>
        ) : data ? (
          <ul className="max-h-[50vh] p-2 overflow-y-auto grid gap-2">
            {selectedJuso ? (
              <Item juso={selectedJuso} isSelectedJuso />
            ) : (
              <>
                {data?.pages?.map((page, i) => (
                  <Fragment key={i}>
                    {page?.data?.map((item) => (
                      <Item key={item.bdMgtSn} juso={item} />
                    ))}
                  </Fragment>
                ))}
                {hasNextPage && (
                  <li>
                    <button
                      type="button"
                      className="w-full bg-transparent gap-2 flex-center label hover:text-Gray"
                      onClick={async () => await fetchNextPage()}
                    >
                      더 보기 <IoChevronDown />
                    </button>
                  </li>
                )}
              </>
            )}
          </ul>
        ) : (
          <label
            className="label py-12.5 text-center"
            htmlFor={Keyword.props.id}
          >
            {error?.message ?? "주소를 검색해주세요. 예) 원둔산6길 8-2"}
          </label>
        )}
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
