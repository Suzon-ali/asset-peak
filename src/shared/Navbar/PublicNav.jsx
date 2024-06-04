import { Link, useLocation } from "react-router-dom";

const PublicNav = () => {
  const { pathname } = useLocation();

  return (
    <>
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
        className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium"
        to={"/login"}
      >
        Login
      </Link>
    </>
  );
};

export default PublicNav;
