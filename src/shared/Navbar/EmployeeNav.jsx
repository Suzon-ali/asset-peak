import { Link, useLocation } from "react-router-dom";

const EmployeeNav = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col lg:flex-row">
      <Link
        className={` px-3 py-2 rounded-md text-sm font-medium hidden lg:block ${
          pathname === "/" && " text-indigo-600"
        }`}
        to={"/"}
      >
        Home
      </Link>

      <Link
        className={`  px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/my-assets" && " text-indigo-600"
        }`}
        to={"/my-assets"}
      >
        My Requested Assets
      </Link>
      <Link
        className={` px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/my-team" && " text-indigo-600"
        }`}
        to={"/my-team"}
      >
        My Team
      </Link>
      <Link
        className={` px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/request-for-asset" && " text-indigo-600"
        }`}
        to={"/request-for-asset"}
      >
        Request for Asset
      </Link>
    </div>
  );
};

export default EmployeeNav;
