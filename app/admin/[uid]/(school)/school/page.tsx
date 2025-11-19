import { Fragment } from "react/jsx-runtime";
import SchoolItem from "../SchoolItem";
import AddSchoolButton from "./AddSchoolButton";

const SchoolPage = async ({ params }: { params: Promise<{ uid: string }> }) => {
  const { uid } = await params;
  const res = await fetch(`${process.env.API_URL}/school?uid=${uid}`);
  const data = await res.json();
  if (data.message || !uid) {
    return (
      <h1>
        Error:{data.message} {uid}
      </h1>
    );
  }

  const schools: School[] = [...data];
  return (
    <div className="container">
      <div className="row items-center">
        <h1 className="flex-1">
          <b>학교 목록 관리</b>: {schools.length}개의 학교
        </h1>
        <AddSchoolButton />
      </div>
      <ul className="">
        {schools.map((school, index) => {
          return (
            <Fragment key={school.id}>
              <SchoolItem {...school} />
              {index < schools.length && schools.length > 1 && (
                <div className="line" />
              )}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default SchoolPage;
