"use client";
import { useAlertStore } from "@/components/ui/Alert";
import { useModal } from "@/hooks";
import useLessons from "@/hooks/react_query/useLessons";
import { AiOutlineEdit } from "react-icons/ai";
import { IoSearch, IoTrashOutline } from "react-icons/io5";
import LessonModal from "./LessonModal";

const LessonItem = ({
  uid,
  item: lesson,
}: ListItemProps<Lesson> & { uid: string }) => {
  const Edit = useModal();
  const { onDELETE } = useLessons({ uid });
  const { alert } = useAlertStore();
  return (
    <li>
      <div className="row item">
        <button
          className="flex-1 bg-transparent justify-start"
          onClick={Edit.handler}
        >
          {lesson.name}
        </button>
        <div className="row gap-0">
          <button className="icon" onClick={Edit.handler}>
            <AiOutlineEdit />
          </button>
          <button className="icon">
            <IoSearch />
          </button>
          <button
            className="icon delete"
            onClick={() =>
              alert("해당 클래스를 삭제하시겠습니까?", [
                { text: "취소" },
                {
                  text: "삭제",
                  onClick: async () => {
                    await onDELETE(lesson.id);
                    alert("삭제되었습니다.");
                  },
                  warning: true,
                },
              ])
            }
          >
            <IoTrashOutline />
          </button>
        </div>
      </div>
      <Edit.Modal {...Edit.props}>
        <Edit.Container>
          <LessonModal
            payload={lesson}
            onCancel={Edit.handler}
            onSuccess={Edit.handler}
          />
        </Edit.Container>
      </Edit.Modal>
    </li>
  );
};

export default LessonItem;
