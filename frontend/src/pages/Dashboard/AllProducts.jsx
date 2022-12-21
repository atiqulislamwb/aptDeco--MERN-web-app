import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";
import Sidebartwo from "../../components/Sidebartwo";

const AllProducts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["all-products"],
    queryFn: () =>
      fetch(`https://aptdeco.vercel.app/all-products`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
  });

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

  const allProducts = data?.data;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Products - aptDeco</title>
      </Helmet>

      <div className="flex sm:flex-row flex-col  ">
        <div className="sm:w-[300px] sm:mt-20 w-full p-1 sm:p-3">
          <Sidebartwo />
        </div>
        <div className="sm:flex-1  h-screen sm:mb-0 flex flex-col">
          {allProducts.length === 0 ? (
            <div>No Sellers</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>category</th>
                      <th>Posted</th>
                      <th>Condition</th>
                      <th>Seller Name</th>
                      <th>Seller Email</th>
                      <th>Product Location</th>
                      <th>Phone</th>
                      <th>Year</th>
                      <th>Advertise</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="overflow-auto">
                    {allProducts?.map((item, i) => (
                      <tr key={item?._id}>
                        <th>{i + 1}</th>
                        <td>
                          <div className="flex flex-row gap-2 items-center ">
                            <img
                              src={item?.image}
                              alt="product-picture"
                              className="w-10 h-10 object-cover"
                            />
                            <p>{item?.name}</p>
                          </div>
                        </td>

                        <td className="font-bold text-red-500">
                          ${item?.resell_price}{" "}
                          <span className="line-through ml-1 text-black ">
                            {item?.original_price}
                          </span>{" "}
                        </td>
                        <td className="">{item?.category}</td>
                        <td className="">{item?.createdAt}</td>
                        <td className="">{item?.condition}</td>
                        <td className="">{item?.sellerName}</td>
                        <td className="">{item?.sellerEmail}</td>
                        <td className="">{item?.location}</td>
                        <td className="">{item?.phone}</td>
                        <td className="">{item?.purchase_year}</td>
                        <td className="">
                          {item?.advertise === "false" ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => handleAdvertised(item._id)}
                            >
                              Advertise
                            </button>
                          ) : (
                            "true"
                          )}
                        </td>
                        <td className="">
                          {item?.status === "available" ? (
                            <span className="text-blue-500">Available</span>
                          ) : (
                            <span className="text-white bg-red-500 p-2 px-4">
                              Paid
                            </span>
                          )}
                        </td>
                        <td className="">
                          <button
                            onClick={() => handleDelete(item?._id)}
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

export default AllProducts;
