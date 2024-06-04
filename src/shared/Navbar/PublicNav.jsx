import { Link, useLocation } from "react-router-dom";

const PublicNav = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col lg:flex-row">
      <Link
        className={`  px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/join-as-employee" && " text-indigo-600"
        }`}
        to={"/join-as-employee"}
      >
        Join as Employee
      </Link>
      <Link
        className={` px-3 py-2 rounded-md text-sm font-medium ${
          pathname === "/join-as-HR" && " text-indigo-600"
        }`}
        to={"/join-as-HR"}
      >
        Join as HR Manager
      </Link>
      <Link
        className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hidden lg:block"
        to={"/login"}
      >
        Login
      </Link>
    </div>
  );
};

export default PublicNav;
