import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://aptdeco.vercel.app/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setCategories(data?.data);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, []);

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

  console.log(categories);
  return (
    <>
      <p className="text-center text-3xl mt-20  font-bold sm:text-5xl gradientText">
        See Our Category
      </p>
      <Link
        to="/categories"
        className="flex text-center  text-sm ml-4 mt-3 mb-12 font-bold font-serif text-[#2846f0] items-center justify-center gap-1"
      >
        More Product <BsArrowRight />
      </Link>
      <div className="flex items-center justify-center flex-wrap gap-6">
        {categories?.map((category) => (
          <div key={category?._id}>
            <Link to={`/categories/${category?.name}`}>
              <div className="items-center font-serif justify-center flex w-[100px] h-[100px]  sm:w-[200px] sm:h-[200px] bg-gradient-to-r from-[#FF5F3D] to-orange-400 rounded-full text-white font-bold sm:text-2xl text-xl">
                {category?.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
