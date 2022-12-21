import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import { StateContext } from "../context/context";

const Sidebartwo = () => {
  const { role, user, loading } = useContext(StateContext);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <SpinnerCircularFixed
          size={78}
          thickness={100}
          speed={130}
          color="rgba(172, 57, 57, 1)"
          secondaryColor="rgba(0, 0, 0, 0.44)"
        />
      </div>
    );

  return (
    <div className="flex flex-row overflow-x-auto w-full p-3 sm:flex-col gap-6 ">
      {role === "seller" && user && (
        <button className="btn  bg-[#FF5F3D] border-[#FF5F3D] ">
          <Link to="/add-product" className=" ">
            Add Products
          </Link>
        </button>
      )}
      {role === "seller" && user && (
        <button className="btn bg-[#FF5F3D] border-[#FF5F3D] ">
          <Link to="/my-products">My Products</Link>
        </button>
      )}

      {role === "user" && user && (
        <button className="btn bg-[#FF5F3D] border-[#FF5F3D]  ">
          <Link to="/my-orders">My Orders</Link>
        </button>
      )}
      {role === "user" && user && (
        <button className="btn bg-[#FF5F3D] border-[#FF5F3D]  ">
          <Link to="/my-wishlist">My Wishlist</Link>
        </button>
      )}
      {role === "admin" && user && (
        <button className="btn  bg-[#FF5F3D] border-[#FF5F3D] ">
          <Link to="/all-sellers">All Sellers</Link>
        </button>
      )}
      {role === "admin" && user && (
        <button className="btn bg-[#FF5F3D] border-[#FF5F3D]  ">
          <Link to="/all-users">All Buyers</Link>
        </button>
      )}
      {role === "admin" && user && (
        <button className="btn bg-[#FF5F3D] border-[#FF5F3D]  ">
          <Link to="/all-products">All Products</Link>
        </button>
      )}
      {role === "admin" && user && (
        <button className="btn bg-[#FF5F3D] border-[#FF5F3D]  ">
          <Link to="/report-products">Reported Products</Link>
        </button>
      )}
    </div>
  );
};

export default Sidebartwo;
