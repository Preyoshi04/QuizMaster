import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/users/register`, {
        username,
        email,
        password,
      });
      //   localStorage.setItem("token", data.token);
      // setUser(data);
      toast.success("Registered Successfully !!");
      navigate("/login");
    } catch (err) {
      setErrors(err.response?.data?.message || "Server Error");
    }
  };
  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-blue-100 flex items-center justify-center">
        <div className="container mx-auto max-w-md p-8 bg-blue-50 rounded-2xl shadow-lg border border-blue-200">
          <h2 className="text-4xl font-semibold text-center mb-6 text-blue-700">
            Sign Up Page
          </h2>

          {errors && <p className="text-red-500 text-center">{errors}</p>}

          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-5 px-4 py-3 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter Your Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-5 px-4 py-3 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-6 px-4 py-3 border border-blue-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                required
              />
            </div>

            <button className="w-full p-3 bg-blue-400 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all duration-200">
              Sign Up
            </button>
          </form>

          <p className="text-center mt-6 text-blue-600">
            Already have an account?{" "}
            <Link className="font-semibold hover:underline" to="/login">
              Click here to Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
