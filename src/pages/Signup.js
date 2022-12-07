import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import NameForm from "../components/NameForm";
import PasswordForm from "../components/PasswordForm";
import { useMultiStepForm } from "../hooks/useMultiStepForm";

const INITIAL_DATA = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateFields = (fields) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
    <NameForm {...data} updateFields={updateFields} />,
    <ContactForm {...data} updateFields={updateFields} />,
    <PasswordForm {...data} updateFields={updateFields} />,
  ]);

  const getLogin = () => {
    fetch("https://test.nexisltd.com/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", JSON.stringify(data));
        setLoading(false);
        navigate("/attendance");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(false);
    setError("");
    if (!isLastStep) return next();
    console.log(data);
    setLoading(true);
    fetch("https://test.nexisltd.com/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          console.log(data);
          getLogin();
        } else {
          setError("Something went wrong!");
          setLoading(false);
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
          <h1 className="text-2xl font-bold text-center py-24">SignUp form</h1>
          <form onSubmit={onSubmit}>
            {step}
            <div className="flex justify-center mt-14 relative">
              {!isFirstStep && (
                <button
                  onClick={back}
                  type="button"
                  className="absolute md:left-24 left-10 top-5"
                >
                  Back
                </button>
              )}
              <button
                disabled={loading}
                type="submit"
                className="flex justify-center items-center gap-3 bg-[#1678CB] hover:bg-transparent hover:text-[#1678CB] border border-[#1678CB] text-white px-5 py-4 rounded-xl text-[16px]"
              >
                {isLastStep ? (
                  "Sign up"
                ) : (
                  <>
                    Next Step
                    <ArrowRight />
                  </>
                )}
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
          {isFirstStep && (
            <div className="mt-20 flex lg:justify-end justify-center items-center gap-3 lg:mx-20 ">
              <p>Already have an account?</p>
              <Link
                className="font-bold text-[14px] underline text-[#1678CB]"
                to="/login"
              >
                LOGIN HERE
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;

const ArrowRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
};
