import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import useMessage from "../hooks/useMessage";

import { signup } from "../api/auth";
import Form from "./Form";

const SignUpForm = () => {
  const [data, setData] = useState({ fullName: "", email: "", password: "" });
  const { setAuth } = useAuth();
  const { setIsLoading } = useLoading();
  const { setMessage } = useMessage();
  const navigate = useNavigate();

  const signupFields = [
    { id: "signup-name", type: "text", label: "Full Name", name: "fullName" },
    { id: "signup-email", type: "email", label: "Email", name: "email" },
    { id: "signup-password", type: "password", label: "Password", name: "password" },
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await signup(data);
      setAuth(response);
      setData({ fullName: "", email: "", password: "" });
      navigate("/dashboard", { replace: true });
      setIsLoading(false);
    } catch (err) {
      setMessage({ type: "error", content: err.response.data.error });
      setIsLoading(false);
    }
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data.email);
  };

  const disabled = !isEmailValid() || data.password.length < 6;

  useEffect(() => {
    return () => {
      setMessage({ type: "", content: "" });
    };
  }, [setMessage]);

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
