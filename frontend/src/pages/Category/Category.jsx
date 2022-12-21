import React from "react";
import { Helmet } from "react-helmet";
import AllProducts from "../../components/AllProducts";

import Sidebar from "../../components/Sidebar";

const Category = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Category Page - aptDeco</title>
      </Helmet>
      <div className=" flex sm:flex-row flex-col ">
        <div className=" sm:w-[300px] sm:mt-20 w-full p-1 sm:p-3  ">
          <Sidebar />
        </div>
        <div className="sm:flex-1  h-auto sm:mb-0 flex flex-col">
          <AllProducts />
        </div>
      </div>
    </>
  );
};

export default Category;
