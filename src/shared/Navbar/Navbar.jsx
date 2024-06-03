import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const {user, logOut} = useAuth();
  const userMenuRef = useRef(null);
  const {pathname} = useLocation();

  console.log(user)


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

  const handleLogout =() =>{
    logOut()
        .then(() => {
          toast.success("Logged Out");
        })
        .catch((error) => {
          toast.error(error.message);
        });
  }

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
    <nav className="z-10 w-full border-b border-black/10 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
          <div className="flex-1 flex items-center justify-center  sm:items-stretch sm:justify-between ml-10 md:ml-0 ">
            <Link to={'/'} className="flex-shrink-0 flex items-center select-none cursor-pointer">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="AssetPeak"
              />
              <div className="hidden lg:flex justify-center items-center gap-2 text-lg font-bold ">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="AssetPeak"
              />
              <span>AssetPeak</span>
              </div>
            </Link>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  className={` px-3 py-2 rounded-md text-sm font-medium  ${pathname === '/' && ' text-indigo-600'}`}
                  to={"/"}
                >
                  Home
                </Link>
                {!user &&
                <><Link
                className={`  px-3 py-2 rounded-md text-sm font-medium ${pathname === '/join-as-employee' && ' text-indigo-600'}`}
                to={"/join-as-employee"}
              >
                Join as Employee
              </Link>
              <Link
                className={` px-3 py-2 rounded-md text-sm font-medium ${pathname === '/join-as-HR' && ' text-indigo-600'}`}
                to={"/join-as-HR"}
              >
                Join as HR Manager
              </Link>
                <Link
                className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium"
                to={"/login"}
              >
                Login
              </Link></>}
              </div>
            </div>
          </div>
          {user ? <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
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
                    src={user?.photoURL}
                    alt=""
                  />
                </button>
              </div>
              {isUserMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <Link to={`/profile`}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </Link>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <button onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div> : <Link
            className="bg-indigo-600 md:hidden text-white px-3 py-2 rounded-md text-sm font-medium"
            to={"/login"}
          >
            Login
          </Link>}
        </div>
      </div>
      <div
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
      </div>
    </nav>
  );
};

export default Navbar;
