import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SchoolModal from "../../SchoolModal";
import DetailedSchoolComponent from "./DetailedSchoolComponent";

const DetailedSchoolPage = async ({
  params,
}: {
  params: Promise<{ id: number; uid: string }>;
}) => {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return <>Not valid admin</>;
  }
  const { id, uid } = await params;

  const res = await fetch(`${process.env.API_URL}/school/${id}?uid=${uid}`);
  const school = (await res.json()) as School;

  return (
    <div className="container">
      <DetailedSchoolComponent {...school} uid={uid!} />
    </div>
  );
};

export default DetailedSchoolPage;
