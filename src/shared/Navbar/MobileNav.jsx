import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import EmployeeNav from "./EmployeeNav";

const MobileNav = ({ isMobileMenuOpen }) => {
    const {user} = useAuth();
  return (
    <>
    {!user && <div
      className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
      id="mobile-menu"
    >
      <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
        <Link
          className=" 
         px-3 py-2 rounded-md text-sm font-medium"
          to={"/"}
        >
          Home
        </Link>
        <Link
          className=" 
         px-3 py-2 rounded-md text-sm font-medium"
          to={"/join-as-employee"}
        >
          Join as Employee
        </Link>
        <Link
          className=" 
         px-3 py-2 rounded-md text-sm font-medium"
          to={"/join-as-HR"}
        >
          Join as HR Manager
        </Link>
        <Link
          className="bg-gray-900 hidden lg:block text-white px-3 py-2 rounded-md text-sm font-medium"
          to={"/login"}
        >
          Login
        </Link>
      </div>
    </div>}
    <div className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
    {user && <EmployeeNav />}
    </div>
    
    </>
  );
};

export default MobileNav;
