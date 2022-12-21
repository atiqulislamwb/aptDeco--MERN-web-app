import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import app from "../firebase/auth.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";

export const StateContext = createContext();
const auth = getAuth(app);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [information, setInformation] = useState({});
  const [role, setRole] = useState("");
  const [userFromDatabase, setUserFromDatabase] = useState({});
  const handleLogout = () => {
    localStorage.removeItem("token");
    signOut(auth)
      .then((abc) => {
        console.log(abc);
        setUser({});
        toast.success("Sign Out successfully", { autoClose: 1000 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://aptdeco.vercel.app/users/${user?.email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setUserFromDatabase(data?.data);
          setRole(data?.data?.role);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, [user?.email]);

  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      setLoading(false);
    });
    return () => {
      unSubscribed();
      setLoading(false);
    };
  }, []);
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
    <StateContext.Provider
      value={{
        user,
        setUser,
        handleLogout,
        loading,
        setLoading,
        toggle,
        setToggle,
        dark,
        setDark,
        information,
        setInformation,
        role,
        userFromDatabase,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
