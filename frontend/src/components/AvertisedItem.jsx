import { useQuery } from "@tanstack/react-query";
import React from "react";
import { SpinnerCircularFixed } from "spinners-react";
import ProductItem from "./ProductItem";

const AvertisedItem = () => {
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

  if (isError) return <div>Error...</div>;

  const allProducts = data?.data;

  const advertisedProducts = allProducts?.filter(
    (product) => product?.advertise === "true"
  );

  console.log(advertisedProducts);

  return (
    <div className="mt-10">
      <div>
        <p className="mx-auto m-10 text-3xl text-center sm:text-5xl gradientText font-semibold">
          Advertised Products
        </p>
        <div className="flex flex-row flex-wrap gap-6 items-center justify-center">
          {isLoading ? (
            <SpinnerCircularFixed
              size={78}
              thickness={100}
              speed={130}
              color="rgba(172, 57, 57, 1)"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
          ) : (
            advertisedProducts?.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AvertisedItem;
