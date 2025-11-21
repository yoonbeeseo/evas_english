import StudentComponent from "../StudentComponent";

const StudentPage = async ({
  params,
}: {
  params: Promise<{ uid: string }>;
}) => {
  let isDone = false;
  const { uid } = await params;
  const res = await fetch(process.env.API_URL + "/student?uid=" + uid);
  const students = await res.json();
  if (!res.ok) {
    return <h1>Error: {students.message}</h1>;
  }

  const res1 = await fetch(process.env.API_URL + "/school?uid=" + uid);
  const schools = await res1.json();
  if (!res1.ok) {
    return <h1>Error2: {schools.message}</h1>;
  }
  const res2 = await fetch(process.env.API_URL + "/lesson?uid=" + uid);
  const lessons = await res2.json();
  if (!res2.ok) {
    return <h1>Error3: {lessons.message}</h1>;
  }
  // const res3 = await fetch(process.env.API_URL + '/parent?uid=' + uid )
  // const parents = await res3.json()
  // if( !res3.ok ){
  //   return <h1>Error4: {parents.message }</h1>
  // }
  isDone = true;

  const data = { students, lessons, schools };
  console.log(data);
  return <StudentComponent uid={uid} isDone={isDone} {...data} />;
};

export default StudentPage;
