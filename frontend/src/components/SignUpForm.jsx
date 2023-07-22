import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../api/auth";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import useMessage from "../hooks/useMessage";

import Form from "./Form";

const SignUpForm = () => {
  const [data, setData] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const { setAuth } = useAuth();
  const { setIsLoading } = useLoading();
  const { setMessage } = useMessage();
  const navigate = useNavigate();

  const signupFields = [
    { id: "signup-fname", type: "text", label: "First Name", name: "firstName" },
    { id: "signup-lname", type: "text", label: "Last Name", name: "lastName" },
    { id: "signup-email", type: "email", label: "Email", name: "email" },
    { id: "signup-password", type: "password", label: "Password", name: "password" },
  ];

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await signup(data);
      setAuth(response);
      setData({ firstName: "", lastName: "", email: "", password: "" });
      navigate("/dashboard", { replace: true });
      setIsLoading(false);
    } catch (err) {
      if (err.response.data.errors.length > 0) {
        setMessage({ type: "error", content: err.response.data.errors[0] });
      } else {
        setMessage({ type: "error", content: err.response.data.error });
      }
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
