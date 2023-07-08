import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import { postData } from "../api/axios";
import Loading from "../pages/Loading";
import Form from "./Form";

const LoginForm = () => {
  const { isLoading, setIsLoading } = useLoading();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    try {
      setIsLoading(true);
      const res = await postData("login", userData);
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

  const loginFields = [
    { id: "login-email", type: "email", label: "Email", name: "email" },
    { id: "login-password", type: "password", label: "Password", name: "password" },
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Form fields={loginFields} onSubmit={handleSubmit} buttonText="Login" text="Don't have an account?" link="/signup" linkText="Sign Up" />
      )}
    </>
  );
};

export default LoginForm;
