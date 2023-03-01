import React, { useState, useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";


const ProfilePage = () => {
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


  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
            <AccountNav/>
      {subpage === "profile" && (
        <div className=" text-center max-w-lg mx-auto">
          Logged as {user.name} ({user.email})
          <button onClick={logout} className="primary max-w-md mt-2">
            Log out
          </button>
        </div>
      )}

      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
