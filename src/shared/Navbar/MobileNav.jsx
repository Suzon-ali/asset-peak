import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import EmployeeNav from "./EmployeeNav";
import useAdmin from "../../hooks/userHr";
import PublicNav from "./PublicNav";
import HrNav from "./HrNav";

const MobileNav = ({ isMobileMenuOpen }) => {
  const { user } = useAuth();
  const [role] = useAdmin();
  return (
    <>
      <div className={` ${isMobileMenuOpen ? "block" : "hidden"}`}>
        {user && role === "employee" && <EmployeeNav />}
        {!user && <PublicNav />}
        {user && role === "hr" && <HrNav />}
      </div>
    </>
  );
};

export default MobileNav;
