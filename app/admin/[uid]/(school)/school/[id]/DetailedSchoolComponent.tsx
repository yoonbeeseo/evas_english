"use client";

import { IoChevronBack } from "react-icons/io5";
import SchoolModal from "../../SchoolModal";

interface Props extends School {
  uid: string;
}
const DetailedSchoolComponent = ({ uid, ...school }: Props) => {
  return (
    <>
      <div className="border max-w-100 mx-auto w-full">
        <SchoolModal queryKey={["schools"]} uid={uid} payload={school} />
      </div>
    </>
  );
};

export default DetailedSchoolComponent;
