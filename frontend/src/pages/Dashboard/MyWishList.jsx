import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import Sidebartwo from "../../components/Sidebartwo";
import { StateContext } from "../../context/context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const MyWishList = () => {
  const { user } = useContext(StateContext);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: () =>
      fetch(`https://aptdeco.vercel.app/wishlist/${user?.email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
  });

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

  const handleDelete = (id) => {
    fetch(`https://aptdeco.vercel.app/wishlist/${id}`, {
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

  const wishlists = data?.data;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Wishlists - aptDeco</title>
      </Helmet>

      <div className="flex sm:flex-row flex-col  ">
        <div className="sm:w-[300px] sm:mt-20 w-full p-1 sm:p-3 ">
          <Sidebartwo />
        </div>
        <div className="sm:flex-1  h-screen sm:mb-0 flex flex-col">
          {wishlists.length === 0 ? (
            <div className=" flex text-5xl sm:mt-40 mt-20  text-[#FF5F3D] font-extrabold flex-col items-center justify-center">
              No Item
            </div>
          ) : (
            <>
              <div className="overflow-x-auto h-screen mt-5 sm:mt-3">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Paid</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlists?.map((wishlist, i) => (
                      <tr key={wishlist?._id}>
                        <th>{i + 1}</th>
                        <td>
                          <div className="flex flex-row gap-2 items-center ">
                            <img
                              src={wishlist?.itemImage}
                              alt=""
                              className="w-12 h-12 object-cover"
                            />
                            <p>{wishlist?.itemName}</p>
                          </div>
                        </td>
                        <td className="font-bold">$ {wishlist?.itemPrice}</td>
                        <td>
                          {wishlist?.paid === "false" ? (
                            <Link to={`/payment/${wishlist?._id} `}>
                              <button className="btn bg-[#FF5F3D] border-[#FF5F3D]">
                                Pay
                              </button>
                            </Link>
                          ) : (
                            <p className="text-md text-blue-500 font-bold">
                              Paid
                            </p>
                          )}
                        </td>
                        <td
                          onClick={() => handleDelete(wishlist?._id)}
                          className="btn btn-warning"
                        >
                          Delete
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

export default MyWishList;
