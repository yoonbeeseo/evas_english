import { useParams } from "react-router";

const SchoolDetail = () => {
  const { id } = useParams();
  return <>SchoolDetail: {id}</>;
};

export default SchoolDetail;
