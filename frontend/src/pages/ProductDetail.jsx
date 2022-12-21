import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { StateContext } from "../context/context";
import verified from "../assets/verified.png";
import Modal from "../components/Modal";
import { Helmet } from "react-helmet";
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const { information, setInformation, userFromDatabase } =
    useContext(StateContext);
  const { id } = useParams();
  console.log(information);
  const {
    data: productDetail,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories", id],
    queryFn: () =>
      fetch(`https://aptdeco.vercel.app/all-products/${id}`).then((res) =>
        res.json()
      ),
  });

  const product = productDetail?.data;
  console.log(product);
  const {
    data: userInformation,
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
  } = useQuery({
    queryKey: ["users", product?.seller?.email],
    queryFn: () =>
      fetch(`https://aptdeco.vercel.app/users/${product?.seller?.email}`).then(
        (res) => res.json()
      ),
  });

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  if (error) return "An error has occurred: " + error.message;
  if (isLoading)
    return (
      <SpinnerCircularFixed
        size={63}
        thickness={100}
        speed={100}
        color="rgba(172, 57, 57, 1)"
        secondaryColor="rgba(0, 0, 0, 0.44)"
      />
    );
  if (userLoading)
    return (
      <SpinnerCircularFixed
        size={63}
        thickness={100}
        speed={100}
        color="rgba(172, 57, 57, 1)"
        secondaryColor="rgba(0, 0, 0, 0.44)"
        className="flex absolute top-0 right-0 bottom-0 left-0 items-center justify-center mx-auto text-center"
      />
    );
  const user = userInformation?.data;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{product?.name} details - aptDeco</title>
      </Helmet>

      <div className="flex flex-col p-1 sm:p-10">
        <div className="w-full sm:w-9/12  mx-auto">
          <div className="w-full sm:h-[60vh] h-[30vh]">
            <img src={product.image} className="w-full h-full object-contain" />
          </div>
          <div className="bg-white shadow-xl p-1 sm:p-8 mt-4 sm:mt-10 rounded-md">
            <p className=" text-2xl font-bold sm:text-3xl text-center sm:text-left">
              Name: {product?.name}
            </p>
            <p className="sm:text-left sm:text-md font-semibold text-sm mt-2 p-1 text-center ">
              Details: {product?.description}
            </p>
            <p className="text-2xl  font-semibold text-[#FF5F3D] sm:text-left text-center mt-2 mb-2">
              Sell Price: ${product?.resell_price}
            </p>
            <p className=" sm:text-md font-semibold text-sm  p-1">
              Original Price: ${" "}
              <span className="line-through">{product?.original_price}</span>{" "}
            </p>
            <p className="sm:text-md font-semibold text-sm p-1">
              Location : {product?.location}
            </p>
            <Link
              to={`/categories/${product?.category}`}
              className="text-blue-500 text-md font-semibold text-sm p-1 "
            >
              Category: {product?.category}
            </Link>
            <p className="sm:text-md tex-sm font-semibold text-sm  p-1 ">
              Condition : {product?.condition}
            </p>
            <p className="sm:text-md tex-sm font-semibold text-sm  p-1  ">
              Year of Use : {product?.purchase_year}
            </p>
            <p className="sm:text-md font-semibold text-sm  p-1 ">
              Posted : {product?.createdAt}
            </p>
            <p className=" sm:text-md font-semibold text-sm p-1  ">
              Stock :
              {product?.status === "paid" ? (
                <span className="text-red-500 ml-1 font-bold sm:text-md text-sm p-1  ">
                  Out of stock
                </span>
              ) : (
                <span className="text-blue-500 ml-1 font-bold sm:text-md  text-sm p-1 ">
                  Available
                </span>
              )}
            </p>

            <p className="text-md gap-1 mt-1 flex flex-row items-center sm:text-md font-semibold text-sm p-1 ">
              Seller Name: {product?.sellerName}
              <span>
                {product?.sellerVerified === "true" && (
                  <img
                    src={verified}
                    alt="verified"
                    className="animate-bounce -ml-1 w-7 h-7 object-cover z-100 "
                  />
                )}
              </span>
            </p>
            <p className="sm:text-md mt-1  font-semibold text-sm  p-1">
              Seller Email: {product?.sellerEmail}
            </p>
            {product?.status === "paid" ? (
              <button className="rounded-sm  mt-5 cursor-pointer text-white font-semibold   px-16 py-3 bg-[#5c07a1] border-[#FF5F3D] ">
                Item Sold
              </button>
            ) : (
              <>
                <div className="flex mt-4 gap-4 flex-row">
                  <button
                    onClick={() => handleDecrement()}
                    disabled={quantity === 1}
                    className="btn"
                  >
                    -
                  </button>
                  <button className="text-[#FF5F3D] font-extrabold text-xl">
                    {quantity}
                  </button>
                  <button onClick={() => handleIncrement()} className="btn">
                    +
                  </button>
                </div>
                <label
                  onClick={() => setInformation(product, quantity)}
                  htmlFor="booking-modal"
                  className="rounded-md  mt-5 mb-5 cursor-pointer text-white font-semibold   px-16 py-3 bg-[#fa5732] hover:bg-[#dd6145] "
                  type="submit"
                >
                  Book Now
                </label>
              </>
            )}
          </div>
        </div>
        {information && <Modal />}
      </div>
    </>
  );
};

export default ProductDetail;
