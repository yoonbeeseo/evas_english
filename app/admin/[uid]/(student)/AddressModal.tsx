"use client";

import { useAlertStore } from "@/components/ui/Alert";
import Spinner from "@/components/ui/Spinner";
import { useForm, useTextInput } from "@/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment, useCallback, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const AddressModal = () => {
  const Keyword = useTextInput({
    value: process.env.NODE_ENV === "development" ? "원둔산6길 8-2" : "",
  });

  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  interface ReturnKeyProps {
    data: any[];
    hasNextPage: boolean;
    currentPage: number;
    totalCount: number;
  }

  const { data, isPending, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [Keyword.value, "주소"],
      queryFn: async ({ pageParam: currentPage }): Promise<ReturnKeyProps> => {
        console.log({ isSearching });
        const url = `${process.env.NEXT_PUBLIC_JUSO_URL}?currentPage=${currentPage}&countPerPage=20&keyword=${Keyword.value}&confmKey=${process.env.NEXT_PUBLIC_JUSO_KEY}&resultType=json`;
        const res = await fetch(url);
        const data = await res.json();
        const current = parseInt(data.results.common.currentPage);
        const totalCount = parseInt(data.results.common.totalCount);
        const hasNextPage = totalCount / 20 > current;
        setIsSearching(false);

        if (data.results.common.errorCode !== "0") {
          throw new Error(data.results.common.errorMessage);
        }

        console.log(data.results.juso);
        return {
          data: data.results.juso,
          hasNextPage,
          currentPage: current,
          totalCount,
        };
      },
      initialPageParam: page,
      getNextPageParam: ({ hasNextPage, currentPage }) =>
        hasNextPage ? currentPage + 1 : undefined,
      enabled: isSearching,
    });

  const { alert } = useAlertStore();

  const onSubmit = useCallback(async () => {
    console.log("submit fn");
    if (Keyword.value.length === 0) {
      console.log("keyword");
      return alert(Keyword.message, [{ onClick: Keyword.focus }]);
    }
    if (Keyword.value.split(" ").length === 1) {
      console.log("keyword");
      return alert("2글자 이상 ㄱㄱ", [{ onClick: Keyword.focus }]);
    }
    console.log("start searching!");
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
          onSubmitEditing={onSubmit}
        />
        <button
          type="button"
          className="size-12 rounded text-white bg-blue-500 text-xl"
          onClick={onSubmit}
          disabled={isPending}
        >
          <IoSearch />
        </button>
      </div>
      <div>
        {/* data 받기전 
        키워드 입력 중
        키워드 검색 중 로딩
        키워드 검색 후 자료 있을 때 자료 
        키워드 검색 후 자료 없으면 검색된 주소 없음 표시
        */}
        {isSearching ? (
          isPending && <Spinner />
        ) : data?.pages && data?.pages.length > 0 ? (
          <ul>
            {data.pages.map((page, index) => (
              <Fragment key={index}>
                {index}.
                <>
                  {page.data.map((item, i) => (
                    <li key={i}>
                      {i + 1}. {item.roadAddrPart1}
                    </li>
                  ))}
                </>
              </Fragment>
            ))}
          </ul>
        ) : (
          <label htmlFor={Keyword.props.id} className="py-4 label text-center">
            예) 봉동동서로 122, 원둔산6길 8-2
          </label>
        )}
      </div>
    </>
  );
};

export default AddressModal;
