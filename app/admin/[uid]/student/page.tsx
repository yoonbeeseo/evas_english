const StudentPage = async ({
  params,
}: {
  params: Promise<{ uid: string }>;
}) => {
  const { uid } = await params;

  return <>StudentPage: {uid} </>;
};

export default StudentPage;
