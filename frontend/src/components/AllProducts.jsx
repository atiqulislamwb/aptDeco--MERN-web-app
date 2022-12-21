import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import { SpinnerCircularFixed } from "spinners-react";
const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const allData = async () => {
      const { data } = await axios.get(
        "https://aptdeco.vercel.app/all-products"
      );
      setAllProducts(data?.data);
      setLoading(false);
    };
    setLoading(false);
    allData();
  }, []);

  const filter = allProducts?.filter(
    (product) => product?.status === "available"
  );

  return (
    <div className="mt-10">
      <div>
        <div className="flex flex-row flex-wrap gap-6 items-center justify-center">
          {loading ? (
            <SpinnerCircularFixed
              size={63}
              thickness={100}
              speed={100}
              color="rgba(172, 57, 57, 1)"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
          ) : (
            <>
              <p className="mt-3 text-xl text-center font-extrabold text-[#FF5F3D] sm:text-2xl">
                {filter.length} Products Found
              </p>
              <div className="p-2  flex item-center sm:flex-row justify-center gap-6 flex-wrap flex-col">
                {filter?.map((product) => (
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

export default AllProducts;
