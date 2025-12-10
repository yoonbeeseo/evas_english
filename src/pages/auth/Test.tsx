import { useParams, useLocation } from "react-router";

const Test = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  return (
    <div className="container">
      Test: {id}
      <h1>{pathname}</h1>
      <p className="label">hawel</p>
    </div>
  );
};

export default Test;
