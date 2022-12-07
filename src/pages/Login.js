import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";

const INITIAL_DATA = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const getLogin = (e) => {
    e.preventDefault();
    setError("");
    fetch("https://test.nexisltd.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (!data.error) {
          localStorage.setItem("token", JSON.stringify(data));
          setLoading(false);
          navigate("/attendance");
        } else {
          setError(data.error);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="lg:max-w-[1440px] mx-auto w-full md:p-10 p-5 md:flex">
      <div className="lg:w-[60%] w-full md:mt-10 mt-5">
        <img src="./images/logo.png" alt="" />
        <div className="flex justify-center">
          <img className="w-full" src="./images/istockphoto.png" alt="" />
        </div>
      </div>
      <div className="lg:w-[40%] w-full mt-10">
        <div
          className="max-w-[520px] w-full h-[630px] rounded-md "
          style={{
            boxShadow:
              "1px -10px 25px rgba(201, 201, 201, 0.25), -1px 10px 25px rgba(147, 147, 147, 0.25)",
          }}
        >
          <h1 className="text-2xl font-bold text-center py-24">Log in form</h1>
          <form onSubmit={getLogin}>
            <FormWrapper>
              <input
                type="text"
                value={data.email}
                onChange={(e) => updateFields({ email: e.target.value })}
                className="border-b border-gray-300 outline-none  w-full px-4"
                placeholder="Write First Name"
                required
              />
              <div>
                <input
                  required
                  type="password"
                  value={data.password}
                  onChange={(e) => updateFields({ password: e.target.value })}
                  className="border-b border-gray-300 outline-none  w-full px-4"
                  placeholder="Write Password"
                />
                <small className="ml-4 text-gray-500">
                  Your password must be 8 character
                </small>
                {error && <p className="text-red-500 mt-5">{error}</p>}
              </div>
            </FormWrapper>
            <div className="flex justify-center mt-14 relative">
              <button
                disabled={loading}
                type="submit"
                className="flex justify-center items-center gap-3 bg-[#1678CB] hover:bg-transparent hover:text-[#1678CB] border border-[#1678CB] text-white px-5 py-4 rounded-xl text-[16px]"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-20 flex lg:justify-end justify-center items-center gap-3 lg:mx-20 ">
            <p>Already have an account?</p>
            <Link
              className="font-bold text-[14px] underline text-[#1678CB]"
              to="/"
            >
              SIGNUP HERE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
