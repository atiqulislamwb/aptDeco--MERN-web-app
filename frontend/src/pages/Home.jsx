import React from "react";

import Category from "../components/Category";
import DummyCom from "../components/DummyCom";
import Header from "../components/Header";
import AvertisedItem from "./../components/AvertisedItem";
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page - aptDeco</title>
      </Helmet>
      <Header />
      <AvertisedItem />
      <div className="mt-10">
        <Category />
      </div>
      <div>
        <DummyCom />
      </div>
    </div>
  );
};

export default Home;
