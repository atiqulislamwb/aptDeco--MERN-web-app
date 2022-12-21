import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";
import Sidebartwo from "../../components/Sidebartwo";

const AllSellers = () => {
  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`https://aptdeco.vercel.app/users`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
  });

  const filteredSeller = data?.data?.filter(
    (seller) => seller.role === "seller"
  );

  console.log(filteredSeller);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://aptdeco.vercel.app/users/${id}`, {
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

  const handleVerified = (id) => {
    fetch(`https://aptdeco.vercel.app/users/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(`Verified Successfully`, { autoClose: 1000 });
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
  if (isError) return <div>Error </div>;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Sellers - aptDeco</title>
      </Helmet>

      <div className="flex sm:flex-row flex-col  ">
        <div className="sm:w-[300px] sm:mt-20 w-full p-1 sm:p-3">
          <Sidebartwo />
        </div>
        <div className="sm:flex-1  h-screen sm:mb-0 flex flex-col ">
          {filteredSeller.length === 0 ? (
            <div>No Sellers</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Seller Name</th>
                      <th>Email</th>
                      <th>Verified</th>
                      <th>Role</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSeller?.map((seller, i) => (
                      <tr key={seller?._id}>
                        <th>{i + 1}</th>
                        <td>{seller?.name}</td>
                        <td className="font-bold">{seller?.email}</td>
                        <td className="font-bold">
                          {seller?.isVerified === false ? (
                            <button
                              onClick={() => handleVerified(seller?._id)}
                              className="btn btn-warning"
                            >
                              Verified
                            </button>
                          ) : (
                            <span className="font-bold text-blue-500">
                              True
                            </span>
                          )}
                        </td>
                        <td className="font-bold">{seller?.role}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            onClick={() => handleDelete(seller?._id)}
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

export default AllSellers;
