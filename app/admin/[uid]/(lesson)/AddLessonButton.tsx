import Link from "next/link";
import { IoAdd } from "react-icons/io5";

const AddLessonButton = () => {
  return (
    <Link href={"lesson/modal"} className="text-xs">
      클래스 추가 <IoAdd />
    </Link>
  );
};

export default AddLessonButton;
