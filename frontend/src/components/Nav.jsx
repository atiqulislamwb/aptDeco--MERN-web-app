import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { TfiClose } from "react-icons/tfi";
import { CgMenuRightAlt } from "react-icons/cg";
import { StateContext } from "../context/context";
import verified from "../assets/verified.png";
const Nav = () => {
  const {
    user,
    handleLogout,
    userFromDatabase,
    dark,
    setUser,
    toggle,
    setToggle,
  } = useContext(StateContext);

  const CommonNav = () => (
    <div className="mr-10 flex sm:flex-row flex-col ">
      <div className="">
        {" "}
        <Link
          className="text-lg hover:text-[#FF5F3D] font-semibold sm:mr-10 mt-2 sm:mt-0 text-center"
          to="/"
          onClick={() => setToggle(false)}
        >
          Home
        </Link>
      </div>
      <div className="">
        {" "}
        <Link
          className="text-lg hover:text-[#FF5F3D] font-semibold sm:mr-10 mt-2 sm:mt-0 text-center"
          to="/categories"
          onClick={() => setToggle(false)}
        >
          Categories
        </Link>
      </div>

      <div className="">
        {user?.uid && (
          <Link
            className="text-lg hover:text-[#FF5F3D] font-semibold sm:mr-10 mt-2 sm:mt-0 text-center"
            to="/dashboard-home"
            onClick={() => setToggle(false)}
          >
            Dashboard
          </Link>
        )}
      </div>
      <div className="">
        {" "}
        <Link
          className="text-lg hover:text-[#FF5F3D] font-semibold sm:mr-10 mt-2 sm:mt-0 text-center"
          to="/blog"
          onClick={() => setToggle(false)}
        >
          Blog
        </Link>
      </div>

      {/* {dark ? (
        <button
          className="text-lg font-semibold mt-2 sm:mt-0 sm:mb-2 mr-10 flex items-center justify-center"
          onClick={() => setDark(!dark)}
        >
          <BsFillMoonFill size={20} />
        </button>
      ) : (
        <button
          className="text-lg font-semibold sm:mr-10 mt-2 sm:mb-2 sm:mt-0 flex items-center justify-center"
          onClick={() => setDark(!dark)}
        >
          <BsFillSunFill size={20} />
        </button>
      )} */}

      {user?.uid ? (
        <div className="flex flex-col   sm:flex-row">
          <div className="flex items-center justify-center mt-2 sm:mt-0">
            <div className="relative">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-10 h-10 mr-3   rounded-full text-center sm:mr-8 ml-6 m-2 sm:m-0 sm:ml-0  "
                title={user?.displayName}
              />
              {userFromDatabase?.isVerified === true && (
                <img
                  src={verified}
                  alt="verified"
                  className="animate-bounce w-7 h-7 object-cover absolute -top-2 left-7 z-100 "
                />
              )}
            </div>
          </div>
          <button
            className="border-2  mt-2 sm:mt-0 border-[#FF5F3D] mr-1 sm:-ml-4  px-3 font-bold text-black rounded-xl py-2 "
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="mt-10 sm:mt-0">
          <Link
            className="bg-[#FF5F3D] hover:bg-[#d64e30] px-10   sm:mt-2 sm:-mr-4 text-white rounded-sm  py-3  "
            to="/login"
            onClick={() => setToggle(false)}
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div
        className={`navbar  p-4 shadow-xl ${dark ? "bg-black" : "bg-white"} `}
      >
        <div className="flex-1">
          <Link to="/" className="flex items-center justify-center">
            <img
              src={logo}
              className=" w-[150px] h-[40px]  sm:w-[300px] sm:h-[68px] object-cover "
            />
          </Link>
        </div>
        <div className=" hidden md:block">
          <ul className="menu menu-horizontal p-0 mr-5 ">
            <CommonNav />
          </ul>
        </div>

        {/* mobile menu */}
        <div className="absolute text top-15 right-8 md:hidden ">
          {toggle ? (
            <TfiClose
              size={32}
              color="black"
              onClick={() => setToggle((prevState) => !prevState)}
            />
          ) : (
            <CgMenuRightAlt
              size={32}
              color="black"
              onClick={() => setToggle(!toggle)}
            />
          )}
        </div>

        {toggle && (
          <div
            className={`smooth-transition absolute top-0 h-screen  w-2/3 opacity-100   bg-slate-100 backdrop-blur-md z-10
            p-6 md:hidden  ${toggle ? "left-0 " : "-left-full"} `}
          >
            <ul className="flex flex-col p-8 absolute top-0  ">
              <Link to="/">
                <img
                  src={logo}
                  className=" w-[200px] h-[70px]  sm:w-[300px] sm:h-[68px] object-cover "
                />
              </Link>

              <CommonNav />
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
