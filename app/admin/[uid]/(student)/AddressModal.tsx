import { useTextInput } from "@/hooks";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const AddressModal = () => {
  const [keyword, setKeyword] = useState(
    process.env.NODE_ENV === "development" ? "원둔산6길 8-2" : ""
  );

  const Keyword = useTextInput();

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
          value={keyword}
          onChangeText={setKeyword}
          container={{ className: "flex-1" }}
          label="주소"
        />
        <button
          type="button"
          className="size-12 rounded text-white bg-blue-500 text-xl"
        >
          <IoSearch />
        </button>
      </div>
    </>
  );
};

export default AddressModal;
