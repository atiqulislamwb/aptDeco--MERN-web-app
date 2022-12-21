import React from "react";
import bed from "../assets/bed.png";
import Round from "./Round";
import Featured from "./Featured";
import chair from "../assets/10.png";
import { BsArrowBarRight } from "react-icons/bs";
const DummyCom = () => {
  return (
    <>
      {/* sustain    */}
      <div className="flex flex-col mt-10 items-center justify-center">
        <div className="w-full sm:w-6/12 mx-auto flex flex-col items-center justify-center">
          <p className="sm:text-3xl text-2xl mt-10 font-bold">
            Sustainability impact
          </p>
          <Round />
          <p className="p-3   sm:text-md text-center text-slate-600 mt-5 font-semibold">
            Sustainability is at the heart of what we do. We believe that
            pre-loved furniture should be the first consideration before new.
            Over 12 million tons of used furniture get landfilled each year.
            We're on a mission to change that by making furniture circular.
            Traditionally, the use of furniture is linear. We buy it, we live
            with it—and then we dispose of it. Instead of ending the lifecycle
            at one use, we've created a platform where furniture can continue to
            stay in circulation for years to come.
          </p>
        </div>
      </div>
      <div>
        <Featured />
      </div>
      <div className="flex bg-[#FFFFFF] flex-col p-1 sm:p-5 m-3 sm:m-10 mt-10 items-center justify-center">
        <div className="w-full bg-[#FFFFFF] sm:w-6/12 mx-auto flex flex-col items-center justify-center">
          <img src={bed} alt="..." />
          <p className="sm:text-2xl text-xl text-center  font-bold">
            Why shop for secondhand furniture first?
          </p>
          <p className="p-3 sm:text-[16px] xs:text-sm   text-center text-slate-600 mt-5 font-semibold">
            We’re shouting it from the rooftops—secondhand furniture should be
            your first choice! In fact, well-made used furniture can last
            through generations. Furniture holds memories. We gather around it
            in times of joy and celebration; we curl up with our loved ones on
            it; we use it to store our most-prized possessions. Buying pre-loved
            furniture adds character to your home through its imperfections and
            the stories it carries. We’re here to continue those stories and
            create a world where furniture is circular, sustainable, and here to
            stay.
          </p>
        </div>
      </div>

      <div className="flex p-2 sm:p-5  m-2 sm:m-0  bg-[#E2E8F0] gap-10  flex-col sm:flex-row mt-10 items-center justify-center">
        <div className="">
          <img
            src={chair}
            alt="...."
            className="sm:-ml-20 mr-16 sm:mr-0 object-cover"
          />
        </div>
        <div className="text-center -mt-7 sm:-mt-0">
          <p className="font-bold text-xl ">Take $10 off your first purchase</p>
          <p>Sign up for the latest updates, products and offers</p>
        </div>
        <div className="flex mb-4 sm:ml-12 items-center justify-center">
          <input
            className="sm:px-10 py-3 border-[#FF5F3D] border placeholder-slate-400  "
            type="text"
            placeholder="Enter email address"
          />
          <button className="py-[10px] bg-[#FF5F3D] px-5">
            <BsArrowBarRight color="white" className="text-3xl font-bold" />
          </button>
        </div>
      </div>
    </>
  );
};

export default DummyCom;
