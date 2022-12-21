import React, { useContext } from "react";
import { toast } from "react-toastify";
import { SpinnerCircularFixed } from "spinners-react";
import { StateContext } from "../context/context";

const Modal = () => {
  const { user, information, setInformation, loading, setLoading } =
    useContext(StateContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    const meeting_location = e.target.meeting_location.value;
    const data = {
      itemId: information?._id,
      itemName: information?.name,
      itemPrice: information?.resell_price,
      itemImage: information?.image,
      category: information?.category,
      userName: user?.displayName,
      userEmail: user?.email,
      phone,
      meeting_location,
      status: "booked",
      paid: "false",
      createdAt: new Date(),
    };

    setLoading(true);
    fetch("https://aptdeco.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          setLoading(false);
          setInformation(null);
          toast.success(`${data.message}`, { autoClose: 1000 });
        } else {
          toast.error("Something wrong", { autoClose: 1000 });
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  if (loading)
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

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            onClick={() => setInformation(null)}
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex flex-col gap-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                disabled
                placeholder="Name"
                defaultValue={user?.displayName}
                className="input w-full max-w-xs mt-3"
              />
              <input
                type="text"
                name="email"
                disabled
                placeholder="Name"
                defaultValue={user?.email}
                className="input w-full max-w-xs mt-3  border-[#FF5F3D]"
              />
              <input
                type="text"
                name="name"
                disabled
                placeholder="Name"
                defaultValue={information?.name}
                className="input w-full max-w-xs mt-3  border-[#FF5F3D]"
              />
              <input
                type="text"
                name="name"
                disabled
                placeholder="Name"
                defaultValue={information?.resell_price}
                className="input w-full max-w-xs mt-3  border-[#FF5F3D]"
              />
              <input
                type="text"
                name="phone"
                required={true}
                placeholder="Your Phone Number"
                className="input w-full max-w-xs mt-3  border-[#FF5F3D]"
              />
              <input
                type="text"
                name="meeting_location"
                required={true}
                placeholder="Meeting location"
                className="input w-full max-w-xs mt-3  border-[#FF5F3D]"
              />

              <button
                disabled={loading}
                className=" rounded-sm text-white font-semibold mt-2  px-16 py-3 bg-[#FF5F3D] hover:bg-[#c5563d] border-[#FF5F3D] "
                type="submit"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin border-dashed  h-5 w-5 mr-3 border-white border-2 rounded-full "
                      viewBox="0 0 24 24"
                    ></svg>
                    <p>Submit</p>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
