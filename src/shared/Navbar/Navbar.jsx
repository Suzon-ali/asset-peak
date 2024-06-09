import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import EmployeeNav from "./EmployeeNav";
import PublicNav from "./PublicNav";
import MobileNav from "./MobileNav";
import useAdmin from "../../hooks/useAdmin";
import HrNav from './HrNav';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const userMenuRef = useRef(null);
  const { pathname } = useLocation();
  const [role] = useAdmin();

  console.log("role", role)


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setIsUserMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged Out");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <nav className="z-10 w-full border-b border-black/10 pr-3">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${
                isMobileMenuOpen && "bg-gray-700 ring-inset"
              }`}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`block h-6 w-6 `}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`hidden h-6 w-6 ${
                  isMobileMenuOpen ? "block" : "hidden"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center  lg:items-stretch lg:justify-between  ">
            <Link
              to={"/"}
              className="flex-shrink-0 flex items-center select-none cursor-pointer"
            >
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="AssetPeak"
              />
              <span className="text-indigo-600 font-semibold ml-2  lg:hidden">AssetPeak</span>
              <div className="hidden lg:flex justify-center items-center gap-2 text-lg font-bold ">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="AssetPeak"
                />
                <span className="text-indigo-600">AssetPeak</span>
              </div>
            </Link>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                

                <div className="hidden lg:block">{user && role==='employee' && <EmployeeNav /> }</div>
                <div className="hidden lg:block">{!user && <PublicNav />}</div>
                <div className="hidden lg:block">
                {user && role==='hr' && <HrNav />}

                
                </div>
              </div>
            </div>
          </div>
          {user ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
             
              <div className="ml-3 relative" ref={userMenuRef}>
                <div>
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                    onClick={toggleUserMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.photoURL ? 'user?.photoURL' : 'https://i.ibb.co/Hr77j3s/image.png'}
                      alt=""
                    />
                  </button>
                </div>
                {isUserMenuOpen && (
                  <div
                    className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      to={`/profile`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      {user?.displayName} (Profile)
                    </Link>
                    <Link
                      to={"/setting"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-indigo-600"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              className="bg-indigo-600 lg:hidden text-white px-3 py-2 rounded-md text-sm font-medium"
              to={"/login"}
            >
              Login
            </Link>
          )}
        </div>
      </div>
     


    {/* Mobile Nav */}

    <MobileNav isMobileMenuOpen={isMobileMenuOpen} />


    </nav>
  );
};

export default Navbar;
