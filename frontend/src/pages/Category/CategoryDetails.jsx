import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SpinnerCircularFixed } from "spinners-react";
import { ProductItem } from "../../components";
import Sidebar from "./../../components/Sidebar";
import { Helmet } from "react-helmet";

const CategoryDetails = () => {
  const { categoryId } = useParams();

  const {
    data: categoryProducts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () =>
      fetch(`https://aptdeco.vercel.app/categories/${categoryId}`).then((res) =>
        res.json()
      ),
  });

  if (error) return "An error has occurred: " + error.message;

  const filterWithoutPaidItems = categoryProducts?.data?.filter(
    (category) => category?.status === "available"
  );

  return (
    <div className="w-full flex flex-col sm:flex-row  p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Category Details - aptDeco</title>
      </Helmet>
      <div className="flex sm:flex-row flex-col">
        <div className=" sm:w-[300px] sm:mt-20 w-full p-1 sm:p-3  ">
          <Sidebar />
        </div>
      </div>
      <div className="sm:flex-1  h-auto sm:mb-0 flex flex-col">
        <div className="flex flex-row flex-wrap gap-6 items-center justify-center">
          {isLoading ? (
            <SpinnerCircularFixed
              size={63}
              thickness={100}
              speed={100}
              color="rgba(172, 57, 57, 1)"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
          ) : (
            <>
              <p className="mt-6 text-xl text-center font-extrabold text-[#FF5F3D] sm:text-2xl">
                {filterWithoutPaidItems?.length} Products Found
              </p>
              <div className="mt-10 p-2 flex item-center sm:flex-row justify-center gap-6 flex-wrap flex-col ">
                {filterWithoutPaidItems?.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
