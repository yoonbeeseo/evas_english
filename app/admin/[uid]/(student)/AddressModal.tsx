import { useAlertStore } from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useTextInput } from "@/hooks";
import useDebounce from "@/hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useCallback, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const AddressModal = () => {
  const [keyword, setKeyword] = useDebounce(
    process.env.NODE_ENV === "development" ? "원둔산6길 8-2" : ""
  );

  const Keyword = useTextInput({
    value: keyword,
  });

  const [isSearching, setIsSearching] = useState(false);

  const { data, error, isPending } = useInfiniteQuery({
    queryKey: [keyword, isSearching],
    queryFn: async ({ pageParam: page }): Promise<JusoData> => {
      const countPerPage = 20;
      const url = `${process.env.NEXT_PUBLIC_JUSO_URL}?currentPage=${page}&countPerPage=${countPerPage}&keyword=${keyword}&confmKey=${process.env.NEXT_PUBLIC_JUSO_KEY}&resultType=json`;
      const res = await fetch(url);
      const data = await res.json();
      const { common, juso } = data.results as {
        common: Record<"errorCode" | "errorMessage" | "totalCount", string>;
        juso: Juso[];
      };
      setIsSearching(false);
      if (common.errorCode !== "0") {
        throw new Error(common.errorMessage);
      }

      return {
        currentPage: page,
        data: juso ?? [],
        hasNextPage: false,
        totalCount: 0,
      };
    },
    initialPageParam: 1,
    getNextPageParam: ({ hasNextPage, currentPage }) => {
      if (hasNextPage) {
        return currentPage + 1;
      }
      return undefined;
    },
  });

  const { alert } = useAlertStore();
  const onSubmit = useCallback(() => {
    if (Keyword.message) {
      return alert(Keyword.message, [{ onClick: Keyword.focus }]);
    }
    setIsSearching(true);
  }, [Keyword, alert]);

  return (
    <>
      <div
        className={twMerge(
          "row gap-2 min-w-75 items-end",
          Keyword.message && "items-center"
        )}
      >
        <Keyword.TextInput
          {...Keyword.props}
          container={{ className: "flex-1" }}
          label="주소"
          value={keyword}
          onChangeText={setKeyword}
        />
        <button
          type="button"
          className="size-12 rounded text-white bg-blue-500 text-xl"
          onClick={onSubmit}
        >
          <IoSearch />
        </button>
      </div>
      <div>
        {!isPending ? (
          !data ? (
            <label
              htmlFor={Keyword.props.id}
              className="py-5 text-center text-xs text-gray-500"
            >
              {error ? error.message : "예) 봉동동서로 122 / 원둔산6길 8-2"}
            </label>
          ) : (
            <ul className="max-h-[30vh] overflow-y-auto">
              {data ? (
                (data as { pages: JusoData[] })?.pages?.map((page, index) => (
                  <Fragment key={index}>
                    {page.data?.map((juso) => (
                      <li key={juso.bdMgtSn}>{juso.roadAddrPart1}</li>
                    ))}
                  </Fragment>
                ))
              ) : (
                <>no data</>
              )}
            </ul>
          )
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default AddressModal;
