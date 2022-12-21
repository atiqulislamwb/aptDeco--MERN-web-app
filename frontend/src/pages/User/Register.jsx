import React, { useContext, useState } from "react";
import { StateContext } from "../../context/context";
import app from "../../firebase/auth";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const auth = getAuth(app);
const userRole = ["user", "seller"];
const Register = () => {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const { setUser, user } = useContext(StateContext);
  const navigate = useNavigate();

  const handleImageChange = (image) => {
    setPreview(window.URL.createObjectURL(image));
    setUploadButtonText(image.name);
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const fullName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.files[0];
    const role = e.target.role.value;

    if (!fullName) {
      alert("Please enter a name");
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert(" Please provide correct email address");
      return;
    }
    if (!password) {
      alert("Please enter password");
      return;
    }

    if (!email) {
      alert(" Please provide  email address");
      return;
    }
    if (password.length < 6) {
      alert(" Password should be 6 characters");
      return;
    }

    let formData = new FormData();
    formData.append("image", image);
    setLoading(true);
    fetch(
      "https://api.imgbb.com/1/upload?key=ab37beca6699392a8865e14aac1bbe8d",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setUser(user);
            updateNameAndPhoto(data);

            e.target.reset();
            saveToDatabase(fullName, email, role);
            setLoading(false);
            toast.success("user created successfully", { autoClose: 1000 });
            navigate("/login");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Already Account exist", { autoClose: 1000 });
            e.target.reset();
            setLoading(false);
          });
        setLoading(false);
      })
      .catch((err) => console.log(err));

    const updateNameAndPhoto = (data) => {
      updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: data?.data?.display_url,
      })
        .then(() => {
          console.log("display name updated");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  const saveToDatabase = (fullName, email, role) => {
    const userInformation = {
      name: fullName,
      email: email,
      role: role,
      isVerified: false,
      createdAt: new Date(),
    };
    console.log(user?.displayName);
    setLoading(true);
    fetch(`https://aptdeco.vercel.app/users/${email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInformation),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          setLoading(false);
          console.log("save to database successfully");
        } else {
          console.log("data not save to database ");
        }
      });
    setLoading(false);
  };

  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register Your Account</title>
      </Helmet>

      <div>
        <div className="w-9/12  mt-10 sm:w-[50vh] mx-auto ">
          <form className="flex flex-col gap-4" onSubmit={handleRegisterSubmit}>
            <div className="">
              <div className="mb-2 block">
                <label>Name </label>
              </div>
              <input
                id="name"
                className="input w-full max-w-xs border-[#FF5F3D]"
                type="text"
                name="name"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label>Email </label>
              </div>
              <input
                className="input w-full max-w-xs border-[#FF5F3D]"
                type="email"
                name="email"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <label>Password </label>
              </div>
              <input
                className="input w-full max-w-xs border-[#FF5F3D]"
                type="password"
                name="password"
                required={true}
              />
            </div>
            <div className="flex space-x-4 items-center">
              <label
                htmlFor="image"
                className="p-3 text-center rounded-md cursor-pointer text-gray-500 font-bold border hover:text-white hover:bg-[#FF5F3D]  border-[#FF5F3D] "
              >
                {uploadButtonText}
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e.target.files[0])}
                  name="image"
                  id="image"
                  accept="image/*"
                  hidden
                />
              </label>
              {preview && (
                <img src={preview} className="w-16 h-16" alt="preview_img" />
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <label>Select Your Role </label>
              </div>
              <select
                className="select border-[#FF5F3D]  w-full max-w-xs"
                name="role"
              >
                {userRole?.map((value) => (
                  <option key={`date-${value}`} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={loading}
              className="w-[40vw] sm:w-[10vw] rounded-sm text-white font-semibold mt-2  px-16 py-3 bg-[#FF5F3D] hover:bg-[#c5563d] border-[#FF5F3D] "
              type="submit"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin border-dashed  h-5 w-5 mr-3 border-white border-2 rounded-full "
                    viewBox="0 0 24 24"
                  ></svg>
                  <p>Register</p>
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <div className="mt-3 text-[17px]">
            Do have you account?
            <Link
              to="/login"
              className=" ml-1 underline font-bold text-[#FF5F3D]"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
