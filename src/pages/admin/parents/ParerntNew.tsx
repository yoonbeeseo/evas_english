import { useAtuh } from "../../../providers/contexts/Auth.use";
import ParentForm from "./ParentForm";

const ParerntNew = () => {
  const { user } = useAtuh();
  return <ParentForm isAdmin={user?.bizinfos && user.bizinfos.length > 0} />;
};

export default ParerntNew;
