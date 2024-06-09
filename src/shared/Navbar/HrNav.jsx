import { Link, useLocation } from "react-router-dom";

const HrNav = () => {
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
          pathname === "/asset-list" && " text-indigo-600"
        }`}
        to={"/asset-list"}
      >
        Asset List
      </Link>
      <Link
        className={` px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/add-asset" && " text-indigo-600"
        }`}
        to={"/add-asset"}
      >
        Add an Asset
      </Link>
      <Link
        className={` px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/all-request" && " text-indigo-600"
        }`}
        to={"/all-request"}
      >
        All Request
      </Link>

      <Link
        className={` px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/my-employee-list" && " text-indigo-600"
        }`}
        to={"/my-employee-list"}
      >
        My Employee List
      </Link>

      <Link
        className={` px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/add-employee" && " text-indigo-600"
        }`}
        to={"/add-employee"}
      >
        Add and Employee
      </Link>
    </div>
  );
};

export default HrNav;
