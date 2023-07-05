import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { postData } from "../api/axios";
import Form from "./Form";

const LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    console.log("Login:", userData);
    try {
      const res = await postData("login", userData);
      const accessToken = res?.data?.accessToken;
      const user = res?.data?.user;
      setAuth({ user, accessToken });
    } catch (err) {
      console.log(err);
    }
    navigate("/dashboard", { replace: true });
  };

  const loginFields = [
    { id: "login-email", type: "email", label: "Email", name: "email" },
    { id: "login-password", type: "password", label: "Password", name: "password" },
  ];

  return <Form fields={loginFields} onSubmit={handleSubmit} buttonText="Login" text="Don't have an account?" link="/signup" linkText="Sign Up" />;
};

export default LoginForm;
