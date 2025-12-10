import { Link } from "react-router";

const StudentHome = () => {
  return (
    <>
      StudentHome
      <Link to={":newStudent"}>navigate to new student</Link>
    </>
  );
};

export default StudentHome;
