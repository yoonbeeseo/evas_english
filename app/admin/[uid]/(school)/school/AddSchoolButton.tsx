"use client";

import { useModal } from "@/hooks";
import { IoAdd } from "react-icons/io5";
import SchoolModal from "../SchoolModal";
import { useAuth } from "@/contexts/react/AuthProvider";

const AddSchoolButton = () => {
  const Add = useModal();
  const { user } = useAuth();

  return (
    <>
      <button
        className="icon w-auto text-xs text-gray-500 hover:text-blue-500"
        onClick={Add.handler}
      >
        학교 추가 <IoAdd className="text-lg" />
      </button>
      <Add.Modal {...Add.props}>
        <Add.Container className="p-0 w-75">
          <SchoolModal
            queryKey={["school"]}
            uid={user?.uid as string}
            onSuccess={Add.handler}
          />
        </Add.Container>
      </Add.Modal>
    </>
  );
};

export default AddSchoolButton;
