import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { itemPrice, userEmail, userName, _id, itemId } = booking;
  const price = parseInt(itemPrice);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    setLoading(true);
    fetch("https://aptdeco.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.clientSecret);
        setClientSecret(data?.clientSecret);
      })
      .catch((error) => console.log(error))
      .finally((solve) => setLoading(false));
    setLoading(false);
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);
    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: userEmail,
          },
        },
      });

    console.log(paymentIntent);
    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      toast.success("payment success");
      // store payment info in the database
      const payment = {
        price,
        transactionId: paymentIntent?.id,
        userEmail,
        bookingId: _id,
        itemId: itemId,
      };
      setProcessing(false);
      setLoading(true);
      fetch("https://aptdeco.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.insertedId) {
            setLoading(false);
            setProcessing(false);
            setSuccess("Congrats! your payment completed");
            setTransactionId(paymentIntent?.id);
          }
        });
    }
    setProcessing(false);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Payment - aptDeco</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn  mt-10 px-10 bg-[#FF5F3D] border-[#FF5F3D]  "
          type="submit"
          disabled={!stripe || processing || !clientSecret}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      {success && (
        <div className="mt-10">
          <p className="text-green-500 text-xl">{success}</p>
          <p className="mt-2 font-bold text-xl">
            Your transactionId: {""}
            <span className="font-bold text-[#FF5F3D]">{transactionId}</span>
          </p>
          <Link
            to="/my-orders"
            className="underline mt-[10px] font-semibold text-blue"
          >
            See Your Order
          </Link>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
