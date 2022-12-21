import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import Sidebartwo from "../../components/Sidebartwo";
import { StateContext } from "../../context/context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const ReportedProducts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["reportlist"],
    queryFn: () =>
      fetch("https://aptdeco.vercel.app/reportlist", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
  });

  const handleDelete = (id, idtwo) => {
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
          refetch();
        } else {
          toast.error(`${data.message}`, { autoClose: 1000 });
          refetch();
        }
      })
      .catch((err) => console.log(err));

    fetch(`https://aptdeco.vercel.app/reportlist/${idtwo}`, {
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
          refetch();
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
  const reportItems = data?.data;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reported Items - aptDeco</title>
      </Helmet>

      <div className="flex sm:flex-row flex-col  ">
        <div className="sm:w-[300px] sm:mt-20 w-full p-1 sm:p-3  ">
          <Sidebartwo />
        </div>
        <div className="sm:flex-1  h-screen sm:mb-0 flex flex-col">
          {reportItems.length === 0 ? (
            <div className="flex items-center flex-col mt-[50px] justify-center text-2xl sm:mt-[200px] text-red-500 sm:text-5xl ">
              No Product Found
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Reported Product Name</th>
                      <th>Resell Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportItems?.map((reportItem, i) => (
                      <tr key={reportItem?._id}>
                        <th>{i + 1}</th>
                        <td>
                          <div className="flex flex-row gap-2 items-center ">
                            <img
                              src={reportItem?.itemImage}
                              alt=""
                              className="w-12 h-12 object-cover"
                            />
                            <p>{reportItem?.itemName}</p>
                          </div>
                        </td>
                        <td className="font-bold">$ {reportItem?.itemPrice}</td>

                        <td>
                          <button
                            onClick={() =>
                              handleDelete(reportItem?.itemId, reportItem?._id)
                            }
                            className="btn bg-[#FF5F3D] border-[#FF5F3D]"
                          >
                            Delete Product
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

export default ReportedProducts;
