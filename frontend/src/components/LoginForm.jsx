import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import { postData } from "../api/axios";
import Loading from "../pages/Loading";
import Form from "./Form";
import { useState } from "react";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { isLoading, setIsLoading } = useLoading();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const loginFields = [
    { id: "login-email", type: "email", label: "Email", name: "email" },
    { id: "login-password", type: "password", label: "Password", name: "password" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await postData("login", data);
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;
      setAuth({ user, accessToken });
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        navigate("/dashboard", { replace: true });
      }, 200);
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

  const disabled = !isEmailValid(data.email) || (data.password && data.password.length < 6);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default LoginForm;
