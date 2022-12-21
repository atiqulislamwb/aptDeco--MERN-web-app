import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TfiHeart } from "react-icons/tfi";
import { MdOutlineReport } from "react-icons/md";
import { StateContext } from "../context/context";
import { toast } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";
import { format } from "date-fns";
const ProductItem = ({ product }) => {
  const { user, loading, setLoading } = useContext(StateContext);

  const handleWishlist = (product) => {
    const data = {
      itemId: product?._id,
      itemName: product?.name,
      itemPrice: product?.resell_price,
      itemImage: product?.image,
      category: product?.category,
      userName: user?.displayName,
      userEmail: user?.email,
      status: "booked",
      paid: "false",
      createdAt: new Date(),
    };

    setLoading(true);
    fetch("https://aptdeco.vercel.app/wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          setLoading(false);

          toast.success(`${data.message}`, { autoClose: 1000 });
        } else {
          toast.error("Something wrong", { autoClose: 1000 });
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  const handleReport = (product) => {
    const data = {
      itemId: product?._id,
      itemName: product?.name,
      itemPrice: product?.resell_price,
      itemImage: product?.image,
      category: product?.category,
      userName: user?.displayName,
      userEmail: user?.email,
      status: "booked",
      paid: "false",
      createdAt: new Date(),
    };

    setLoading(true);
    fetch("https://aptdeco.vercel.app/reportlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          setLoading(false);

          toast.success(`${data.message}`, { autoClose: 1000 });
        } else {
          toast.error("Something wrong", { autoClose: 1000 });
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

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
    <div className="card card-compact w-80 h-[430px] bg-slate-100 shadow-xl">
      <figure>
        <img src={product?.image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <p className="text-2xl font-bold">{product?.name}</p>
        <p className=" text-[22px] font-bold text-[#FF5F3D]">
          Sell Price: ${product?.resell_price}
        </p>
        <p className="sm:text-md font-semibold text-sm  mt-1">
          Original Price: ${" "}
          <span className="line-through">{product?.original_price}</span>{" "}
        </p>
        <p className="sm:text-md font-semibold text-sm  -mt-2 ">
          Location : {product?.location}
        </p>
        <Link
          to={`/categories/${product?.category}`}
          className="text-blue-500 text-md font-semibold underline -mt-2"
        >
          Category: {product?.category}
        </Link>
        <p className="sm:text-md font-semibold text-sm  -mt-2">
          Year of Use : {product?.purchase_year}
        </p>
        <p className="sm:text-md font-semibold text-sm  -mt-2">
          Condition : {product?.condition}
        </p>
        <p className="sm:text-md font-semibold text-sm  -mt-2">
          Posted : {product?.createdAt}
        </p>
        <div className=" flex flex-row justify-between items-center">
          <div className="flex gap-1 flex-col">
            {" "}
            <button
              onClick={() => handleWishlist(product)}
              className="flex gap-1 items-center justify-center font-semibold hover:text-[#FF5F3D]"
            >
              <TfiHeart size={16} />
              WishList
            </button>
            <button
              onClick={() => handleReport(product)}
              className="flex gap-1 mr-2 items-center justify-center font-semibold hover:text-[#fa2626]"
            >
              <MdOutlineReport size={20} />
              Report
            </button>
          </div>
          <div>
            {product?.status === "paid" ? (
              <button className="rounded-sm  mt-5 cursor-pointer text-white font-semibold   px-16 py-3 bg-[#5c07a1] border-[#FF5F3D] ">
                Item Sold
              </button>
            ) : (
              <button className="font-serif sm:px-8 px-6  text-md   items-center justify-center rounded-md  flex text-white font-semibold mt-3  py-3 bg-gradient-to-r from-[#FF5F3D] to-orange-400  hover:bg-[#FF5F3D] ">
                <Link to={`/products/${product?._id}`}> See Details</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
