import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import useMessage from "../hooks/useMessage";

import { login } from "../api/auth";
import Form from "./Form";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { setAuth } = useAuth();
  const { setIsLoading } = useLoading();
  const { setMessage } = useMessage();
  const navigate = useNavigate();

  const loginFields = [
    { id: "login-email", type: "email", label: "Email", name: "email" },
    { id: "login-password", type: "password", label: "Password", name: "password" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await login(data);
      setAuth({
        accessToken: response.accessToken,
        user: response.user,
      });
      navigate("/dashboard", { replace: true });
      setIsLoading(false);
    } catch (err) {
      setMessage({ type: "error", content: err.response.data.error });
      setIsLoading(false);
    }
    setData({ email: "", password: "" });
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
      buttonText="Login"
      fields={loginFields}
      data={data}
      disabled={disabled}
      handleChange={handleDataChange}
      handleSubmit={handleLogin}
      link="/signup"
      linkText="Sign Up"
      text="Don't have an account?"
    />
  );
};

export default LoginForm;
