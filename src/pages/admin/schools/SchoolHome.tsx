import { Spinner } from "../../../components/ui";
import { useSchools } from "../../../providers/rq";

const SchoolHome = ({ user }: { user: User }) => {
  const { data, isPending } = useSchools(user);
  console.log(data);
  return (
    <>
      {/* {true && <Spinner />} */}
      {data?.length}
    </>
  );
};

export default SchoolHome;
