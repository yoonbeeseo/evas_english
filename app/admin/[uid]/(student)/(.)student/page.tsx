import { useParams } from "@/node_modules/next/navigation";
import StudentComponent from "../StudentComponent";

const InterceptedStudentPage = () => {
  const { uid } = useParams();
  console.log(uid);
  return (
    <>
      InterceptedStudentPage:{uid}
      <StudentComponent uid={uid} />
    </>
  );
};

export default InterceptedStudentPage;
