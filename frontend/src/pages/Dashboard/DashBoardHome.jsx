import React from "react";
import Sidebartwo from "../../components/Sidebartwo";
import { SpinnerRoundFilled } from "spinners-react";
import { Helmet } from "react-helmet";
const DashBoardHome = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashborad - aptDeco</title>
      </Helmet>

      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-[300px] sm:mt-20 w-full p-1 sm:p-3">
          <Sidebartwo />
        </div>
        <div className="sm:flex-1 h-[70vh] sm:h-screen flex flex-col items-center justify-center">
          <p className=" text-2xl sm:text-5xl font-bold font-serif sm:-mt-32 -mt-20">
            Welcome to Dashboard
          </p>
          <p>
            <SpinnerRoundFilled
              size={78}
              thickness={100}
              speed={130}
              color="rgba(172, 57, 57, 1)"
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default DashBoardHome;
