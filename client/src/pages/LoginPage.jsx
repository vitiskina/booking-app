import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("login success");
      setRedirect(true);
    } catch (err) {
      alert("login failed");
    }
  }

  if (redirect) return <Navigate to="/" />;
  // console.log({ email, password });

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto ">
          <input
            type="text"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className=" text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link to={"/register"} className=" underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
