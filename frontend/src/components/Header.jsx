import React, { useContext } from "react";
import furniture from "../assets/furniture.png";
import logo from "../assets/svg.svg";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { StateContext } from "../context/context";
const Header = () => {
  const { role } = useContext(StateContext);
  return (
    <>
      <div className=" bg-[#F3AC81] w-full h-[70vh] flex sm:flex-row flex-col">
        <div>
          {" "}
          <img src={furniture} className="w-full h-full object-cover" />
        </div>
        <div className="  text-white flex flex-col items-center sm:items-end  justify-center sm:ml-24  ">
          <p className="sm:text-[100px] text-[40px] -mt-[100px]  font-bold">
            Become a seller
          </p>
          <p className=" text-xl sm:text-4xl font-semibold">
            Out with the old , in the new
          </p>
          <p className="text-2xl font-semibold">Start selling now!</p>
          <a
            href="#my-modal-2"
            className="text-lg  w-[50vw] items-center justify-center rounded-sm sm:w-[10vw] flex bg-gradient-to-r from-[#FF5F3D] to-orange-400  font-semibold mt-3  py-3 hover:bg-[#c5563d] bg-[#FF5F3D]"
          >
            {" "}
            Sell My Furniture
          </a>
        </div>
      </div>
      <div className="mt-10 p-10 m-10 bg-slate-200 flex flex-col items-center justify-center">
        <div className=" p-5 bg-slate-200 mx-auto items-center justify-center">
          <div className="w-28 h-28">
            <img src={logo} alt="svg" className="object-cover mt-3" />
          </div>
          <p className="text-2xl text-slate-600 -mt-8">Sell with us</p>
          <button className="flex text-sm ml-4 mt-1 font-bold font-serif text-[#FF5F3D] items-center justify-center gap-1">
            learn more <BsArrowRight />
          </button>
        </div>
      </div>
      {/* modal */}
      <div className="modal" id="my-modal-2">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Register as a Seller and sell your products
          </h3>
          <p className="mt-2 mb-2">
            <Link
              to="/register"
              className="mt-2 mb-2 underline text-blue-500 text-xl sm:text-2xl font-extrabold "
            >
              Register
            </Link>
          </p>
          <p>
            <Link
              to={role === "seller" && "/add-product"}
              className="underline text-[#FF5F3D] text-xl sm:text-2xl font-extrabold"
            >
              Already Seller Click here
            </Link>
          </p>
          <div className="modal-action">
            <a href="#" className="btn">
              Close
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
