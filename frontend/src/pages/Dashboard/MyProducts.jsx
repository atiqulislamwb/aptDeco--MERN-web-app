import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";
import Sidebartwo from "../../components/Sidebartwo";
import { StateContext } from "../../context/context";

const MyProducts = () => {
  const { user } = useContext(StateContext);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["all-products"],
    queryFn: () =>
      fetch(`https://aptdeco.vercel.app/all-products`).then((res) =>
        res.json()
      ),
  });

  const filteredProducts = data?.data.filter(
    (products) => products.sellerEmail === user?.email
  );

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
  if (isError) return <div>Error...</div>;

  console.log(filteredProducts);

  const handleAdvertised = (id) => {
    const data = { id: id };
    fetch(`https://aptdeco.vercel.app/all-products/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(`${data.message}`, { autoClose: 1000 });
          refetch();
        } else {
          toast.error(`${data.message}`, { autoClose: 1000 });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`https://aptdeco.vercel.app/all-products/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(`${data.message}`, { autoClose: 1000 });
          refetch();
        } else {
          toast.error(`${data.message}`, { autoClose: 1000 });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Products- aptDeco</title>
      </Helmet>

      <div className="flex sm:flex-row flex-col  ">
        <div className="sm:w-[300px] sm:mt-20 w-full p-1 sm:p-3  ">
          <Sidebartwo />
        </div>
        <div className="sm:flex-1  h-screen sm:mb-0 flex flex-col">
          {filteredProducts.length === 0 ? (
            <div className="flex items-center flex-col mt-[50px] justify-center text-2xl sm:mt-[200px] text-red-500 sm:text-5xl ">
              No Product Found
              <span className="ml-2 mt-3 animate-bounce text-blue-500 underline">
                <Link to="/categories">Buy Some Furniture</Link>
              </span>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product Name</th>
                      <th>Resell Price</th>
                      <th>Status</th>
                      <th>Advertise</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts?.map((product, i) => (
                      <tr key={product?._id}>
                        <th>{i + 1}</th>
                        <td>
                          <div className="flex flex-row gap-2 items-center ">
                            <img
                              src={product?.image}
                              alt=""
                              className="w-12 h-12 object-cover"
                            />
                            <p>{product?.name}</p>
                          </div>
                        </td>
                        <td className="font-bold">$ {product?.resell_price}</td>
                        <td className="font-bold">
                          {product?.status === "available" ? (
                            <span className="text-blue-500 font-bold">
                              Available
                            </span>
                          ) : (
                            <span className="text-red-500 font-bold">Sold</span>
                          )}
                        </td>
                        <td>
                          {product?.advertise === "false" ? (
                            <button
                              onClick={() => handleAdvertised(product?._id)}
                              className="btn bg-[#FF5F3D] border-[#FF5F3D]"
                            >
                              Advertise
                            </button>
                          ) : (
                            <>
                              {product?.status === "paid" ? (
                                <span className="text-red-500 font-bold">
                                  Paid
                                </span>
                              ) : (
                                "Already Advertise"
                              )}
                            </>
                          )}
                        </td>
                        <td className="font-bold">
                          <button
                            onClick={() => handleDelete(product?._id)}
                            className="btn btn-warning"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProducts;
