import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";

import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);
  const { bookingId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://aptdeco.vercel.app/all-bookings/${bookingId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          setBooking(data?.data);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, [bookingId]);

  if (loading) return <div>Loading...</div>;

  console.log(booking);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment - aptDeco</title>
      </Helmet>

      <div className="flex flex-col items-center h-[50vh] mt-10">
        <h3 className="text-3xl">Payment for {booking?.itemName}</h3>
        <p className="text-xl">
          Please pay <strong>${booking?.itemPrice}</strong> for your item
        </p>
        <div className="w-96 my-12">
          <Elements stripe={stripePromise}>
            <CheckoutForm booking={booking} />
          </Elements>
        </div>
      </div>
    </>
  );
};

export default Payment;
