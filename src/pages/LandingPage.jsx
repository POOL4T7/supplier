import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <Link to={"/supplier"}>Supplier Dashboard</Link>
    </div>
  );
};

export default LandingPage;
