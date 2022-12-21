import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";
import Sidebartwo from "../../components/Sidebartwo";
import { StateContext } from "../../context/context";

const AddProduct = () => {
  const condition = ["excellent", "good", "fair"];
  const { loading, setLoading, user, userFromDatabase } =
    useContext(StateContext);
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`https://aptdeco.vercel.app/categories`).then((res) => res.json()),
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const isVerified = userFromDatabase?.isVerified === true ? "true" : "false";
    const data = {
      name: e.target.product_name.value,
      description: e.target.description.value,
      image: e.target.image.value,
      original_price: e.target.original_price.value,
      resell_price: e.target.resell_price.value,
      phone: e.target.phone.value,
      location: e.target.location.value,
      purchase_year: e.target.purchase_year.value,
      condition: e.target.condition.value,
      category: e.target.category.value,
      sellerName: user?.displayName,
      sellerEmail: user?.email,
      sellerVerified: isVerified,
      createdAt: new Date(),
      status: "available",
      advertise: "false",
    };
    setLoading(true);
    fetch(`https://aptdeco.vercel.app/products`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setLoading(false);
          e.target.reset();
          toast.success(`${data.message}`, { autoClose: 1000 });
          navigate("/my-products");
        } else {
          toast.error("Something wrong", { autoClose: 1000 });
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  if (isLoading)
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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Your Product - aptDeco</title>
      </Helmet>

      <div className="flex sm:flex-row flex-col  ">
        <div className="sm:w-[300px] sm:mt-20 w-full p-1 sm:p-3">
          <Sidebartwo />
        </div>
        <div className="sm:flex-1 mt-[100px] h-screen mb-[50px] sm:mb-0 flex flex-col items-center justify-center">
          <div className="flex flex-col  ">
            <form action="" onSubmit={handleSubmit} className="sm:mr-32">
              <div className="">
                <div className="mb-2 block">
                  <label>Product Name </label>
                </div>
                <input
                  id="name"
                  className="input w-full max-w-xs border-[#FF5F3D]"
                  type="text"
                  name="product_name"
                  required={true}
                />
              </div>
              <div className="">
                <div className="mb-2 ">
                  <label>Product Description </label>
                </div>
                <input
                  id="name"
                  className="input  w-full sm:w-[50vw] max-w-xs border-[#FF5F3D]"
                  type="text"
                  name="description"
                  required={true}
                />
              </div>
              <div className="">
                <div className="mb-2 block">
                  <label>Product Image Url </label>
                </div>
                <input
                  id="name"
                  className="input w-full max-w-xs border-[#FF5F3D]"
                  type="text"
                  name="image"
                  required={true}
                />
              </div>
              <div className="">
                <div className="mb-2 block">
                  <label>Product Original Price </label>
                </div>
                <input
                  className="input w-full max-w-xs border-[#FF5F3D]"
                  type="text"
                  name="original_price"
                  required={true}
                />
              </div>
              <div className="">
                <div className="mb-2 block">
                  <label>Product Resell Price </label>
                </div>
                <input
                  className="input w-full max-w-xs border-[#FF5F3D]"
                  type="text"
                  name="resell_price"
                  required={true}
                />
              </div>
              <div className="">
                <div className="mb-2 block">
                  <label>Location </label>
                </div>
                <input
                  className="input w-full max-w-xs border-[#FF5F3D]"
                  type="text"
                  name="location"
                  required={true}
                />
              </div>
              <div className="">
                <div className="mb-2 block">
                  <label>Mobile Number </label>
                </div>
                <input
                  className="input w-full max-w-xs border-[#FF5F3D]"
                  type="text"
                  name="phone"
                  required={true}
                />
              </div>
              <div className="">
                <div className="mb-2 block">
                  <label>Purchase Year </label>
                </div>
                <input
                  id="name"
                  className="input w-full max-w-xs border-[#FF5F3D]"
                  type="text"
                  name="purchase_year"
                  required={true}
                />
              </div>
              <div className="">
                <div className="mb-2 block">
                  <label>Product Condition </label>
                </div>
                <select name="condition" className="select w-full max-w-xs">
                  {condition.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="">
                <div className="mb-2 block mt-2">
                  <label>Chose Category </label>
                </div>
                <select
                  name="category"
                  className="select w-full max-w-xs mb-3 "
                >
                  {categories?.data?.map((c, i) => (
                    <>
                      <option key={c?._id} value={c?.name}>
                        {c.name}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <button
                disabled={loading}
                className="
               rounded-sm text-white font-semibold mt-2 
                px-10 py-3 bg-[#FF5F3D]
                 hover:bg-[#c5563d] border-[#FF5F3D] "
                type="submit"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin border-dashed  h-5 w-5 mr-3 border-white border-2 rounded-full "
                      viewBox="0 0 24 24"
                    ></svg>
                    <p>Add Product</p>
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
