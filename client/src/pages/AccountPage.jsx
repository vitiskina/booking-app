import React, { useState, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser, setReady } = useContext(UserContext);

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }
  //   console.log(subpage);
  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  //   console.log(ready, user);
  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className=" w-full flex justify-center mt-4 mb-8 gap-4">
        <Link className={linkClasses("profile")} to={"/account"}>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className=" text-center max-w-lg mx-auto">
          Logged as {user.name} ({user.email})
          <button onClick={logout} className="primary max-w-md mt-2">
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
