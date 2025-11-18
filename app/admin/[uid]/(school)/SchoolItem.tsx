"use client";
import { useAlertStore } from "@/components/ui/Alert";
import { useAuth } from "@/contexts/react/AuthProvider";
import { useModal } from "@/hooks";
import { useSchools } from "@/hooks/react_query";
import { AiOutlineEdit } from "react-icons/ai";
import { IoSearchOutline, IoTrashOutline } from "react-icons/io5";
import SchoolModal from "./SchoolModal";

const SchoolItem = ({ ...school }: School) => {
  const { user } = useAuth();
  const { onDelete } = useSchools({
    queryKey: ["schools"],
    uid: user?.uid as string,
  });
  const { alert } = useAlertStore();
  const Edit = useModal();
  return (
    <div className="row items-center text-gray-500 hover:text-black pr-2 hover:bg-gray-50">
      <button
        onClick={Edit.handler}
        className="bg-transparent flex-1 justify-start"
      >
        {school.name}
      </button>
      <div className="row items-center gap-0">
        <button onClick={Edit.handler} className="icon hover:bg-gray-100">
          <AiOutlineEdit />
        </button>
        <button className="icon hover:bg-gray-100">
          <IoSearchOutline />
        </button>
        <button
          onClick={async () => {
            await onDelete(school.id);
            alert("삭제되었습니다.");
          }}
          className="icon hover:bg-gray-100 delete"
        >
          <IoTrashOutline />
        </button>
      </div>

      <Edit.Modal {...Edit.props}>
        <Edit.Container className="p-0 w-75">
          <SchoolModal
            queryKey={["school"]}
            uid={user?.uid as string}
            payload={school}
            onCancel={Edit.handler}
            onSuccess={Edit.handler}
          />
        </Edit.Container>
      </Edit.Modal>
    </div>
  );
};

export default SchoolItem;
