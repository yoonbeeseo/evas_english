import SchoolModal from "../../SchoolModal";

const SchoolModalPage = async ({
  params,
}: {
  params: Promise<{ uid: string }>;
}) => {
  const { uid } = await params;
  return (
    <div>
      <SchoolModal queryKey={["school"]} uid={uid} />
    </div>
  );
};

export default SchoolModalPage;
