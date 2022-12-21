import React, { useContext, useState } from "react";

import { BsGoogle } from "react-icons/bs";
import app from "../../firebase/auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StateContext } from "../../context/context";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
const auth = getAuth(app);
const Login = () => {
  const { setUser } = useContext(StateContext);
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  let location = useLocation();

  let from = location?.state?.from?.pathname || "/";

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setUser(user);
        saveUserJWT(user);
        toast.success("user login successfully", { autoClose: 1000 });
        navigate(from, { replace: true });
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((solve) => {
        console.log(solve);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setLoading(true);
        const user = result.user;
        setUser(user);
        saveToDatabase(user?.displayName, user?.email);
        saveUserJWT(user);
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveToDatabase = (fullName, email) => {
    const userInformation = {
      name: fullName,
      email: email,
      role: "user",
      isVerified: false,
      createdAt: new Date(),
    };

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

  const saveUserJWT = (user) => {
    const currentUser = {
      email: user?.email,
    };

    fetch(`https://aptdeco.vercel.app/jwt`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === true) {
          localStorage.setItem("token", data?.token);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Page- login to access all services</title>
      </Helmet>
      <div className="w-9/12 mx-auto mt-10 mb-20 sm:w-[50vh] ">
        <form
          className="flex flex-col gap-4 mt-10"
          onSubmit={handleLoginSubmit}
        >
          <div>
            <div className="mb-2 block">
              <label htmlFor="email">Email</label>
            </div>
            <input
              id="email"
              className="input w-full max-w-xs border-[#FF5F3D]"
              type="email"
              name="email"
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <label htmlFor="">Password</label>
            </div>
            <input
              class="input w-full max-w-xs border-[#FF5F3D]"
              type="password"
              name="password"
              required={true}
            />
          </div>
          <div className="flex flex-col items-start">
            <button
              className=" w-[40vw] sm:w-[10vw] rounded-sm text-white font-semibold mt-3 px-16 py-3 bg-[#FF5F3D] hover:bg-[#c5563d] border-[#FF5F3D] "
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex">
                  <p>
                    {" "}
                    <svg
                      className="animate-spin border-dashed  h-5 w-5 mr-3 border-white border-2 rounded-full "
                      viewBox="0 0 24 24"
                    ></svg>
                  </p>
                  <p>Login</p>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-[50vw] sm:w-[10vw]  mt-5 text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none  font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
        >
          <p>
            <BsGoogle className="mx-4" />
          </p>
          <p> Google Log in</p>
        </button>
        <div className="mt-3 text-[17px]">
          Don't have you account?
          <Link
            to="/register"
            className=" ml-1 underline font-bold text-[#FF5F3D]"
          >
            Create New
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
