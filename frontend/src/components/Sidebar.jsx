import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch(`https://aptdeco.vercel.app/categories`).then((res) => res.json()),
  });

  return (
    <div className="mt-10 p-4">
      <div className="">
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          <div className=" sticky flex flex-row sm:flex-col sm:overflow-x-hidden sm:overflow-y-hidden overflow-x-auto w-full sm:p-3 gap-3 sm:gap-4">
            {categories?.data?.map((category) => (
              <div
                key={category?._id}
                className=" sm:text-left font-extrabold sm:text-2xl text-xl sm:hover:text-[#e26548] text-[#FF5F3D]  p-2 sm:p-3   "
              >
                <Link className="" to={`/categories/${category?.name}`}>
                  {category.name}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
