import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const ErrorPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Error</title>
      </Helmet>
      <p className="text-5xl font-thin text-slate-800 mb-12 -mt-40">
        404 error
      </p>
      <p className="text-xl font-bold -mt-8">This page does not exist</p>
      <p className="text-xl mt-3 ">
        Would you like to
        <Link
          to="/categories"
          className="text-2xl ml-2 text-[#FF5F3D] italic underline underline-offset-8  "
        >
          check our Products?
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
