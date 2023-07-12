import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { postData } from "../api/axios";
import Form from "./Form";

const SignUpForm = () => {
  const [data, setData] = useState({ fullName: "", email: "", password: "" });
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const signupFields = [
    { id: "signup-name", type: "text", label: "Full Name", name: "fullName" },
    { id: "signup-email", type: "email", label: "Email", name: "email" },
    { id: "signup-password", type: "password", label: "Password", name: "password" },
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await postData("signup", data);
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;
      setAuth({ user, accessToken });
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 200);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const disabled = !isEmailValid(data.email) || data.password.length < 6;

  return (
    <Form
      buttonText="Sign Up"
      fields={signupFields}
      data={data}
      disabled={disabled}
      handleChange={handleDataChange}
      handleSubmit={handleSignUp}
      link="/"
      linkText="Login"
      text="Already have an account?"
    />
  );
};

export default SignUpForm;
