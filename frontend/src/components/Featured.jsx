import React from "react";

import logo from "../assets/1.png";
import logo1 from "../assets/2.png";
import logo2 from "../assets/3.png";
import logo3 from "../assets/4.png";
import logo4 from "../assets/5.png";
import logo5 from "../assets/6.png";

const Featured = () => {
  return (
    <div className="bg-white sm:p-4 p-2 m-10 ">
      <p className="text-center text-3xl font-bold  mt-16 mb-5">Featured in</p>
      <div className="flex flex-wrap gap-3 items-center justify-center">
        <img
          src={logo}
          className="sm:w-auto sm:h-auto w-20 h-20  sm:object-cover"
          alt="..."
        />
        <img
          src={logo1}
          className="sm:w-auto sm:h-auto w-20 h-20  sm:object-cover"
          alt="..."
        />
        <img
          src={logo2}
          className="sm:w-auto sm:h-auto w-20 h-20  sm:object-cover"
          alt="..."
        />
        <img
          src={logo3}
          className="sm:w-auto sm:h-auto w-20 h-20  sm:object-cover"
          alt="..."
        />
        <img
          src={logo4}
          className="sm:w-auto sm:h-auto w-20 h-20  sm:object-cover"
          alt="..."
        />
        <img
          src={logo5}
          className="sm:w-auto sm:h-auto w-20 h-20  sm:object-cover"
          alt="..."
        />
      </div>
    </div>
  );
};

export default Featured;
